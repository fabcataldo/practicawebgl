var vsSource = require('./vertex-shader.glsl')
var fsSource = require('./fragment-shader.glsl')
var glMatrix = require('gl-matrix')

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

// Cache attribute/uniform location
var aPosition = gl.getAttribLocation(program, 'aPosition')
gl.enableVertexAttribArray(aPosition)
var uColor = gl.getUniformLocation(program, 'uColor')
var uModelMatrix = gl.getUniformLocation(program, 'uModelMatrix')

// Yellow Triangle
var triangleVBOData = new Float32Array([
  -0.25, 0.0, 0.0, // First vertex
  0.0, 0.5, 0.0, // Second vertex
  0.25, 0.0, 0.0 // Third vertex
])

// Create Vertex Buffer Object
var triangleVBO = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, triangleVBO)

// Populate Buffer Object
gl.bufferData(gl.ARRAY_BUFFER, triangleVBOData, gl.STATIC_DRAW)

// Bind Buffer to a shader attribute
gl.vertexAttribPointer(
  aPosition, 3, gl.FLOAT, false,
  triangleVBOData.BYTES_PER_ELEMENT * 0, triangleVBOData.BYTES_PER_ELEMENT * 0
)

// Clean up
gl.bindBuffer(gl.ARRAY_BUFFER, null)

var triangleColor = new Float32Array([
  1.0, // red channel
  1.0, // green channel
  0.0, // blue channel
  1.0 // alpha channel
])

gl.uniform4fv(uColor, triangleColor)

var triangleIBOData = new Uint16Array([
  0, // Index #1 of the vertex in the vertex buffer object
  1, // Index #2 of the vertex in the vertex buffer object
  2 // Index #3 of the vertex in the vertex buffer object
])

// Create Index Buffer Object
var triangleIBO = gl.createBuffer()
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleIBO)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, triangleIBOData, gl.STATIC_DRAW)
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)

// Creates a new identity matrix
var triangleModelMatrix = glMatrix.mat4.create()
// See http://glmatrix.net/docs/mat4.html
glMatrix.mat4.translate(
  triangleModelMatrix,
  triangleModelMatrix,
  [-0.5, 0.0, 0.0]
)
gl.uniformMatrix4fv(uModelMatrix, false, triangleModelMatrix)

// Draw Triangle
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleIBO)
gl.drawElements(gl.TRIANGLES, triangleIBOData.length, gl.UNSIGNED_SHORT, 0)
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)

// Free buffered memory
gl.deleteBuffer(triangleVBO)
gl.deleteBuffer(triangleIBO)

// Purple Square with 2 triangles
var squareVBOData = new Float32Array([
  -0.25, 0.0, 0.0, // First vertex
  0.25, 0.0, 0.0, // Second vertex
  0.25, 0.5, 0.0, // Third vertex
  -0.25, 0.5, 0.0 // Fourth vertex
])

// Create Vertex Buffer Object
var squareVBO = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, squareVBO)

// Populate Buffer Object
gl.bufferData(gl.ARRAY_BUFFER, squareVBOData, gl.STATIC_DRAW)

// Bind Buffer to a shader attribute
gl.vertexAttribPointer(
  aPosition, 3, gl.FLOAT, false,
  squareVBOData.BYTES_PER_ELEMENT * 0, squareVBOData.BYTES_PER_ELEMENT * 0
)

// Clean up
gl.bindBuffer(gl.ARRAY_BUFFER, null)

var squareColor = new Float32Array([
  1.0, // red channel
  0.0, // green channel
  1.0, // blue channel
  1.0 // alpha channel
])

gl.uniform4fv(uColor, squareColor)

var squareIBOData = new Uint16Array([
  // First triangle
  0, // Index #1 of the vertex in the vertex buffer object
  1, // Index #2 of the vertex in the vertex buffer object
  2, // Index #3 of the vertex in the vertex buffer object
  // Seconde triangle
  0, // Index #1 of the vertex in the vertex buffer object
  2, // Index #3 of the vertex in the vertex buffer object
  3 // Index #4 of the vertex in the vertex buffer object
])

// Create Index Buffer Object
var squareIBO = gl.createBuffer()
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIBO)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, squareIBOData, gl.STATIC_DRAW)
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)

// Creates a new identity matrix
var squareModelMatrix = glMatrix.mat4.create()
// See http://glmatrix.net/docs/mat4.html
glMatrix.mat4.translate(
  squareModelMatrix,
  squareModelMatrix,
  [0.5, 0.0, 0.0]
)
gl.uniformMatrix4fv(uModelMatrix, false, squareModelMatrix)

// Draw Square
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIBO)
gl.drawElements(gl.TRIANGLES, squareIBOData.length, gl.UNSIGNED_SHORT, 0)
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)

// Free buffered memory
gl.deleteBuffer(squareVBO)
gl.deleteBuffer(squareIBO)
