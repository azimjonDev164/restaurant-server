const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConnect");

dotenv.config({ quiet: true });
const PORT = process.env.PORT || 3000;

const app = express();
connectDB();

app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));
app.use("/user", require("./routes/user"));

app.all(/\/*/, (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

mongoose.connection.once("open", async () => {
  console.log("✅ MongoDB connected");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
