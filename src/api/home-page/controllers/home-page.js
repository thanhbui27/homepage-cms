"use strict";

/**
 * home-page controller
 */

const schema = require("../content-types/home-page/schema.json");
const { getPopulateFromSchema } = require("../../../helper/populate");

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::home-page.home-page", () => ({
  async find(ctx) {
    ctx.query = { ...ctx.query, populate: getPopulateFromSchema(schema) };
    return await super.find(ctx);
  },
}));
