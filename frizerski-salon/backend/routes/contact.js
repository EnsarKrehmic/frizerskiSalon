/**
 * Routes for handling contact form submissions.
 *
 * This module exports a single function that creates a new
 * Express router. The router is mounted on the '/contact' path
 * and has a single route handler for the POST method.
 *
 * The route handler takes the request and response objects
 * as arguments. It extracts the name, email, and message
 * fields from the request body.
 *
 * The extracted data is then inserted into the 'contacts'
 * table in the MySQL database.
 *
 * If the insertion is successful, a JSON response with a
 * 'success' field is sent. Otherwise, a JSON response with
 * an 'error' field is sent.
 *
 * @returns {express.Router} The Express router object.
 */

const express = require('express');
const db = require('../config/db');

/**
 * Create a new Express router and configure the routes.
 *
 * @returns {express.Router} The Express router object.
 */
const createRouter = () => {

    /**
     * Create a new Express router.
     */
    const router = express.Router();

    /**
     * Route handler for the '/contact' path and POST method.
     *
     * @param {express.Request} req - The request object.
     * @param {express.Response} res - The response object.
     */
    const contactRouteHandler = (req, res) => {

        /**
         * Extract the name, email, and message fields from the
         * request body.
         */
        const { name, email, message } = req.body;

        /**
         * Insert the extracted data into the 'contacts' table
         * in the MySQL database.
         *
         * @param {Error|null} error - The error object.
         * @param {mysql.QueryResult} result - The query result.
         */
        db.query(
            'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
            [name, email, message],
            (error, result) => {
                if (error) {
                    console.error('Error inserting contact:', error);
                    return res.status(500).json({
                        error: 'Došlo je do greške pri slanju poruke!',
                    });
                }

                /**
                 * If the insertion is successful, send a JSON
                 * response with a 'success' field.
                 */
                res.status(200).json({
                    success: 'Poruka uspješno poslana!',
                });
            }
        );
    };

    /**
     * Mount the route handler on the '/contact' path and the
     * POST method.
     */
    router.post('/contact', contactRouteHandler);

    return router;
};

module.exports = createRouter;