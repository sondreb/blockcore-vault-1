'use strict';

/**
 * Expose
 */

module.exports = {
  db: process.env.MONGODB_URL || 'mongodb://localhost:27017/BlockcoreVaultTest',
  port: process.env.PORT || 4000,
  environment: 'TEST',
};