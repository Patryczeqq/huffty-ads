const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    const succes_embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`Jak ustawić!`, client.user.avatarURL())
        .addField(":one: **Ustawienie kanału:**", `Ustawiamy kanał komendą: \`${client.prefix}kanał [kanał]\`.\nPrzykład: \`${client.prefix}kanał #reklamy\`.`, false)
        .addField("**W razie komplikacji:**", `W razie komplikacji/problemów można wejść na [support](XYZ) i poprosić kogoś o pomoc.`, false)
        .setTimestamp()
        .setFooter(`Użył: ${message.author.tag}(${message.author.id})`, client.user.avatarURL())
    message.channel.send(succes_embed)
};

exports.info = {
    name: "jakustawić",
    aliases: ["ustawienia", "settings", "set", "ustaw", "jak", "jakustawic"]
};
