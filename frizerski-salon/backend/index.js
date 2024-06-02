const bodyParser = require("body-parser");
const express = require("express");
const mysql = require("mysql2");
const moment = require("moment");
const cors = require("cors");
const path = require("path");
const cookieParser = require('cookie-parser');
const session = require('express-session');

const contactRoutes = require("./routes/contact");
const userRoutes = require("./routes/users");
const db = require("./config/db");

const app = express();

app.use(cors({
  origin: "http://localhost:3307",
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
  secret: "123456789",
  resave: false,
  saveUninitialized: false,
  cookie: { 
      secure: false,
      maxAge: 1000 * 60 * 60 * 24
  },
}));

app.use('/api/contact', contactRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.post("/register", (req, res)=>{
  try{
      const role="USER";
      const status="ACTIVE";
      const sql="INSERT INTO users(firstName,lastName,nickname,email,password,role,status) VALUES(?, ?, ?, ?, ?, ?, ?)";
      const values=[req.body.firstName, req.body.lastName, req.body.nickname, req.body.email, req.body.password, role, status]
      db.query(sql, values, (err, data)=>{
          if(err){
              console.error("SQL Insert Error:",err);
              return res.json("Error");
          }
          return res.json(data);
      });
  }catch(error){
      console.error(error);
      return res.json("Error");
  }
  
})

app.post("/login", (req, res)=>{
  try{
      const sql="SELECT * FROM users WHERE email = ?  AND password = ?";
      db.query(sql, [req.body.email, req.body.password], (err, data)=>{
          if(err){
              return res.json("Error");
          }
          if(data.length>0){
              const user=data[0];
              req.session.user={
                  id: user.id,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  nickname: user.nickname,
                  email: user.email,
                  role: user.role,
                  status: user.status
              }
              if(user.status==="DEACTIVATED"){
                  return res.json("DEACTIVATED");
              }
              if (user.role==="USER"){
                  return res.json("USER");
              }else if(user.role==="ADMIN"){
                  return res.json("ADMIN");
              }else{
                  return res.json("Unknown role");
              }
          }
          else{
              return res.json("Failed");
          }
      })
  }catch(error){
      console.error(error);
      return res.json("Error");
  }
})

app.get("/api/user", (req, res) => {
  if (req.session.user) {
      return res.json(req.session.user);
  } else {
      return res.status(401).json({ error: "Unauthorized" });
  }
});

app.get("/logout", (req, res)=>{
  req.session.destroy(err => {
      if (err) {
          return res.status(500).json({ error: 'Logout failed' });
      }
      res.clearCookie('connect.sid');
  });
})

app.get("/api/get-users", (req, res)=>{
  const sql="SELECT * FROM users";
  db.query(sql, (err, data)=>{
      if(err) return res.json("Error");
      return res.json(data); 
  })
})

app.put("/admin/update/:id", (req, res)=>{
  try{
      const role="USER";
      const status="ACTIVE";
      const sql="UPDATE users SET firstName = ?, lastName = ?, nickname = ?, email = ?, password = ?, role = ?, status = ? WHERE id = ?";
      const values=[req.body.firstName, req.body.lastName, req.body.nickname, req.body.email, req.body.password, role, status]
      const id=req.params.id;
      db.query(sql, [...values, id], (err, data)=>{
          if(err){
              console.error("SQL Insert Error:",err);
              return res.json("Error");
          }
          return res.json(data);
      });
  }catch(error){
      console.error(error);
      return res.json("Error");
  }
})

app.put("/admin/deactivate/:id", (req, res)=>{
  try{
      const status="DEACTIVATED";
      const sql="UPDATE users SET status = ? WHERE id = ?";
      const id=req.params.id;
      db.query(sql, [status, id], (err, data)=>{
          if(err){
              console.error("SQL Insert Error:",err);
              return res.json("Error");
          }
          return res.json(data);
      });
  }catch(error){
      console.error(error);
      return res.json("Error");
  }
})

app.put("/admin/activate/:id", (req, res)=>{
  try{
      const status="ACTIVE";
      const sql="UPDATE users SET status = ? WHERE id = ?";
      const id=req.params.id;
      db.query(sql, [status, id], (err, data)=>{
          if(err){
              console.error("SQL Insert Error:",err);
              return res.json("Error");
          }
          return res.json(data);
      });
  }catch(error){
      console.error(error);
      return res.json("Error");
  }
})

app.post("/admin/add-worker", (req, res)=>{
  try{
      const sql="INSERT INTO workers(name,description,type) VALUES(?, ?, ?)";
      const values=[req.body.name, req.body.description, req.body.type]
      db.query(sql, values, (err, data)=>{
          if(err){
              console.error("SQL Insert Error:",err);
              return res.json("Error");
          }
          return res.json(data);
      });
  }catch(error){
      console.error(error);
      return res.json("Error");
  }
})

app.get("/api/get-workers", (req, res)=>{
  const sql="SELECT * FROM workers";
  db.query(sql, (err, data)=>{
      if(err) return res.json("Error");
      return res.json(data); 
  })
})

app.put("/admin/update-worker/:id", (req, res)=>{
  try{
      const sql="UPDATE workers SET name = ?, description = ?, type = ? WHERE id = ?";
      const values=[req.body.name, req.body.description, req.body.type]
      const id=req.params.id;
      db.query(sql, [...values, id], (err, data)=>{
          if(err){
              console.error("SQL Insert Error:",err);
              return res.json("Error");
          }
          return res.json(data);
      });
  }catch(error){
      console.error(error);
      return res.json("Error");
  }
})

app.delete("/admin/delete-worker/:id", (req, res)=>{
  const id=req.params.id;
  const sqlQuestions="DELETE FROM questions WHERE worker_id=?";
  db.query(sqlQuestions, [id], (err, data)=>{
      if(err) console.log("Error");
  })
  const sqlWorkers="DELETE FROM worker_registers WHERE worker_id=?";
  db.query(sqlWorkers,[id],(err,data)=>{
      if(err) console.log("Error");
  })

  const sql="DELETE FROM worker WHERE id = ?";
  db.query(sql, [id], (err, data)=>{
      if(err) return res.json("Error");
      return res.json(data); 
  })
})

app.get("/get-worker/:id", (req, res)=>{
  const sql="SELECT * FROM workers WHERE id = ?";
  const id=req.params.id;
  db.query(sql, [id], (err, data)=>{
      if(err) return res.json("Error");
      return res.json(data); 
  })
})

app.post("/add-question/:id", (req, res)=>{
  const sql="INSERT INTO questions(message,user_id,worker_id) VALUES(?, ?, ?)";
  const values=[req.body.content[0], req.body.user_id];
  const id=req.params.id;
  db.query(sql, [...values, id], (err, data)=>{
      if(err) return res.json("Error");
      return res.json("OK"); 
  })
})

app.get("/worker-questions/:id", (req, res)=>{
  const sql="SELECT questions.id, questions.message, users.nickname FROM questions INNER JOIN users ON questions.user_id=users.id WHERE worker_id=?";
  const id=req.params.id;
  db.query(sql, [id], (err, data)=>{
      if(err) return res.json("Error");
      return res.json(data); 
  })
})

app.delete("/admin/delete-question/:id", (req, res)=>{
  const sql="DELETE FROM questions WHERE id = ?";
  const id=req.params.id;
  db.query(sql, [id], (err, data)=>{
      if(err) return res.json("Error");
      return res.json(data); 
  })
})

app.post("/worker-register/:id", (req, res)=>{
  const sql="INSERT INTO worker-register(start_date,end_date,user_id,worker_id) VALUES(?, ?, ?, ?)";
  const start_date = moment(req.body.startDate).format('YYYY-MM-DD');
  const end_date = moment(req.body.endDate).format('YYYY-MM-DD');
  const { user_id } = req.body;
  const id=req.params.id;
  db.query(sql, [start_date, end_date, user_id, id], (err, data)=>{
      if(err) return res.json("Error");
      return res.json("OK"); 
  })
})

app.get("/api/get-worker-registers/:id", (req, res)=>{
  const id=req.params.id;
  const sql="SELECT worker-register.start_date, worker-registers.end_date, workers.name FROM worker-registers INNER JOIN workers ON worker-registers.worker_id=worker.id WHERE worker-registers.user_id = ? ";
  db.query(sql, [id], (err, data)=>{
      if(err) return res.json("Error");
      return res.json(data); 
  })
})

const PORT = process.env.PORT || 3307;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});