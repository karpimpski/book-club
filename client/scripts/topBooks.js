var input = document.getElementById("search-input");
var dropdown = document.getElementById("dropdown");

// book search listener
var timer;
input.addEventListener("keyup", function(e) {
	window.clearTimeout(timer);
	timer = window.setTimeout(function() { searchBook(input.value) }, 1000);
})

function searchBook(bookTitle) {
	$.get("/booksearch?search=" + bookTitle, function(result) {
		var htmlString = "";
		for(var i = 0; i < result.length; i++) {
			try {
				var imageSrc = result[i].volumeInfo.imageLinks.smallThumbnail
			} catch (error) {
				var imageSrc = "img/placeholder.png";
			}

			htmlString += "<div><span>" + result[i].volumeInfo.title + "</span><img src='" + imageSrc + "'></img> </div>"
			
		}
		dropdown.innerHTML = htmlString;
		addBookListeners();
	})
}

// if user clicks anywhere outside of the form or dropdown menu, close the menu
document.addEventListener("click", function(e) {
	if(!(e.target == input || e.target == dropdown || dropdown.contains(e.target))) {
		dropdown.innerHTML = "";
	}
});

function addBookListeners() {
	var bookDivs = dropdown.getElementsByTagName("div");
	for(var i = 0; i < bookDivs.length; i++) {
		var bookDiv = bookDivs[i];

		bookDiv.addEventListener("click", bookClick)
	}
}

function bookClick(e) {
	if(e.target.tagName != "DIV") {
		var div = e.target.parentElement;
	}
	else {
		var div = e.target;
	}

	$.post("/add-book", 
	{
		title: div.getElementsByTagName("span")[0].innerHTML, 
		imageSource: div.getElementsByTagName("img")[0].src 
	},
	function(err, book) {
		console.log(book);
	}
)
}