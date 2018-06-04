const glMatrix = require('gl-matrix')
const mat4 = glMatrix.mat4

function WebGLRenderer (canvas) {
  this.gl = canvas.getContext('webgl')
  var vsSource = require('./vertex-shader.glsl')
  var fsSource = require('./fragment-shader.glsl')

  // cargo el vertex shader y el fragment shader
  var vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER)
  this.gl.shaderSource(vertexShader, vsSource)
  this.gl.compileShader(vertexShader)
  var fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER)
  this.gl.shaderSource(fragmentShader, fsSource)
  this.gl.compileShader(fragmentShader)

  // creo el programa, linkeo los shaders y el programa, y lo uso
  this.program = this.gl.createProgram()
  this.gl.attachShader(this.program, vertexShader)
  this.gl.attachShader(this.program, fragmentShader)
  this.gl.linkProgram(this.program)
  this.gl.useProgram(this.program)

  // Specify the color for clearing <canvas>
  this.gl.clearColor(0.2, 0.2, 0.2, 1.0)
  // Clear <canvas>
  this.gl.clear(this.gl.COLOR_BUFFER_BIT)

  // consigo la variable atributo del vertex shader "aPosition", y lo habilito para luego pasarle info
  this.aPosition = this.gl.getAttribLocation(this.program, 'aPosition')
  this.gl.enableVertexAttribArray(this.aPosition)
  // consigo la variable uniform del vertex shader para luego pasarle info
  this.uColor = this.gl.getUniformLocation(this.program, 'uColor')
  // consigo la variable uniform de la Model Matrix de transformación
  this.uModelMatrix = this.gl.getUniformLocation(this.program, 'uModelMatrix')
  // consigo la variable uniform de la Projection Matrix, que es para las cámaras
  this.uProjectionMatrix = this.gl.getUniformLocation(this.program, 'uProjectionMatrix')
  // consigo la variable uniform de la View Matrix para ubicar el ojo
  this.uViewMatrix = this.gl.getUniformLocation(this.program, 'uViewMatrix')
  this.aNormal = this.gl.getAttribLocation(this.program, 'aNormal')
  this.uAmbientLightColor = this.gl.getUniformLocation(this.program, 'uAmbientLightColor')
  this.uLightDirection = this.gl.getUniformLocation(this.program, 'uLightDirection')
  this.uLightDirectionalColor = this.gl.getUniformLocation(this.program, 'uLightDirectionalColor')
  this.uNormalMatrix = this.gl.getUniformLocation(this.program, 'uNormalMatrix')
  this.uPointLightColor = this.gl.getUniformLocation(this.program, 'uPointLightColor')
  this.uPointLightPosition = this.gl.getUniformLocation(this.program, 'uPointLightPosition')
  this.uPointLightColor2 = this.gl.getUniformLocation(this.program, 'uPointLightColor2')
  this.uPointLightPosition2 = this.gl.getUniformLocation(this.program, 'uPointLightPosition2')
  this.uHabilitadoAmbientLight = this.gl.getUniformLocation(this.program, 'uHabilitadoAmbientLight')
  this.uHabilitadoPointLight = this.gl.getUniformLocation(this.program, 'uHabilitadoPointLight')
  this.uHabilitadoPointLight2 = this.gl.getUniformLocation(this.program, 'uHabilitadoPointLight2')
  this.uHabilitadoDirectionalLight = this.gl.getUniformLocation(this.program, 'uHabilitarDirectionalLight')
  this.uViewPos = this.gl.getUniformLocation(this.program, 'uViewPos')
  this.uColorAmbient = this.gl.getUniformLocation(this.program, 'uColorAmbient')
  this.uColorDiffuse = this.gl.getUniformLocation(this.program, 'uColorDiffuse')
  this.uColorSpecular = this.gl.getUniformLocation(this.program, 'uColorSpecular')
  this.uShininess = this.gl.getUniformLocation(this.program, 'uShininess')

  // para tener los errores de compilación del vertex shader
  var error = this.gl.getShaderInfoLog(vertexShader)
  if (error.length > 0) {
    throw error
  }
}

