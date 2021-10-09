const { Client, Intents } = require('discord.js');
const { token, guildID, verifiedID, verifiedAuthValue } = require('./config.json');
const express = require('express')
const app = express()

// Create a new client instance
const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS);
const client = new Client({ intents: myIntents });

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');

    //Lets the web server parse JSON files
    app.use(express.json())

//Accepts post requests to the /verify URL
    app.post('/verify', async (req, res) => {
        if (req.headers.authorization !== `Bearer ${verifiedAuthValue}`) {
            res.status(401).send('Unauthorised')
            return
        }
        console.log(req.body)
        res.end()
        const guild = await client.guilds.fetch(guildID)
        const allMembers = await guild.members.fetch({cache: false})
        const member = allMembers.find(member => member.user.tag === req.body.discordtag)
        if(!member) return
        await member.roles.add(verifiedID)
        member.send ("You have been successfully verified!")
    })
    app.get("/", (req,res)=>{
        res.send("Server is running!")
    })
    app.listen(8080)
});

// Login to Discord with your client's token
client.login(token);
//aeiufbsigubg
