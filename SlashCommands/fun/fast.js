const Discord = require("discord.js")
let words = require("../../json/games/fast.json")
const Canvas = require("canvas")
const Module = require("../../DataBase/models/guild.js")
let Functions = require("../../Functions/utils.js")
const { color } = require("../../config.js");

module.exports = {
  name:`fast`,
  description: 'fast typing.',
  type: 'CHAT_INPUT',
  botperms:["ATTACH_FILES"],
  cooldownGames:true,
  run:async(client, interaction,args,guildData) => {
    let cooldown = client.cooldownGames.get(interaction.commandName)
    let c = words[Math.floor(Math.random() * words.length)];
    let question = "Try to write the word before the time runs out"
    let canvas = await Functions.createFunCanvas(c,question,"15")
    let attachment = new Discord.MessageAttachment(canvas, 'fast.png');
    let filter = response => c.toLowerCase()=== response.content.toLowerCase()
    interaction.reply({
      files:[attachment]
    }).then(() => {
      cooldown.set(interaction.channel.id,true);
      let time = Date.now() + 15000;
	    interaction.channel.awaitMessages({
        filter,  max: 1, time: 15000, errors: ['time']      }).then(async(collected) =>{
        time = (time - Date.now()) /1000;
        let author = collected.first().author;
        interaction.followUp({content:`> **Congratulations! The winner is ${author}, he wrote the word ${time.toFixed(2)} seconds before the time runs out!**`})
        let points = guildData.funPoints;
        let data = points.find(c => c.userID === author.id)
        if(!data){
          let obj = {
            userID:author.id,
            points:1,
          }
          points.push(obj)
          guildData.save()
        }else {
          data.points +=1
          points[points.indexOf(data)] = data
          await Module.findOneAndUpdate({guildID:interaction.guild.id},{funPoints:points})
        }
        cooldown.delete(interaction.channel.id);;
      }).catch(collected => {
        interaction.followUp({content:`> **Time's up, no one won..**`});
        cooldown.delete(interaction.channel.id);
      });
    })
  }
}
