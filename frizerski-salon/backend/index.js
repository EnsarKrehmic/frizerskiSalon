/**
 * This is the entry point for our API.
 * It sets up the basic configuration for our app, including middleware and routes.
 *
 * @module index.js
 *
 * @requires express
 * @requires path
 * @requires cookie-parser
 * @requires bodyParser
 * @requires cors
 * @requires session
 * @requires contactRoutes
 * @requires db
 */
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require("body-parser");
const express = require("express");
const moment = require("moment");
const cors = require("cors");
const path = require("path");

/**
 * Routes for the contact form.
 */
const contactRoutes = require("./routes/contact");

/**
 * Configuration for connecting to the database.
 */
const db = require("./config/db");

/**
 * Our main Express app instance.
 */
const app = express();

/**
 * Serve static files from the 'frontend/build' directory.
 */
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

/**
 * Whitelist of allowed origins for CORS.
 */
const whitelistedDomains = ['http://localhost:3001'];

/**
 * Configuration for our session middleware.
 */
const sessionOptions = {
    secret: '123456789',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
    },
};

/**
 * Middleware for handling CORS.
 */
app.use(cors({
    origin: whitelistedDomains,
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
}));

/**
 * Middleware for parsing JSON and URL-encoded data.
 */
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Middleware for handling sessions.
 */
app.use(session(sessionOptions));

/**
 * Routes for the contact form.
 */
app.use('/api/contact', contactRoutes);

/**
 * Default route for our API.
 * Returns a welcome message.
 */
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});


/**
 * Endpoint for user login.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the user's status and role.
 */
app.post("/login", (req, res) => {
    try {
        // SQL query to select the user with the given email and password
        const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
        db.query(sql, [req.body.email, req.body.password], (err, data) => {
            if (err) {
                console.error("SQL Query Error:", err);
                return res.json("Error");
            }
            if (data.length > 0) {
                const user = data[0];
                // Store user data in the session
                req.session.user = {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    nickname: user.nickname,
                    email: user.email,
                    role: user.role,
                    status: user.status
                };
                req.session.save(err => {
                    if (err) {
                        console.error("Session Save Error:", err);
                        return res.status(500).json("Error");
                    }
                    // Check the user's status and role and return the appropriate response
                    if (user.status === "DEACTIVATED") {
                        return res.json("DEACTIVATED");
                    }
                    if (user.role === "USER") {
                        return res.json("USER");
                    } else if (user.role === "ADMIN") {
                        return res.json("ADMIN");
                    } else {
                        return res.json("Unknown role");
                    }
                });
            } else {
                return res.json("Failed");
            }
        });
    } catch (error) {
        console.error(error);
        return res.json("Error");
    }
});

/**
 * Handles the registration of a new user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object.
 */
app.post("/register", (req, res) => {
    try {
        // Default role and status for new user
        const role = "USER";
        const status = "ACTIVE";

        // SQL query to insert new user into the database
        const sql = "INSERT INTO users(firstName, lastName, nickname, email, password, role, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
        
        // Values to be inserted into the database
        const values = [
            req.body.firstName,
            req.body.lastName,
            req.body.nickname,
            req.body.email,
            req.body.password,
            role,
            status
        ];

        // Execute the SQL query
        db.query(sql, values, (err, data) => {
            if (err) {
                console.error("SQL Insert Error:", err);
                return res.json("Greška!");
            }

            // Return success message if the user was successfully registered
            return res.json("Korisnik uspješno dodan.");
        });
    } catch (error) {
        // Log and return error message if there was an error
        console.error(error);
        return res.json("Greška!");
    }
});

/**
 * API endpoint to get the user information from the session.
 * If the user is not authenticated, returns a 401 error.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with user information or error message.
 */
app.get("/api/user", (req, res) => {
    // Check if the user is authenticated
    if (req.session.user) {
        // Return user information from the session
        return res.json(req.session.user);
    } else {
        // Return error if the user is not authenticated
        return res.status(401).json({ error: "Neautorizovano!" });
    }
});

/**
 * API endpoint to get the user profile.
 * If the user is not authenticated, returns a 401 error.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with user profile or error message.
 */
