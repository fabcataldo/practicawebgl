const geometry = require('./geometry')

var regularconvexpolygongeometry = Object.create(geometry)

regularconvexpolygongeometry.RegularConvexPolygonGeometry = function (edges) {
  this.edges = edges
  return this
}

module.exports = regularconvexpolygongeometry
