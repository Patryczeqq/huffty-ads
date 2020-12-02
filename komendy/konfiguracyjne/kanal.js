const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    const db = client.db;
    const x = `SELECT * FROM reklamy WHERE serwer="${message.guild.id}"`

    const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`Kanał!`, client.user.avatarURL())
        .setTimestamp()
        .setFooter(`Użył: ${message.author.tag}(${message.author.id})`, client.user.avatarURL())

    const kanal =
        message.guild.channels.cache.get(args[0]) ||
        message.guild.channels.cache.find(x => x.name === args.join(" ")) ||
        message.mentions.channels.first();

    if (!kanal) {
        embed.setDescription(`Nie podano kanału.`)
        return message.channel.send(embed)
    }

    kanal.createInvite({
        maxAge: 0
    }).then(invite => {
        db.all(x, (err, rows) => {
            if (rows.length === 0) {
                db.run(`INSERT INTO reklamy VALUES(${message.guild.id}, ${kanal.id}, "BRAK", "NIE", "NIE", "${invite.code}")`)
            } else {
                db.run(`UPDATE reklamy SET kanal="${kanal.id}" WHERE serwer="${message.guild.id}"`)
            }
        });

    })

    embed.setDescription(`Ustawiono kanał na ${kanal}`)
    message.channel.send(embed)
};

exports.info = {
    name: "kanał",
    aliases: ["kanal", "channel"],
    perm: "MANAGE_GUILD"
};
