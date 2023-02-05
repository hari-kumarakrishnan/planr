const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const snippets = require("./routes/snippets");
const LocalStrategy = passportLocal.Strategy;
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

// Middleware
const app = express();
app.use(express.json());
app.use(
  cors({
    allowedHeaders: ["Content-Type", "Authorization"],
    origin:
      process.env.NODE_ENV === "developement"
        ? "http://localhost:3000"
        : "https://www.coderhub.link",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/snippets", snippets);
// Passport
passport.use(
  new LocalStrategy(async (username, password, done) => {
    const query = await connection
      .promise()
      .query(`SELECT * FROM userinfo WHERE username = ?`, [username]);
    // @ts-expect-error
    const user = query[0][0];

    if (!user) {
      return done(null, false, { message: "Incorrect ." });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return done(null, false, { message: "Incorrect password." });
    }

    return done(null, user);
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const query = await connection
      .promise()
      .query(`SELECT * FROM userinfo WHERE id = ?`, [id]);
    const userInfo = query[0][0];
    cb(null, userInfo);
  } catch (err) {
    console.log(err);
  }
});

// Routes

app.post("/api/register", async (req, res) => {
  const { username, password, email } = req.body;

  const queryEmail = await connection
    .promise()
    .query(`SELECT * FROM userinfo WHERE email = ?`, [email]);
  const queryUsername = await connection
    .promise()
    .query(`SELECT * FROM userinfo WHERE username = ?`, [username]);
  if (queryUsername[0][0] !== undefined) {
    return res
      .status(409)
      .json({ message: { mess: "username taken" }, success: false });
  } else if (queryEmail[0][0] !== undefined) {
    return res
      .status(409)
      .json({ message: { mess: "email in use" }, success: false });
  } else {
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({ message: err, success: false });
      }
      await connection
        .promise()
        .query(
          `INSERT INTO userinfo (username, password, email) VALUES (?, ?, ?)`,
          [username, hash, email]
        );

      return res.status(200).json({ message: "Signed up", success: true });
    });
  }
});
app.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.send("success");
});

app.get("/api/user", (req, res) => {
  res.send(req.user);
});

app.post("/api/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    res.send("success");
  });
});

app.listen(8080, () => {
  console.log("Server Started");
});

//openai stuff
const { Configuration, OpenAIApi } = require("openai");
//const express = require('express');
//const cors = require('cors');
const bodyParser = require('body-parser');

//const app = express();
app.use(bodyParser.json());
app.use(cors());

const configuration = new Configuration({
    organization: "org-FbYfkdgdR47t0YlIIUZrYXsy",
    apiKey:  "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",
});
const openai = new OpenAIApi(configuration);

const port = 3080;

app.post('/', async (req, res) => {
    const { message } = req.body;
    console.log(message);
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 4000,
        temperature: 0,
    }); 
    console.log(response.data.choices[0].text);
    res.json({
        data: response.data.choices[0].text,
    })
});

app.listen(port, () => {
    console.log(`Listening to port http://localhost:${port}`) 
});