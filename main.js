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
    client.user.setActivity('verifications', { type: 'LISTENING' });
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

        //Search all members within a guild
        const guild = await client.guilds.fetch(guildID)
        const allMembers = await guild.members.fetch()

        //Checks all members for one that shares the same username as the request
        const member = allMembers.find(member => member.user.tag === req.body.discordtag)
        if(!member) return

        //Sets role for found member
        await member.roles.add(verifiedID)
        await member.send("You have been successfully verified!")
    })
    app.get("/", (req,res)=>{
        res.send("For students, by Koder!")
    })
    app.listen(8080)
});

// Login to Discord with your client's token
client.login(token);
