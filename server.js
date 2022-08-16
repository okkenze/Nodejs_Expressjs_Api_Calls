require("dotenv").config();
const express = require("express");
const { post } = require("./routes/externalRoutes");

const postRoutes = require("./routes/externalRoutes");

//express app
const app = express();

//middleware
app.use(express.json());

//routes
app.use("/api/posts", postRoutes);

//listen for requests
app.listen(process.env.PORT, () => {
  console.log("listening on port", process.env.PORT + ".......");
});
