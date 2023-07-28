var term = new Terminal({
  rows:10
});
term.open(document.getElementById("terminal"));
$(".xterm-viewport").css({"background-color":"#202327"})
// term.write("Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ");
term.onData((data)=>{
  window.API.sendCommand(data)
})

window.API.receiveOutput((output)=>{
  term.write(output)
})