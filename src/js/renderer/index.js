const exitBtn = document.getElementById("exit"),
  minimizeBtn = document.getElementById('minimize'),
  maximizeBtn = document.getElementById('maximize')

exitBtn.addEventListener('click',()=>{
  window.API.exit()
})
minimizeBtn.addEventListener('click',()=>{
  window.API.minimize()
})
maximizeBtn.addEventListener('click',()=>{
  window.API.maximize()
})