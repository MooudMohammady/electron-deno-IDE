var directoryPath;
var themeObj = {};
var recievedTheme;
var browserTabCount = 0;
var fileTabCount = 0;
var explorerTabCount = 0;
var openedTabs = 0;
var untitledCount = 0;
var editorId;
var filetype = "";
var codestatId;
var currentFileName;
var currentFileAddress;
var editor;
var explorerHidden = false;
var filePath = "null";
var fileSaved;
var selectedTabId;
var characterLength = 0;
var closedTabs = 0;
var widgetsShown = true;
var openedFiles = [];
var savedFiles = [];
var savingAllowed = false;
var fileObj = {};
var times;
var mode = 'txt'

function closeApp() {
  window.API.exit();
}
function minimizeApp() {
  window.API.minimize();
}
function maximizeApp() {
  window.API.maximize();
}
