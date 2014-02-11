chrome.browserAction.onClicked.addListener(function(tab){
  chrome.tabs.create({
     "url": chrome.extension.getURL("options.html")
  });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  var url = localStorage[info.menuItemId];
  url = url.replace('%s',  encodeURIComponent(info.selectionText));
  chrome.tabs.create({url: url});
});


$(function(){
  resetContextMenus();
});