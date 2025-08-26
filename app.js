const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");

const app = express();

// ✅ Use MongoDB Atlas instead of localhost
const MONGODB_URI = process.env.MONGODB_URI || "your-mongodb-uri-here";

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("✅ Connected to MongoDB"));

// ✅ Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ✅ Session setup
app.use(session({
    secret: "secretkey123",
    resave: false,
    saveUninitialized: true
}));

// ✅ Routes
const adminRoutes = require("./routes/admin");
const customerRoutes = require("./routes/customer");

app.use("/admin", adminRoutes);
app.use("/customer", customerRoutes);

// ✅ Redirect root to login
app.get("/", (req, res) => res.redirect("/admin/login"));

// ✅ IMPORTANT: Do NOT use app.listen on Vercel
module.exports = app;
