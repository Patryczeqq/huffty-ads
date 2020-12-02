const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`Zgłoś!`, client.user.avatarURL())
        .setTimestamp()
        .setFooter(`Użył: ${message.author.tag}(${message.author.id})`, client.user.avatarURL())

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
        }

        embed.setDescription("Reklama została zgłoszona.")
        message.channel.send(embed)

        rows.forEach((row) => {
            embed.setDescription(`ID: \`${row.serwer}; ${id}\`\nZaproszenie: [${client.guilds.cache.get(row.serwer).name}](https://discord.gg/${row.zaproszenie})\nZweryfikowana: \`${row.weryfikacja}\`\nReklama:\n${row.reklama}`)
            client.channels.cache.get(client.config.verch).send(embed)
        })
    });
};

exports.info = {
    name: "zgłoś",
    aliases: ["report", "zglos", "zgłos", "zgloś"]
};
