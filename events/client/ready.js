module.exports = {
	name: 'ready',
  run:async(client)=> {
   client.user.setActivity(`/help Full slash Commands - Matheros`, { type: "PLAYING" })
    console.log(`-> Logged in as ${client.user.tag}`)
    console.log(`-> To get help https://discord.gg/bfDwf4u6hM`)
  }
}
