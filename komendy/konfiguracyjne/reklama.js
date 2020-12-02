const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`Reklama!`, client.user.avatarURL())
        .setTimestamp()
        .setFooter(`Użył: ${message.author.tag}(${message.author.id})`, client.user.avatarURL())

    if (!args[0]) {
        embed.setDescription("Nie podano reklamy.")
        return message.channel.send(embed)
    }

    const zakaz = ["discord.gg/", "discord.com/invite/", "discordapp.com/invite/", "linkdo.pl/"]
    for (var z = 0; z < zakaz.length; z++) {
        if (message.content.includes(zakaz[z])) {
            embed.setDescription("Reklama nie powinna zawierać zaproszenia. Bot daje je automatycznie.")
            message.channel.send(embed)
            return
        }
    }

    const zakaz_pingi = ["@everyone", "@here"]
    for (var z = 0; z < zakaz_pingi.length; z++) {
        if (message.content.includes(zakaz_pingi[z])) {
            embed.setDescription("Reklama nie powinna zawierać tzw. pingów.")
            message.channel.send(embed)
            return
        }
    }

    const db = client.db;
    const x = `SELECT * FROM reklamy WHERE serwer="${message.guild.id}"`

    db.all(x, (err, rows) => {
        if (rows.length === 0) {
            embed.setDescription(`Zaleca się pierw ustawienie kanału.`)
            return message.channel.send(embed)
        } else {
            db.run(`UPDATE reklamy SET reklama="${args.join(" ")}", weryfikacja="NIE" WHERE serwer="${message.guild.id}"`)

            embed.setDescription(`Wysłano reklamę do akceptacji.`)
            message.channel.send(embed)

            rows.forEach((a) => {
                db.each(`SELECT rowid AS id FROM reklamy WHERE serwer="${message.guild.id}"`, function (err, row) {
                    const w = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle("Reklama do akceptacji!")
                        .setFooter(`Użył: ${message.author.tag}(${message.author.id})`, client.user.avatarURL())
                        .setDescription(`ID: ${message.guild.id}; ${row.id}\nZaproszenie: [${message.guild.name}](https://discord.gg/${a.zaproszenie})\nUżytkownicy: ${message.guild.memberCount}\nReklama:\n${args.join(" ")}`)
                        .setTimestamp()
                        .setColor("RANDOM")
                    client.channels.cache.get(client.config.verch).send(w)
                })
            });
        }
    });
};

exports.info = {
    name: "reklama",
    aliases: ["ad"],
    perm: "MANAGE_GUILD"
};