
import * as api from '../api/api.js';

var BASE_URL = "http://127.0.0.1:8000"

async function testApiFunction(fn, ...args) {
    const result = await fn(...args);
    if (result && result.success === true) {
        return true;
    } else {
        console.log(`Function ${fn.name} failed with result:`, result);
        return false;
    }
}

const tests = [
    { fn: api.createComment, args: [1, 1, 0, "This is a test comment"] },
]

let failedCount = 0;

for (const test of tests) {
    const result = await testApiFunction(test.fn, ...test.args, BASE_URL);
    console.log(`Test ${test.fn.name} ${result ? "passed" : "failed"}`);
    if (!result) {
        failedCount++;
    }
}

console.log("\nUnit Test Summary:");
console.log(`Tests passed: ${tests.length - failedCount}/${tests.length}`);
