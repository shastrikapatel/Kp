const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");

const app = express();

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/priceListDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(session({
    secret: "secretkey123",
    resave: false,
    saveUninitialized: true
}));

// Routes
const adminRoutes = require("./routes/admin");
const customerRoutes = require("./routes/customer");

app.use("/admin", adminRoutes);
app.use("/customer", customerRoutes);

app.get("/", (req, res) => res.redirect("/admin/login"));

module.exports = app; // ✅ Required for Vercel
