export const customError = (statusCode, message) => {
    const error = new Error(message);
    error.statusCode = Number.isInteger(statusCode) ? statusCode : 500; // Ensure it's a number
    return error;
};
