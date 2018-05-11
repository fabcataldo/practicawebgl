const scene = require('./scene')

var mesh = Object.create(scene)
mesh.Mesh = function (geometry, material) {
  this.geometry = geometry
  this.material = material // color del mesh
  this.vertexArrayObject = []
  this.indexArrayObject = []
  return this
}

module.exports = mesh
