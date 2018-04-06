const mesh = require('./mesh')

var geometry = Object.create(mesh)

// para 2D, pongo faces = 1 ya que voy a ver la figura de frente
geometry.Geometry = function (vertices, faces = 0) {
  this.vertices = vertices // tooodos los vertices del poligono
  this.faces = faces // arreglo de caras del poligono
  return this
}

module.exports = geometry
