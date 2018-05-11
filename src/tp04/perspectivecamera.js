const CAMERA = require('./camera')
var glMatrix = require('gl-matrix')
var mat4 = glMatrix.mat4

function PerspectiveCamera (fovy, aspect, near, far) {
  this.fovy = fovy
  this.aspect = aspect
  this.near = near
  this.far = far
  this.projectionMatrix = mat4.create()
  mat4.perspective(this.projectionMatrix, fovy, aspect, near, far)
  this.viewMatrix = mat4.create()
  CAMERA.call(this, this.viewMatrix, this.projectionMatrix)
  return this
}

PerspectiveCamera.prototype.getProjectionMatrix = function () {
  return this.projectionMatrix
}

PerspectiveCamera.prototype = Object.create(CAMERA.prototype)
module.exports = PerspectiveCamera
