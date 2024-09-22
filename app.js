const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

 

const app = express();
const port = 3012;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");  // EJS as the template engine
app.use(express.static(path.join(__dirname, "public")));

// Routes
const healthRoutes = require("./routes/index");
app.use("/", healthRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



