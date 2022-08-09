const { MessageEmbed } = require("discord.js")
const package = require("../../package.json");
const { color } = require("../../config.js");

module.exports = {
  name:`bot`,
  description: 'get info about this bot',
  type: 'CHAT_INPUT',
  botperms:["EMBED_LINKS"],
  cooldown:10,
  run:async(client, interaction,args) => {
    let discordJSVersion = package.dependencies["discord.js"];
    let embed = new MessageEmbed()                      .setAuthor({name:client.user.username})
    .setColor(color)
    .setDescription(`**Servers:** ${client.guilds.cache.size}\n**Channels:** ${client.channels.cache.size}\n**Users:** ${client.users.cache.size}\n**Library:** Discord JS ${discordJSVersion.slice(1,discordJSVersion.length)}\n**Node.js:** ${process.version}\n**Uptime:** <t:${Math.floor((Date.now() - client.uptime)/1000)}:R>\nPing: **${client.ws.ping}**`)
    .addField(`Owner:`, `**Matheros#2989**`,true)
    .setFooter({text:"Requested by " + interaction.user.tag,iconURL:interaction.user.displayAvatarURL({ dynamic: true })})
    interaction.reply({embeds:[embed]}).catch(err => 0)
  }
}
