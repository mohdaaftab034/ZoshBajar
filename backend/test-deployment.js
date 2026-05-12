#!/usr/bin/env node

/**
 * Backend API Test Script
 * Run this after deployment to verify all routes work correctly
 * 
 * Usage: node test-deployment.js <backend-url>
 * Example: node test-deployment.js https://your-backend.vercel.app
 */

const https = require('https');
const http = require('http');

const BACKEND_URL = process.argv[2] || 'http://localhost:5000';

console.log(`\n🧪 Testing Backend API: ${BACKEND_URL}\n`);

// Helper function to make HTTP requests
function makeRequest(method, path, data = null) {
    return new Promise((resolve, reject) => {
        const url = new URL(path, BACKEND_URL);
        const protocol = url.protocol === 'https:' ? https : http;
        
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const req = protocol.request(url, options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    resolve({
                        status: res.statusCode,
                        data: body ? JSON.parse(body) : null,
                        headers: res.headers
                    });
                } catch (e) {
                    resolve({
                        status: res.statusCode,
                        data: body,
                        headers: res.headers
                    });
                }
            });
        });

        req.on('error', reject);
        
        if (data) {
            req.write(JSON.stringify(data));
        }
        
        req.end();
    });
}

// Test cases
const tests = [
    {
        name: 'Root Endpoint',
        method: 'GET',
        path: '/',
        expected: 200
    },
    {
        name: 'Send OTP Endpoint',
        method: 'POST',
        path: '/auth/sent/login-signup-otp',
        data: { email: 'test@example.com' },
        expected: 200
    }
];

// Run tests
async function runTests() {
    let passed = 0;
    let failed = 0;

    for (const test of tests) {
        try {
            console.log(`📝 Testing: ${test.name}`);
            console.log(`   ${test.method} ${test.path}`);
            
            const result = await makeRequest(test.method, test.path, test.data);
            
            if (result.status === test.expected) {
                console.log(`   ✅ PASSED (Status: ${result.status})`);
                if (result.data) {
                    console.log(`   Response:`, result.data);
                }
                passed++;
            } else {
                console.log(`   ❌ FAILED (Expected: ${test.expected}, Got: ${result.status})`);
                console.log(`   Response:`, result.data);
                failed++;
            }
        } catch (error) {
            console.log(`   ❌ ERROR: ${error.message}`);
            failed++;
        }
        console.log('');
    }

    console.log('═══════════════════════════════════════');
    console.log(`📊 Test Results:`);
    console.log(`   ✅ Passed: ${passed}`);
    console.log(`   ❌ Failed: ${failed}`);
    console.log(`   📈 Total:  ${tests.length}`);
    console.log('═══════════════════════════════════════\n');

    if (failed === 0) {
        console.log('🎉 All tests passed! Backend is working correctly.\n');
        process.exit(0);
    } else {
        console.log('⚠️  Some tests failed. Check the deployment configuration.\n');
        process.exit(1);
    }
}

runTests().catch((error) => {
    console.error('💥 Test suite failed:', error.message);
    process.exit(1);
});
