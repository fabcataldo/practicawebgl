var twgl = require('twgl.js')
var Stats = require('stats.js')
var fs = require('./shaders/fs.glsl')
var vs = require('./shaders/vs.glsl')

var stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)

var gl = twgl.getWebGLContext(document.getElementById('c'))
var programInfo = twgl.createProgramInfo(gl, [vs, fs])

var arrays = {
  position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0]
}
var bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)

function render (time) {
  stats.begin()

  twgl.resizeCanvasToDisplaySize(gl.canvas)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

  var uniforms = {
    time: time * 0.001,
    resolution: [gl.canvas.width, gl.canvas.height]
  }

  gl.useProgram(programInfo.program)
  twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)
  twgl.setUniforms(programInfo, uniforms)
  twgl.drawBufferInfo(gl, bufferInfo, gl.TRIANGLES)

  stats.end()

  window.requestAnimationFrame(render)
}
window.requestAnimationFrame(render)
