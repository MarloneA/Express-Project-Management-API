import { validationResult, checkSchema } from "express-validator";

export const taskValidationSchema = {
  title: {
    trim: true,
    isLength: {
      options: { min: 1, max: 30 },
      errorMessage: "Title must be between 1 and 30 characters",
    },
    escape: true, // Escape HTML characters to prevent XSS attacks
    customSanitizer: {
      options: (value) => {
        // Custom sanitizer function to remove or replace potentially harmful characters
        return value.replace(/[^a-zA-Z0-9\s]/g, ""); // Allow only alphanumeric characters and spaces
      },
    },
  },
  status: {
    trim: true,
    isLength: {
      options: { min: 1, max: 30 },
      errorMessage: "Status must be between 1 and 30 characters",
    },
    escape: true, // Escape HTML characters to prevent XSS attacks
    customSanitizer: {
      options: (value) => {
        // Custom sanitizer function to remove or replace potentially harmful characters
        return value.replace(/[^a-zA-Z0-9\s]/g, ""); // Allow only alphanumeric characters and spaces
      },
    },
  },
  priority: {
    trim: true,
    isLength: {
      options: { min: 1, max: 30 },
      errorMessage: "Priority must be between 1 and 30 characters",
    },
    escape: true, // Escape HTML characters to prevent XSS attacks
    customSanitizer: {
      options: (value) => {
        // Custom sanitizer function to remove or replace potentially harmful characters
        return value.replace(/[^a-zA-Z0-9\s]/g, ""); // Allow only alphanumeric characters and spaces
      },
    },
  },
};

export const taskValidation = [
  checkSchema(taskValidationSchema),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    next();
  },
];
