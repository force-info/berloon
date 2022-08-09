const { MessageEmbed } = require("discord.js")
module.exports = {
  name:`points`,
  description: 'To display your points on the server.',
  type: 'CHAT_INPUT',
  options:[
    {
      name:"user",
      description: "The user to display his points.",
      type:"USER",
      required:false,
    }
  ],  
  run:async(client, interaction,args,guildData) => {
    let user = interaction.options.getMember("user")|| interaction.member;
    let points = guildData.funPoints.find(c => c.userID === user.id)?.points || 0
    let obj = guildData.funPoints.find(c => c.userID === user.id)
    if(!obj) return interaction.reply({content:`> No points have been scored for: ${user.id === interaction.user.id ? "K" : `${user}`} in this server`})
    let rank = guildData.funPoints.sort((a,b) => b.points - a.points).findIndex(m=> m.userID === user.id) + 1;
    console.log(rank,obj)
     interaction.reply({content:`> **${user.id === interaction.user.id ? "You are" : `${user}`} Ranked No. [${rank}] with a total of \`${obj.points}\` points**`})
   
    
    
  }
}
