const { execSync, spawn } = require('child_process');
const fs = require('fs');
const http = require('http');

console.log('🧪 Testing production build locally...\n');

function waitForServer(port, maxAttempts = 30) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    
    function checkServer() {
      const req = http.request(`http://localhost:${port}/api/health`, (res) => {
        if (res.statusCode === 200) {
          console.log('✅ Server is ready and responding');
          resolve();
        } else {
          attempts++;
          if (attempts >= maxAttempts) {
            reject(new Error('Server not ready within timeout'));
          } else {
            setTimeout(checkServer, 1000);
          }
        }
      });
      
      req.on('error', () => {
        attempts++;
        if (attempts >= maxAttempts) {
          reject(new Error('Server not ready within timeout'));
        } else {
          setTimeout(checkServer, 1000);
        }
      });
      
      req.end();
    }
    
    checkServer();
  });
}

async function runTests() {
  try {
    // 1. Build the app
    console.log('1. Building application...');
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build successful\n');

    // 2. Test if .next directory exists
    console.log('2. Checking build output...');
    if (!fs.existsSync('.next')) {
      throw new Error('.next directory not found - build failed');
    }
    console.log('✅ Build output exists\n');

    // 3. Start the production server
    console.log('3. Starting production server on port 10000...');
    const serverProcess = spawn('npx', ['next', 'start', '-p', '10000'], {
      stdio: 'inherit',
      detached: false
    });

    // 4. Wait for server to be ready
    console.log('4. Waiting for server to start...');
    await waitForServer(10000);
    
    console.log('\n🎉 Server is running successfully!');
    console.log('   Visit: http://localhost:10000');
    console.log('   Test these routes in your browser:');
    console.log('   - http://localhost:10000/');
    console.log('   - http://localhost:10000/api/health');
    console.log('   - http://localhost:10000/about');
    console.log('   - http://localhost:10000/contact');
    console.log('\nPress Ctrl+C to stop the server');

    // Keep the server running
    serverProcess.on('close', (code) => {
      console.log(`Server process exited with code ${code}`);
    });

    process.on('SIGINT', () => {
      console.log('\n🛑 Stopping server...');
      serverProcess.kill('SIGINT');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

runTests();