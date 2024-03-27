'use strict';

/**
 * recruitment service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::recruitment.recruitment');
