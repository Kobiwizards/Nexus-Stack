// test-all.js
const { execSync } = require('child_process');
const http = require('http');

console.log('🚀 Running complete production test...\n');

// Test routes after server is ready
const tests = [
  { path: '/api/health', expected: 200 },
  { path: '/', expected: 200 },
  { path: '/about', expected: 200 },
  { path: '/contact', expected: 200 },
  { path: '/services', expected: 200 },
  { path: '/work', expected: 200 },
  { path: '/testimonials', expected: 200 },
  { path: '/nonexistent', expected: 404 }
];

function testRoute(port, path, expectedStatus) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: port,
      path: path,
      method: 'GET',
      timeout: 5000
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const success = res.statusCode === expectedStatus;
        console.log(`${success ? '✅' : '❌'} ${path} - Status: ${res.statusCode} (Expected: ${expectedStatus})`);
        resolve({ success, status: res.statusCode, data });
      });
    });

    req.on('error', (error) => {
      console.log(`❌ ${path} - Error: ${error.message}`);
      resolve({ success: false, error: error.message });
    });

    req.on('timeout', () => {
      console.log(`❌ ${path} - Timeout`);
      resolve({ success: false, error: 'timeout' });
    });

    req.end();
  });
}

async function runAllTests() {
  try {
    console.log('1. Building application...');
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build successful\n');

    console.log('2. Starting server in background...');
    // Start server in background
    const serverProcess = require('child_process').spawn('npx', ['next', 'start', '-p', '10000'], {
      stdio: 'pipe',
      detached: true
    });

    // Wait for server to start
    console.log('3. Waiting for server to be ready...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log('4. Testing all routes...\n');
    
    let passed = 0;
    let failed = 0;

    for (const test of tests) {
      const result = await testRoute(10000, test.path, test.expected);
      if (result.success) passed++;
      else failed++;
    }

    console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);

    if (failed > 0) {
      console.log('\n❌ Some routes failed. The issue might be:');
      console.log('   - Server not starting properly');
      console.log('   - Route configuration issues');
      console.log('   - Environment variables missing');
    } else {
      console.log('\n🎉 All routes working! The issue is Render-specific.');
    }

    // Kill the server process
    serverProcess.kill();
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

runAllTests();