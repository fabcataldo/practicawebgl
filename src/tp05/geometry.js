const mesh = require('./mesh')

var geometry = Object.create(mesh)

geometry.Geometry = function (vertices, faces, normals) {
  this.vertices = vertices // tooodos los vertices del poligono
  this.faces = faces // arreglo de caras del poligono
  this.normals = normals // normales de cada vertice
  this.textbuffobj = []
  return this
}

module.exports = geometry
