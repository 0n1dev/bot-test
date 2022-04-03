const { Permissions } = require('discord.js');
const { Listener } = require('discord-akairo');

class RawListener extends Listener {
    constructor() {
        super('raw', {
            emitter: 'client',
            event: 'raw'
        });
    }

    async exec(event) {
       const events = {
         MESSAGE_REACTION_ADD: 'messageReactionAdd',
         MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
       };

       if (!events.hasOwnProperty(event.t)) return;

       const { d: data } = event;
       const user = this.client.users.resolve(data.user_id);
       const guild = this.client.guilds.resolve(data.guild_id);
       const g_user = guild.members.resolve(user.id);
       const channel = this.client.channels.resolve(data.channel_id) || await user.createDM();
       const message = await channel.messages.fetch(data.message_id);
       const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
       const reaction = message.reactions.resolve(emojiKey);

       if(guild.id == '305654198341730304' && channel.id == '533937326540324864' && message.id == '533937969846026250' && emojiKey == '✅'){
         if (!g_user) {
           return;
         }
         
         if(g_user.voice.channelID){
           const v_channel = guild.channels.resolve(g_user.voice.channelID);
           if(v_channel.parentID == '534697401043124240'){

            const user_permission = v_channel.permissionsFor(g_user.id);
             if(user_permission.has(Permissions.FLAGS.MANAGE_CHANNELS)){
              const permission = v_channel.permissionsFor(guild.roles.everyone.id);;
              if(permission.has(Permissions.FLAGS.VIEW_CHANNEL)){
                // const channel_name = '🔴'+ v_channel.name.substring(2,v_channel.name.length)
                await v_channel.edit({
                  // name: channel_name,
                  permissionOverwrites: [
                    {
                      id: guild.roles.everyone.id,
                      deny: [Permissions.FLAGS.VIEW_CHANNEL]
                    },
                    {
                      id: g_user.id,
                      allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.MANAGE_CHANNELS]
                    }
                  ]
                })
                .then(function() {
                  // if(v_channel.name.indexOf('🔵') == 0){
                  //   return v_channel.setName('🔴'+ v_channel.name.substring(2,v_channel.name.length));
                  // }
                  // return v_channel.setName('🔴'+ v_channel.name);
                })
                .catch(console.error)
              }else{
                // const channel_name = '🔵'+ v_channel.name.substring(2,v_channel.name.length)
                v_channel.edit({
                  // name: channel_name,
                  permissionOverwrites: [
                    {
                      id: guild.roles.everyone.id,
                      allow: [Permissions.FLAGS.VIEW_CHANNEL]
                    },
                    {
                      id: g_user.id,
                      allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.MANAGE_CHANNELS]
                    }
                  ]
                })
                .then(function() {
                  // if(v_channel.name.indexOf('🔴') == 0){
                  //   return v_channel.setName('🔵'+ v_channel.name.substring(2,v_channel.name.length));
                  // }
                  
                  // return v_channel.setName('🔵'+ v_channel.name);
                })
                .catch(console.error)
              }
             }
           }
         }
       }
    }
}

module.exports = RawListener;
