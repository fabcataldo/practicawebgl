const Mesh = require('./mesh')
const Geometry = require('./geometry')
const rcpg = require('./regularconvexpolygongeometry')
const glMatrix = require('gl-matrix')
const mat4 = glMatrix.mat4

var meshesoffigures = Object.create(Mesh)

meshesoffigures.setMeshEjes = function (vertices) {
  var vertexArray = []
  var indexArray = []
  var resultArray = []
  for (var i = 0; i < vertices.length; i++) {
    for (var j = 0; j < 3; j++) {
      vertexArray.push(vertices[i][j])
    }
  }
  indexArray.push(0, 1)
  // vertexArrayObject, indexArrayObject
  resultArray.push(new Float32Array(vertexArray), new Uint16Array(indexArray))
  return resultArray
}

meshesoffigures.setMeshGrid = function (vertices) {
  var vertexArray = []
  var indexArray = []
  var resultArray = []
  for (var i = 0; i < vertices.length; i++) {
    for (var j = 0; j < 3; j++) {
      vertexArray.push(vertices[i][j])
    }
  }
  for (var p = 0; p < vertices.length; p += 2) {
    indexArray.push(p, p + 1)
  }
  // vertexArrayObject, indexArrayObject
  resultArray.push(new Float32Array(vertexArray), new Uint16Array(indexArray))
  return resultArray
}

meshesoffigures.TransformarMesh = function (coordenadasTransformaciones, transformMatrix) {
  this.transformMatrix = transformMatrix
  mat4.translate(this.transformMatrix, this.transformMatrix, [coordenadasTransformaciones[0],
    coordenadasTransformaciones[1], coordenadasTransformaciones[2]])
  mat4.rotateX(this.transformMatrix, this.transformMatrix, coordenadasTransformaciones[3])
  mat4.rotateY(this.transformMatrix, this.transformMatrix, coordenadasTransformaciones[4])
  mat4.rotateZ(this.transformMatrix, this.transformMatrix, coordenadasTransformaciones[5])
  mat4.scale(this.transformMatrix, this.transformMatrix, [coordenadasTransformaciones[6],
    coordenadasTransformaciones[7], coordenadasTransformaciones[8]])
}

meshesoffigures.SetMeshesOfEjes = function () {
  var rango = 10
  var verticesx = [[0, 0, 0], [rango, 0, 0]]
  var verticesy = [[0, 0, 0], [0, rango, 0]]
  var verticesz = [[0, 0, 0], [0, 0, rango]]
  var faces = [[0, 0, 0]]
  var meshesDeEjes = []

  var colorejes = [[1.0, 0.0, 0.0, 1.0], [0.0, 1.0, 0.0, 1.0], [0.0, 0.0, 1.0, 1.0]]

  var ejex = Object.create(Geometry)
  var ejexmesh = Object.create(Mesh)
  ejex.Geometry(verticesx, faces)
  ejexmesh.Mesh(ejex, colorejes[0])
  ejexmesh.vertexArrayObject = meshesoffigures.setMeshEjes(verticesx)[0]
  ejexmesh.indexArrayObject = meshesoffigures.setMeshEjes(verticesx)[1]
  meshesDeEjes.push(ejexmesh)

  var ejey = Object.create(Geometry)
  var ejeymesh = Object.create(Mesh)
  ejey.Geometry(verticesy, faces)
  ejeymesh.Mesh(ejey, colorejes[1])
  ejeymesh.vertexArrayObject = meshesoffigures.setMeshEjes(verticesy)[0]
  ejexmesh.indexArrayObject = meshesoffigures.setMeshEjes(verticesy)[1]
  meshesDeEjes.push(ejeymesh)

  var ejez = Object.create(Geometry)
  var ejezmesh = Object.create(Mesh)
  ejez.Geometry(verticesz, faces)
  ejezmesh.Mesh(ejez, colorejes[2])
  meshesDeEjes.push(ejezmesh)
  ejezmesh.vertexArrayObject = meshesoffigures.setMeshEjes(verticesz)[0]
  ejezmesh.indexArrayObject = meshesoffigures.setMeshEjes(verticesz)[1]

  return meshesDeEjes
}

