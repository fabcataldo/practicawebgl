const SCENE = require('./scene')
const WEBGLRENDERER = require('./webglrenderer')
const MESHESOFFIGURES = require('./meshesoffigures')
var DATGUI = require('dat.gui/build/dat.gui')
var PERSPECTIVECAMERA = require('./perspectivecamera')
//var ORTHOGRAPHICCAMERA = require('./orthographiccamera')
const AMBIENTLIGHT = require('./ambientlight')
const POINTLIGHT = require('./pointlight')
const DIRECTIONALLIGHT = require('./directionallight')

var scene = new SCENE()
// el color del canvas debe ser igual que el de scene.clearColor
scene.clearColor = [0.2, 0.2, 0.2, 1.0]
var i

var grillaMesh = new MESHESOFFIGURES.SetMeshesOfGrilla()
for (i = 0; i < grillaMesh.length; i++) {
  scene.addMesh(grillaMesh[i])
  grillaMesh[i].modelMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
}

var ejesMesh = new MESHESOFFIGURES.SetMeshesOfEjes()
for (i = 0; i < ejesMesh.length; i++) {
  scene.addMesh(ejesMesh[i])
  ejesMesh[i].modelMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
}

/*
var cuboMesh = new MESHESOFFIGURES.SetMeshesOfFigures(1)
scene.addMesh(cuboMesh)
*/
var cuboobjwvf = new MESHESOFFIGURES.SetMeshesOfFigures(7)
scene.addMesh(cuboobjwvf)
/*
var esferaMesh = new MESHESOFFIGURES.SetMeshesOfFigures(5)
scene.addMesh(esferaMesh)

var cilindroMesh = new MESHESOFFIGURES.SetMeshesOfFigures(6)
scene.addMesh(cilindroMesh)
*/
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

var statecubom = {
  cdr: 0.396,
  cdg: 0.74151,
  cdb: 0.69102,
  cda: 1.0,
  csr: 0.297254,
  csg: 0.30829,
  csb: 0.306678,
  csa: 1.0
}

/*
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

var stateesferam = {
  edr: 0.5,
  edg: 0.0,
  edb: 0.0,
  eda: 1.0,

  esr: 0.7,
  esg: 0.6,
  esb: 0.6,
  esa: 1.0
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
  cilindroescejex: 1,
  cilindroescejey: 1,
  cilindroescejez: 1
}

var statecilindrom = {
  cdr: 0.4,
  cdg: 0.5,
  cdb: 0.4,
  cda: 1.0,

  csr: 0.04,
  csg: 0.7,
  csb: 0.04,
  csa: 1.0
}
*/
var gui = new DATGUI.GUI({width: 500})
var foldergui = gui.addFolder('Perspective Camera')
foldergui.add(state, 'fovy', Math.PI / 4, Math.PI, Math.PI / 18)
foldergui.add(state, 'near', -10, 10, 0.01)
foldergui.add(state, 'aspect', canvas.width / canvas.height, 5, 0.1)
foldergui.add(state, 'far', -10, 10, 0.01)

var foldergui2 = gui.addFolder('Orthographic Camera')
foldergui2.add(state, 'top', -10, 10, 0.1)
foldergui2.add(state, 'bottom', -10, 10, 0.1)
foldergui2.add(state, 'left', -10, 10, 0.1)
foldergui2.add(state, 'right', -10, 10, 0.1)
foldergui2.add(state, 'near', -10, 10, 0.01)
foldergui2.add(state, 'far', -10, 10, 0.01)

var foldergui3 = gui.addFolder('Camera -> configurar eye')
foldergui3.add(state, 'eyeX', -5, 10, 1)
foldergui3.add(state, 'eyeY', -5, 10, 1)
foldergui3.add(state, 'eyeZ', -5, 10, 1)
foldergui3.add(state, 'centerX', -5, 5, 1)
foldergui3.add(state, 'centerY', -5, 5, 1)
foldergui3.add(state, 'centerZ', -5, 5, 1)
foldergui3.add(state, 'upX', 0, 5, 1)
foldergui3.add(state, 'upY', 1, 5, 1)
foldergui3.add(state, 'upZ', 0, 5, 1)

