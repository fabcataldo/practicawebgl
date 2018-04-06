const SCENE = require('./scene')
const WEBGLRENDERER = require('./webglrenderer')
const MESHESOFFIGURES = require('./meshesoffigures')
var DATGUI = require('dat.gui/build/dat.gui')
var PERSPECTIVECAMERA = require('./perspectivecamera')
var ORTHOGRAPHICCAMERA = require('./orthographiccamera')

var scene = new SCENE()
// el color del canvas debe ser igual que el de scene.clearColor
scene.clearColor = [0.2, 0.2, 0.2, 1.0]
var i

var grillaMesh = new MESHESOFFIGURES.SetMeshesOfGrilla()
for (i = 0; i < grillaMesh.length; i++) {
  scene.addMesh(grillaMesh[i])
}

var ejesMesh = new MESHESOFFIGURES.SetMeshesOfEjes()
for (i = 0; i < ejesMesh.length; i++) {
  scene.addMesh(ejesMesh[i])
}

var cuboMesh = new MESHESOFFIGURES.SetMeshesOfFigures(1)
scene.addMesh(cuboMesh)

var conoMesh = new MESHESOFFIGURES.SetMeshesOfFigures(2)
scene.addMesh(conoMesh)

var esferaMesh = new MESHESOFFIGURES.SetMeshesOfFigures(5)
scene.addMesh(esferaMesh)

var cilindroMesh = new MESHESOFFIGURES.SetMeshesOfFigures(6)
scene.addMesh(cilindroMesh)

var canvas = document.getElementById('c')

var state = {
  fovy: Math.PI / 4,
  near: 0.001,
  aspect: canvas.width / canvas.height,
  far: 1000,

  left: -10,
  right: 10,
  bottom: -10,
  top: 10,
  eyeX: 5,
  eyeY: 5,
  eyeZ: 5,
  centerX: 0,
  centerY: 0,
  centerZ: 0,
  upX: 0,
  upY: 1,
  upZ: 0
}

var statecubotrasl = {
  ejex: 0,
  ejey: 0,
  ejez: 0
}
var statecuborot = {
  rotejex: 0,
  rotejey: 0,
  rotejez: 0
}
var statecuboesc = {
  escejex: 1,
  escejey: 1,
  escejez: 1
}

var stateconotrasl = {
  cejex: 0,
  cejey: 0,
  cejez: 0
}

var stateconorot = {
  crotejex: 0,
  crotejey: 0,
  crotejez: 0
}

var stateconoesc = {
  cescejex: 1,
  cescejey: 1,
  cescejez: 1
}

var stateesferatrasl = {
  esferaejex: 0,
  esferaejey: 0,
  esferaejez: 0
}

var stateesferarot = {
  esferarotejex: 0,
  esferarotejey: 0,
  esferarotejez: 0
}

var stateesferaesc = {
  esferaescejex: 1,
  esferaescejey: 1,
  esferaescejez: 1
}

var statecilindrotrasl = {
  cilindroejex: 0,
  cilindroejey: 0,
  cilindroejez: 0
}

var statecilindrorot = {
  cilindrorotejex: 0,
  cilindrorotejey: 0,
  cilindrorotejez: 0
}

var statecilindroesc = {
  cilindroesejex: 1,
  cilindroesejey: 1,
  cilindroesejez: 1
}

var gui = new DATGUI.GUI({width: 500})
var foldergui = gui.addFolder('Perspective Camera')
foldergui.add(state, 'fovy', Math.PI / 4, Math.PI / 8, Math.PI / 2)
foldergui.add(state, 'near', 0.001, 1, 0.001)
foldergui.add(state, 'aspect', canvas.width / canvas.height, 5, 0.1)
foldergui.add(state, 'far', 1000, 2500, 100)

var foldergui2 = gui.addFolder('Orthographic Camera')
foldergui2.add(state, 'top', 10, 0, 1)
foldergui2.add(state, 'bottom', -10, 0, 1)
foldergui2.add(state, 'left', -10, 0, 1)
foldergui2.add(state, 'right', 10, 0, 1)
foldergui2.add(state, 'near', 0.001, 1, 0.001)
foldergui2.add(state, 'far', 1000, 2500, 100)

var foldergui3 = gui.addFolder('Camera -> configurar eye')
foldergui3.add(state, 'eyeX', 5, 10, 1)
foldergui3.add(state, 'eyeY', 5, 10, 1)
foldergui3.add(state, 'eyeZ', 5, 10, 1)
foldergui3.add(state, 'centerX', 0, 5, 1)
foldergui3.add(state, 'centerY', 0, 5, 1)
foldergui3.add(state, 'centerZ', 0, 5, 1)
foldergui3.add(state, 'upX', 0, 5, 1)
foldergui3.add(state, 'upY', 1, 5, 1)
foldergui3.add(state, 'upZ', 0, 5, 1)

var foldergui4 = gui.addFolder('Trasladar cono!!')
foldergui4.add(stateconotrasl, 'cejex', -10, 10, 1)
foldergui4.add(stateconotrasl, 'cejey', -10, 10, 1)
foldergui4.add(stateconotrasl, 'cejez', -10, 10, 1)

var foldergui5 = gui.addFolder('Rotar cono!!')
foldergui5.add(stateconorot, 'crotejex', -10, 10, 1)
foldergui5.add(stateconorot, 'crotejey', -10, 10, 1)
foldergui5.add(stateconorot, 'crotejez', -10, 10, 1)

var foldergui6 = gui.addFolder('Escalar cono!!')
foldergui6.add(stateconoesc, 'cescejex', -10, 10, 1)
foldergui6.add(stateconoesc, 'cescejey', -10, 10, 1)
foldergui6.add(stateconoesc, 'cescejez', -10, 10, 1)

