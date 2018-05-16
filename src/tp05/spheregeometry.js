const geometry = require('./geometry')

var spheregeometry = Object.create(geometry)

spheregeometry.SphereGeometry = function (radius) {
  this.vertexPositionData = []
  this.indexData = []
  this.radius = radius
  this.normals = []
  var latitudeBands = 30
  var longitudeBands = 30
  this.st = []

  for (var latNumber = 0; latNumber <= latitudeBands; latNumber++) {
    var theta = latNumber * Math.PI / latitudeBands
    var sinTheta = Math.sin(theta)
    var cosTheta = Math.cos(theta)

    for (var longNumber = 0; longNumber <= longitudeBands; longNumber++) {
      var phi = longNumber * 2 * Math.PI / longitudeBands
      var sinPhi = Math.sin(phi)
      var cosPhi = Math.cos(phi)

      var x = cosPhi * sinTheta
      var y = cosTheta
      var z = sinPhi * sinTheta

      this.vertexPositionData.push(this.radius * x)
      this.vertexPositionData.push(this.radius * y)
      this.vertexPositionData.push(this.radius * z)

      this.normals.push(x)
      this.normals.push(y)
      this.normals.push(z)
    }
  }

  for (latNumber = 0; latNumber < latitudeBands; latNumber++) {
    for (longNumber = 0; longNumber < longitudeBands; longNumber++) {
      var first = (latNumber * (longitudeBands + 1)) + longNumber
      var second = first + longitudeBands + 1
      this.indexData.push(first)
      this.indexData.push(second)
      this.indexData.push(first + 1)

      this.indexData.push(second)
      this.indexData.push(second + 1)
      this.indexData.push(first + 1)
    }
  }

  for (latNumber = latitudeBands; latNumber >= 0; --latNumber) {
    for (longNumber = longitudeBands; longNumber >= 0; --longNumber) {
      this.st.push(1 - (longNumber / longitudeBands))
      this.st.push(latNumber / latitudeBands)
    }
  }
  return this
}

module.exports = spheregeometry
