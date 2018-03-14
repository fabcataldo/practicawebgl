// fuente: https://github.com/mrdoob/three.js/blob/master/src/math/Color.js
const HEX = require('./hex')

var style = Object.create(HEX) // uno style con hex, ya que style es "subclase" de hex

style.init = function (styleString) { // "constructor"
  // '#00ff00' verde en hexa, #ff0000 rojo, #ffffff blanco, #000000 negro, #0000ff azul, #0ff celeste
  this.r = 1
  this.g = 1
  this.b = 1
  this.a = 1
  var hex = styleString.substring(1, styleString.size) // no tomo el numeral, tomo el número solo
  var size = hex.length

  if (size === 3) {
    // #ff0 por ejemplo
    this.r = parseInt(hex.charAt(0) + hex.charAt(0), 16) / 255
    this.g = parseInt(hex.charAt(1) + hex.charAt(1), 16) / 255
    this.b = parseInt(hex.charAt(2) + hex.charAt(2), 16) / 255
    return this
  } else if (size === 6) {
    // #ff0000 por ejemplo
    this.r = parseInt(hex.charAt(0) + hex.charAt(1), 16) / 255
    this.g = parseInt(hex.charAt(2) + hex.charAt(3), 16) / 255
    this.b = parseInt(hex.charAt(4) + hex.charAt(5), 16) / 255
    return this
  }
  return this
}

module.exports = style
