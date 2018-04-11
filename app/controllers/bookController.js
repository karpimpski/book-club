const Book = require("../models/book"),
	  userController = require("./userController")

exports.create = function(ownerId, title, imageSource, cb) {
	Book.findOne({ title: title }, function(err, book) {
		if(book) {
			console.log(title + " is taken")
			cb(err, null)
		}
		else {
			Book.create({_ownerId: ownerId, title: title, imageSource: imageSource}, function(err, book) {
				console.log("Created book: " + book)
				userController.addBook(ownerId, book, function() {
					cb(err, book)
				})
			})
		}
	})
}