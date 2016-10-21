const $ = require('jquery')

// Search Bar Function
$('#search-input').keydown((e) => {
	let searchBar = $('#search-input')
	let activeView = $('.view.active')
	let activeTab = $('.tab.active')
	let activeTabTitle = $('.tab.active > .tab-title')
	let activeTabIcon = $('.tab.active > .tab-icon')
	let url = searchBar.val()

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

			// Set intermediate loading title, favicon & url
			activeView[0].addEventListener("load-commit", (e) => {
				activeTabTitle.text(activeView[0].getTitle())
				activeTabIcon.attr('src', "./images/spinner.gif")
				searchBar.val(activeView[0].getURL())
			})

			// Set final title
			activeView[0].addEventListener("did-finish-load", (e) => {
				activeTabTitle.text(activeView[0].getTitle())
				searchBar.val(activeView[0].getURL())
			})

			// Set final favicon
			activeView[0].addEventListener("page-favicon-updated", (e) => {
				// Check if favicons exists
				$.get(e.favicons[0]).done(() => {
					activeTabIcon.attr('src', e.favicons[0])
						// Else use default favicon
				}).fail(() => {
					activeTabIcon.attr('src', "./images/default-favicon.png")
				})
			})

		}
	}
})
