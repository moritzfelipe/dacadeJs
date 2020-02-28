const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

const backgroundImg = new Image()
backgroundImg.src = "images/background.png"

window.onload = function() {
  context.drawImage(backgroundImg, 0, 0)
}
