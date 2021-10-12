const { SlashCommandBuilder } = require('@discordjs/builders');
//signup module
module.exports = {
    data: new SlashCommandBuilder()
        .setName('signup')
        .setDescription('Get the link to become a RUSU member'),
    async execute(interaction) {
        return interaction.reply({content: 'Get your RUSU membership here:\nhttps://rusu.rmit.edu.au/membership', ephemeral: true});
    },
};