const Mesh = require('./mesh')
const Geometry = require('./geometry')
const MATERIAL = require('./material')
var meshesoffigures = Object.create(Mesh)
const DGL = require('./dgl')
const src = require('raw-loader!./objs/monkey.obj')
const src2 = require('raw-loader!./objs/teapot.obj')

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

  if (typeofmesh === 1) {
    this.typeofmesh = typeofmesh
    var cobj = DGL.parseObj(src, true)
    var v = cobj.pos
    var ind = cobj.idx
    var n = cobj.normals
    var cgeometry = new Geometry.Geometry(v, 0, n)
    this.meshResult = new Mesh.Mesh(cgeometry, new MATERIAL([0, 0.5, 0.5, 1], null))
    this.meshResult.indexArrayObject = new Uint16Array(ind)
    this.meshResult.vertexArrayObject = new Float32Array(v)
    this.meshResult.normalsArrayObject = new Float32Array(n)

    return this.meshResult
  }

  if (typeofmesh === 2) {
    this.typeofmesh = typeofmesh
    var tobj = DGL.parseObj(src2, true)
    var tv = tobj.pos
    var tind = tobj.idx
    var tn = tobj.normals
    var tgeometry = new Geometry.Geometry(tv, 0, tn)
    this.meshResult = new Mesh.Mesh(tgeometry, new MATERIAL([0, 0.5, 0.5, 1], null))
    this.meshResult.indexArrayObject = new Uint16Array(tind)
    this.meshResult.vertexArrayObject = new Float32Array(tv)
    this.meshResult.normalsArrayObject = new Float32Array(tn)
    return this.meshResult
  }

  return this
}

module.exports = meshesoffigures
