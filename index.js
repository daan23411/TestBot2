const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const command = require('./command')
const firstMessage = require('./first-message')
const privateMessage = require('./private-message')

client.on('ready', () => {
    console.log('The client is ready for commands')

    firstMessage(client, '805216410703364107', 'hello world!!!', ['🔥', '🍉'])

    privateMessage(client, 'ping', 'Pong!')

    privateMessage(client, 'help', 'DM a staff member to get help.')

    command(client, 'createtext', (message) => {
        const name = message.content.replace('!createtext', '')

        message.guild.channels.create(name, {
            type: 'text'
        }).then(channel => {
            const categoryId = '713368626190876714'
            channel.setParent(categoryId)
        })
    })

    command(client, 'createvoice', (message) => {
        const name = message.content.replace('!createvoice ', '')

        message.guild.channels.create(name, {
            type: 'voice'
        }).then(channel => {
            const categoryId = '713368626190876714'
            channel.setParent(categoryId)
            channel.setUserLimit(10)
        })
    })

    command(client, ['ping', 'test'], message => {
        message.channel.send('Pong!')
    })

    command(client, 'servers', message => {
        client.guilds.cache.forEach((guild) => {
            message.channel.send(`${guild.name} has a total of ${guild.memberCount} members`)
        }) 
    })
    
    command(client, ['cc', 'clearchannel'], (message) => {
        if(message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results)
            })
        }
    })

    command(client, 'setstatus', (message) => {
        const content = message.content.replace('!setstatus ', '')

        client.user.setPresence({
            activity: {
                name: content,
                type: 0,
            },
        })
    })
});

client.login(config.token)