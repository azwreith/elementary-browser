var previousSelection = "setting";

function setDefaults() {
	detectTheme();
	detectAdvert();
	detectSearch();
	document.getElementById(previousSelection).style.display = "block";
	document.getElementById(previousSelection + "Tab").style.color = "#333";
}

function detectTheme() {
	var currTheme = "light"; //TODO: Fixes & Default Values
	document.getElementById('theme').value = currTheme;
}

function detectAdvert() {
	var e = document.getElementById("ad");
	var isTurnedOn = true;
	if (isTurnedOn) {
		e.innerHTML = "On";
		e.style.background = "#6F6FFF";
		e.style.color = "#F4F4F4";
		e.style.border = "none";
	} else {
		e.innerHTML = "Off";
		e.style.background = "#FFF";
		e.style.color = "#333";
		e.style.border = "1px solid #999";
	}
}

function detectSearch() {
	var search = "duckduckgo";
	document.getElementById("search").value = search;
}

function setVisible(e) {
	var selected = e.id.replace("Tab", "");
	document.getElementById(previousSelection).style.display = "none";
	document.getElementById(previousSelection + "Tab").style.color = "#999";
	document.getElementById(selected).style.display = "block";
	document.getElementById(selected + "Tab").style.color = "#333";
	previousSelection = selected;
}

function toggleAdvert(e) {
	console.log(e.innerHTML);
	if (e.innerHTML == "On") {
		e.innerHTML = "Off";
		e.style.background = "#FFF";
		e.style.color = "#333";
		e.style.border = "1px solid #999";
	} else {
		e.innerHTML = "On";
		e.style.background = "#6F6FFF";
		e.style.color = "#F4F4F4";
		e.style.border = "none";
	}
}

function changeTheme(e) {
	// body...
}

function searchProvider(e) {
	// body...
}
