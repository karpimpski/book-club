var form = document.getElementById("signup-form");

form.addEventListener("submit", function(e) {
	if(form.elements["password"].value != form.elements["confirm-password"].value) {
		e.preventDefault();
		document.getElementById("auth-message").innerHTML = "Passwords do not match";
	}
});