// h componente hue para el color, s componente saturation para el color, l componente luminosity para el color
// fuente: https://github.com/mrdoob/three.js/tree/master/src/math
// https://github.com/mrdoob/three.js/blob/master/src/math/Color.js
const RGBA = require('./rgba')

var hsl = Object.create(RGBA) // creo la union de hsl con rgba

hsl.init = function (h, s, l) { // parametros ph,ps,pl
  // componentes hue,saturation,luminosity para cada combinación de rgba, y así conseguir un color
  this.r = 1
  this.g = 1
  this.b = 1
  this.a = 1
  function euclideanModulo (n, m) {
    return ((n % m) + m) % m
  }
  function clamp (value, min, max) {
    return Math.max(min, Math.min(max, value))
  }
  function hsl2rgb (p, q, t) {
    if (t < 0) {
      t += 1
    }
    if (t > 1) {
      t -= 1
    }
    if (t < 1 / 6) {
      return p + (q - p) * 6 * t
    }
    if (t < 1 / 2) {
      return q
    }
    if (t < 2 / 3) {
      return p + (q - p) * (2 / 3 - t) * 6
    }
    return p
  }
  // rango de h,s,l: 0.0 - 1.0
  h = euclideanModulo(h, 1)
  s = clamp(s, 0, 1)
  l = clamp(l, 0, 1)

  if (s === 0) {
    this.r = this.g = this.b = l
    return this
  } else {
    var p = l <= 0.5 ? l * (1 + s) : l + s - (l * s)
    var q = (2 * l) - p

    this.r = hsl2rgb(q, p, h + 1 / 3)
    this.g = hsl2rgb(q, p, h)
    this.b = hsl2rgb(q, p, h - 1 / 3)
  }
  return this
}

module.exports = hsl
