const express = require("express"); //framework to create endpoints
const mongoose = require("mongoose");//lybrary to connect to the database
const Post = require("./models");
const app = express();
const data = require("./posts");
const PORT = process.env.PORT || 5000;

app.use(express.json());
//local memory to contain posts for testing purposes this will be replaced by the database
// this is not a good practice to use local memory for storing data in production
let posts = []

app.get("/", (req, res) => {
  res.send("Hello World!");
})

app.get("/posts", (req, res) => {
  //this is going to merge the posts from the local memory and the ficif data
  const data_posts = [...posts, ...data];
  //when calling this endpoint it will return the posts from the local memory and the fictif data
  res.send(data_posts);
});

app.post("/posts/create", async (req, res) => {
  try {
    const post = new Post(req.body);
    post.save();
    res.send("new post successfully added");
  } catch (e) {
    console.log(e);
    res.send(e);
  }

});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
  mongoose.connect("mongodb://127.0.0.1:27017/database").then(() => {
    console.log("successfully connected to the database");
  });
});
