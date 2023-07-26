var editor = ace.edit("editor");
editor.setTheme("ace/theme/chaos");
editor.session.setMode("ace/mode/javascript");

const createNewFile = () => {
  editor.setValue("");
  $("#editor").css("display", "block");
  $(".explorerContainer").css("display", "block");
};

$("#resizableExplorer").resizable({
  maxHeight: 200,
  minWidth: 2,
  minHeight: 200,
  handles: "e",
});