var foldergui7 = gui.addFolder('Transformar cubo!!')
var subfoldergui7 = foldergui7.addFolder('Trasladar cubo!!')
subfoldergui7.add(statecubotrasl, 'ejex', -10, 10, 0.01)
subfoldergui7.add(statecubotrasl, 'ejey', -10, 10, 0.01)
subfoldergui7.add(statecubotrasl, 'ejez', -10, 10, 0.01)
var subfoldergui8 = foldergui7.addFolder('Rotar cubo!!')
subfoldergui8.add(statecuborot, 'rotejex', -10, 10, 0.01)
subfoldergui8.add(statecuborot, 'rotejey', -10, 10, 0.01)
subfoldergui8.add(statecuborot, 'rotejez', -10, 10, 0.01)
var subfoldergui9 = foldergui7.addFolder('Escalar cubo!!')
subfoldergui9.add(statecuboesc, 'escejex', 0, 10, 0.01)
subfoldergui9.add(statecuboesc, 'escejey', 0, 10, 0.01)
subfoldergui9.add(statecuboesc, 'escejez', 0, 10, 0.01)
var subfoldergui22 = foldergui7.addFolder('Colorear material del cubo (difuso)!!')
subfoldergui22.add(statecubom, 'cdr', 0, 1, 0.01)
subfoldergui22.add(statecubom, 'cdg', 0, 1, 0.01)
subfoldergui22.add(statecubom, 'cdb', 0, 1, 0.01)
subfoldergui22.add(statecubom, 'cda', 0, 1, 0.01)
var subfoldergui28 = foldergui7.addFolder('Colorear material del cubo (specular)!!')
subfoldergui28.add(statecubom, 'csr', 0, 1, 0.01)
subfoldergui28.add(statecubom, 'csg', 0, 1, 0.01)
subfoldergui28.add(statecubom, 'csb', 0, 1, 0.01)
subfoldergui28.add(statecubom, 'csa', 0, 1, 0.01)

/*
var foldergui10 = gui.addFolder('Transformar esfera!!')
var subfoldergui10 = foldergui10.addFolder('Trasladar esfera!!')
subfoldergui10.add(stateesferatrasl, 'esferaejex', -10, 10, 0.01)
subfoldergui10.add(stateesferatrasl, 'esferaejey', -10, 10, 0.01)
subfoldergui10.add(stateesferatrasl, 'esferaejez', -10, 10, 0.01)
var subfoldergui11 = foldergui10.addFolder('Rotar esfera!!')
subfoldergui11.add(stateesferarot, 'esferarotejex', -10, 10, 0.01)
subfoldergui11.add(stateesferarot, 'esferarotejey', -10, 10, 0.01)
subfoldergui11.add(stateesferarot, 'esferarotejez', -10, 10, 0.01)
var subfoldergui12 = foldergui10.addFolder('Escalar esfera!!')
subfoldergui12.add(stateesferaesc, 'esferaescejex', 0, 10, 0.01)
subfoldergui12.add(stateesferaesc, 'esferaescejey', 0, 10, 0.01)
subfoldergui12.add(stateesferaesc, 'esferaescejez', 0, 10, 0.01)
var subfoldergui23 = foldergui10.addFolder('Colorear material de la esfera (difusa)!!')
subfoldergui23.add(stateesferam, 'edr', 0, 1, 0.01)
subfoldergui23.add(stateesferam, 'edg', 0, 1, 0.01)
subfoldergui23.add(stateesferam, 'edb', 0, 1, 0.01)
subfoldergui23.add(stateesferam, 'eda', 0, 1, 0.01)
var subfoldergui29 = foldergui10.addFolder('Colorear material de la esfera (specular)!!')
subfoldergui29.add(stateesferam, 'esr', 0, 1, 0.01)
subfoldergui29.add(stateesferam, 'esg', 0, 1, 0.01)
subfoldergui29.add(stateesferam, 'esb', 0, 1, 0.01)
subfoldergui29.add(stateesferam, 'esa', 0, 1, 0.01)

var foldergui13 = gui.addFolder('Transformar Cilindro!!')
var subfoldergui13 = foldergui13.addFolder('Trasladar Cilindro!!')
subfoldergui13.add(statecilindrotrasl, 'cilindroejex', -10, 10, 0.01)
subfoldergui13.add(statecilindrotrasl, 'cilindroejey', -10, 10, 0.01)
subfoldergui13.add(statecilindrotrasl, 'cilindroejez', -10, 10, 0.01)
var subfoldergui14 = foldergui13.addFolder('Rotar Cilindro!!')
subfoldergui14.add(statecilindrorot, 'cilindrorotejex', -10, 10, 0.01)
subfoldergui14.add(statecilindrorot, 'cilindrorotejey', -10, 10, 0.01)
subfoldergui14.add(statecilindrorot, 'cilindrorotejez', -10, 10, 0.01)
var subfoldergui15 = foldergui13.addFolder('Escalar Cilindro!!')
subfoldergui15.add(statecilindroesc, 'cilindroescejex', 0, 10, 0.01)
subfoldergui15.add(statecilindroesc, 'cilindroescejey', 0, 10, 0.01)
subfoldergui15.add(statecilindroesc, 'cilindroescejez', 0, 10, 0.01)
var subfoldergui27 = foldergui13.addFolder('Colorear material del cilindro (difuso)!!')
subfoldergui27.add(statecilindrom, 'cdr', 0, 1, 0.01)
subfoldergui27.add(statecilindrom, 'cdg', 0, 1, 0.01)
subfoldergui27.add(statecilindrom, 'cdb', 0, 1, 0.01)
subfoldergui27.add(statecilindrom, 'cda', 0, 1, 0.01)
var subfoldergui30 = foldergui13.addFolder('Colorear material del cilindro (specular)!!')
subfoldergui30.add(statecilindrom, 'csr', 0, 1, 0.01)
subfoldergui30.add(statecilindrom, 'csg', 0, 1, 0.01)
subfoldergui30.add(statecilindrom, 'csb', 0, 1, 0.01)
subfoldergui30.add(statecilindrom, 'csa', 0, 1, 0.01)
*/

