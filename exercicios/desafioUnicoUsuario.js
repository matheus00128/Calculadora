const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)

bot.start(ctx => {
    const from = ctx.update.message.from
    console.log(from)
    ctx.reply(`Seja bem vindo, ${from.first_name}!`)
    if(from.id == env.client)
    ctx.reply(`Ao seu dispor, mestre!`)
    else
    ctx.reply(`Sinto muito, mas eu só falo com meu mestre!`)
})

bot.startPolling()