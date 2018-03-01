var twgl = require('twgl.js')
var fs = require('./shaders/fs.glsl')
var vs = require('./shaders/vs.glsl')
var fsTexture = require('./shaders/fs-texture.glsl')
var vsTexture = require('./shaders/vs-texture.glsl')
var glMatrix = require('gl-matrix')
var mat4 = glMatrix.mat4

var gl = twgl.getWebGLContext(document.getElementById('c'))
var colorProgramInfo = twgl.createProgramInfo(gl, [vs, fs])
var textureProgramInfo = twgl.createProgramInfo(gl, [vsTexture, fsTexture])

var modelMatrix = mat4.create()

var arrays = {
  aPosition: [
    -0.3, -0.3, 0,
    0.3, -0.3, 0,
    0.3, 0.3, 0,
    -0.3, 0.3, 0
  ],
  aTexCoord: [
    0.0, 1.0,
    1.0, 1.0,
    1.0, 0.0,
    0.0, 0.0
  ],
  indices: [
    0, 1, 3,
    1, 2, 3
  ]
}
var bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)

var textures = twgl.createTextures(gl, {
  firefox: {
    src: require('../../textures/firefox-256x256.png')
  },
  // A 1x1 pixel texture from a JavaScript array
  red: {
    mag: gl.NEAREST,
    min: gl.LINEAR,
    src: [
      255, 0, 0, 255
    ]
  }
})

function render (time) {
  gl.clearColor(0.2, 0.2, 0.2, 1)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  twgl.resizeCanvasToDisplaySize(gl.canvas)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

  var uniforms = {
    uColor: [1, 1, 0],
    uTexture: textures.firefox,
    uModelMatrix: modelMatrix
  }

  mat4.identity(modelMatrix)
  mat4.translate(modelMatrix, modelMatrix, [-0.5, 0.5, 0.0])

  gl.useProgram(textureProgramInfo.program)
  twgl.setBuffersAndAttributes(gl, textureProgramInfo, bufferInfo)
  twgl.setUniforms(textureProgramInfo, uniforms)
  twgl.drawBufferInfo(gl, bufferInfo, gl.TRIANGLES)

  uniforms.uTexture = textures.red

  mat4.identity(modelMatrix)
  mat4.translate(modelMatrix, modelMatrix, [0.5, 0.5, 0.0])

  gl.useProgram(textureProgramInfo.program)
  twgl.setBuffersAndAttributes(gl, textureProgramInfo, bufferInfo)
  twgl.setUniforms(textureProgramInfo, uniforms)
  twgl.drawBufferInfo(gl, bufferInfo, gl.TRIANGLES)

  mat4.identity(modelMatrix)
  mat4.translate(modelMatrix, modelMatrix, [-0.5, -0.5, 0.0])

  gl.useProgram(colorProgramInfo.program)
  twgl.setBuffersAndAttributes(gl, colorProgramInfo, bufferInfo)
  twgl.setUniforms(colorProgramInfo, uniforms)
  twgl.drawBufferInfo(gl, bufferInfo, gl.TRIANGLES)

  uniforms.uColor = [1, 0, 0]
  mat4.identity(modelMatrix)
  mat4.translate(modelMatrix, modelMatrix, [0.5, -0.5, 0.0])

  gl.useProgram(colorProgramInfo.program)
  twgl.setBuffersAndAttributes(gl, colorProgramInfo, bufferInfo)
  twgl.setUniforms(colorProgramInfo, uniforms)
  twgl.drawBufferInfo(gl, bufferInfo, gl.TRIANGLES)

  window.requestAnimationFrame(render)
}
window.requestAnimationFrame(render)
