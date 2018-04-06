const geometry = require('./geometry')

var regularconvexpolygongeometry = Object.create(geometry)

// eges, que son las aristas del poligono
regularconvexpolygongeometry.RegularConvexPolygonGeometry = function (edges) {
  this.edges = edges // cantidad de lados
  this.vertices = []
  // pienso en la circunsferencia que viene de ayuda, tengo que partir de acá para dibujar los vertices
  var anguloinicial = 2 * Math.PI / edges
  var angulomas = 0 // cada vertice se dubija así: angulomas + anguloinicial
  var distancia = 1 // radio 1, los vertices tienen que ser equidistantes
  this.vertices[0] = [0, 0, 0] // comienzo en el vertice 0 para dibujar
  for (var i = 0; i < edges; i++) {
    angulomas += anguloinicial
    // como dibujo en 2d, coordenadas a cartesianas
    this.vertices[i] = [Math.cos(angulomas) * distancia, Math.sin(angulomas) * distancia, 0]
  }
  return this
}

module.exports = regularconvexpolygongeometry
