var form = document.getElementById("search-form");
var dropdown = document.getElementById("dropdown");

form.addEventListener("submit", function(e) {
	e.preventDefault();
	get("/booksearch?search=" + form.elements["searchValue"].value, function(resultString) {
		var result = JSON.parse(resultString);
		var htmlString = "";
		for(var i = 0; i < result.length; i++) {
			try {
				var imageSrc = result[i].volumeInfo.imageLinks.smallThumbnail
			} catch (error) {
				var imageSrc = "";
			}

			htmlString += "<div><img src='" + imageSrc + "'></img> <p>" + result[i].volumeInfo.title + "</p></div>"
		}
		dropdown.innerHTML = htmlString;
	})
});

// if user clicks anywhere outside of the form or dropdown menu, close the menu
document.addEventListener("click", function(e) {
	if(!(form.contains(e.target))) {
		dropdown.innerHTML = "";
	}
});

function get(theUrl, callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() { 
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			callback(xmlHttp.responseText);
		}
	}
	xmlHttp.open("GET", theUrl, true); // true for asynchronous 
	xmlHttp.send(null);
}