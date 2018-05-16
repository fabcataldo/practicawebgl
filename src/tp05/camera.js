function Camera (viewMatrix, projectionMatrix) {
  this.viewMatrix = viewMatrix
  this.projectionMatrix = projectionMatrix
  this.eyeX = 5
  this.eyeY = 5
  this.eyeZ = 5
  this.centerX = 0
  this.centerY = 0
  this.centerZ = 0
  this.upX = 0
  this.upY = 1
  this.upZ = 0
  return this
}

Camera.prototype.getViewMatrix = function () {
  return this.viewMatrix
}

Camera.prototype.getProjectionMatrix = function () {
  return this.projectionMatrix
}

Camera.prototype.getEyeVector = function(){
  return [this.eyeX, this.eyeY, this.eyeZ]
}

module.exports = Camera
