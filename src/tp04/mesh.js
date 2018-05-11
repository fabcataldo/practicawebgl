const scene = require('./scene')
const glMatrix = require('gl-matrix')
const mat4 = glMatrix.mat4

var mesh = Object.create(scene)
mesh.Mesh = function (geometry, material) {
  this.geometry = geometry
  this.material = material
  this.vertexArrayObject = []
  this.indexArrayObject = []
  this.modelMatrix = []
  this.normalMatrix = []
  this.trasladar = [0, 0, 0]
  this.rotar = [0, 0, 0]
  this.escalar = [1, 1, 1]
  this.trasladarMesh = function () {
    mat4.translate(this.modelMatrix, this.modelMatrix, [this.trasladar[0],
      this.trasladar[1], this.trasladar[2]])
  }
  this.rotarMesh = function () {
    mat4.rotateX(this.modelMatrix, this.modelMatrix, this.rotar[0])
    mat4.rotateY(this.modelMatrix, this.modelMatrix, this.rotar[1])
    mat4.rotateZ(this.modelMatrix, this.modelMatrix, this.rotar[2])
  }
  this.escalarMesh = function () {
    mat4.scale(this.modelMatrix, this.modelMatrix, this.escalar)
  }

  return this
}

module.exports = mesh
