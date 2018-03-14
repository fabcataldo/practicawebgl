const RGB = require('./rgb')

var hex = Object.create(RGB) // uno hex con rgb

hex.init = function (hexNumber) { // el numero en hexadecimal va a ir al color que corresponda
  hexNumber = Math.floor(hexNumber)
  this.r = (hexNumber >> 16 & 255) / 255
  this.g = (hexNumber >> 8 & 255) / 255
  this.b = (hexNumber & 255) / 255
  this.a = 1
  return this
}

module.exports = hex
