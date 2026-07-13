require('dotenv').config()

const express = require('express');
const app = express();

app.use(express.json());

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(helmet());

app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(() => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});