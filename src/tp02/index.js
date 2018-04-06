const RCPG = require('./regularconvexpolygongeometry')
const GEOMETRY = require('./geometry')
const MESH = require('./mesh')
const SCENE = require('./scene')
const WEBGLRENDERER = require('./webglrenderer')

var rcpg = new RCPG.RegularConvexPolygonGeometry(3)
var geometry = new GEOMETRY.Geometry(rcpg.vertices, 1)
var material = [1, 0.63, 0.48, 1.0]
var mesh = new MESH.Mesh(geometry, material)

var scene = new SCENE()
// el color del canvas debe ser igual que el de scene.clearColor
scene.clearColor = [0.2, 0.2, 0.2, 1.0]
scene.addMesh(mesh)
var canvas = document.getElementById('c')

var webglrenderer = new WEBGLRENDERER(canvas)
webglrenderer.render(scene, null)
