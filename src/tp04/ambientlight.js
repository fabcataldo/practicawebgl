function AmbientLight (position, material) {
  this.material = {'r': material[0], 'g': material[1], 'b': material[2]}
  this.position = {'x': position[0], 'y': position[1], 'z': position[2]}
  this.habilitarLuz = true
  return this
}

AmbientLight.prototype.obtenerMaterial = function () {
  return [this.material.r, this.material.g, this.material.b]
}

module.exports = AmbientLight
