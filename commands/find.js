const Discord = require('discord.js');
const { Command } = require('discord-akairo');

const guilds = ['305654198341730304', '334858657785184256', '334877020364341251', '334877121761771520', '333576528686219266'];

class FindCommand extends Command {
    constructor() {
        super('find', {
           aliases: ['찾기', 'find'],
           userPermissions : 'BAN_MEMBERS',
           args: [
             {
               id: 'member',
               type: 'member',
             }
           ],
           channelRestriction: 'guild'
        });
    }

    async exec(message, args) {
      message.delete();
      if(!args.member){
        return message.reply('유저ID를 입력해주세요.');
      }
      guilds.forEach(function(gid){
        var guild = message.client.guilds.get(gid);
        if(guild){
          var member = guild.members.get(args.member.id);
          if(member){
            if(member.voiceChannel){
              const embed = new Discord.RichEmbed()
                .setAuthor(member.user.username + "#" + member.user.discriminator, member.user.avatarURL)
                .setColor(0x26d6b0)
                .addField("Guild", member.guild.name, true)
                .addField("VoiceChannel", member.voiceChannel.name, true);

              return message.channel.send({embed});
            }
          }
        }
      });
    }
}
module.exports = FindCommand;
