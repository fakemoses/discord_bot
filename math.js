const {
    Matrix,
    inverse,
    solve,
    linearDependencies,
    QrDecomposition,
    LuDecomposition,
    CholeskyDecomposition,
    EigenvalueDecomposition,
  } = require('ml-matrix');

function eigen(matrix) {
    var m = new Matrix(matrix)
    var qr = new EigenvalueDecomposition(m)
    var res = qr.realEigenvalues
    var imaginary = qr.imaginaryEigenvalues;
    var vectors = qr.eigenvectorMatrix;

    return {res, imaginary, vectors}
}


async function matmulSolve(matrix1, matrix2) {
  var a = new Matrix(matrix1)
  var b = new Matrix(matrix2)

  let res = a.mmul(b)
  return res
}

module.exports = {
  eigen,
  matmulSolve
}