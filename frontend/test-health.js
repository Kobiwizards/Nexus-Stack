const http = require('http');

console.log('🏥 Testing health endpoint...\n');

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

let passed = 0;
let failed = 0;

async function testRoute(path, expectedStatus) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 10000,
      path: path,
      method: 'GET',
      timeout: 5000
    };

    const req = http.request(options, (res) => {
      const success = res.statusCode === expectedStatus;
      console.log(`${success ? '✅' : '❌'} ${path} - Status: ${res.statusCode} (Expected: ${expectedStatus})`);
      
      if (success) passed++;
      else failed++;
      
      resolve();
    });

    req.on('error', (error) => {
      console.log(`❌ ${path} - Error: ${error.message}`);
      failed++;
      resolve();
    });

    req.on('timeout', () => {
      console.log(`❌ ${path} - Timeout`);
      failed++;
      req.destroy();
      resolve();
    });

    req.end();
  });
}

async function runTests() {
  console.log('Make sure the server is running on port 10000 first!\n');
  console.log('Run this in a separate terminal after starting the server.\n');
  
  for (const test of tests) {
    await testRoute(test.path, test.expected);
  }

  console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);
  
  if (failed > 0) {
    console.log('\n❌ Some tests failed. Check if:');
    console.log('   - Server is running on port 10000');
    console.log('   - All environment variables are set');
    console.log('   - API routes are properly configured');
  } else {
    console.log('\n🎉 All tests passed! The issue is likely Render-specific.');
  }
}

runTests();