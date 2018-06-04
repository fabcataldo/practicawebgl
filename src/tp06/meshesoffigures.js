const Mesh = require('./mesh')
const Geometry = require('./geometry')
const cubegeometry = require('./cubegeometry')
const cylindergeometry = require('./cylindergeometry')
const spheregeometry = require('./spheregeometry')
const MATERIAL = require('./material')
var meshesoffigures = Object.create(Mesh)
const DGL = require('./dgl')

meshesoffigures.getVertexInfoEjes = function (vertices) {
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

meshesoffigures.getVertexInfoGrid = function (vertices) {
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

  ejexmesh.Mesh(ejex, new MATERIAL(colorejes[0], null))
  ejexmesh.vertexArrayObject = meshesoffigures.getVertexInfoEjes(verticesx)[0]
  ejexmesh.indexArrayObject = meshesoffigures.getVertexInfoEjes(verticesx)[1]
  meshesDeEjes.push(ejexmesh)

  var ejey = Object.create(Geometry)
  var ejeymesh = Object.create(Mesh)
  ejey.Geometry(verticesy, faces)
  ejeymesh.Mesh(ejey, new MATERIAL(colorejes[1], null))
  ejeymesh.vertexArrayObject = meshesoffigures.getVertexInfoEjes(verticesy)[0]
  ejexmesh.indexArrayObject = meshesoffigures.getVertexInfoEjes(verticesy)[1]
  meshesDeEjes.push(ejeymesh)

  var ejez = Object.create(Geometry)
  var ejezmesh = Object.create(Mesh)
  ejez.Geometry(verticesz, faces)
  ejezmesh.Mesh(ejez, new MATERIAL(colorejes[2], null))
  meshesDeEjes.push(ejezmesh)
  ejezmesh.vertexArrayObject = meshesoffigures.getVertexInfoEjes(verticesz)[0]
  ejezmesh.indexArrayObject = meshesoffigures.getVertexInfoEjes(verticesz)[1]

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
  lineas1mesh.Mesh(lineas1geom, new MATERIAL(colorGrid, null))
  lineas1mesh.vertexArrayObject = meshesoffigures.getVertexInfoGrid(lineas1)[0]
  lineas1mesh.indexArrayObject = meshesoffigures.getVertexInfoGrid(lineas1)[1]
  grilla.push(lineas1mesh)

  // dibujo las líneas verticales de la grilla
  for (var j = -dimension; j <= dimension; j++) {
    lineas2.push([j, 0, dimension], [j, 0, -dimension])
  }

  var lineas2geom = Object.create(Geometry)
  lineas2geom.Geometry(lineas2)
  var lineas2mesh = Object.create(Mesh)
  lineas2mesh.Mesh(lineas2geom, new MATERIAL(colorGrid, null))
  lineas2mesh.vertexArrayObject = meshesoffigures.getVertexInfoGrid(lineas2)[0]
  lineas2mesh.indexArrayObject = meshesoffigures.getVertexInfoGrid(lineas2)[1]
  grilla.push(lineas2mesh)

  // devuelvo ya la grilla armada
  return grilla
}

meshesoffigures.SetMeshesOfFigures = function (typeofmesh) {
  this.typeofmesh = typeofmesh

  if (this.typeofmesh === 1) { // es el cubo
    var cubegeometria = new cubegeometry.CubeGeometry(6)
    var verticesCubo = cubegeometria.verticesCubo
    var indexVerticesCubo = [
      0,  1,  2,  0,  2,  3, // enfrente
      4,  5,  6,      4,  6,  7,    // atrás
      8,  9,  10,     8,  10, 11,   // arriba
      12, 13, 14,     12, 14, 15,   // fondo
      16, 17, 18,     16, 18, 19,   // derecha
      20, 21, 22,     20, 22, 23    // izquierda
    ]
    var normalsCubo = cubegeometria.normals
    var material = [0, 0.5, 0.5, 1]
    var cubeGeometry = new Geometry.Geometry(verticesCubo, 6, normalsCubo)
    this.meshResult = new Mesh.Mesh(cubeGeometry, new MATERIAL(material, null))
    this.meshResult.indexArrayObject = new Uint16Array(indexVerticesCubo)
    this.meshResult.vertexArrayObject = new Float32Array(verticesCubo)
    this.meshResult.normalsArrayObject = new Float32Array(normalsCubo)
    return this.meshResult
  }

  if (typeofmesh === 5) {
    this.typeofmesh = typeofmesh
    var esferageometria = new spheregeometry.SphereGeometry(1)
    var vertexPositionData = esferageometria.vertexPositionData
    var indexData = esferageometria.indexData
    var normalsEsfera = esferageometria.normals
    var esferaGeometry = new Geometry.Geometry(vertexPositionData, 23, normalsEsfera)
    this.meshResult = new Mesh.Mesh(esferaGeometry, new MATERIAL([1, 0.5, 0, 1], null))
    this.meshResult.indexArrayObject = new Uint16Array(indexData)
    this.meshResult.vertexArrayObject = new Float32Array(vertexPositionData)
    this.meshResult.normalsArrayObject = new Float32Array(normalsEsfera)
    return this.meshResult
  }

  if (typeofmesh === 6) {
    this.typeofmesh = typeofmesh
    var cilindrogeometria = new cylindergeometry.CylinderGeometry(23)
    var vertices = cilindrogeometria.vertices
    var indices = cilindrogeometria.indices
    var normals = cilindrogeometria.normals
    var cilindroGeometry = new Geometry.Geometry(vertices, 23, normals)
    this.meshResult = new Mesh.Mesh(cilindroGeometry, new MATERIAL([0, 1, 1, 1], null))
    this.meshResult.indexArrayObject = new Uint16Array(indices)
    this.meshResult.vertexArrayObject = new Float32Array(vertices)
    this.meshResult.normalsArrayObject = new Float32Array(normals)

    return this.meshResult
  }

  //dibujo el cubo, que está en el archivo dgl.js, con el parser que está en el mismo fichero
  if (typeofmesh === 7) {
    this.typeofmesh = typeofmesh
    const src = 'raw-loader!../objs/cube.obj'
    var cuboobj = DGL.parseObj(src, false)
    var v = cuboobj.pos
    var ind = cuboobj.idx
    var n = cuboobj.normals
    var cubogeometry = new Geometry.Geometry(v, 6, n)
    this.meshResult = new Mesh.Mesh(cubogeometry, new MATERIAL([0, 0.5, 0.5, 1], null))
    this.meshResult.indexArrayObject = new Uint16Array(ind)
    this.meshResult.vertexArrayObject = new Float32Array(v)
    this.meshResult.normalsArrayObject = new Float32Array(n)
    //console.log(v)
    return this.meshResult
  }

  return this
}

module.exports = meshesoffigures
