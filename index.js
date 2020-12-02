const { Client, Collection } = require("discord.js");
const sqlite3 = require('sqlite3').verbose();

const config = require("./config.json");

const client = new Client();
client.config = config;
client.prefix = config.prefix;
client.db = new sqlite3.Database('./baza.db');

["commands", "aliases"].forEach(x => (client[x] = new Collection()));

["./handler/wydarzenia.js", "./handler/komendy.js"].forEach(x => require(x)(client));

client.login(config.token);