const scene = require('./scene')

var mesh = Object.create(scene)
mesh.Mesh = function (geometry, material) {
  this.geometry = geometry
  this.material = material // color del mesh
  this.vertexArrayObject = []
  this.indexArrayObject = []
  return this
}

mesh.setMeshEjes = function () {
  var vertexArray = []
  var indexArray = []
  for (var i = 0; i < this.geometry.vertices.length; i++) {
    for (var j = 0; j < 3; j++) {
      vertexArray.push(this.geometry.vertices[i][j])
    }
  }
  indexArray.push(0, 1)
  this.vertexArrayObject = new Float32Array(vertexArray)
  this.indexArrayObject = new Uint16Array(indexArray)

  return this
}

mesh.setMeshGrid = function () {
  var vertexArray = []
  var indexArray = []
  for (var i = 0; i < this.geometry.vertices.length; i++) {
    for (var j = 0; j < 3; j++) {
      vertexArray.push(this.geometry.vertices[i][j])
    }
  }
  for (var p = 0; p < this.geometry.vertices.length; p += 2) {
    indexArray.push(p, p + 1)
  }
  this.vertexArrayObject = new Float32Array(vertexArray)
  this.indexArrayObject = new Uint16Array(indexArray)

  return this
}
module.exports = mesh
