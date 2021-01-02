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

module.exports = function eigen(matrix) {
    var m = new Matrix(matrix)
    var qr = new EigenvalueDecomposition(m)
    var res = qr.realEigenvalues
    var imaginary = qr.imaginaryEigenvalues;
    var vectors = qr.eigenvectorMatrix;

    return {res, imaginary, vectors}
}
    