function transpose (a) {
  var at = [a[0], a[4], a[8], a[12],
    a[1], a[5], a[9], a[13],
    a[2], a[6], a[10], a[14],
    a[3], a[7], a[11], a[15]]
  return at
}

function multiply (a, b) {
  var acm = a
  var bcm = b

  // axb como column mayor
  var axb = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  axb[0] = acm[0] * bcm[0] + acm[4] * bcm[1] + acm[8] * bcm[2] + acm[12] * bcm[3]
  axb[1] = acm[1] * bcm[0] + acm[5] * bcm[1] + acm[9] * bcm[2] + acm[13] * bcm[3]
  axb[2] = acm[2] * bcm[0] + acm[6] * bcm[1] + acm[10] * bcm[2] + acm[14] * bcm[3]
  axb[3] = acm[3] * bcm[0] + acm[7] * bcm[1] + acm[11] * bcm[2] + acm[15] * bcm[3]
  axb[4] = acm[0] * bcm[4] + acm[4] * bcm[5] + acm[8] * bcm[6] + acm[12] * bcm[7]
  axb[5] = acm[1] * bcm[4] + acm[5] * bcm[5] + acm[9] * bcm[6] + acm[13] * bcm[7]
  axb[6] = acm[2] * bcm[4] + acm[6] * bcm[5] + acm[10] * bcm[6] + acm[14] * bcm[7]
  axb[7] = acm[3] * bcm[4] + acm[7] * bcm[5] + acm[11] * bcm[6] + acm[15] * bcm[7]
  axb[8] = acm[0] * bcm[8] + acm[4] * bcm[9] + acm[8] * bcm[10] + acm[12] * bcm[11]
  axb[9] = acm[1] * bcm[8] + acm[5] * bcm[9] + acm[9] * bcm[10] + acm[13] * bcm[11]
  axb[10] = acm[2] * bcm[8] + acm[6] * bcm[9] + acm[10] * bcm[10] + acm[14] * bcm[11]
  axb[11] = acm[3] * bcm[8] + acm[7] * bcm[9] + acm[11] * bcm[10] + acm[15] * bcm[11]
  axb[12] = acm[0] * bcm[12] + acm[4] * bcm[13] + acm[8] * bcm[14] + acm[12] * bcm[15]
  axb[13] = acm[1] * bcm[12] + acm[5] * bcm[13] + acm[9] * bcm[14] + acm[13] * bcm[15]
  axb[14] = acm[2] * bcm[12] + acm[6] * bcm[13] + acm[10] * bcm[14] + acm[14] * bcm[15]
  axb[15] = acm[3] * bcm[12] + acm[7] * bcm[13] + acm[11] * bcm[14] + acm[15] * bcm[15]
  return axb
}

module.exports = {
  transpose,
  multiply
}
