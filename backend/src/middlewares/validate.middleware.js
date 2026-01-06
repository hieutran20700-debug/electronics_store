module.exports = (rules) => {
  return (req, res, next) => {
    const errors = [];

    for (const field in rules) {
      const value = req.body[field];
      const rule = rules[field];

      //required
      if (rule.required && (value == undefined || value == null)) {
        errors.push(`${field} is required`);
        continue;
      }

      //type check
      if (value !== undefined && rule.type) {
        if (rule.type === "string" && typeof value !== "string") {
          errors.push(`${field} must be a string`);
        }

        if (rule.type === "boolean" && typeof value !== "boolean") {
          errors.push(`${field} must be a boolean`);
        }
      }

      if (value && rule.minLength && value.length < rule.minLength) {
        errors.push(`${field} must be at least ${rule.minLength} characters`);
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        status: "fail",
        errors,
      });
    }

    next();
  };
};
