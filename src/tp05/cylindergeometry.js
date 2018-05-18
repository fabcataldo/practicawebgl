const geometry = require('./geometry')

var cylindergeometry = Object.create(geometry)

// para 2D, pongo faces = 1 ya que voy a ver la figura de frente
cylindergeometry.CylinderGeometry = function (caras) {
  this.caras = caras
  this.vertices = []
  this.indices = []
  this.normals = []
  var radius = 1
  var anguloAcumulador = 0
  this.st = []

  // genero los vertices de todas las caras del cilindro, girando con el angulo_acumulador
  for (var i = 0; i < caras; i++) {
    anguloAcumulador += 2 * Math.PI / caras
    this.vertices.push(Math.cos(anguloAcumulador) * 1, Math.sin(anguloAcumulador) * radius, 0)
    this.vertices.push(Math.cos(anguloAcumulador) * 1, Math.sin(anguloAcumulador) * radius, 1.5)

    this.st.push(1 - i / this.caras, 0)
    this.st.push(1 - i / this.caras, 1)
    this.normals.push(0, -1, 0)
    this.normals.push(0, 1, 0)
  }
  this.vertices.push(0, 0, 0)
  this.vertices.push(0, 0, 1.5)

  this.st.push(0, 0)
  this.st.push(0, 1)

  this.normals.push(0, -1, 0)
  this.normals.push(0, 1, 0)

  /*
  this.normals = this.normals.concat(this.vertices)
  this.vertices = this.vertices.concat(this.vertices)
  this.st = this.st.concat(this.st)
  */
  for (i = 1; i <= this.caras * 2; i++) {
    this.indices.push(i - 1)
    this.indices.push(i)
    this.indices.push(i + 1)
  }

  for (i = 0; i <= this.caras * 2; i += 2) {
    this.indices.push(caras + 1)
    this.indices.push(i)
    if (i + 2 >= this.caras * 2) {
      this.indices.push(0)
    } else {
      this.indices.push(i + 2)
    }
  }
  for (i = 1; i <= this.caras * 2; i += 2) {
    this.indices.push(caras + 2)
    this.indices.push(i)
    if (i + 2 > this.caras * 2) {
      this.indices.push(1)
    } else {
      this.indices.push(i + 2)
    }
  }

  return this
}

module.exports = cylindergeometry
