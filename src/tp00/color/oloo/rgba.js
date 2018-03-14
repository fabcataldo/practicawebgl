const glMatrix = require('gl-matrix')

var rgba = {
  init: function (r, g, b, a) { // la "clase" (o semiclase) rgba, con parametros r,g,b y a; init es
    this.r = r
    this.g = g
    this.b = b
    this.a = a
  },

  vec4: function (vec4) {
    vec4 = glMatrix.vec4.create()
    vec4[0] = this.r
    vec4[1] = this.g
    vec4[2] = this.b
    vec4[3] = this.a
    return vec4
  },

  vec3: function (vec3) {
    vec3 = glMatrix.vec3.create()
    vec3[0] = this.r
    vec3[1] = this.g
    vec3[2] = this.b
    return vec3
  }
}

module.exports = rgba
