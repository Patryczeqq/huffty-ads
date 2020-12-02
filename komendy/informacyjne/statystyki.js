const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    const db = client.db;
    const x = `SELECT * FROM reklamy WHERE serwer="${message.guild.id}"`

    db.all(x, (err, rows) => {
        if (rows.length === 0) {
            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(`Statystyki!`, client.user.avatarURL())
                .addField("**Zaproszenie:**", "**BRAK**", false)
                .addField("**Kanał:**", "**BRAK**", false)
                .addField("**Cykl:**", "**BRAK**", false)
                .addField("**Reklama:**", "**BRAK**", false)
                .setTimestamp()
                .setFooter(`Użył: ${message.author.tag}(${message.author.id})`, client.user.avatarURL())
            message.channel.send(embed)
        }

        rows.forEach((row) => {
            const kanal = client.channels.cache.get(row.kanal)
            let premium = row.premium;
            if (premium === "NIE") {
                premium = "non-premium"
            } else {
                premium = "premium"
            }

            const embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(`Statystyki!`, client.user.avatarURL())
                .addField("**Zaproszenie:**", "https://discord.gg/" + row.zaproszenie, false)
                .addField("**Kanał:**", kanal, false)
                .addField("**Cykl:**", premium, false)
                .addField("**Reklama:**", row.reklama, false)
                .setTimestamp()
                .setFooter(`Użył: ${message.author.tag}(${message.author.id})`, client.user.avatarURL())
            message.channel.send(embed)
        })
    });
};

exports.info = {
    name: "statystyki",
    aliases: ["statystyka", "stats", "statsy", "staty"]
};
