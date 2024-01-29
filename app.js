import express from "express";

import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

import { showMenu, closeMenu } from "./functions/menu.js";
import { getWeather } from "./functions/weather.js";
import { getCat } from "./functions/cat.js";

export const app = express();

app.get("/", (req, res) => {
  res.send(
    "Hello World!<br><br>The Bot <a href='https://t.me/TestBotTheCatBot'>@TestBotTheCatBot</a> is alive!!!"
  );
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// =============== Bot ===============
const bot = new Telegraf(process.env.BOT_TOKEN, {});

bot.start((ctx) => ctx.reply('Welcome to the bot! To start, write: "menu"'));

bot.on(message, async (ctx) => {
  const chatId = ctx.chat.id;

  if (ctx.message.text == "menu") {
    showMenu(bot, chatId);
  } else if (ctx.message.location) {
    let weather = await getWeather(ctx);
    ctx.reply(weather);
  } else if (ctx.message.text == "Get the cat") {
    let cat = await getCat();
    ctx.reply(cat);
  } else {
    closeMenu(bot, chatId);
  }
});

https: bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
