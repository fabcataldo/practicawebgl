var scene = function (clearColor) {
  this.clearColor = clearColor // color para limpiar la escena
  this.meshes = [] // un arreglo de n meshes
  return this
}

scene.prototype.addMesh = function (mesh) {
  this.meshes.push(mesh)
}

module.exports = scene
