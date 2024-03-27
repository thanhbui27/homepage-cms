function populateAttribute({ components }) {
  if (components) {
    const populate = components.reduce((currentValue, current) => {
      return {
        ...currentValue,
        [current.split(".").pop()]: {
          populate: "*",
        },
      };
    }, {});
    return {
      populate,
    };
  }
  return {
    populate: "*",
  };
}

const getPopulateFromSchema = function (schema) {
  return Object.keys(schema.attributes).reduce((currentValue, current) => {
    const attribute = schema.attributes[current];
    if (!["dynamiczone", "component", "media"].includes(attribute.type)) {
      return currentValue;
    }

    return {
      ...currentValue,
      [current]: populateAttribute(attribute),
    };
  }, {});
};

module.exports = { getPopulateFromSchema };
