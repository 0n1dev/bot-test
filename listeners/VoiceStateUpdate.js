
const { Permissions } = require('discord.js');
const { Listener } = require('discord-akairo');

class VoiceStateUpdateListener extends Listener {
    constructor() {
        super('voiceStateUpdate', {
            emitter: 'client',
            event: 'voiceStateUpdate'
        });
    }

    async exec(oldMember, newMember) {
      if(oldMember.channelID){
        const v_channel = await oldMember.guild.channels.resolve(oldMember.channelID);
        if(v_channel.parentID == '534697401043124240'){
          if(v_channel.members.size == 0){
            v_channel.delete();
          }
        }
      }

      if(newMember.channelID == '533941421808418817'){
        const newChannelName = `${newMember.member.user.username}-${newMember.member.user.discriminator}`;
        const channel = await this.client.guilds.resolve('305654198341730304')
        .channels.create(newChannelName, {
          type: 'voice',
          userLimit: 4,
          // parent: newMember.guild.channels.get(534697401043124240),
        }).then((ch) => {
          ch.setParent('534697401043124240');
          // ch.setUserLimit(4);
          ch.edit({
            permissionOverwrites: [
              {
                id: newMember.guild.roles.everyone.id,
                deny: [Permissions.FLAGS.VIEW_CHANNEL]
              },
              {
                id: newMember.member.id,
                allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.MANAGE_CHANNELS]
              }
            ]
          })

          newMember.member.edit({
            channel: ch.id
          })
        });
      }
    }
}

module.exports = VoiceStateUpdateListener;
