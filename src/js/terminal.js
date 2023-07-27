// استفاده از IPC از طریق متغیری به نام electron
// const { sendCommand, receiveOutput } = window.electron;

// ارسال دستور به فرآیند اصلی و دریافت خروجی

async function executeCommand() {
  const input = document.getElementById("terminal").value.split("\n").pop();
  window.API.sendCommand(input);
}

// نمایش خروجی در textarea
window.API.receiveOutput((output) => {
  // document.getElementById("terminal").value += output + "\n";
  document.getElementById("terminal").value += output;
  document.getElementById("terminal").scrollTop = document.getElementById("terminal").scrollHeight;
});

function scrollToBottom(t) {
  t.selectionStart = t.selectionEnd = t.value.length;
  t.blur();
  t.focus();
  // t.blur() // uncomment if you don't want a final focus
}
// document.getElementById("terminal").addEventListener("click", (event) => {
//   scrollToBottom(document.getElementById("terminal"));
// });
// گرفتن رویداد کلید Enter برای اجرای دستور
document.getElementById("terminal").addEventListener("keydown", (event) => {
  event.preventDefault()
  if (event.key === "Enter") {
    executeCommand();
    scrollToBottom(event.target);
  }
  else if(event.key === "Backspace" && event.target.value.slice(-1) !== ">"){
    if (event.target.value.length > 0) {
      // با استفاده از slice() آخرین کاراکتر را حذف کنید
      event.target.value = event.target.value.slice(0, -1);
    }
  }
  else if(event.key !== "Alt" && event.key !== "Shift" && event.key !== "Control" && event.key !== "Backspace"){
    event.target.value += event.key 
  }
});
