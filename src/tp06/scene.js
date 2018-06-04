function Scene (clearColor) {
  this.clearColor = clearColor // color para limpiar la escena
  this.meshes = [] // un arreglo de n meshes
  this.ambientlight = null
  this.pointlight = null
  this.directionallight = null
  this.pointlight2 = null
  return this
}

Scene.prototype.addMesh = function (mesh) {
  this.meshes.push(mesh)
}

module.exports = Scene
