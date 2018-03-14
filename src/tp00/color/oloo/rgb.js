const RGBA = require('./rgba')

var rgb = Object.create(RGBA) // uno rgb con rgba así, estoy utilizando el tipo de herencia OLOO

rgb.init = function (r, g, b) { // los parametros pr,pg,pb son para los colores r,g,b
  if (r != null && g != null && b != null) {
    this.r = r
    this.g = g
    this.b = b
    this.a = 1
  } else {
    this.r = 1
    this.g = 1
    this.b = 1
    this.a = 1
  }
  return this
}

module.exports = rgb
