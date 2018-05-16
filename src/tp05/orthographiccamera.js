const CAMERA = require('./camera')
var glMatrix = require('gl-matrix')
var mat4 = glMatrix.mat4

function OrthographicCamera (left, right, bottom, top, near, far) {
  this.left = left
  this.right = right
  this.bottom = bottom
  this.top = top
  this.near = near
  this.far = far
  this.projectionMatrix = mat4.create()
  mat4.ortho(this.projectionMatrix, this.left, this.right, this.bottom, this.top, this.near, this.far)
  this.viewMatrix = mat4.create()
  CAMERA.call(this, this.projectionMatrix, this.viewMatrix)
  return this
}

OrthographicCamera.prototype.getProjectionMatrix = function () {
  return this.projectionMatrix
}

OrthographicCamera.prototype = Object.create(CAMERA.prototype)

module.exports = OrthographicCamera
