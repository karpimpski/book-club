const LocalStrategy = require("passport-local").Strategy,
	  User = require("../app/models/user")

module.exports = function(passport) {
	// serialize/deserialize user in session
	passport.serializeUser(function(user, done) {
		done(null, user.id)
	})

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user)
		})
	})

	// local signup strategy
	passport.use("local-signup", new LocalStrategy({
		usernameField: "email",
		passwordField: "password",
		passReqToCallback: true
	}, function(req, email, password, done) {
		process.nextTick(function() {
			User.findOne({"email": email}, function(err, user) {
				if(err) return done(err)
				if(user) return done(null, false, req.flash("signupMessage", "That email is taken"))
				
				const newUser = new User()
				newUser.email = email
				newUser.password = newUser.generateHash(password)
				newUser.fullName = req.body.fullName;
				newUser.city = req.body.city;
				newUser.state = req.body.state;

				newUser.save(function(err) {
					if(err) throw err;
					return done(null, newUser)
				})
			})
		})
	}))

	// local login strategy
	passport.use("local-login", new LocalStrategy({
		usernameField: "email",
		passwordField: "password",
		passReqToCallback: true
	}, function(req, email, password, done) {
		User.findOne({"email": email}, function(err, user) {
			if(err) return done(err)
			if(!user) return done(null, false, req.flash("loginMessage", "No user found"))
			if(!user.validPassword(password)) return done(null, false, req.flash("loginMessage", "Invalid password"))
			return done(null, user)
		})
	}))
}