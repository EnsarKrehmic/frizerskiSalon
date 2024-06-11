/**
 * Middleware function to check if the user is authenticated.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} The response object with a 401 status and error message if the user is not authenticated,
 *                   or calls the next middleware function if the user is authenticated.
 */
const authMiddleware = (req, res, next) => {
    // Check if the user is authenticated
    if (req.isAuthenticated && req.isAuthenticated()) {
        // If the user is authenticated, call the next middleware function
        return next();
    } else {
        // If the user is not authenticated, return a 401 status and error message
        return res.status(401).json({ message: 'Niste prijavljeni. Molimo prijavite se.' });
    }
};

module.exports = authMiddleware;