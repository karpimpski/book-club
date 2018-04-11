const userController = require("./controllers/userController"),
	  request = require("request")

module.exports = function(app, passport) {
	app.get("/", function(req, res) {
		res.render("index.ejs", {user: req.user})
	})

	app.get("/login", function(req, res) {
		res.render("login.ejs", { message: req.flash("loginMessage"), user: req.user })
	})

	app.get("/signup", function(req, res) {
		res.render("signup.ejs", { message: req.flash("signupMessage"), user: req.user })
	})

	app.get("/profile", isLoggedIn, function(req, res) {
		res.render("profile.ejs", { user: req.user })
	})

	app.get("/logout", function(req, res) {
		req.logout()
		res.redirect("/")
	})

	app.get("/booksearch", function(req, res) {
		// using the public Google Books API
		let url = "https://www.googleapis.com/books/v1/volumes?q=intitle+" + req.query.search
		request(url, {json: true}, (err, response, body) => {
			if(err) throw err
			console.log(url)
			res.send(body.items)
		})
		console.log(url)
	})

	app.post("/signup", passport.authenticate("local-signup", {
		successRedirect: "/profile",
		failureRedirect: "/signup",
		failureFlash: true
	}))

	app.post("/login", passport.authenticate("local-login", {
		successRedirect: "/profile",
		failureRedirect: "/login",
		failureFlash: true
	}))

	app.post("/update-user", function(req, res) {
		userController.update(req.user._id, req.body, function(err, user) {
			if(err) res.send(err);
			res.redirect("/profile")
		})
	})

	function isLoggedIn(req, res, next) {
		if(req.isAuthenticated()) return next()
		res.redirect("/")
	}
}