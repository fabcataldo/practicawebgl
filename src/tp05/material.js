function Material (color, map) {
  this.color = color
  this.colordiffuse = []
  this.colorspecular = []
  this.colorambient = []
  this.shininess = 0.0
  this.map = map
}

Material.prototype.setShininess = function (sh) {
  this.shininess = sh
}

Material.prototype.getShininess = function () {
  return this.shininess
}

Material.prototype.setColor = function (color) {
  this.color = color
}

Material.prototype.getColor = function () {
  return this.color
}

Material.prototype.setColorAmbient = function (ca) {
  this.colorambient = ca
}

Material.prototype.getColorAmbient = function () {
  return this.colorambient
}

Material.prototype.setColorDiffuse = function (cd) {
  this.colordiffuse = cd
}

Material.prototype.getColorDiffuse = function () {
  return this.colordiffuse
}

Material.prototype.setColorSpecular = function (cs) {
  this.colorspecular = cs
}

Material.prototype.getColorSpecular = function () {
  return this.colorspecular
}

module.exports = Material
