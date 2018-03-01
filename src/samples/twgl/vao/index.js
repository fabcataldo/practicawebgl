var twgl = require('twgl.js')
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

var vertexArrayInfo = twgl.createVertexArrayInfo(gl, programInfo, bufferInfo)

function render (time) {
  gl.clearColor(0.2, 0.2, 0.2, 1)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  twgl.resizeCanvasToDisplaySize(gl.canvas)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

  var uniforms = {
    uColor: [1, 1, 0]
  }

  gl.useProgram(programInfo.program)
  twgl.setUniforms(programInfo, uniforms)
  twgl.setBuffersAndAttributes(gl, programInfo, vertexArrayInfo)
  twgl.drawBufferInfo(gl, vertexArrayInfo, gl.TRIANGLES)

  window.requestAnimationFrame(render)
}
window.requestAnimationFrame(render)
