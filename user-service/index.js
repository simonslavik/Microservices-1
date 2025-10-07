const express = require("express");
const mongoose = require("mongoose");

const app = express()

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Failed to connect to MongoDB", err);
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).send("Name and email are required");
  } 
  const user = new User({ name, email });
  await user.save();
  res.status(201).send(user);
    
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  if (users) {
    res.send(users);
  } else {
    res.status(404).send("No users found");
  }
});


app.get("/", (req, res) => {
  res.send("User Service is up and running!");
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
