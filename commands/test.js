const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const path = require('path');
const config = require(path.join(__dirname, '../config.json'));

const guilds = ['305654198341730304', '334858657785184256', '334877020364341251', '334877121761771520', '333576528686219266'];

class TestCommand extends Command {
    constructor() {
        super('test', {
           aliases: ['test'],
           userPermissions : 'BAN_MEMBERS',
           channelRestriction: 'guild'
        });
    }

    async exec(message, args) {
      message.guild.roles.forEach(function(r){
        console.log(r.id + " // " + r.name);
      });
    }
}
module.exports = TestCommand;
