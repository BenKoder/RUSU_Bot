const { SlashCommandBuilder } = require('@discordjs/builders');
//verify module
module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('get the verified role'),
    async execute(interaction) {
        await interaction.reply({content: 'Complete this form to get verified: https://forms.office.com/r/UBKCGPwfEF',
                                 ephemeral: true});
    },
};
