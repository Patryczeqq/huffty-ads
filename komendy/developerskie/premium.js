const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`Premium!`, client.user.avatarURL())
        .setTimestamp()
        .setFooter(`Użył: ${message.author.tag}(${message.author.id})`, client.user.avatarURL())

    if (!client.config.developerzy.includes(message.author.id)) {
        embed.setDescription("Nie jesteś developerem.")
        return message.channel.send(embed)
    }

    const o = args[0]
    const id = args[1];

    if (!o || !o === "nadaj" || !o === "n" || !o === "odbierz" || !o === "o") {
        embed.setDescription(`Użycie: ${client.config.prefix}\`premium [nadaj/odbierz] [ID]\`.`)
        return message.channel.send(embed)
    }

    if (!id) {
        embed.setDescription("Nie podałeś id reklamy.")
        return message.channel.send(embed)
    }

    const db = client.db;
    const x = `SELECT * FROM reklamy WHERE rowid="${id}"`

    db.all(x, (err, rows) => {
        if (rows.length === 0) {
            embed.setDescription("Nie ma reklamy o podanym id.")
            return message.channel.send(embed)
        } else {
            if (o === "nadaj" || o === "n") {
                db.run(`UPDATE reklamy SET premium="TAK" WHERE rowid="${id}"`)
                embed.setDescription(`Pomyślnie nadano premium serwerowi o id \`${id}\`.`)
                message.channel.send(embed)

                rows.forEach((row) => {
                    embed.setDescription(`Serwer o id: \`${id}\`(\`${client.guilds.cache.get(row.serwer).name}\`) dostał premium!`)
                    client.channels.cache.get(client.config.logch).send(embed)
                })
                return
            }

            if (o === "odbierz" || o === "o") {
                db.run(`UPDATE reklamy SET premium="NIE" WHERE rowid="${id}"`)
                embed.setDescription(`Pomyślnie odebrano premium serwerowi o id \`${id}\`.`)
                message.channel.send(embed)

                rows.forEach((row) => {
                    embed.setDescription(`Premium zostało odebrane serwerowi o id: \`${id}\`(\`${client.guilds.cache.get(row.serwer).name}\`)!`)
                    client.channels.cache.get(client.config.logch).send(embed)
                })
                return
            }
        }
    })
};

exports.info = {
    name: "premium",
    aliases: ["pre"]
};