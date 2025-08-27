const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");

const app = express();

// Connect MongoDB
// ... existing code ...
// Replace with your MongoDB Atlas connection string
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// ... existing code ...

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Session setup
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

// Redirect root to login
app.get("/", (req, res) => res.redirect("/admin/login"));

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
    