app.get("/api/user-profile", (req, res) => {
    // Get the user ID from the session
    const userId = req.session.userId;
    
    // Check if the user is authenticated
    if (!userId) {
        return res.status(401).json({ message: "Neautorizovano!" });
    }

    // SQL query to get user profile
    const sql = "SELECT * FROM users WHERE id = ?";
    
    // Execute the SQL query
    db.query(sql, [userId], (err, data) => {
        if (err) {
            // Return error if there was a database error
            return res.status(500).json({ message: "Error fetching user data" });
        }
        if (data.length === 0) {
            // Return error if the user was not found
            return res.status(404).json({ message: "Korisnik nije pronađen!" });
        }
        // Return user profile
        return res.status(200).json(data[0]);
    });
});

/**
 * API endpoint to get the current user information by ID.
 * If the user is not authenticated, returns a 401 error.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with user information or error message.
 */
app.get("/api/current-user/:id", (req, res) => {
    // Get the user ID from the session
    const userId = req.session.userId;
    
    // Check if the user is authenticated
    if (!userId) {
        return res.status(401).json({ message: "Neautorizovano!" });
    }

    // SQL query to get user information by ID
    const sql = "SELECT id, firstName, lastName, email, role FROM users WHERE id = ?";
    
    // Execute the SQL query
    db.query(sql, [userId], (err, data) => {
        if (err) {
            // Return error if there was a database error
            return res.status(500).json({ message: "Error fetching user data" });
        }
        if (data.length === 0) {
            // Return error if the user was not found
            return res.status(404).json({ message: "Korisnik nije pronađen!" });
        }
        // Return user information
        return res.status(200).json(data[0]);
    });
});

/**
 * API endpoint to get all users from the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with list of users or error message.
 */
app.get("/api/get-users", (req, res) => {
    // SQL query to get all users
    const sql = "SELECT * FROM users";
    
    // Execute the SQL query
    db.query(sql, (err, data) => {
        if (err) {
            // Return error if there was a database error
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }
        // Return list of users
        return res.status(200).json(data);
    });
});

/**
 * API endpoint to check if the user is authenticated as an admin.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with message or error message.
 */
app.get("/admin", (req, res) => {
    // Check if the user is authenticated and has admin role
    if (req.isAuthenticated() && req.user.role === 'admin') {
        // Return success message if the user is authenticated as admin
        return res.status(200).json({ message: "Dobrodošli na stranicu Admina!" });
    } else {
        // Return error message if the user is not authenticated as admin
        return res.status(401).json({ message: "Neautorizovano!" });
    }
});

/**
 * API endpoint to logout the user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with message or error message.
 */
app.get("/logout", (req, res)=>{
    // Destroy the session and clear the cookie
    req.session.destroy(err => {
        if (err) {
            // Return error if session destroy failed
            return res.status(500).json({ error: 'Logout failed' });
        }
        res.clearCookie('connect.sid');
    });
});

/**
 * API endpoint to update user information in the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with user information or error message.
 */
app.put("/admin/update/:id", (req, res)=>{
    try{
        // Set default values for role and status
        const role="USER";
        const status="ACTIVE";

        // SQL query to update user information
        const sql="UPDATE users SET firstName = ?, lastName = ?, nickname = ?, email = ?, password = ?, role = ?, status = ? WHERE id = ?";
        const values=[req.body.firstName, req.body.lastName, req.body.nickname, req.body.email, req.body.password, role, status]
        const id=req.params.id;

        // Execute the SQL query
        db.query(sql, [...values, id], (err, data)=>{
            if(err){
                // Return error if there was a database error
                console.error("SQL Insert Error:",err);
                return res.json("Error");
            } else {
                // Return user information if the update was successful
                return res.json(data);
            }
        });
    }catch(error){
        // Return error if there was an error
        console.error(error);
        return res.json("Error");
    }
});

/**
 * Updates the status of a user in the database.
 *
 * @param {string} newStatus - The new status for the user.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @returns {Object} The response object with user information or error message.
 */
const updateUserStatus = (newStatus, request, response) => {
  const userId = request.params.id;
  const sql = 'UPDATE users SET status = ? WHERE id = ?';

  db.query(sql, [newStatus, userId], (error, result) => {
    if (error) {
      response.status(500).json({ error: 'Internal server error' });
    } else {
      response.json(result);
    }
  });
};

/**
 * API endpoint to deactivate a user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with user information or error message.
 */
