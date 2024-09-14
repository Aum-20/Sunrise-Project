const express = require("express"); // Import express
const app = express(); // Create express app
const cors = require("cors");
const path = require("path");
const session = require("express-session");
require("dotenv").config();

// Middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../../Frontend/ejs-pages"));
app.use(express.static(path.join(__dirname, "../../Frontend/CSS")));
app.use(express.static(path.join(__dirname, "../../Frontend/images")));
app.use(express.static(path.join(__dirname, "../../Frontend/JS")));

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
    })
);
// console.log(process.env.SESSION_KEY);
app.use(
    session({
        secret: process.env.SESSION_KEY, // Change this to a secure key
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // Set to `true` if using HTTPS
    })
);

// import routes
const homeRoute = require("./routes/home.routes.js");
const realEstate = require("./routes/realEstate.routes.js");
const adminRoute = require("./routes/admin.routes.js");
const workInProgress = require("./routes/workInProgress.routes.js");

// home routes declaration
app.use("/", homeRoute);
app.use("/realEstate", realEstate);
app.use("/agriculture", workInProgress);
app.use("/drone", workInProgress);
app.use("/global-opportunities", workInProgress);
app.use("/alkine-water", workInProgress);
app.use("/farm-management", workInProgress);
app.use("/workInProgress", workInProgress);
app.use("/admin", adminRoute);

app.use((req, res) => {
    res.status(404).render("workInProgress.ejs");
});

module.exports = app; // Export app
