module.exports = {
	name: 'guildCreate',
  run:async(client, guild)=> {
   client.channels.cache.get("994534267780595755").send(`Joined: ${guild.name}`)
  }
}
