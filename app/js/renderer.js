const $ = require('jquery')

const searchBar = $('#search-input')

let activeView = $('.view.active'),
	activeTab = $('.tab.active'),
	activeTabTitle = $('.tab.active > .tab-title'),
	activeTabIcon = $('.tab.active > .tab-icon'),
	url

// Temporary for default html tab
addWebViewListner()

// ===========================
// Search Bar Function
// ===========================
$('#search-input').keydown((e) => {
	// URL should be of the form abc.xyz
	const urlTest = /^\w+\.\w+$/
	const urlPrefixTest = /^[a-zA-Z]+:\/\//

	url = searchBar.val()

	if (e.keyCode == 13) {

		//If it's a url load it
		if (urlTest.test(url)) {
			//Add http:// prefix if no prefix is there
			if (!urlPrefixTest.test(url)) {
				url = 'http://' + url
			}
		} else {
			// Else google it for now
			url = 'https://www.google.com/search?q=' + url
		}

		activeView[0].loadURL(url)

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
		<img class="tab-icon" src="./images/default-favicon.png"/> \
		<div class="tab-title">New Tab</div> \
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
// Settings Button Function
// ===========================
$('#settings-button').click(() => {
	// Make unactive the currently active tab and view
	activeView.removeClass('active')
	activeTab.removeClass('active')

	// Create a tab
	$('<li class="tab"> \
		<img class="tab-icon" src="./images/settings-favicon.png"/> \
		<div class="tab-title">Settings</div> \
		<i class="fa fa-times tab-close-button" title="Close Tab"></i> \
	</li>').appendTo($('#tabs'))
	$('.tab:last').addClass('active')

	// Show New Tab page
	$('<webview class="view" src="./settings.html"></webview>').appendTo($('#views'))
	$('.view:last').addClass('active')

	// Set actives and add listner events
	activeView = $('.view.active')
	activeTab = $('.tab.active')
	activeTabTitle = $('.tab.active > .tab-title')
	activeTabIcon = $('.tab.active > .tab-icon')
	addWebViewListner()

})

// ===========================
// Close Button Function
// ===========================
$(document).on('click', '.tab-close-button', (e) => {
	console.log("Fired")
	// Get target tab
	let targetTab = $(e.target).parent()
	// Get tab index
	let targetTabIndex = targetTab.index()
	// Use the index to get target view
	let targetView = $(`.view:eq(${targetTabIndex})`)

	// DESTROY!
	targetTab.remove()
	targetView.remove()

	// Set last tab and view as active
	$('.view:last').addClass('active')
	$('.tab:last').addClass('active')
	activeView = $('.view.active')
	activeTab = $('.tab.active')
	activeTabTitle = $('.tab.active > .tab-title')
	activeTabIcon = $('.tab.active > .tab-icon')
	searchBar.val(activeView[0].getURL())

	// Stop propogation to parent
	return false
})

// ===========================
// Switch Tab Function
// ===========================
$(document).on('click', '#tabs .tab', (e) => {
	console.log("Switch")
	// Get target tab
	let targetTab = $(e.target)
	// Get tab index
	let targetTabIndex = targetTab.index()
	// Use the index to get target view
	let targetView = $(`.view:eq(${targetTabIndex})`)

	// Switch the tabs
	activeView.removeClass('active')
	activeTab.removeClass('active')
	targetView.addClass('active')
	targetTab.addClass('active')
	// Set new actives
	activeView = targetView
	activeTab = targetTab
	activeTabTitle = $('.tab.active > .tab-title')
	activeTabIcon = $('.tab.active > .tab-icon')
	searchBar.val(activeView[0].getURL())

})

// ===========================
// Back, Forward, Reload, Home, Bookmark Button Functions
// ===========================
$('#back-button').click(() => {
	activeView[0].goBack()
})

$('#forward-button').click(() => {
	activeView[0].goForward()
})

$('#reload-button').click(() => {
	activeView[0].reload()
})

$('#home-button').click(() => {
	activeView[0].loadURL(`file://${__dirname}/new-tab.html`)
})

$('#bookmarks-button').click(() => {
	activeView[0].loadURL(`file://${__dirname}/bookmarks.html`)
})

// ===========================
// Utility Functions
// ===========================

//Add WebView Listeners
function addWebViewListner() {

	// Set intermediate loading favicon & url
	activeView[0].addEventListener('load-commit', () => {
		// If not local url
		if (!/^file:\/\//.test(activeView[0].getURL())) {
			activeTabIcon.attr('src', './images/spinner.gif')
			searchBar.val(activeView[0].getURL())
		}
	})

	// Set title whenever it's updated
	activeView[0].addEventListener('page-title-updated', () => {
		activeTabTitle.text(activeView[0].getTitle())
	})

	// Set final favicon
	activeView[0].addEventListener('page-favicon-updated', (e) => {
		// Check if favicons exists else use default favicon
		$.get(e.favicons[0]).done(() => {
			activeTabIcon.attr('src', e.favicons[0])
		}).fail(() => {
			activeTabIcon.attr('src', './images/default-favicon.png')
		})
	})

	// Set final url
	activeView[0].addEventListener('did-finish-load', () => {
		searchBar.val(activeView[0].getURL())

		// If new tab, empty search bar and set default favicon
		if (/^file:\/\/.*new-tab/.test(activeView[0].getURL())) {
			searchBar.val('')
			activeTabIcon.attr('src', './images/default-favicon.png')
		}

		// If settings page, empty search bar and set settings favicon
		else if (/^file:\/\/.*settings/.test(activeView[0].getURL())) {
			searchBar.val('')
			activeTabIcon.attr('src', './images/settings-favicon.png')
		}

	})

}
