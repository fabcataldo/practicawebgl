const glMatrix = require('gl-matrix')
const mat4 = glMatrix.mat4
var vsSource = require('./vertex-shader.glsl')
var fsSource = require('./fragment-shader.glsl')
var vsSource2 = require('./vertex-shader-picking.glsl')
var fsSource2 = require('./fragment-shader-picking.glsl')
var pickingCoordenadas = null

function WebGLRenderer (canvas) {
  this.gl = canvas.getContext('webgl')

  // Specify the color for clearing <canvas>
  this.gl.clearColor(0.2, 0.2, 0.2, 1.0)
  // Clear <canvas>
  this.gl.clear(this.gl.COLOR_BUFFER_BIT)

  // Picking-------------------------------------------------------------------------------------

  var canvasheight = this.gl.canvas.height

  // agrego un evento para sacar las coordenadas x e y del pixel que "clickeo"
  this.gl.canvas.addEventListener('click', function (event) {
    if (event.offsetX === undefined) {
      pickingCoordenadas = {x: event.layerX, y: canvasheight - event.layerY}
    } else {
      pickingCoordenadas = {x: event.offsetX, y: canvasheight - event.offsetY}
    }
  })

  this.program = this.initiateProgram(vsSource, fsSource)
  this.programpicking = this.initiateProgram(vsSource2, fsSource2)
  this.framebuffer = this.initiateFrameBufferPicking(canvas)

  // -----------------------------------------------------------------------------------------------
}

WebGLRenderer.prototype.initiateVariables = function () {
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

  this.aTextCoord = this.gl.getAttribLocation(this.program, 'aTextCoord')
  this.uUsandoText = this.gl.getUniformLocation(this.program, 'uUsandoText')
  this.uSampler = this.gl.getUniformLocation(this.program, 'uSampler')
}

WebGLRenderer.prototype.readPicking = function (scene) {
  // guardo un arreglo que va a tener el color en rgba del pixel
  var read = new Uint8Array(1 * 1 * 4)

  // leo el pixel y obtengo el color
  this.gl.readPixels(pickingCoordenadas.x, pickingCoordenadas.y, 1, 1, this.gl.RGBA,
    this.gl.UNSIGNED_BYTE, read)
  // desbindeo el framebuffer porque ya lo usé para leer el pixel
  this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null)

  // transformo el color del pixel leído, que me devuelve readPixels(), en valores de 0 a 1
  var colorPicked = [read[0] / 255, read[1] / 255, read[2] / 255]

  console.log(colorPicked)

  for (var i = 5; i < scene.meshes.length; i++) {
    // si el color del pixel que hice click, tiene el mismo color que el del objeto que clickié
    if (this.compareArraysColor(scene.meshes[i].colorPicking, colorPicked)) {
      // muestro cuál objeto clickié
      console.log(scene.meshes[i].figurename)
    }
  }
  // pongo pickingCoordenadas=null para luego poder obtener el siguiente click
  pickingCoordenadas = null
}

// creo esta función para ver si el color del pixel, del objeto que está en offscreen,
// coincide con el color del pixel que hago click
WebGLRenderer.prototype.compareArraysColor = function (array1, array2) {
  if (array1.length !== array2.length) {
    return false
  }

  for (var i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false
    }
  }
  return true
}

// dibujo en "off screen" para detectar la selección de un objeto
// coloreandolos a todos con un color simple
WebGLRenderer.prototype.renderOffScreen = function (scene, camera, cameraEye) {
  var gl = this.gl
  gl.linkProgram(this.programpicking)
  gl.useProgram(this.programpicking)

  this.uViewMatrix = this.gl.getUniformLocation(this.programpicking, 'uViewMatrix')
  this.aPosition = this.gl.getAttribLocation(this.programpicking, 'aPosition')
  this.uModelMatrix = this.gl.getUniformLocation(this.programpicking, 'uModelMatrix')
  this.uProjectionMatrix = this.gl.getUniformLocation(this.programpicking, 'uProjectionMatrix')
  this.uColorPicking = this.gl.getUniformLocation(this.programpicking, 'uColorPicking')

  mat4.lookAt(camera.getViewMatrix(), cameraEye[0], cameraEye[1], cameraEye[2])

  var colorsObjectsPicking = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
  var contador = 0

  for (var i = 5; i < scene.meshes.length; i++) {
    gl.uniformMatrix4fv(this.uViewMatrix, false, camera.getViewMatrix())
    gl.uniformMatrix4fv(this.uProjectionMatrix, false, camera.getProjectionMatrix())
    gl.uniformMatrix4fv(this.uModelMatrix, false, scene.meshes[i].modelMatrix)

    scene.meshes[i].colorPicking = colorsObjectsPicking[contador]
    gl.uniform3fv(this.uColorPicking, new Float32Array(scene.meshes[i].colorPicking))

    var vertexBufferObject = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject)
    gl.bufferData(gl.ARRAY_BUFFER, scene.meshes[i].vertexArrayObject, gl.STATIC_DRAW)
    gl.vertexAttribPointer(this.aPosition, 3, gl.FLOAT, false, 0, 0)
    var indexBufferObject = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferObject)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, scene.meshes[i].indexArrayObject, gl.STATIC_DRAW)
    gl.enableVertexAttribArray(this.aPosition)

    gl.uniformMatrix4fv(this.uModelMatrix, false, scene.meshes[i].modelMatrix)

    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer)
    gl.drawElements(gl.TRIANGLES, scene.meshes[i].indexArrayObject.length, gl.UNSIGNED_SHORT, 0)

    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    contador++
  }
}

