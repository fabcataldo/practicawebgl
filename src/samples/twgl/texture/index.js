// See https://github.com/greggman/twgl.js/blob/master/examples/textures.html

var twgl = require('twgl.js')
var fs = require('./shaders/fs.glsl')
var vs = require('./shaders/vs.glsl')

var gl = twgl.getWebGLContext(document.getElementById('c'))
var programInfo = twgl.createProgramInfo(gl, [vs, fs])

var arrays = {
  aPosition: [
    -0.5, -0.5, 0,
    0.5, -0.5, 0,
    0.5, 0.5, 0,
    -0.5, 0.5, 0
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
  // A 2x2 pixel texture from a JavaScript array
  checker: {
    mag: gl.NEAREST,
    min: gl.LINEAR,
    src: [
      255, 255, 255, 255,
      192, 192, 192, 255,
      192, 192, 192, 255,
      255, 255, 255, 255
    ]
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
    uTexture: textures.firefox
    // uTexture: textures.checker
    // uTexture: textures.red
  }

  gl.useProgram(programInfo.program)
  twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)
  twgl.setUniforms(programInfo, uniforms)
  twgl.drawBufferInfo(gl, bufferInfo, gl.TRIANGLES)

  window.requestAnimationFrame(render)
}
window.requestAnimationFrame(render)
