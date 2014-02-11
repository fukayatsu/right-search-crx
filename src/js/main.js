var is = function(type, obj) {
  var clas = Object.prototype.toString.call(obj).slice(8, -1);
  return obj !== undefined && obj !== null && clas === type;
}

var createContextMenus = function(setting, parentId) {
  for (key in setting) {
    var id    = ( parentId || 'root' ) + ':' + key;
    var value = setting[key];
    var menu  = { "title": key, "id": id, "contexts": ["selection"] };
    if (parent != null) { menu.parentId = parentId }

    chrome.contextMenus.create(menu);
    if (is('Object', value)) {
      createContextMenus(value, id);
    } else if (is('String', value)) {
      localStorage[id] = value;
    }
  }
}

var resetContextMenus = function() {
  var setting = localStorage['setting'];
  if (setting == null) { return; }
  setting = JSON.parse(setting);
  chrome.contextMenus.removeAll();
  createContextMenus(setting);
}