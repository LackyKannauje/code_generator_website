const {handleCodeReqRes} = require("./controllers/code");
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/code", (req, res) => {
  res.render("home");
});

app.post("/code",handleCodeReqRes);

app.listen(PORT, () => console.log("Server Started!!"));
