#!/usr/bin/env node

const args = require('./utils/process-args');

if (process.platform === 'win32') {
    require('./win32')(args);
} else {
    require('./unix-like')(args);
}