WebGLRenderer.prototype.initiateProgram = function (vssrc, fssrc) {
  // cargo el vertex shader y el fragment shader
  var vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER)
  this.gl.shaderSource(vertexShader, vssrc)
  this.gl.compileShader(vertexShader)
  var fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER)
  this.gl.shaderSource(fragmentShader, fssrc)
  this.gl.compileShader(fragmentShader)

  // creo el programa, linkeo los shaders y el programa, y lo uso
  var program = this.gl.createProgram()
  this.gl.attachShader(program, vertexShader)
  this.gl.attachShader(program, fragmentShader)

  // para tener los errores de compilación del vertex shader
  var error = this.gl.getShaderInfoLog(vertexShader)
  if (error.length > 0) {
    throw error
  }
  return program
}

// esta función obtiene el framebuffer necesario para poder leer el pixel del objeto que yo haga click
WebGLRenderer.prototype.initiateFrameBufferPicking = function (canvas) {
  // creo una textura para guardar los colores de los objetos
  var texture = this.gl.createTexture()
  this.gl.bindTexture(this.gl.TEXTURE_2D, texture)
  this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, canvas.width, canvas.height, 0,
    this.gl.RGBA, this.gl.UNSIGNED_BYTE, null)
  this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE)
  this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE)
  this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR)
  this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST)
  this.gl.generateMipmap(this.gl.TEXTURE_2D)

  // inicializo un renderbuffer para guardar información de profundidad
  var renderbuffer = this.gl.createRenderbuffer()
  this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, renderbuffer)
  this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, canvas.width,
    canvas.height)

  // inicializo el framebuffer para poder dibujar en offscreen (o sea sin los chiches de las figuras
  // las texturas de cada una, las luces, etc., sólo los objetos planos para obtener cuándo hago click
  // en uno de ellos)
  var framebuffer = this.gl.createFramebuffer()
  this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, framebuffer)
  this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE2D,
    texture, 0)
  this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER,
    renderbuffer)

  // limpio lo que creé para evitar interferencias entre buffers
  this.gl.bindTexture(this.gl.TEXTURE_2D, null)
  this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null)

  return framebuffer
}

WebGLRenderer.prototype.render = function (scene, camera, cameraEye) {
  var gl = this.gl
  // Specify the color for clearing <canvas>
  gl.clearColor(0.2, 0.2, 0.2, 1.0)
  gl.enable(gl.DEPTH_TEST)
  // Clear <canvas>
  gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

  this.renderOffScreen(scene, camera, cameraEye)
  if (pickingCoordenadas) {
    this.readPicking(scene)
  }
  this.renderOnScreen(scene, camera, cameraEye)
}

WebGLRenderer.prototype.renderOnScreen = function (scene, camera, cameraEye) {
  var gl = this.gl
  this.gl.linkProgram(this.program)
  this.gl.useProgram(this.program)
  this.initiateVariables()

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

  // le paso datos al uniform uViewMatrix pasandolé la viewMatrix, que es la matriz viewMatrix de la cámara
  gl.uniformMatrix4fv(this.uViewMatrix, false, camera.getViewMatrix())
  // le paso datos al uniform uProjectionMatrix pasandolé la projectionMatrix, que es la matriz projectionMatrix de la cámara
  gl.uniformMatrix4fv(this.uProjectionMatrix, false, camera.getProjectionMatrix())
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
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
      scene.meshes[i].setUsandoText(false)
      gl.uniform1i(this.uUsandoText, scene.meshes[i].getUsandoText())
      gl.uniform4fv(this.uColor, new Float32Array(scene.meshes[i].material.getColor()))
      gl.drawElements(gl.LINES, scene.meshes[i].indexArrayObject.length, gl.UNSIGNED_SHORT, 0)
    } else { // figuras
      this.ManageTextures(scene, i)

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

WebGLRenderer.prototype.ManageTextures = function (scene, i) {
  var gl = this.gl
  scene.meshes[i].setUsandoText(true)
  gl.uniform1i(this.uUsandoText, scene.meshes[i].getUsandoText())
  // guardo en un buffer las coordenadas de la textura que va a ir al attribute aTextCoord
  scene.meshes[i].meshtextbuffobj = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, scene.meshes[i].meshtextbuffobj)
  gl.bufferData(gl.ARRAY_BUFFER, scene.meshes[i].textureCoordinates, gl.STATIC_DRAW)
  gl.vertexAttribPointer(this.aTextCoord, 2, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(this.aTextCoord)

  // creo un objeto que va a contener la textura asociada al mesh
  scene.meshes[i].texture = gl.createTexture()

  // creo un objeto que va a contener la imagen de la textura
  scene.meshes[i].image = new Image()
  // al navegador le digo que llame, luego de cargar la imagen, a esta función, de forma asincrónica
  scene.meshes[i].image.onload = function () {
    // cargo la textura
    // doy vuelta el eje y de la imagen, después de cargarla
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
    // habilito la textura 0 que es la que voy a usar
    gl.activeTexture(gl.TEXTURE0)
    // linkeo el objeto que tiene la textura que hice antes, al scene.meshes[i].texture
    gl.bindTexture(gl.TEXTURE_2D, scene.meshes[i].texture)
    // seteo los parámetros de la textura
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    // Seteo la forma en la que va a ir la imagen a la textura
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, scene.meshes[i].image)
  }
  // le paso datos a la variable uSampler del shader, diciendolé "che, usá la textura 0 definida antes"
  gl.uniform1i(this.uSampler, 0)
  // le digo al navegador a donde está la imagen a cargar
  scene.meshes[i].image.src = scene.meshes[i].material.map
}

module.exports = WebGLRenderer
