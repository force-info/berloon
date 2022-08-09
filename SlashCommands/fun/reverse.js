const Discord = require("discord.js")
let words = require("../../json/games/letters.json")
let Functions = require("../../Functions/utils.js")
const Canvas = require("canvas")
const Module = require("../../DataBase/models/guild.js")
module.exports = {
  name:`reverse`,
  description: 'Reverse the word.',
  type: 'CHAT_INPUT',
  botperms:["ATTACH_FILES"],
  cooldownGames:true,
  run:async(client, interaction,args,guildData) => {
    let cooldown = client.cooldownGames.get(interaction.commandName)
    let c = words[Math.floor(Math.random() * words.length)];
    let question = "Try to write the word correctly"
    let canvas = await Functions.createFunCanvas(c,question,"15")
    let attachment = new Discord.MessageAttachment(canvas, 'reverse.png');

    let filter = response => c.split("").reverse().join("") === response.content.toLowerCase()
       interaction.reply({files:[attachment]}).then(() => {
           let time = Date.now() + 15000;
           cooldown.set(interaction.channel.id,true);
  	interaction.channel.awaitMessages({filter,  max: 1, time: 15000, errors: ['time'] }).then(async(collected) =>{
        time = (time - Date.now()) /1000;
        let author = collected.first().author
       interaction.followUp({content:`> **Congratulations! The winner is ${author}, he typed the word backwards ${time.toFixed(2)} seconds!**`})
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
        cooldown.delete(interaction.channel.id);
      }).catch(collected => {
        interaction.followUp({content:`> **Time's up, no one won..**`});
        cooldown.delete(interaction.channel.id);
      });
    })
        
  }
}
