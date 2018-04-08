const express = require("express"),
	  app = express(),
	  port = process.env.PORT || 3000,
	  mongoose = require("mongoose"),
	  passport = require("passport"),
	  flash = require("connect-flash"),
	  morgan = require("morgan"),
	  cookieParser = require("cookie-parser"),
	  bodyParser = require("body-parser"),
	  session = require("express-session"),
	  db = require("./config/database")

mongoose.connect(db.url)
require('./config/passport')(passport)

// MIDDLEWARE SETUP
app.use(morgan("dev"))
app.use(cookieParser())
app.use(bodyParser())

// passport middleware
app.use(session({ secret: "aewutatalwutabAGElsglaA215ajgaA" }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.set("view engine", "ejs")

require("./app/routes.js")(app, passport)

app.listen(port)
console.log("Server listening on port " + port)