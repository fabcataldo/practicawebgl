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
}

WebGLRenderer.prototype.render = function (scene, camera) {
  var gl = this.gl
  var index = 0
  var vertexArray = [] // arreglo para los vertices
  // cargo vertexArray ubicando todos los vertices en forma de lista
  for (var i = 0; i < scene.meshes[0].geometry.vertices.length; i++) {
    vertexArray[index++] = scene.meshes[0].geometry.vertices[i][0]
    vertexArray[index++] = scene.meshes[0].geometry.vertices[i][1]
    vertexArray[index++] = scene.meshes[0].geometry.vertices[i][2]
  }
  var vertexArrayObject = new Float32Array(vertexArray)
  var arrayColor = new Float32Array(scene.meshes[0].material)
  var indexArray = [] // arreglo que contiene los índices del arreglo de vertices
  // el bucle siguiente sirve para dibujar de forma horaria los vértices, ubicando los índices de
  // tal forma que se consiga esto
  for (i = 1; i < scene.meshes[0].geometry.vertices.length; i++) {
    indexArray[index++] = 0
    indexArray[index++] = i
    if (i + 1 < scene.meshes[0].geometry.vertices.length) {
      indexArray[index++] = i + 1
    } else {
      indexArray[index++] = i
    }
  }
  var indexArrayObject = new Uint16Array(indexArray)

  // creo el buffer
  var vertexBufferObject = gl.createBuffer()
  // lo bindeo
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject)
  // le pongo los datos provenientes del arreglo de vertices creado anteriormente
  gl.bufferData(gl.ARRAY_BUFFER, vertexArrayObject, gl.STATIC_DRAW)
  // asocio el buffer a la variable atributo aPosition del vertex shader
  gl.vertexAttribPointer(this.aPosition, 3, gl.FLOAT, false, 0, 0)

  // creo el buffer
  var indexBufferObject = gl.createBuffer()
  // lo bindeo
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferObject)
  // le pongo los datos provenientes del arreglo de vertices creado anteriormente
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexArrayObject, gl.STATIC_DRAW)

  // habilito la variable atributo para que se pueda usar
  gl.enableVertexAttribArray(this.aPosition)

  // consigo la variable uColor del vertex shader para, desde acá pasarle datos a esa variable
  // y de ahí él le va pasar esos datos a la variable vColor del fragment shader
  gl.uniform4fv(this.uColor, arrayColor)
  // dibujo
  gl.drawElements(gl.TRIANGLES, indexArrayObject.length, gl.UNSIGNED_SHORT, 0)

  // limpio todo
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
  gl.deleteBuffer(vertexBufferObject)
  gl.deleteBuffer(indexBufferObject)
}

module.exports = WebGLRenderer
