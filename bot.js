"use strict";

require("dotenv").config();
const Telegraf = require("telegraf");
const Extra = require("telegraf/extra");
const Markup = require("telegraf/markup");
const session = require("telegraf/session");

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start(async (ctx) => ctx.reply("start"));


bot.use(session());
bot.catch((err) => {
  console.log(err);
});

bot.launch();

process.on("uncaughtException", function (err) {
  console.log("Caught exception: ", err);
});
