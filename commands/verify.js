const { SlashCommandBuilder } = require('@discordjs/builders');
//verify module
module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Get the link to be verified'),
    async execute(interaction) {
        return interaction.reply({content: 'Complete this form to get verified:\nhttps://forms.office.com/r/UBKCGPwfEF', ephemeral: true});
    },
};
