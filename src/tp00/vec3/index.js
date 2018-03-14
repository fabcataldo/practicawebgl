const normalize = (a) => {
  // throw new Error('Not implemented')

  // creo el vector resultado (con componentes cualquiera, después lo reemplazo para devolver el
  // resultado correcto)
  var vectorresultante = [12, 22, 22]
  for (var i = 0; i < a.length; i++) {
    // fórmula de normalización de un vector de 3 componentes
    vectorresultante[i] = a[i] / (Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2)))
  }
  return vectorresultante
}

const cross = (a, b) => {
  // throw new Error('Not implemented')

  // creo el vector resultado (con componentes cualquiera, después lo reemplazo para devolver el
  // resultado correcto)
  var resultado = [12, 22, 22]
  resultado[0] = ((a[1] * b[2]) - (a[2] * b[1]))
  resultado[1] = ((a[0] * b[2]) - (a[2] * b[0]))
  resultado[2] = ((a[0] * b[1]) - (a[1] * b[0]))
  return new Float32Array(resultado)
}

const normal = (a, b, c) => {
  // throw new Error('Not implemented')

  // creo el vector resultado (con componentes cualquiera, después lo reemplazo para devolver el
  // resultado correcto)
  // var resultado = [12, 22, 22]

  // uso el doble producto vectorial para sacar la normal normalizada del triangulo
  // o sea hago (a x b) x c
  // creo el producto cruz entre a y b, y con el resultado tomo c y hago un nuevo producto cruz

  var vectoru = [1, 1, 1]
  var vectorv = [2, 2, 2]

  var i = 0
  for (i = 0; i < a.length; i++) {
    vectoru[i] = b[i] - a[i]
    vectorv[i] = c[i] - a[i]
  }

  var resultado = cross(vectoru, vectorv)
  return resultado
}

module.exports = {
  normalize,
  cross,
  normal
}
