const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`Weryfikacja!`, client.user.avatarURL())
        .setTimestamp()
        .setFooter(`Użył: ${message.author.tag}(${message.author.id})`, client.user.avatarURL())

    if (!client.config.weryfikatorzy.includes(message.author.id)) {
        embed.setDescription("Nie jesteś weryfikatorem.")
        return message.channel.send(embed)
    }

    const id = args[0];

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
            db.run(`UPDATE reklamy SET weryfikacja="TAK" WHERE rowid="${id}"`)
        }

        embed.setDescription(`Pomyślnie zweryfikowano reklamę serwera o id \`${id}\`.`)
        message.channel.send(embed)

        rows.forEach((row) => {
            embed.setDescription(`Pomyślnie zweryfikowano reklamę serwera o id: \`${id}\`(\`${client.guilds.cache.get(row.serwer).name}\`)!`)
            client.channels.cache.get(client.config.logch).send(embed)
        })
    });
};

exports.info = {
    name: "weryfikuj",
    aliases: ["weryfikacja", "wer", "zweryfikuj", "zwer", "accept", "acc", "akceptuj"]
};
