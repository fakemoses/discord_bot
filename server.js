const { Client, MessageAttachment } = require('discord.js');
const client = new Client()
const path = require('path')
const redditImageFetcher = require('reddit-image-fetcher')
require('dotenv').config()
var http = require('http');
const express = require('express');
const { eigen, matmulSolve } = require('./math.js');
const { stringify } = require('querystring');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT

app.use(express.static(path.join(__dirname, 'public')))

server.listen(PORT, () => console.log('Server running on port ', PORT))

//npm run dev

const solveCommand = '!solve-eigen'
const matmulOpt = ['-m1', '-m2']
const errorCommand = ['Please send the correct input!', 'For more infos about the command please send !help-commands', 'Please specify input for the matrix!']


client.on('ready', () => {
    console.log('Bot is up')
})

client.on('message', msg => {

    //meme for fun
    if (msg.content === '!meme') {
        memes().then(meme_src => {
            console.log(meme_src)
            msg.channel.send(meme_src)
        });
    }

    if (pos = msg.content.search(solveCommand) >= 0) {
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

    //Matrix multiplication
    if (msg.content.search('!matmul') >= 0) {
        //need an algo to simplify the inputs. Instead of posting arrays
        //slice the eq from the main command
        if (msg.content.length > 7) {
            var content = msg.content
            const con = content.slice(7, content.length)
            //check if there's input matrix or not
            if (msg.content.search(matmulOpt[0]) >= 0 && msg.content.search(matmulOpt[1]) < 0) {

                //only -m1 input
                if (con.length - 1 > matmulOpt[0].length) {

                    const tempVal = con.slice(matmulOpt[0].length + 1, con.length)
                    //split the matrix for the solver
                    matrix1 = JSON.parse(tempVal)
                    //console.log(matrix1)

                } else {
                    msg.channel.send(errorCommand[0] + '\n' + errorCommand[2] + '\n' + errorCommand[1])
                }

            } else if (msg.content.search(matmulOpt[1]) >= 0 && msg.content.search(matmulOpt[0]) < 0) {
                //only -m2 input
                if (con.length - 1 > matmulOpt[1].length) {
                    const tempVal = con.slice(matmulOpt[1].length + 1, con.length)
                    //split the matrix for the solver
                    matrix2 = JSON.parse(tempVal)
                    //console.log(matrix2)
                } else {
                    msg.channel.send(errorCommand[0] + '\n' + errorCommand[2] + '\n' + errorCommand[1])
                }

            } else if (msg.content.search(matmulOpt[0]) >= 0 && msg.content.search(matmulOpt[1]) >= 0) {
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
                        msg.channel.send('Result: \n'+ res)
                    })

                } else {
                    msg.channel.send(errorCommand[0] + '\n' + errorCommand[1] + '\ninput is wrong mofos')
                }

            } else {
                //error in command
                msg.channel.send(errorCommand[0] + '\n' + errorCommand[1])
            }

        } else {
            msg.channel.send(errorCommand[0] + '\n' + errorCommand[1])
        }

    }
});

client.login(process.env.BOT_TOKEN)

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
