# Openclaw Bot

A Discord bot for OpenClaw game server management and community interaction.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Python Version](#python-version)
  - [JavaScript/Node.js Version](#javascriptnodejs-version)
- [Configuration](#configuration)
- [Running the Bot](#running-the-bot)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before installing OpenClaw Bot, ensure you have the following installed:

**For Python Version:**
- **Python 3.8+** - [Download Python](https://www.python.org/downloads/)
- **pip** - Python package manager (included with Python)

**For JavaScript Version:**
- **Node.js 16+** - [Download Node.js](https://nodejs.org/)
- **npm** or **yarn** - Package manager (included with Node.js)

**Common Requirements:**
- **Git** - [Download Git](https://git-scm.com/downloads)
- **Discord Bot Token** - [Create a bot on Discord Developer Portal](https://discord.com/developers/applications)

## Installation

### Python Version

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/openclaw-bot.git
cd openclaw-bot
```

#### 2. Create Virtual Environment

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**Linux/macOS:**
```bash
python3 -m venv venv
source venv/bin/activate
```

#### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### JavaScript/Node.js Version

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/openclaw-bot.git
cd openclaw-bot
```

#### 2. Install Dependencies

**Using npm:**
```bash
npm install
```

**Using yarn:**
```bash
yarn install
```

## Configuration

### 1. Create Configuration File

Copy the example configuration file:

**Windows:**
```bash
copy .env.example .env
```

**Linux/macOS:**
```bash
cp .env.example .env
```

### 2. Set Up Environment Variables

Edit the `.env` file and add your configuration:

```env
DISCORD_TOKEN=your_discord_bot_token_here
GUILD_ID=your_server_id_here
PREFIX=!
```

### 3. Discord Bot Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Navigate to the "Bot" section
4. Click "Add Bot"
5. Copy the bot token and paste it in your `.env` file
6. Enable required intents:
   - Message Content Intent
   - Server Members Intent
   - Presence Intent

### 4. Invite Bot to Server

Generate an invite link with the following permissions:
- Read Messages/View Channels
- Send Messages
- Manage Messages
- Embed Links
- Read Message History

Invite URL format:
```
https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=274878024768&scope=bot%20applications.commands
```

## Running the Bot

### Python Version

**Development Mode:**

```bash
python main.py
```

**Production Mode:**

Using PM2:
```bash
pm2 start main.py --name openclaw-bot --interpreter python3
```

Using systemd (Linux):

1. Create a service file `/etc/systemd/system/openclaw-bot.service`:

```ini
[Unit]
Description=OpenClaw Discord Bot
After=network.target

[Service]
Type=simple
User=your_username
WorkingDirectory=/path/to/openclaw-bot
Environment="PATH=/path/to/openclaw-bot/venv/bin"
ExecStart=/path/to/openclaw-bot/venv/bin/python main.py
Restart=always

[Install]
WantedBy=multi-user.target
```

2. Enable and start the service:

```bash
sudo systemctl enable openclaw-bot
sudo systemctl start openclaw-bot
sudo systemctl status openclaw-bot
```

### JavaScript/Node.js Version

**Development Mode:**

```bash
node index.js
```

Or using npm script:
```bash
npm start
```

**Production Mode:**

Using PM2:
```bash
pm2 start index.js --name openclaw-bot
```

Using systemd (Linux):

1. Create a service file `/etc/systemd/system/openclaw-bot.service`:

```ini
[Unit]
Description=OpenClaw Discord Bot
After=network.target

[Service]
Type=simple
User=your_username
WorkingDirectory=/path/to/openclaw-bot
ExecStart=/usr/bin/node /path/to/openclaw-bot/index.js
Restart=always

[Install]
WantedBy=multi-user.target
```

2. Enable and start the service:

```bash
sudo systemctl enable openclaw-bot
sudo systemctl start openclaw-bot
sudo systemctl status openclaw-bot
```

## Usage

Once the bot is running, you can interact with it using commands:

```
!help          - Display available commands
!ping          - Check bot latency
!status        - Show bot status
```

## Troubleshooting

### Bot doesn't respond
- Verify the bot token is correct in `.env`
- Check that Message Content Intent is enabled
- Ensure the bot has proper permissions in your server

### Import errors (Python)
- Activate virtual environment: `venv\Scripts\activate` (Windows) or `source venv/bin/activate` (Linux/macOS)
- Reinstall dependencies: `pip install -r requirements.txt`

### Module errors (JavaScript)
- Delete `node_modules` folder and `package-lock.json`
- Reinstall dependencies: `npm install` or `yarn install`

### Connection issues
- Check your internet connection
- Verify Discord API status at [Discord Status](https://discordstatus.com/)

## License

MIT License

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
