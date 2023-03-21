"use strict";

require("dotenv").config();
const Telegraf = require("telegraf");
const Extra = require("telegraf/extra");
const Markup = require("telegraf/markup");
const session = require("telegraf/session");

const bot = new Telegraf(process.env.BOT_TOKEN);

const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

bot.start((ctx) => ctx.reply("start"));

bot.use(session());
bot.catch((err) => {
  console.log(err);
});

bot.hears(urlRegex, async (ctx) => {
    const link  = ctx.match[0]
    if(link.includes('tiktok.com')){
        ctx.reply('tiktok link')
        return;
    }
    ctx.reply('got a link (not a tiktok)')
})

bot.launch();

process.on("uncaughtException", function (err) {
  console.log("Caught exception: ", err);
});
