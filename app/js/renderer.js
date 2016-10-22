const $ = require('jquery')

const searchBar = $('#search-input')
let activeView, activeTab, activeTabTitle, activeTabIcon, url

// ===========================
// Utility Functions
// ===========================

// Set intermediate loading title, favicon & url
function loadCommit() {
	activeTabTitle.text(activeView[0].getTitle())
	activeTabIcon.attr('src', "./images/spinner.gif")
	searchBar.val(activeView[0].getURL())
}

// Set final title
function didFinishLoad() {
	activeTabTitle.text(activeView[0].getTitle())
	searchBar.val(activeView[0].getURL())
}

// Set final favicon
function pageFaviconUpdated() {
	// Check if favicons exists else use default favicon
	$.get(e.favicons[0]).done(() => {
		activeTabIcon.attr('src', e.favicons[0])
	}).fail(() => {
		activeTabIcon.attr('src', "./images/default-favicon.png")
	})
}


// ===========================
// Search Bar Function
// ===========================
$('#search-input').keydown((e) => {
	activeView = $('.view.active')
	activeTab = $('.tab.active')
	activeTabTitle = $('.tab.active > .tab-title')
	activeTabIcon = $('.tab.active > .tab-icon')
	url = searchBar.val()

	// URL should be of the form abc.xyz
	const urlTest = /^\w+\.\w+$/
	const urlPrefixTest = /^[a-zA-Z]+:\/\//

	if (e.keyCode == 13) {
		if (urlTest.test(url)) {

			//Add http:// prefix if no prefix is there
			if (!urlPrefixTest.test(url)) {
				url = "http://" + url
			}

			activeView[0].loadURL(url)
			activeView[0].addEventListener("load-commit", loadCommit)
			activeView[0].addEventListener("did-finish-load", didFinishLoad)
			activeView[0].addEventListener("page-favicon-updated", pageFaviconUpdated)
			
		}
	}
})
