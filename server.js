const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const cors = require("cors");
const port = 5000;
connectDB();
const app = express();

//Authorisation CORS

app.use(
  cors({
    origin: "https://socialy-frontend.vercel.app/",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/start", require("./routes/post.routes"));
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
