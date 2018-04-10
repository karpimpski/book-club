const mongoose = require("mongoose"),
	  bcrypt = require("bcrypt-nodejs")

const userSchema = mongoose.Schema({
	email: String,
	password: String,
	fullName: String,
	city: String,
	state: String
})

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model("User", userSchema)