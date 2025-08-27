const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");

const app = express();

// Connect MongoDB - use environment variable
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/priceListDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET || "secretkey123",
    resave: false,
    saveUninitialized: true
}));

// Routes
const adminRoutes = require("../routes/admin");
const customerRoutes = require("../routes/customer");

app.use("/admin", adminRoutes);
app.use("/customer", customerRoutes);

// Redirect root to login
app.get("/", (req, res) => res.redirect("/admin/login"));

// Export the app instead of listening to a port
module.exports = app;