const { Command } = require('discord-akairo');

class AddCommand extends Command {
    constructor() {
        super('추가', {
            aliases: ['add', 'a'],
            channelRestriction: 'guild',
            userPermissions : 'BAN_MEMBERS',
            args: [
              {
                id: 'member',
                type: 'member',
              }
            ]
        });
    }

    exec(message, args) {
      message.delete();
      if(!args.member){
        return message.reply('유저ID를 입력해주세요.');
      }
      if(message.channel.parentID == 390007107010822145){
        message.channel.overwritePermissions(args.member, {
        VIEW_CHANNEL: true,
      })
        .then(function(){
          return message.reply('유저 추가 완료.');
        })
        .catch(function(){
          return message.reply('유저 추가 실패.');
        });
      }
    }
}

module.exports = AddCommand;
