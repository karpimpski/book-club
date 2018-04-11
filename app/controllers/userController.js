const User = require("../models/user")

exports.update = function(id, body, cb) {
	User.findOneAndUpdate({_id: id}, body, {new: true}, cb)
}

exports.addBook = function(id, book, cb) {
	User.findByIdAndUpdate(id, { $push: { books: book._id } }, cb)
}