var form = document.getElementById("search-form");
var dropdown = document.getElementById("dropdown");

// book search listener
form.addEventListener("submit", function(e) {
	e.preventDefault();
	$.get("/booksearch?search=" + form.elements["searchValue"].value, function(result) {
		var htmlString = "";
		for(var i = 0; i < result.length; i++) {
			try {
				var imageSrc = result[i].volumeInfo.imageLinks.smallThumbnail
			} catch (error) {
				var imageSrc = "img/placeholder.png";
			}

			htmlString += "<div><img src='" + imageSrc + "'></img> <p>" + result[i].volumeInfo.title + "</p></div>"
			
		}
		dropdown.innerHTML = htmlString;
		addBookListeners();
	})
});

// if user clicks anywhere outside of the form or dropdown menu, close the menu
document.addEventListener("click", function(e) {
	if(!(form.contains(e.target))) {
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
		title: div.getElementsByTagName("p")[0].innerHTML, 
		imageSource: div.getElementsByTagName("img")[0].src 
	},
	function(err, book) {
		console.log(book);
	}
)
}