meshesoffigures.SetMeshesOfGrilla = function () {
  // en index.js, voy a dibujar la parte positiva (de 0 a 10) ->dimension
  // colores de cada eje
  var colorGrid = [0.5, 0.5, 0.5, 1.0]
  var lineas1 = []
  var lineas2 = []
  var dimension = 10
  var grilla = []

  // dibujo las líneas horizontales de la grilla
  for (var i = -dimension; i <= dimension; i++) {
    lineas1.push([-dimension, 0, i], [dimension, 0, i])
  }
  var lineas1geom = Object.create(Geometry)
  lineas1geom.Geometry(lineas1)
  var lineas1mesh = Object.create(Mesh)
  lineas1mesh.Mesh(lineas1geom, colorGrid)
  lineas1mesh.vertexArrayObject = meshesoffigures.setMeshGrid(lineas1)[0]
  lineas1mesh.indexArrayObject = meshesoffigures.setMeshGrid(lineas1)[1]
  grilla.push(lineas1mesh)

  // dibujo las líneas verticales de la grilla
  for (var j = -dimension; j <= dimension; j++) {
    lineas2.push([j, 0, dimension], [j, 0, -dimension])
  }

  var lineas2geom = Object.create(Geometry)
  lineas2geom.Geometry(lineas2)
  var lineas2mesh = Object.create(Mesh)
  lineas2mesh.Mesh(lineas2geom, colorGrid)
  lineas2mesh.vertexArrayObject = meshesoffigures.setMeshGrid(lineas2)[0]
  lineas2mesh.indexArrayObject = meshesoffigures.setMeshGrid(lineas2)[1]
  grilla.push(lineas2mesh)

  // devuelvo ya la grilla armada
  return grilla
}
meshesoffigures.SetMeshesOfFigures = function (typeofmesh) {
  this.typeofmesh = typeofmesh

  if (this.typeofmesh === 1) { // es el cubo
    // el cubo tiene 6 caras
    var cubeRCPG = new rcpg.RegularConvexPolygonGeometry(6)
    var verticesCubo = [// Cara delantera
      -1.0, -1.0,  1.0,
      1.0, -1.0,  1.0,
      1.0,  1.0,  1.0,
      -1.0,  1.0,  1.0,

      // Cara trasera
      -1.0, -1.0, -1.0,
      -1.0,  1.0, -1.0,
      1.0,  1.0, -1.0,
      1.0, -1.0, -1.0,

      // Top face
      -1.0,  1.0, -1.0,
      -1.0,  1.0,  1.0,
      1.0,  1.0,  1.0,
      1.0,  1.0, -1.0,

      // Bottom face
      -1.0, -1.0, -1.0,
      1.0, -1.0, -1.0,
      1.0, -1.0,  1.0,
      -1.0, -1.0,  1.0,

      // Right face
      1.0, -1.0, -1.0,
      1.0,  1.0, -1.0,
      1.0,  1.0,  1.0,
      1.0, -1.0,  1.0,

      // Left face
      -1.0, -1.0, -1.0,
      -1.0, -1.0,  1.0,
      -1.0,  1.0,  1.0,
      -1.0,  1.0, -1.0]
    var indexVerticesCubo = [0,  1,  2,  0,  2,  3, // enfrente
      4,  5,  6,      4,  6,  7,    // atrás
      8,  9,  10,     8,  10, 11,   // arriba
      12, 13, 14,     12, 14, 15,   // fondo
      16, 17, 18,     16, 18, 19,   // derecha
      20, 21, 22,     20, 22, 23    // izquierda
    ]
    var cubeGeometry = new Geometry.Geometry(verticesCubo, cubeRCPG)
    this.meshResult = new Mesh.Mesh(cubeGeometry, [0, 0, 128, 1])
    this.meshResult.indexArrayObject = new Uint16Array(indexVerticesCubo)
    this.meshResult.vertexArrayObject = new Float32Array(verticesCubo)
    return this.meshResult
  }
  if (this.typeofmesh === 2) { // es el cono
    var conoRCPG = new rcpg.RegularConvexPolygonGeometry(2)
    var verticesCono = [1.5, 0, 0,
      -1.5, 1, 0,
      -1.5, 0.809017,	0.587785,
      -1.5, 0.309017,	0.951057,
      -1.5, -0.309017, 0.951057,
      -1.5, -0.809017, 0.587785,
      -1.5, -1, -4.10207e-010,
      -1.5, -0.809017, -0.587785,
      -1.5, -0.309017, -0.951057,
      -1.5, 0.309017,	-0.951057,
      -1.5, 0.809017,	-0.587785]
    var indexVerticesCono = [0, 1, 2,
      0, 2, 3,
      0, 3, 4,
      0, 4, 5,
      0, 5, 6,
      0, 6, 7,
      0, 7, 8,
      0, 8, 9,
      0, 9, 10,
      0, 10, 1]
    var conoGeometry = new Geometry.Geometry(verticesCono, conoRCPG)
    this.meshResult = new Mesh.Mesh(conoGeometry, [0, 255, 0, 1])
    this.meshResult.indexArrayObject = new Uint16Array(indexVerticesCono)
    this.meshResult.vertexArrayObject = new Float32Array(verticesCono)
    return this.meshResult
  }

  if (typeofmesh === 5) {
    this.typeofmesh = typeofmesh
    var esferaRCPG = new rcpg.RegularConvexPolygonGeometry(23)

    var vertexPositionData = []
    var latitudeBands = 30
    var longitudeBands = 30
    var radius = 2
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

        vertexPositionData.push(radius * x)
        vertexPositionData.push(radius * y)
        vertexPositionData.push(radius * z)
      }
    }

    var indexData = []

    for (latNumber = 0; latNumber < latitudeBands; latNumber++) {
      for (longNumber = 0; longNumber < longitudeBands; longNumber++) {
        var first = (latNumber * (longitudeBands + 1)) + longNumber
        var second = first + longitudeBands + 1
        indexData.push(first)
        indexData.push(second)
        indexData.push(first + 1)

        indexData.push(second)
        indexData.push(second + 1)
        indexData.push(first + 1)
      }
    }

    var esferaGeometry = new Geometry.Geometry(vertexPositionData, esferaRCPG)
    this.meshResult = new Mesh.Mesh(esferaGeometry, [1, 0, 0, 1])
    this.meshResult.indexArrayObject = new Uint16Array(indexData)
    this.meshResult.vertexArrayObject = new Float32Array(vertexPositionData)
    return this.meshResult
  }
  if (typeofmesh === 6) { // cilindro
    this.typeofmesh = typeofmesh
    var caras = 23
    var vertices = []
    var indices = []
    var anguloAcumulador = 0

    // genero los vertices de todas las caras del cilindro, girando con el angulo_acumulador
    for (var i = 0; i < caras; i++) {
      anguloAcumulador += 2 * Math.PI / caras
      vertices.push(Math.cos(anguloAcumulador) * 1, Math.sin(anguloAcumulador) * 1, 0)
      vertices.push(Math.cos(anguloAcumulador) * 1, Math.sin(anguloAcumulador) * 1, 1.5)
    }
    vertices.push(0, 0, 0)
    vertices.push(0, 0, 1.5)

    for (i = 1; i <= caras * 2; i++) {
      indices.push(i - 1)
      indices.push(i)
      indices.push(i + 1)
    }

    for (i = 0; i <= caras * 2; i += 2) {
      indices.push(caras + 1)
      indices.push(i)
      if (i + 2 >= caras * 2) {
        indices.push(0)
      } else {
        indices.push(i + 2)
      }
    }
    for (i = 1; i <= caras * 2; i += 2) {
      indices.push(caras + 2)
      indices.push(i)
      if (i + 2 > caras * 2) {
        indices.push(1)
      } else {
        indices.push(i + 2)
      }
    }
    var cilindroRCPG = new rcpg.RegularConvexPolygonGeometry(caras)
    var cilindroGeometry = new Geometry.Geometry(vertices, cilindroRCPG)
    this.meshResult = new Mesh.Mesh(cilindroGeometry, [0, 255, 255, 255])
    this.meshResult.indexArrayObject = new Uint16Array(indices)
    this.meshResult.vertexArrayObject = new Float32Array(vertices)

    return this.meshResult
  }

  return this
}

module.exports = meshesoffigures