scene.ambientlight = new AMBIENTLIGHT([0, 0, 0], [1, 1, 1])
scene.ambientlight.habilitarLuz = true
scene.pointlight = new POINTLIGHT([10, 0, 0], [1, 1, 1])
scene.pointlight.habilitarLuz = true
scene.pointlight2 = new POINTLIGHT([-10, 0, 0], [1, 1, 1])
scene.pointlight2.habilitarLuz = true
scene.directionallight = new DIRECTIONALLIGHT([10, 0, 0], [1, 1, 1])
scene.directionallight.habilitarLuz = true

var foldergui16 = gui.addFolder('Luz de ambiente')
var subfoldergui26 = foldergui16.addFolder('Material')
subfoldergui26.add(scene.ambientlight.material, 'r', 0, 1, 0.01)
subfoldergui26.add(scene.ambientlight.material, 'g', 0, 1, 0.01)
subfoldergui26.add(scene.ambientlight.material, 'b', 0, 1, 0.01)
var subfoldergui34 = foldergui16.addFolder('Habilitar luz')
subfoldergui34.add(scene.ambientlight, 'habilitarLuz')

var foldergui17 = gui.addFolder('Point Light')
var subfoldergui17 = foldergui17.addFolder('Posicion')
subfoldergui17.add(scene.pointlight.position, 'x', -10, 10, 0.1)
subfoldergui17.add(scene.pointlight.position, 'y', -10, 10, 0.1)
subfoldergui17.add(scene.pointlight.position, 'z', -10, 10, 0.1)
var subfoldergui18 = foldergui17.addFolder('Material')
subfoldergui18.add(scene.pointlight.material, 'r', 0, 1, 0.01)
subfoldergui18.add(scene.pointlight.material, 'g', 0, 1, 0.01)
subfoldergui18.add(scene.pointlight.material, 'b', 0, 1, 0.01)
var subfoldergui33 = foldergui17.addFolder('Habilitar luz')
subfoldergui33.add(scene.pointlight, 'habilitarLuz')

var foldergui20 = gui.addFolder('Point Light 2')
var subfoldergui24 = foldergui20.addFolder('Posicion')
subfoldergui24.add(scene.pointlight2.position, 'x', -10, 10, 0.1)
subfoldergui24.add(scene.pointlight2.position, 'y', -10, 10, 0.1)
subfoldergui24.add(scene.pointlight2.position, 'z', -10, 10, 0.1)
var subfoldergui25 = foldergui20.addFolder('Material')
subfoldergui25.add(scene.pointlight2.material, 'r', 0, 1, 0.01)
subfoldergui25.add(scene.pointlight2.material, 'g', 0, 1, 0.01)
subfoldergui25.add(scene.pointlight2.material, 'b', 0, 1, 0.01)
var subfoldergui32 = foldergui20.addFolder('Habilitar luz')
subfoldergui32.add(scene.pointlight2, 'habilitarLuz')

var foldergui19 = gui.addFolder('Luz direccional')
var subfoldergui19 = foldergui19.addFolder('Posicion')
subfoldergui19.add(scene.directionallight.position, 'x', -10, 10, 0.1)
subfoldergui19.add(scene.directionallight.position, 'y', -10, 10, 0.1)
subfoldergui19.add(scene.directionallight.position, 'z', -10, 10, 0.1)
var subfoldergui20 = foldergui19.addFolder('Material')
subfoldergui20.add(scene.directionallight.material, 'r', 0, 1, 0.01)
subfoldergui20.add(scene.directionallight.material, 'g', 0, 1, 0.01)
subfoldergui20.add(scene.directionallight.material, 'b', 0, 1, 0.01)
var subfoldergui31 = foldergui19.addFolder('Habilitar luz')
subfoldergui31.add(scene.directionallight, 'habilitarLuz')

