var vsSource = require('./vertex-shader.glsl')
var fsSource = require('./fragment-shader.glsl')

var canvas = document.getElementById('c')
var gl = canvas.getContext('webgl')

var vertexShader = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(vertexShader, vsSource)
gl.compileShader(vertexShader)

var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(fragmentShader, fsSource)
gl.compileShader(fragmentShader)

var program = gl.createProgram()
gl.attachShader(program, vertexShader)
gl.attachShader(program, fragmentShader)

gl.linkProgram(program)
gl.useProgram(program)

// Specify the color for clearing <canvas>
gl.clearColor(0.2, 0.2, 0.2, 1.0)

// Clear <canvas>
gl.clear(gl.COLOR_BUFFER_BIT)

// Draw a point
gl.drawArrays(gl.POINTS, 0, 1)
