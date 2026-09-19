const validate = (schema) => {
  return (req, res, next) => {
    try {
      const result = schema(req);

      if (result !== true) {
        return res.status(400).json({
          error: result || "Validation failed",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = validate;