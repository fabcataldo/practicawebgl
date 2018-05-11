function PointLight (position, material) {
  this.position = {'x': position[0], 'y': position[1], 'z': position[2]} // vector de posición
  this.material = {'r': material[0], 'g': material[1], 'b': material[2]} // color de la luz
  this.habilitarLuz = true
  return this
}

PointLight.prototype.obtenerMaterial = function () {
  return [this.material.r, this.material.g, this.material.b]
}

PointLight.prototype.obtenerPosition = function () {
  return [this.position.x, this.position.y, this.position.z]
}

module.exports = PointLight
