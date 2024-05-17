import express from 'express';
import cors from 'cors';
// import mysql from 'mysql';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const PORT = 5000;

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));

app.use(express.json());


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'mydb'
// })

app.get('/', function (req, res) {
  // const { username, password } = req.session;
  console.log("root cookies", req.session.username, req.session.password);
  console.log("root cookies 2", req.cookies.username, req.cookies.password);
  res.end();
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log("login session cookies 1", req.session.username, req.session.password);
  console.log("login cookies 2", req.cookies.username, req.cookies.password);
  if (username === 'admin' && password === '123') {
    console.log("login valid", );
    req.session.username = username;
    req.session.password = password;
    res.cookie('username', username);
    res.cookie('password', password);
    res.json({message: 'Logged in', res: 'success'});
  } else {
    res.json({message: 'Wrong credentials', res: 'error'});
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
