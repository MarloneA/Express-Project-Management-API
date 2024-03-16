import { checkSchema, validationResult } from "express-validator";

export const queryParamsValidationSchema = {
  order: {
    in: ["query"],
    optional: true,
    isIn: {
      options: [["ASC", "DSC"]],
      errorMessage: 'Order must be either "ASC" or "DSC"',
    },
  },
  orderBy: {
    in: ["query"],
    optional: true,
    isIn: {
      options: [["title", "status", "priority"]],
      errorMessage: 'OrderBy must be one of: "title", "status", "priority"',
    },
  },
  filter: {
    in: ["query"],
    optional: true,
    isIn: {
      options: [["status", "priority"]],
      errorMessage: 'Filter must be one of: "status", "priority"',
    },
  },
  value: {
    in: ["query"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 1, max: 255 },
      errorMessage: "Value must be between 1 and 255 characters",
    },
  },
};

export const validateQueryParams = [
  checkSchema(queryParamsValidationSchema),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
