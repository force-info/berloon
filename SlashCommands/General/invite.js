const { MessageEmbed } = require("discord.js")

module.exports = {
  name:`invite`,
  description: 'invite the bot',
  type: 'CHAT_INPUT',
  cooldown:10,
  run:async(client, interaction,args) => {
    console.log(args)
    interaction.reply({
      content:`Invite:\n https://discord.com/api/oauth2/authorize?client_id=938887993006108713&permissions=1102195181878&scope=bot%20applications.commands`
    }).catch(err => 0)
  }
}
