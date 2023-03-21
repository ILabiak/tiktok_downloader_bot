"use strict";

require("dotenv").config();
const Telegraf = require("telegraf");
const Extra = require("telegraf/extra");
const Markup = require("telegraf/markup");
const session = require("telegraf/session");
const TikTokScraper = require("tiktok-scraper-ts");

const bot = new Telegraf(process.env.BOT_TOKEN);

const urlRegex =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

bot.start((ctx) => ctx.reply("start"));

bot.use(session());
bot.catch((err) => {
  console.log(err);
});

bot.hears(urlRegex, async (ctx) => {
  const link = ctx.match[0];
  if (link.includes("tiktok.com")) {
    try {
      const videoData = await TikTokScraper.fetchVideo(link, true);
      console.log(videoData);
      const videoLink = videoData.downloadURL;

      console.log(videoLink);
      ctx.replyWithVideo(
        { url: videoLink },
        {
          reply_to_message_id: ctx.update.message.message_id,
          duration: videoData.duration,
          width: videoData.width,
          height: videoData.height,
          thumbnail: {url: videoData.cover},
          supports_streaming: true
        }
      );
    } catch (err) {
      console.log(err);
      ctx.reply("Some error");
    }
    return;
  }
  ctx.reply("got a link (not a tiktok)");
});

bot.launch();

process.on("uncaughtException", function (err) {
  console.log("Caught exception: ", err);
});
