const { eigen, matmulSolve } = require('./math.js');
const redditImageFetcher = require('reddit-image-fetcher')

const matmulOpt = ['-m1', '-m2']
const errorCommand = ['Please send the correct input!', 'For more infos about the command please send !help-commands', 'Please specify input for the matrix!']
var matrix1 = []
var matrix2 = []

var isGiven1 = false
var isGiven2 = false

var firstVal = false
var secondVal = false

async function memes() {
    let res = await redditImageFetcher.fetch({
        type: 'meme',
        total: 1,
        subreddit: 'memes',
    }); //returns 1 meme 

    resArr = res[0]
    resLink = resArr['image']
    return resLink

}

function eigenval(solveCommand, msg) {
    //need an algo to simplify the inputs. Instead of posting arrays
    //slice the eq from the main command
    var content = msg.content
    const con = content.slice(solveCommand.length, content.length)
    //split the equation for the solver
    eq = JSON.parse(con);

    let { res, imaginary, vectors } = eigen(eq)

    msg.channel.send(
        'Eigenvalues are: ' + res
    )
    msg.channel.send(
        'Imaginary Eigenvalues are: ' + imaginary
    )
    msg.channel.send(
        'Eigenvectors are: ' + vectors[0]
    )

}


function matrixMultiplication(discordMessage, msg) {
    //need an algo to simplify the inputs. Instead of posting arrays
    //slice the eq from the main command
    if (discordMessage.length > 7) {
        var content = discordMessage
        const con = content.slice(7, content.length)
        //check if there's input matrix or not
        if (discordMessage.search(matmulOpt[0]) >= 0 && discordMessage.search(matmulOpt[1]) >= 0) {
            //both -m1 -m2 input
            //check if both input are correct
            const secondInputPos = con.search(matmulOpt[1])
            const temp1 = con.slice(matmulOpt[0].length + 2, secondInputPos - 1)
            const temp2 = con.slice(secondInputPos + matmulOpt[1].length + 1, con.length)

            if (temp1.length > matmulOpt[0].length && temp2.length > matmulOpt[1].length) {
                //convert string to array
                matrix1 = JSON.parse(temp1)
                matrix2 = JSON.parse(temp2)

                //perform matmul
                matmulSolve(matrix1, matrix2).then(res => {
                    //console.log(res)
                    msg.channel.send('Result: \n' + res)
                    matrix1 = []
                    matrix2 = []
                })

            } else {
                msg.channel.send(errorCommand[0] + '\n' + errorCommand[1] + '\ninput is wrong mofos')
            }

        }
        else {
            //error in command
            msg.channel.send(errorCommand[0] + '\n' + errorCommand[1])
        }

    } else {
        msg.channel.send(errorCommand[0] + '\n' + errorCommand[1])
    }

}


module.exports = {
    matrixMultiplication,
    eigenval,
    memes
}