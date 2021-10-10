const fs = require('fs'); //Nodes native file system
const { Client, Collection, Intents } = require('discord.js');
const { token, guildID, verifiedID, verifiedAuthValue } = require('./config.json');
const express = require('express');
const app = express();

// Create a new client instance
const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS);
const client = new Client({ intents: myIntents });

client.commands = new Collection();
//Returns array of all js files in ./commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//adds all found commands to client.commands collection
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
    client.user.setActivity('/verify', { type: 'LISTENING' });
    //Lets the web server parse JSON files
    app.use(express.json());

    //Accepts post requests to the /verify URL
    app.post('/verify', async (req, res) => {
        if (req.headers.authorization !== `Bearer ${verifiedAuthValue}`) {
            res.status(401).send('Unauthorised');
            return;
        }
        console.log(req.body);
        res.end();

        //Search all members within a guild
        const guild = await client.guilds.fetch(guildID);
        const allMembers = await guild.members.fetch();

        //Checks all members for one that shares the same username as the request
        const member = allMembers.find(member => member.user.tag === req.body.discordtag);
        if(!member) return;

        //Sets role for found member
        await member.roles.add(verifiedID);
        await member.send("You have been successfully verified!");
    })
    //Sends message to anyone visiting the VM IP
    app.get("/", (req,res)=>{
        res.send("For students, by Koder!");
    })
    app.listen(8080);

    console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    //Use client.commands collection setup to retrieve and execute commands
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

// Login to Discord with your client's token
client.login(token);