var foldergui7 = gui.addFolder('Trasladar cubo!!')
foldergui7.add(statecubotrasl, 'ejex', -10, 10, 1)
foldergui7.add(statecubotrasl, 'ejey', -10, 10, 1)
foldergui7.add(statecubotrasl, 'ejez', -10, 10, 1)

var foldergui8 = gui.addFolder('Rotar cubo!!')
foldergui8.add(statecuborot, 'rotejex', -10, 10, 1)
foldergui8.add(statecuborot, 'rotejey', -10, 10, 1)
foldergui8.add(statecuborot, 'rotejez', -10, 10, 1)

var foldergui9 = gui.addFolder('Escalar cubo!!')
foldergui9.add(statecuboesc, 'escejex', -10, 10, 1)
foldergui9.add(statecuboesc, 'escejey', -10, 10, 1)
foldergui9.add(statecuboesc, 'escejez', -10, 10, 1)

var foldergui10 = gui.addFolder('Trasladar esfera!!')
foldergui10.add(stateesferatrasl, 'esferaejex', -10, 10, 1)
foldergui10.add(stateesferatrasl, 'esferaejey', -10, 10, 1)
foldergui10.add(stateesferatrasl, 'esferaejez', -10, 10, 1)

var foldergui11 = gui.addFolder('Rotar esfera!!')
foldergui11.add(stateesferarot, 'esferarotejex', -10, 10, 1)
foldergui11.add(stateesferarot, 'esferarotejey', -10, 10, 1)
foldergui11.add(stateesferarot, 'esferarotejez', -10, 10, 1)

var foldergui12 = gui.addFolder('Escalar esfera!!')
foldergui12.add(stateesferaesc, 'esferaescejex', -10, 10, 1)
foldergui12.add(stateesferaesc, 'esferaescejey', -10, 10, 1)
foldergui12.add(stateesferaesc, 'esferaescejez', -10, 10, 1)

var foldergui13 = gui.addFolder('Trasladar Cilindro!!')
foldergui13.add(stateesferatrasl, 'esferaejex', -10, 10, 1)
foldergui13.add(stateesferatrasl, 'esferaejey', -10, 10, 1)
foldergui13.add(stateesferatrasl, 'esferaejez', -10, 10, 1)

var foldergui14 = gui.addFolder('Rotar Cilindro!!')
foldergui14.add(stateesferarot, 'esferarotejex', -10, 10, 1)
foldergui14.add(stateesferarot, 'esferarotejey', -10, 10, 1)
foldergui14.add(stateesferarot, 'esferarotejez', -10, 10, 1)

var foldergui15 = gui.addFolder('Escalar Cilindro!!')
foldergui15.add(stateesferaesc, 'esferaescejex', -10, 10, 1)
foldergui15.add(stateesferaesc, 'esferaescejey', -10, 10, 1)
foldergui15.add(stateesferaesc, 'esferaescejez', -10, 10, 1)

var webglrenderer = new WEBGLRENDERER(canvas)
var coordenadasTransformsCubo = []
var coordenadasTransformsCono = []
var coordenadasTransformsEsfera = []
var coordenadasTransformsCilindro = []

var cameraeye = []

function tick () {
  // Lookup the size the browser is displaying the canvas.
  var displayWidth = canvas.clientWidth
  var displayHeight = canvas.clientHeight

  // Check if the canvas is not the same size.
  if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
    // Make the canvas the same size
    canvas.width = displayWidth
    canvas.height = displayHeight
  }

  coordenadasTransformsCubo = [statecubotrasl.ejex, statecubotrasl.ejey, statecubotrasl.ejez,
    statecuborot.rotejex, statecuborot.rotejey, statecuborot.rotejez,
    statecuboesc.escejex, statecuboesc.escejey, statecuboesc.escejez
  ]
  coordenadasTransformsCono = [stateconotrasl.cejex, stateconotrasl.cejey, stateconotrasl.cejez,
    stateconorot.crotejex, stateconorot.crotejey, stateconorot.crotejez,
    stateconoesc.cescejex, stateconoesc.cescejey, stateconoesc.cescejez]

  coordenadasTransformsEsfera = [stateesferatrasl.esferaejex, stateesferatrasl.esferaejey,
    stateesferatrasl.esferaejez, stateesferarot.esferarotejex, stateesferarot.esferarotejey,
    stateesferarot.esferarotejez, stateesferaesc.esferaescejex, stateesferaesc.esferaescejey,
    stateesferaesc.esferaescejez]

  coordenadasTransformsCilindro = [statecilindrotrasl.cilindroejex, statecilindrotrasl.cilindroejey,
    statecilindrotrasl.cilindroejez, statecilindrorot.cilindrorotejex, statecilindrorot.cilindrorotejey,
    statecilindrorot.cilindrorotejez, statecilindroesc.cilindroescejex, statecilindroesc.cilindroescejey,
    statecilindroesc.cilindroescejez]

  cameraeye = [[state.eyeX, state.eyeY, state.eyeZ], [state.centerX, state.centerY, state.centerZ],
    [state.upX, state.upY, state.upZ]]

  var perspectivecamera = new PERSPECTIVECAMERA(state.fovy, state.aspect, state.near, state.far)
  // var orthocamera = new ORTHOGRAPHICCAMERA(state.left, state.right, state.bottom, state.top, state.near, state.far)

  webglrenderer.render(scene, perspectivecamera, cameraeye, coordenadasTransformsCubo,
    coordenadasTransformsCono, coordenadasTransformsEsfera, coordenadasTransformsCilindro)

  window.requestAnimationFrame(tick)
}

tick()