app.put('/admin/deactivate/:id', (req, res) => {
    // Call the updateUserStatus function with DEACTIVATED status
    updateUserStatus('DEACTIVATED', req, res);
});

/**
 * API endpoint to activate a user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with user information or error message.
 */
app.put('/admin/activate/:id', (req, res) => {
    // Call the updateUserStatus function with ACTIVE status
    updateUserStatus('ACTIVE', req, res);
});


/**
 * API endpoint to delete a user.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with user information or error message.
 */
app.delete("/admin/delete-user/:id", (req, res) => {
    // Get the userId from the request parameters
    const userId = req.params.id;

    // Delete the user from the database
    const sql = "DELETE FROM users WHERE id = ?";
    db.query(sql, [userId], (err, result) => {
        if (err) {
            // Log and return error if there was an error
            console.error("Greška pri brisanju korisnika:", err);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
        // Return success response
        return res.json({ success: true, message: "Korisnik uspješno obrisan!" });
    });
});

/**
 * API endpoint to add a worker.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with worker information or error message.
 */
app.post("/admin/add-worker", (req, res)=>{
    try{
        // Get the worker information from the request body
        const { name, description, type } = req.body;

        // Insert the worker into the database
        const sql="INSERT INTO workers(name,description,type) VALUES(?, ?, ?)";
        const values=[name, description, type];
        db.query(sql, values, (err, data)=>{
            if(err){
                // Log and return error if there was an error
                console.error("SQL Insert Error:",err);
                return res.json("Error");
            }
            // Return success response
            return res.json(data);
        });
    }catch(error){
        // Log and return error if there was an error
        console.error(error);
        return res.json("Error");
    }
});

/**
 * API endpoint to get a worker.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with worker information or error message.
 */
app.get("/get-worker/:id", (req, res)=>{
    // Get the workerId from the request parameters
    const id=req.params.id;

    // Get the worker from the database
    const sql="SELECT * FROM workers WHERE id = ?";
    db.query(sql, [id], (err, data)=>{
        if(err) return res.json("Error");
        // Return success response
        return res.json(data); 
    })
});

/**
 * API endpoint to get all workers.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with workers information or error message.
 */
app.get("/api/get-workers", (req, res)=>{
    // Get all workers from the database
    const sql="SELECT * FROM workers";
    db.query(sql, (err, data)=>{
        if(err) return res.json("Error");
        // Return success response
        return res.json(data); 
    })
});

/**
 * API endpoint to update a worker.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with worker information or error message.
 */
app.put("/admin/update-worker/:id", (req, res)=>{
    try{
        // Get the workerId from the request parameters
        const workerId = req.params.id;
        // Get the updated worker information from the request body
        const { name, description, type } = req.body;

        // Update the worker in the database
        const sql="UPDATE workers SET name = ?, description = ?, type = ? WHERE id = ?";
        const values=[name, description, type, workerId];
        db.query(sql, values, (err, data)=>{
            if(err){
                // Log and return error if there was an error
                console.error("SQL Insert Error:",err);
                return res.json("Error");
            }
            // Return success response
            return res.json(data);
        });
    }catch(error){
        // Log and return error if there was an error
        console.error(error);
        return res.json("Error");
    }
});

/**
 * API endpoint to delete a worker.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with worker information or error message.
 */
app.delete("/admin/delete-worker/:id", (req, res)=>{
    // Get the workerId from the request parameters
    const id=req.params.id;

    // Delete the questions associated with the worker from the database
    const sqlQuestions="DELETE FROM questions WHERE worker_id=?";
    db.query(sqlQuestions, [id], (err, data)=>{
        if(err) console.log("Error");
        console.error(err);
    });

    // Delete the workers associated with the worker from the database
    const sqlWorkers="DELETE FROM worker_registers WHERE worker_id=?";
    db.query(sqlWorkers,[id],(err,data)=>{
        if(err) console.log("Error");
        console.error(err);
    });

    // Delete the worker from the database
    const sql="DELETE FROM worker WHERE id = ?";
    db.query(sql, [id], (err, data)=>{
        if(err) return res.json("Error");
        console.error(err);
        return res.json(data);
    })
});

/*app.delete("/admin/delete-worker/:id", (req, res) => {
    const workerId = req.params.id;

    const sqlQuestions = "DELETE FROM questions WHERE id = ?";
    db.query(sqlQuestions, [workerId], (err, data) => { 
        if (err) {
            console.error("Greška pri brisanju radnika:", err);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
        return res.json({ success: true, message: "Korisnik uspješno obrisan!" });
    });
    const sqlWorkers = "DELETE FROM worker_registers WHERE id = ?";
    db.query(sqlWorkers, [workerId], (err, data) => {
        if (err) {
            console.error("Greška pri brisanju radnika:", err);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
        return res.json({ success: true, message: "Korisnik uspješno obrisan!" });
    });
    const sql = "DELETE FROM worker WHERE id = ?";
    db.query(sql, [workerId], (err, data)=> {
        if (err) {
            console.error("Greška pri brisanju radnika:", err);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
        return res.json({ success: true, message: "Korisnik uspješno obrisan!" });
    });
  });*/

/**
 * Handles POST requests to add a question for a worker.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object.
 */
app.post("/add-question/:id", (req, res) => {
    // Destructure the required properties from the request body
    const { content, user_id } = req.body;
    // Get the worker ID from the request parameters
    const worker_id = req.params.id;

    // SQL query to insert the question into the database
    const sql = "INSERT INTO questions (message, user_id, worker_id) VALUES (?, ?, ?)";
    // Execute the SQL query with the provided data
    db.query(sql, [content, user_id, worker_id], (err, data) => {
        if (err) {
            console.error("Greška pri postavljanju pitanja:", err);
            return res.status(500).json("Error");
        }
        return res.status(200).json("OK");
    });
});

/**
 * Handles GET requests to retrieve questions for a worker.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object.
 */
app.get("/worker-questions/:id", (req, res) => {
    // Get the worker ID from the request parameters
    const worker_id = req.params.id;
    // SQL query to retrieve questions for the worker
    const sql = `SELECT questions.id, questions.message, users.nickname 
                 FROM questions 
                 INNER JOIN users ON questions.user_id = users.id 
                 WHERE questions.worker_id = ?`;
    // Execute the SQL query with the provided worker ID
    db.query(sql, [worker_id], (err, data) => {
        if (err) {
            console.error("Greška pri učitavanju pitanja:", err);
            return res.status(500).json("Error");
        }
        return res.status(200).json(data);
    });
});

/**
 * Handles DELETE requests to delete a question.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object.
 */
app.delete("/admin/delete-question/:id", (req, res)=>{
  // SQL query to delete a question
  const sql="DELETE FROM questions WHERE id = ?";
  // Get the question ID from the request parameters
  const id=req.params.id;
  // Execute the SQL query with the provided question ID
  db.query(sql, [id], (err, data)=>{
      if(err) return res.json("Error");
      return res.json(data); 
  })
});

/**
 * Handles POST requests to register a worker.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object.
 */
app.post("/worker-register/:id", (req, res)=>{
  // SQL query to register a worker
  const sql="INSERT INTO worker-register(start_date,end_date,user_id,worker_id) VALUES(?, ?, ?, ?)";
  // Format the start and end dates from the request body
  const start_date = moment(req.body.startDate).format('YYYY-MM-DD');
  const end_date = moment(req.body.endDate).format('YYYY-MM-DD');
  // Destructure the user ID from the request body
  const { user_id } = req.body;
  // Get the worker ID from the request parameters
  const id=req.params.id;
  // Execute the SQL query with the provided data
  db.query(sql, [start_date, end_date, user_id, id], (err, data)=>{
      if(err) return res.json("Error");
      return res.json("OK"); 
  })
});

/**
 * Handles GET requests to retrieve worker registrations.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object.
 */
app.get("/api/get-worker-registers/:id", (req, res) => {
    const id = req.params.id;
    const sql = `
      SELECT 
        worker_registers.start_date, 
        worker_registers.end_date, 
        workers.name 
      FROM 
        worker_registers 
      INNER JOIN 
        workers 
      ON 
        worker_registers.worker_id = workers.id 
      WHERE 
        worker_registers.user_id = ? 
    `;
    
    db.query(sql, [id], (err, data) => {
      if (err) return res.json("Error");
      return res.json(data);
    });
  });
  
// Set the port to the environment variable PORT or 3307
const PORT = process.env.PORT || 3307;
// Start the server and log a message indicating that it is running
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});