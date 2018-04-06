const glMatrix = require('gl-matrix')
const mat4 = glMatrix.mat4
const MESHESOFFIGURES = require('./meshesoffigures')

function WebGLRenderer (canvas) {
  var vsSource = require('./vertex-shader.glsl')
  var fsSource = require('./fragment-shader.glsl')
  this.gl = canvas.getContext('webgl')

  // cargo el vertex shader y el fragment shader
  var vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER)
  this.gl.shaderSource(vertexShader, vsSource)
  this.gl.compileShader(vertexShader)
  var fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER)
  this.gl.shaderSource(fragmentShader, fsSource)
  this.gl.compileShader(fragmentShader)

  // creo el programa, linkeo los shaders y el programa, y lo uso
  var program = this.gl.createProgram()
  this.gl.attachShader(program, vertexShader)
  this.gl.attachShader(program, fragmentShader)
  this.gl.linkProgram(program)
  this.gl.useProgram(program)

  // Specify the color for clearing <canvas>
  this.gl.clearColor(0.2, 0.2, 0.2, 1.0)
  // Clear <canvas>
  this.gl.clear(this.gl.COLOR_BUFFER_BIT)

  // consigo la variable atributo del vertex shader "aPosition", y lo habilito para luego pasarle info
  this.aPosition = this.gl.getAttribLocation(program, 'aPosition')
  this.gl.enableVertexAttribArray(this.aPosition)
  // consigo la variable uniform del vertex shader para luego pasarle info
  this.uColor = this.gl.getUniformLocation(program, 'uColor')

  // consigo la variable uniform de la Model Matrix de transformación
  this.uModelMatrix = this.gl.getUniformLocation(program, 'uModelMatrix')
  // consigo la variable uniform de la Projection Matrix, que es para las cámaras
  this.uProjectionMatrix = this.gl.getUniformLocation(program, 'uProjectionMatrix')
  // consigo la variable uniform de la View Matrix para ubicar el ojo
  this.uViewMatrix = this.gl.getUniformLocation(program, 'uViewMatrix')
  this.transformMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
}

WebGLRenderer.prototype.render = function (scene, camera, cameraEye, coordenadasTransformsCubo,
  coordenadasTransformsCono, coordenadasTransformsEsfera, coordenadasTransformsCilindro) {
  var gl = this.gl
  // Specify the color for clearing <canvas>
  gl.clearColor(0.2, 0.2, 0.2, 1.0)
  // Clear <canvas>
  gl.clear(this.gl.COLOR_BUFFER_BIT)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

  mat4.lookAt(camera.getViewMatrix(), cameraEye[0], cameraEye[1], cameraEye[2])
  for (var i = 0; i < scene.meshes.length; i++) {
    gl.uniform4fv(this.uColor, new Float32Array(scene.meshes[i].material))

    // creo el buffer
    var vertexBufferObject = gl.createBuffer()
    // lo bindeo
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject)
    // le pongo los datos provenientes del arreglo de vertices creado anteriormente
    gl.bufferData(gl.ARRAY_BUFFER, scene.meshes[i].vertexArrayObject, gl.STATIC_DRAW)
    // asocio el buffer a la variable atributo aPosition del vertex shader
    gl.vertexAttribPointer(this.aPosition, 3, gl.FLOAT, false, 0, 0)
    // creo el buffer
    var indexBufferObject = gl.createBuffer()
    // lo bindeo
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferObject)
    // le pongo los datos provenientes del arreglo de vertices creado anteriormente
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, scene.meshes[i].indexArrayObject, gl.STATIC_DRAW)

    // habilito la variable atributo para que se pueda usar
    gl.enableVertexAttribArray(this.aPosition)

    // le paso datos al uniform uViewMatrix pasandolé la viewMatrix, que es la matriz viewMatrix de la cámara
    gl.uniformMatrix4fv(this.uViewMatrix, false, camera.getViewMatrix())
    // le paso datos al uniform uProjectionMatrix pasandolé la projectionMatrix, que es la matriz projectionMatrix de la cámara
    gl.uniformMatrix4fv(this.uProjectionMatrix, false, camera.getProjectionMatrix())
    // le paso datos al uniform uModelMatrix para poder transformar las figuras
    gl.uniformMatrix4fv(this.uModelMatrix, false, this.transformMatrix)

    // los primeros meshes son los ejes y la grilla, los otros son las figuras
    if (i < 5) { // ejes y grilla
      gl.drawElements(gl.LINES, scene.meshes[i].indexArrayObject.length, gl.UNSIGNED_SHORT, 0)
    } else { // figuras
      // sólo quiero transformar las figuras
      MESHESOFFIGURES.TransformarMesh(this.transformMatrix, coordenadasTransformsCubo)
      MESHESOFFIGURES.TransformarMesh(this.transformMatrix, coordenadasTransformsCono)
      MESHESOFFIGURES.TransformarMesh(this.transformMatrix, coordenadasTransformsEsfera)
      MESHESOFFIGURES.TransformarMesh(this.transformMatrix, coordenadasTransformsCilindro)

      gl.drawElements(gl.TRIANGLES, scene.meshes[i].indexArrayObject.length, gl.UNSIGNED_SHORT, 0)
    }
  }
  // limpio todo
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
  gl.deleteBuffer(vertexBufferObject)
  gl.deleteBuffer(indexBufferObject)
}

module.exports = WebGLRenderer
