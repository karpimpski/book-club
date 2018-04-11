const mongoose = require("mongoose"),
	  Schema = mongoose.Schema

const bookSchema = Schema({
	_ownerId: { type: Schema.Types.ObjectId, ref: "User" },
	title: String,
	imageSource: String	
})

module.exports = mongoose.model("Book", bookSchema)