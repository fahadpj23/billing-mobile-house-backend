// utils/sequelizeErrorHandler.js
const { ValidationError, DatabaseError } = require("sequelize");

module.exports = {
  handleSequelizeError: (error) => {
    // Handle specific Sequelize error types
    if (error instanceof ValidationError) {
      const messages = error.errors.map((err) => ({
        field: err.path,
        message: err.message,
        type: err.type,
        validatorKey: err.validatorKey,
      }));

      return {
        status: 400,
        error: "Validation Error",
        message: messages[0].message,
        details: "One or more validation errors occurred",
      };
    }

    if (error instanceof DatabaseError) {
      return {
        status: 500,
        error: "Database Error",
        message: error.message,
        details: "A database operation failed",
      };
    }

    if (error.name === "SequelizeUniqueConstraintError") {
      return {
        status: 409,
        error: "Conflict",
        message: `${error.errors[0].path} already exists`,
        field: error.errors[0].path,
        details: "Unique constraint violation",
      };
    }

    if (error.name === "SequelizeForeignKeyConstraintError") {
      return {
        status: 400,
        error: "Invalid Reference",
        message: "The referenced record does not exist",
        field: error.fields[0],
        details: "Foreign key constraint failed",
      };
    }

    if (error.name === "SequelizeConnectionError") {
      return {
        status: 503,
        error: "Service Unavailable",
        message: "Database connection failed",
        details: "Could not establish database connection",
      };
    }

    if (error.name === "SequelizeTimeoutError") {
      return {
        status: 504,
        error: "Gateway Timeout",
        message: "Database operation timed out",
        details: "The query exceeded the timeout limit",
      };
    }

    if (error.name === "SequelizeEmptyResultError") {
      return {
        status: 404,
        error: "Not Found",
        message: "The requested record was not found",
        details: "No results were returned from the database",
      };
    }

    // Fallback for unhandled Sequelize errors
    if (error.name.includes("Sequelize")) {
      return {
        status: 500,
        error: "Database Operation Failed",
        message: error.message,
        details: "An unexpected database error occurred",
      };
    }

    // Non-Sequelize errors
    return {
      status: error.status || 500,
      error: error.name || "Internal Server Error",
      message: error.message || "An unexpected error occurred",
      details: error.details || "No additional details available",
    };
  },
};
