const { Client, MessageAttachment, MessageEmbed } = require('discord.js');
const client = new Client()
const path = require('path')
require('dotenv').config()
var http = require('http');
const express = require('express');
const { matrixMultiplication, eigenval, memes, callKraken } = require('./actions');

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


//discord bit main part 
client.on('message', msg => {

    //Bot to submit amount of money every 5 minutes
    if (msg.content == '!cv') {
        setInterval(() => {
            callKraken().then(res => {
                const embed = new MessageEmbed()
                    .setTitle('Update Crypto!')
                    .addFields(
                        { name: 'Total Money in €: \n', value: res.totalMoney, inline: false },
                        { name: 'Total Money in XLM: \n', value: res.myMoney, inline: false },
                        { name: 'Exchange Rate 1 XLM to Euro: \n', value: res.currentValue, inline: false }
                    )
                msg.channel.send(embed)
            })
        }, 60000*5)
    }

    //meme for fun
    if (msg.content === '!meme') {
        memes().then(meme_src => {
            console.log(meme_src)
            msg.channel.send(meme_src)
        });
    }

    if (pos = msg.content.search(solveCommand) >= 0) {
        eigenval(solveCommand, msg)
    }

    //Matrix multiplication
    if (msg.content.search('!matmul') >= 0) {
        matrixMultiplication(msg.content, msg)
    }
});

client.login(process.env.BOT_TOKEN)


