const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");

const app = express();

// ✅ MongoDB Atlas URI
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(session({
    secret: "secretkey123",
    resave: false,
    saveUninitialized: true
}));

const adminRoutes = require("./routes/admin");
const customerRoutes = require("./routes/customer");

app.use("/admin", adminRoutes);
app.use("/customer", customerRoutes);

// Default route
app.get("/", (req, res) => res.redirect("/admin/login"));

// ✅ Export for Vercel
module.exports = app;
