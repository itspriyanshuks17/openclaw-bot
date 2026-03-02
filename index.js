require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const { Telegraf } = require("telegraf");
const winston = require("winston");

// ============================================
// LOGGER CONFIGURATION
// ============================================
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

// ============================================
// DISCORD BOT
// ============================================
const discordClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

discordClient.once("ready", () => {
  logger.info(`Discord Bot logged in as ${discordClient.user.tag}`);
});

discordClient.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const prefix = process.env.PREFIX || "!";
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    await message.reply(`Pong! 🏓 (${discordClient.ws.ping}ms)`);
  }
});

// ============================================
// TELEGRAM BOT
// ============================================
const telegramBot = new Telegraf(process.env.TELEGRAM_TOKEN);

telegramBot.start((ctx) => {
  ctx.reply("Welcome to OpenClaw Bot! 🎮");
});

telegramBot.help((ctx) => {
  ctx.reply("Commands:\n/start - Start the bot\n/ping - Check latency");
});

telegramBot.command("ping", (ctx) => {
  ctx.reply("Pong! 🏓");
});

// ============================================
// STARTUP
// ============================================
async function startBots() {
  try {
    // Start Discord
    if (process.env.DISCORD_TOKEN) {
      await discordClient.login(process.env.DISCORD_TOKEN);
    } else {
      logger.warn("DISCORD_TOKEN not found in .env. Skipping Discord login.");
    }

    // Start Telegram
    if (process.env.TELEGRAM_TOKEN && process.env.TELEGRAM_TOKEN !== "your_telegram_bot_token_here") {
      telegramBot.launch();
      logger.info("Telegram Bot launched");
    } else {
      logger.warn("TELEGRAM_TOKEN not found or is placeholder in .env. Skipping Telegram launch.");
    }

    logger.info("Bots initialization complete.");
  } catch (error) {
    logger.error(`Error during startup: ${error.message}`);
  }
}

// Global error handling
process.on("unhandledRejection", (error) => {
  logger.error(`Unhandled Rejection: ${error.message}`);
});

startBots();
