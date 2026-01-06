module.exports = {
  createCategory: {
    name: {
      required: true,
      type: "string",
      minLength: 2,
    },
    slug: {
      required: true,
      type: "string",
      minLength: 2,
    },
    description: {
      type: "string",
    },
    parentId: {
      type: "string",
    },
  },

  updateCategory: {
    name: {
      type: "string",
      minLength: 2,
    },
    description: {
      type: "string",
    },
  },
};