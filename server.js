const { Client, MessageAttachment } = require('discord.js');
const client = new Client()
const redditImageFetcher = require('reddit-image-fetcher')
require('dotenv').config()
var http = require('http');

http.createServer( ()=> {
    console.log('server is up')
}).listen(process.env.PORT)


//npm run dev
command1 = 'meme'

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

    if(msg.content.search('!solve') >= 0){

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