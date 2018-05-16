precision mediump float;

uniform vec3 uColorPicking;

void main() {
  gl_FragColor = vec4(uColorPicking, 1.0);
}
