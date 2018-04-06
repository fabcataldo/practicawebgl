attribute vec4 aPosition;
uniform vec4 uColor;
varying vec4 vColor;

uniform mat4 uModelMatrix;  // matriz de transformacion
uniform mat4 uViewMatrix;  // matriz de ubicar el ojo
uniform mat4 uProjectionMatrix; //matriz para las cámaras


void main() {
  gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * aPosition;
  vColor = uColor;
}
