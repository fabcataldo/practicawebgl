attribute vec4 aPosition;
uniform vec4 uColor;
varying vec4 vColor;
uniform vec4 uColorDiffuse;
uniform vec4 uColorAmbient;
uniform vec4 uColorSpecular;
uniform float uShininess;

uniform mat4 uModelMatrix;  // matriz de transformacion
uniform mat4 uViewMatrix;  // matriz de ubicar el ojo
uniform mat4 uProjectionMatrix; //matriz para las cámaras

// sección de variables para el cálculo de las luces
attribute vec4 aNormal; //normal de la superficie a tener en cta.
uniform vec3 uAmbientLightColor; //uniform para manejar el color de la luz de ambiente
uniform vec3 uLightDirection; //uniform para ver la dirección del vector de la luz
uniform vec3 uLightDirectionalColor; //uniform para obtener el color de la luz direccional
uniform mat4 uNormalMatrix;
uniform vec3 uPointLightColor;
uniform vec3 uPointLightPosition; //uniform que representa la dirección del vector de la point light
uniform vec3 uPointLightColor2;
uniform vec3 uPointLightPosition2; //uniform que representa la dirección del vector de la point light
uniform bool uHabilitadoAmbientLight;
uniform bool uHabilitadoPointLight;
uniform bool uHabilitadoPointLight2;
uniform bool uHabilitarDirectionalLight;
uniform vec3 uViewPos;
varying vec3 vFragPos;


// función que obtiene la luz de ambiente
vec3 obtenerAmbientLight(){
  // como la luz de ambiente es una luz que ilumina toda la escena, a todos los obj por igual
  // sólo calculo el color final
  vec3 ambientResult = uAmbientLightColor * uColor.rgb;
  return ambientResult;
}

// función que obtiene la dirección del vector de la luz con reflexión difusa, relacionada con la luz direccional
vec3 obtenerDirectionalLight(vec3 vFragPos){
  vec3 normal = normalize(aNormal.xyz);
  float nDotL = max(dot(uLightDirection, normal), 0.0);
  vec3 diffuse = uLightDirectionalColor *  uColorDiffuse.rgb * nDotL;

  //Specular shading
  vec3 viewDir = normalize(uViewPos - vFragPos);
  vec3 reflectDir = reflect(-uLightDirection, normal);
  //el 32 es el 0.25 del brillo de un plástico rojo, por 128, el 32 es el brillo del material
  float spec = pow((max(dot(viewDir, reflectDir), 0.0)), uShininess);
  vec3 specular = uLightDirectionalColor *  uColorSpecular.rgb * spec;

  return (diffuse+specular);
}

// función que obtiene la dirección del vector de la luz con reflexión difusa, para la point light
vec3 obtenerPointLight(vec3 uPointLightPosition, vec3 uPointLightColor, vec3 vFragPos){
  vec3 normal = normalize(vec3(uNormalMatrix * aNormal));
  vec4 vertexPosition = uModelMatrix * aPosition;
  vec3 lightDirection = normalize(uPointLightPosition - vec3(vertexPosition));
  float nDotL = max(dot(lightDirection, normal), 0.0);
  vec3 diffuse = uPointLightColor *  uColorDiffuse.rgb * nDotL;

  //Specular shading
  vec3 viewDir = normalize(uViewPos - vFragPos);
  vec3 reflectDir = reflect(-lightDirection, normal);
  float spec = pow((max(dot(viewDir, reflectDir), 0.0)), uShininess);
  vec3 specular = uPointLightColor *  uColorSpecular.rgb * spec;

  return (diffuse+specular);
}

void main() {
  gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * aPosition;
  vFragPos = vec3(uModelMatrix * aPosition * vec4(0.0, 0.0, 0.0, 1.0));
  // creo un vec3 que va a servir para calcular la luz final de la figura
  vec3 resultLight = vec3(0.0, 0.0, 0.0);
  if(uHabilitadoAmbientLight){
    resultLight += obtenerAmbientLight();
  }
  if(uHabilitadoPointLight){
    resultLight += obtenerPointLight(uPointLightPosition, uPointLightColor, vFragPos);
  }
  if(uHabilitadoPointLight2){
    resultLight += obtenerPointLight(uPointLightPosition2, uPointLightColor2, vFragPos);
  }
  if(uHabilitarDirectionalLight){
    resultLight += obtenerDirectionalLight(vFragPos);
  }
  vColor = vec4(resultLight, uColor.a);
  //vColor = aNormal, uColor.a;
}
