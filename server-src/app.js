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
const connection = mysql.createConnection({
  host: "localhost",
  user: "harik",
  password: "Hagk2003",
  port: "3306",
  database: "planr",
});

// Middleware
const app = express();
app.use(express.json());
app.use(
  cors({
    allowedHeaders: ["Content-Type", "Authorization"],
    origin:"http://localhost:3000",
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
  res.json({ message: "success" });
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
    apiKey:  "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",
});
const openai = new OpenAIApi(configuration);

const port = 3080;

app.post('/api/prompt', async (req, res) => {
  const message = req.body.message;

  try {
    const response = await openai.createCompletion({
      model: "gpt-3.5-turbo-instruct", // Update to a current model
      prompt: message,
      max_tokens: 100,
      temperature: 0,
    });

    // Make sure to check the structure of the response object in the documentation
    if (response && response.data && response.data.choices && response.data.choices.length > 0) {
      console.log(response.data.choices[0].text);
      res.json({
        data: response.data.choices[0].text,
      });
    } else {
      res.status(500).json({ error: 'No completion found or an unexpected response structure.' });
    }
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).json({ error: 'Error calling OpenAI API' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
const completion = openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  message: "Hi",
});

console.log(completion.data);