WebGLRenderer.prototype.render = function (scene, camera, cameraEye) {
  var gl = this.gl
  // Specify the color for clearing <canvas>
  gl.clearColor(0.2, 0.2, 0.2, 1.0)
  // Clear <canvas>
  gl.clear(this.gl.COLOR_BUFFER_BIT)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

  mat4.lookAt(camera.getViewMatrix(), cameraEye[0], cameraEye[1], cameraEye[2])
  gl.uniform3fv(this.uViewPos, cameraEye[0])

  gl.uniform3fv(this.uAmbientLightColor, scene.ambientlight.obtenerMaterial())
  gl.uniform3fv(this.uPointLightColor, scene.pointlight.obtenerMaterial())
  gl.uniform3fv(this.uPointLightPosition, scene.pointlight.obtenerPosition())
  gl.uniform3fv(this.uPointLightColor2, scene.pointlight2.obtenerMaterial())
  gl.uniform3fv(this.uPointLightPosition2, scene.pointlight2.obtenerPosition())
  gl.uniform3fv(this.uLightDirection, scene.directionallight.obtenerPosition())
  gl.uniform3fv(this.uLightDirectionalColor, scene.directionallight.obtenerMaterial())

  gl.uniform1i(this.uHabilitadoAmbientLight, scene.ambientlight.habilitarLuz)
  gl.uniform1i(this.uHabilitadoPointLight, scene.pointlight.habilitarLuz)
  gl.uniform1i(this.uHabilitadoPointLight2, scene.pointlight2.habilitarLuz)
  gl.uniform1i(this.uHabilitadoDirectionalLight, scene.directionallight.habilitarLuz)

  for (var i = 0; i < scene.meshes.length; i++) {
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
    gl.uniformMatrix4fv(this.uModelMatrix, false, scene.meshes[i].modelMatrix)

    if (scene.meshes[i].normalsArrayObject != null) {
      // habilito el atributo aNormal
      gl.enableVertexAttribArray(this.aNormal)
      var normalsBufferObject = gl.createBuffer()
      // lo bindeo al buffer anterior
      gl.bindBuffer(gl.ARRAY_BUFFER, normalsBufferObject)
      // le pongo los datos provenientes del arreglo de normales conseguido del meshes[i]
      gl.bufferData(gl.ARRAY_BUFFER, scene.meshes[i].normalsArrayObject, gl.STATIC_DRAW)
      // asocio el buffer a la variable atributo aNormal del vertex shader
      gl.vertexAttribPointer(this.aNormal, 3, gl.FLOAT, false, 0, 0)

      // hago las siguientes operaciones para que la luz vaya de acorde a las normales
      // de cada figura mientras se vayan transformando (rotar, trasladar, etc)
      scene.meshes[i].normalMatrix = mat4.create()
      mat4.invert(scene.meshes[i].normalMatrix, scene.meshes[i].modelMatrix)
      mat4.transpose(scene.meshes[i].normalMatrix, scene.meshes[i].normalMatrix)
      gl.uniformMatrix4fv(this.uNormalMatrix, false, scene.meshes[i].normalMatrix)
    } else {
      // si se están dibujando figuras, uso la variable attribute, pero si estoy dibujando
      // por ej la grilla o los ejes, tengo que deshabilitarla, ya que no la utilizo para estos casos
      gl.disableVertexAttribArray(this.aNormal)
    }

    // los primeros meshes son los ejes y la grilla, los otros son las figuras
    if (i < 5) { // ejes y grilla
      gl.uniform4fv(this.uColor, new Float32Array(scene.meshes[i].material.getColor()))
      gl.drawElements(gl.LINES, scene.meshes[i].indexArrayObject.length, gl.UNSIGNED_SHORT, 0)
    } else { // figuras
      gl.uniform4fv(this.uColorAmbient, new Float32Array(scene.meshes[i].material.getColorAmbient()))
      gl.uniform4fv(this.uColorDiffuse, new Float32Array(scene.meshes[i].material.getColorDiffuse()))
      gl.uniform4fv(this.uColorSpecular, new Float32Array(scene.meshes[i].material.getColorSpecular()))
      gl.uniform1f(this.uShininess, scene.meshes[i].material.getShininess())

      gl.drawElements(gl.TRIANGLES, scene.meshes[i].indexArrayObject.length, gl.UNSIGNED_SHORT, 0)
    }
  }
  // limpio todo
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
  gl.deleteBuffer(vertexBufferObject)
  gl.deleteBuffer(indexBufferObject)
}

module.exports = WebGLRenderer
