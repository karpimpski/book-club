const User = require("../models/user"),
	  Book = require("../models/book")

exports.update = function(id, body, cb) {
	User.findOneAndUpdate({_id: id}, body, {new: true}, cb)
}

exports.addBook = function(id, book, cb) {
	User.findByIdAndUpdate(id, { $push: { books: book._id } }, cb)
}

exports.getBooks = function(id, cb) {
	let result = []

	User.findById(id, function(err, user) {
		for(let i = 0; i < user.books.length; i++) {
			Book.findById(user.books[i], function(err, book) {
				if(err) throw err
				result.push(book)
				if(result.length == user.books.length) cb(err, result)
			})
		}
	})
}