const { Client, MessageAttachment } = require('discord.js');
const client = new Client()
const path = require('path')
require('dotenv').config()
var http = require('http');
const express = require('express');
const {matrixMultiplication,eigenval, memes} = require('./actions');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT

app.use(express.static(path.join(__dirname, 'public')))

server.listen(PORT, () => console.log('Server running on port ', PORT))

//npm run dev

const solveCommand = '!solve-eigen'

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
        eigenval(solveCommand,msg)
    }

    //Matrix multiplication
    if (msg.content.search('!matmul') >= 0) {
        matrixMultiplication(msg.content, msg)
    }
});

client.login(process.env.BOT_TOKEN)


