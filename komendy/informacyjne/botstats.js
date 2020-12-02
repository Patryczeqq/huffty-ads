const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    const em = [];
    client.guilds.cache.forEach(g => {
        g.roles.cache.forEach(r => em.push(r.id));
    });
    const role = em.length;

    const s = new Discord.MessageEmbed()
        .setAuthor(`Statystyki ${client.user.tag}:`, client.user.avatarURL())
        .addField(
            "Ilość serwerów:",
            "```" + client.guilds.cache.size + "```",
            false
        )
        .addField(
            "Ilość użytkowników:",
            "```" + client.users.cache.size + "```",
            false
        )
        .addField(
            "Ilość kanałów:",
            "```" + client.channels.cache.size + "```",
            false
        )
        .addField("Ilość emoji:", "```" + client.emojis.cache.size + "```", false)
        .addField("Ilość ról:", "```" + role + "```", false)
        .addField("Ilość komend:", "```" + client.commands.size + "```", false)
        .addField("Discord.js:", "```" + Discord.version + "v```", false)
        .addField("Node:", "```" + process.version + "v```", false)
        .addField("Pamięć:", "```" + (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + " MB```", false)
        .addField("Ping:", "```" + client.ws.ping + "```", false)
        .setColor("RANDOM")
        .setFooter(`Użył: ${message.author.tag}(${message.author.id})`, client.user.avatarURL())
        .setTimestamp()
    message.channel.send(s);
};

exports.info = {
    name: "botstat",
    aliases: ["bot", "botstats", "botinfo"],
};
