const { Client, MessageAttachment } = require('discord.js');
const client = new Client()
const path = require('path')
const redditImageFetcher = require('reddit-image-fetcher')
require('dotenv').config()
var http = require('http');
const express = require('express');
const eigen = require('./math')


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

    //meme
    if(msg.content === '!meme') 
    {
        memes().then(meme_src => {
          console.log(meme_src)
          msg.channel.send(meme_src)
        });
    }

    if(pos = msg.content.search(solveCommand) >= 0){
        //slice the eq from the main command
        var content = msg.content
        const con = content.slice(solveCommand.length,content.length)
        

        //split the equation for the solver
        eq = JSON.parse(con);
        
        let {res, imaginary, vectors} = eigen(eq)

        msg.channel.send(
            'Eigenvalues are: '+ res 
        )
        msg.channel.send(
            'Imaginary Eigenvalues are: '+ imaginary 
        )
        msg.channel.send(
            'Eigenvectors are: '+ vectors 
        )

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