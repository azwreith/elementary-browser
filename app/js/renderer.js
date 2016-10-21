const $ = require('jquery')

$('#search-input').keydown((e) => {
  if(e.keyCode ==13) {
    let url = $('#search-input').val()
    let activeView = $('.view.active')
    let activeTab = $('.tab.active')
    let activeTabTitle = $('.tab.active > .tab-title')
    let activeTabIcon = $('.tab.active > .tab-icon')

    activeView[0].loadURL(url)

    // Set intermediate loading title & favicon
    activeView[0].addEventListener("load-commit", (e) => {
      activeTabTitle.text(activeView[0].getTitle())
      activeTabIcon.attr('src', "./images/spinner.gif")
    })

    // Set final title
    activeView[0].addEventListener("did-finish-load", (e) => {
      activeTabTitle.text(activeView[0].getTitle())
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
})
