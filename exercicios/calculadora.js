const env = require('../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const bot = new Telegraf(env.token)

let contagem = [0,'']
let indice = 0
let operator = ['', '+', '-', '*', '/']
let i = 0

const botoes = Extra.markup(Markup.inlineKeyboard([
    Markup.callbackButton('1', 'val 1'),
    Markup.callbackButton('2', 'val 2'),
    Markup.callbackButton('3', 'val 3'),
    Markup.callbackButton('+', 'add1'),
    Markup.callbackButton('4', 'val 4'),
    Markup.callbackButton('5', 'val 5'),
    Markup.callbackButton('6', 'val 6'),
    Markup.callbackButton('-', 'sub1'),
    Markup.callbackButton('7', 'val 7'),
    Markup.callbackButton('8', 'val 8'),
    Markup.callbackButton('9', 'val 9'),
    Markup.callbackButton('*', 'mult1'),
    Markup.callbackButton('0', 'val 0'),
    Markup.callbackButton('🔄 Zerar', 'reset'),
    Markup.callbackButton('=', 'result'),
    Markup.callbackButton('/', 'div1')
], { columns: 4 }))

bot.start(async ctx => {
    const nome = ctx.update.message.from.first_name
    await ctx.reply(`Seja bem vindo, ${nome}!`)
    await ctx.reply(`${contagem[0]}`, botoes)
})

bot.action(/val (\d+)/, ctx => {
    if(contagem[indice] == '')
        contagem[indice] = 0
    contagem[indice] *= 10
    contagem[indice] += parseInt(ctx.match[1])
    ctx.editMessageText(`${contagem[0]} ${operator[i]} ${contagem[1]}`, botoes)
})

bot.action('add1', ctx => {
    if(indice == 0){
        i = 1
        indice = 1
        ctx.editMessageText(`${contagem[0]} ${operator[i]}`, botoes)
    } else {
        if(contagem[1] != '') {
            switch (i){
                case 1:
                    contagem[0] = contagem[0] + contagem[1]
                    break;
                case 2:
                    contagem[0] = contagem[0] - contagem[1]
                    break;
                case 3:
                    contagem[0] = contagem[0] * contagem[1]
                    break;
                case 4:
                    contagem[0] = contagem[0] / contagem[1]
                    break;
            }
        }
        contagem[1] = ''
        i = 1
        ctx.editMessageText(`${contagem[0]} ${operator[i]}`, botoes)
    }
})

bot.action('sub1', ctx => {
    if(indice == 0){
        i = 2
        indice = 1
        ctx.editMessageText(`${contagem[0]} ${operator[i]}`, botoes)
    } else {
        if(contagem[1] != '') {
            switch (i){
                case 1:
                    contagem[0] = contagem[0] + contagem[1]
                    break;
                case 2:
                    contagem[0] = contagem[0] - contagem[1]
                    break;
                case 3:
                    contagem[0] = contagem[0] * contagem[1]
                    break;
                case 4:
                    contagem[0] = contagem[0] / contagem[1]
                    break;
            }
        }
        contagem[1] = ''
        i = 2
        ctx.editMessageText(`${contagem[0]} ${operator[i]}`, botoes)
    }
})

bot.action('mult1', ctx => {
    if(indice == 0){
        i = 3
        indice = 1
        ctx.editMessageText(`${contagem[0]} ${operator[i]}`, botoes)
    } else {
        if(contagem[1] != '') {
            switch (i){
                case 1:
                    contagem[0] = contagem[0] + contagem[1]
                    break;
                case 2:
                    contagem[0] = contagem[0] - contagem[1]
                    break;
                case 3:
                    contagem[0] = contagem[0] * contagem[1]
                    break;
                case 4:
                    contagem[0] = contagem[0] / contagem[1]
                    break;
            }
            contagem[1] = ''
        }
        i = 3
        ctx.editMessageText(`${contagem[0]} ${operator[i]}`, botoes)
    }
})

bot.action('div1', ctx => {
    if(indice == 0){
        i = 4
        indice = 1
        ctx.editMessageText(`${contagem[0]} ${operator[i]}`, botoes)
    } else {
        if(contagem[1] != '') {
            switch (i){
                case 1:
                    contagem[0] = contagem[0] + contagem[1]
                    break;
                case 2:
                    contagem[0] = contagem[0] - contagem[1]
                    break;
                case 3:
                    contagem[0] = contagem[0] * contagem[1]
                    break;
                case 4:
                    contagem[0] = contagem[0] / contagem[1]
                    break;
            }
            contagem[1] = ''
        }
        i = 4
        ctx.editMessageText(`${contagem[0]} ${operator[i]}`, botoes)
    }
})

bot.action('reset', ctx => {
    if(contagem[0] != 0) {
        contagem = [0, '']
        indice = 0
        i = 0
        ctx.editMessageText(`${contagem[0]}`, botoes)
    }
    contagem = [0, '']
    indice = 0
    i = 0
})

bot.action('result', ctx => {
    switch (i){
        case 1:
            contagem[0] = contagem[0] + contagem[1]
            break;
        case 2:
            contagem[0] = contagem[0] - contagem[1]
            break;
        case 3:
            contagem[0] = contagem[0] * contagem[1]
            break;
        case 4:
            contagem[0] = contagem[0] / contagem[1]
            break;
    }
    contagem[1] = ''
    i = 0
    indice = 0
    ctx.editMessageText(`${contagem[0]}`, botoes)
})

bot.startPolling()