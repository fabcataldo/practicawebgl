var twgl = require('twgl.js')
var glMatrix = require('gl-matrix')
var dat = require('dat.gui/build/dat.gui')

var fs = require('./shaders/fs.glsl')
var vs = require('./shaders/vs.glsl')

var gl = twgl.getWebGLContext(document.getElementById('c'))
var programInfo = twgl.createProgramInfo(gl, [vs, fs])

var arrays = {
  aPosition: [
    -0.5, -0.5, 0,
    0.5, -0.5, 0,
    -0.5, 0.5, 0
  ]
}
var bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)

var mat4 = glMatrix.mat4
var modelMatrix = mat4.create()

var state = {
  tx: 0,
  ty: 0,
  tz: 0,
  color: [1, 0, 0]
}

var gui = new dat.GUI({width: 512})
gui.add(state, 'tx', -5, 5, 0.1)
gui.add(state, 'ty', -5, 5, 0.1)
gui.add(state, 'tz', -5, 5, 0.1)

function render (time) {
  gl.clearColor(0.2, 0.2, 0.2, 1)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  twgl.resizeCanvasToDisplaySize(gl.canvas)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

  glMatrix.mat4.identity(modelMatrix)
  glMatrix.mat4.translate(modelMatrix, modelMatrix, [state.tx, state.ty, state.tz])

  var uniforms = {
    uColor: [1, 1, 0],
    uModelMatrix: modelMatrix
  }

  gl.useProgram(programInfo.program)
  twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)
  twgl.setUniforms(programInfo, uniforms)
  twgl.drawBufferInfo(gl, bufferInfo, gl.TRIANGLES)

  window.requestAnimationFrame(render)
}

window.requestAnimationFrame(render)