var webglrenderer = new WEBGLRENDERER(canvas)
var coordenadasTransformsCubo = []
/*
var coordenadasTransformsEsfera = []
var coordenadasTransformsCilindro = []
*/

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

  coordenadasTransformsCubo = [[statecubotrasl.ejex, statecubotrasl.ejey, statecubotrasl.ejez],
    [statecuborot.rotejex, statecuborot.rotejey, statecuborot.rotejez],
    [statecuboesc.escejex, statecuboesc.escejey, statecuboesc.escejez]
  ]

  /*
  coordenadasTransformsEsfera = [[stateesferatrasl.esferaejex, stateesferatrasl.esferaejey,
    stateesferatrasl.esferaejez], [stateesferarot.esferarotejex, stateesferarot.esferarotejey,
    stateesferarot.esferarotejez], [stateesferaesc.esferaescejex, stateesferaesc.esferaescejey,
    stateesferaesc.esferaescejez]]

  coordenadasTransformsCilindro = [[statecilindrotrasl.cilindroejex, statecilindrotrasl.cilindroejey,
    statecilindrotrasl.cilindroejez], [statecilindrorot.cilindrorotejex, statecilindrorot.cilindrorotejey,
    statecilindrorot.cilindrorotejez], [statecilindroesc.cilindroescejex, statecilindroesc.cilindroescejey,
    statecilindroesc.cilindroescejez]]
  */
  cameraeye = [[state.eyeX, state.eyeY, state.eyeZ], [state.centerX, state.centerY, state.centerZ],
    [state.upX, state.upY, state.upZ]]

  var perspectivecamera = new PERSPECTIVECAMERA(state.fovy, state.aspect, state.near, state.far)
  // var orthocamera = new ORTHOGRAPHICCAMERA(state.left, state.right, state.bottom, state.top, state.near, state.far)

  /*
  cuboMesh.modelMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]

  cuboMesh.trasladar = coordenadasTransformsCubo[0]
  cuboMesh.rotar = coordenadasTransformsCubo[1]
  cuboMesh.escalar = coordenadasTransformsCubo[2]

  cuboMesh.trasladarMesh()
  cuboMesh.rotarMesh()
  cuboMesh.escalarMesh()

  // material turquesa, como el color del cubo, con brillo de 0.25*128
  scene.meshes[5].material.setColorAmbient([0.1, 0.18725, 0.1745, 1.0])
  scene.meshes[5].material.setColorDiffuse([statecubom.cdr, statecubom.cdg, statecubom.cdb, statecubom.cda])
  scene.meshes[5].material.setColorSpecular([statecubom.csr, statecubom.csg, statecubom.csb, statecubom.csa])
  scene.meshes[5].material.setShininess(0.1)
*/
  /*
  esferaMesh.modelMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  esferaMesh.trasladar = coordenadasTransformsEsfera[0]
  esferaMesh.rotar = coordenadasTransformsEsfera[1]
  esferaMesh.escalar = coordenadasTransformsEsfera[2]

  esferaMesh.trasladarMesh()
  esferaMesh.rotarMesh()
  esferaMesh.escalarMesh()

  // material rojo plástico, con brillo de 0.25*128
  scene.meshes[6].material.setColor([stateesferam.er, stateesferam.eg, stateesferam.eb, stateesferam.ea])
  scene.meshes[6].material.setColorAmbient([0.0, 0.0, 0.0, 1.0])
  scene.meshes[6].material.setColorDiffuse([stateesferam.edr, stateesferam.edg, stateesferam.edb, stateesferam.eda])
  scene.meshes[6].material.setColorSpecular([stateesferam.esr, stateesferam.esg, stateesferam.esb, stateesferam.esa])
  scene.meshes[6].material.setShininess(0.25)

  cilindroMesh.trasladar = coordenadasTransformsCilindro[0]
  cilindroMesh.rotar = coordenadasTransformsCilindro[1]
  cilindroMesh.escalar = coordenadasTransformsCilindro[2]

  cilindroMesh.trasladarMesh()
  cilindroMesh.rotarMesh()
  cilindroMesh.escalarMesh()

  // material green rubber, con brillo de 0.078125*128
  scene.meshes[7].material.setColor([statecilindrom.cr, statecilindrom.cg, statecilindrom.cb, statecilindrom.ca])
  scene.meshes[7].material.setColorAmbient([0.0, 0.05, 0.0, 1.0])
  scene.meshes[7].material.setColorDiffuse([statecilindrom.cdr, statecilindrom.cdg, statecilindrom.cdb, statecilindrom.cda])
  scene.meshes[7].material.setColorSpecular([statecilindrom.csr, statecilindrom.csg, statecilindrom.csb, statecilindrom.csa])
  scene.meshes[7].material.setShininess(0.078125)
  */
  scene.meshes[5].modelMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  webglrenderer.render(scene, perspectivecamera, cameraeye)

  window.requestAnimationFrame(tick)
}

tick()
