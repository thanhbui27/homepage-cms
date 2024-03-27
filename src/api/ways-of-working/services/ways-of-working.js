'use strict';

/**
 * ways-of-working service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::ways-of-working.ways-of-working');
