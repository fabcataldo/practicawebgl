precision mediump float;

varying vec4 vColor;
uniform sampler2D uSampler;
uniform bool uUsandoText;
varying vec2 vTextCoord;

void main() {
  if(uUsandoText){
    gl_FragColor = vColor*texture2D(uSampler, vTextCoord);
  }
  else{
    gl_FragColor = vColor;
  }
}
