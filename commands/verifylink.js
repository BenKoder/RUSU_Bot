const { SlashCommandBuilder } = require('@discordjs/builders');
//verify module
module.exports = {
    data: new SlashCommandBuilder()
        .setName('verifylink')
        .setDescription('Get the link to be verified'),
    async execute(interaction) {
        return interaction.reply({content: 'Complete this form to get verified: https://forms.office.com/r/UBKCGPwfEF', ephemeral: true});
    },
};
