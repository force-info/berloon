const { MessageEmbed } = require("discord.js")
const { color } = require("../../config.js");

module.exports = {
  name:`help`,
  description: 'Felling Lost?',
  type: 'CHAT_INPUT',
  botperms:["EMBED_LINKS"],
  cooldown:10,
  run:async(client, interaction,args) => {
   
    let embed = new MessageEmbed()   
    .setAuthor({ name: client.user.username })
    .setColor(color)
    .addField("Moderator:", `active, activeconfig, autoline, autoreaction, autoreply, autorole, lock, kick, hide, greet, clear, ban, timeout, role, mute, move, untimeout, unmute, unlock, unhide, unban, welcomeconfig, vkick`)
    .addField("General:", `help, ping, invite, avatar, bot, bots, banneruser, bannerserver, roles, server, user, tax`)
    .addField("Funny:", `math, letters, fkk, fast, cutTweet, capitals, top, reverse, points, plural, numbers`)
    .setFooter({ text: "Requested by " + interaction.user.tag,iconURL:interaction.user.displayAvatarURL({ dynamic: true }) })
    interaction.reply({ embeds: [embed] }).catch(err => 0)
  }
}
