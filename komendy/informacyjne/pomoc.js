const Discord = require("discord.js");

exports.run = async (client, message, args) => {

    const succes_embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`Menu pomocy!`, client.user.avatarURL())
        .addField("**Informacyjne:**", `\`${client.config.prefix}botstats\` -> statystyki bota\n\`${client.config.prefix}jakustawić\` -> pokazuje krok po kroku, jak poprawnie ustawić bota\n\`${client.config.prefix}statystyki\` -> informacje i podgląd ustawień serwerowych bota\n\`${client.config.prefix}zgłoś [id]\` -> zgłasza reklamę`, false)
        .addField("**Konfiguracyjne:**", `\`${client.config.prefix}kanał [kanał]\` -> ustawia kanał z reklamami\n\`${client.config.prefix}reklama [reklama]\` -> ustawia serwerową reklamę`, false)
        .setDescription(`[support](${client.config.support}), [zaproszenie](${client.config.zaproszenie})`)
        .setTimestamp()
        .setFooter(`Użył: ${message.author.tag}(${message.author.id})`, client.user.avatarURL())
    message.channel.send(succes_embed)
};

exports.info = {
    name: "pomoc",
    aliases: ["p", "h", "help"]
};
