const $ = require('jquery')

const searchBar = $('#search-input')

let activeView = $('.view.active'),
	activeTab = $('.tab.active'),
	activeTabTitle = $('.tab.active > .tab-title'),
	activeTabIcon = $('.tab.active > .tab-icon'),
	url

// ===========================
// Search Bar Function
// ===========================
$('#search-input').keydown((e) => {
	// URL should be of the form abc.xyz
	const urlTest = /^\w+\.\w+$/
	const urlPrefixTest = /^[a-zA-Z]+:\/\//


	url = searchBar.val()

	if (e.keyCode == 13) {
		if (urlTest.test(url)) {
			//Add http:// prefix if no prefix is there
			if (!urlPrefixTest.test(url)) {
				url = "http://" + url
			}
			activeView[0].loadURL(url)
		}
	}
})

// ===========================
// New Tab Function
// ===========================
$('#add-tab-button').click(() => {
	// Make unactive the currently active tab and view
	activeView.removeClass('active')
	activeTab.removeClass('active')

	// Create a tab
	$('<li class="tab"> \
		<img class="tab-icon" src="./images/default-favicon.png"/>New Tab \
		<i class="fa fa-times tab-close-button" title="Close Tab"></i> \
	</li>').appendTo($('#tabs'))
	$('.tab:last').addClass('active')

	// Show New Tab page
	$('<webview class="view" src="./new-tab.html"></webview>').appendTo($('#views'))
	$('.view:last').addClass('active')

	// Set actives and add listner events
	activeView = $('.view.active')
	activeTab = $('.tab.active')
	activeTabTitle = $('.tab.active > .tab-title')
	activeTabIcon = $('.tab.active > .tab-icon')
	addWebViewListner()

})

// ===========================
// Utility Functions
// ===========================

//Add WebView Listeners
function addWebViewListner() {

	// Set intermediate loading title, favicon & url
	activeView[0].addEventListener("load-commit", () => {
		activeTabTitle.text(activeView[0].getTitle())
		activeTabIcon.attr('src', "./images/spinner.gif")
		searchBar.val(activeView[0].getURL())
	})

	// Set final favicon
	activeView[0].addEventListener("page-favicon-updated", () => {
		// Check if favicons exists else use default favicon
		$.get(e.favicons[0]).done(() => {
			activeTabIcon.attr('src', e.favicons[0])
		}).fail(() => {
			activeTabIcon.attr('src', "./images/default-favicon.png")
		})
	})

	// Set final title & url
	activeView[0].addEventListener("did-finish-load", () => {
		activeTabTitle.text(activeView[0].getTitle())
		searchBar.val(activeView[0].getURL())
	})

}
