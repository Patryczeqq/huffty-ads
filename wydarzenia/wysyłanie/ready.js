const Discord = require("discord.js")

exports.run = async (client) => {
    const db = client.db;
    var i = 1

    setInterval(() => {
        const kanaly = []

        db.all(`SELECT * FROM reklamy`, (err, rows) => {
            rows.forEach((ro) => {
                kanaly.push(ro.kanal)
                if (!db.each(`SELECT * FROM reklamy WHERE rowid = "${ro.rowid}"`)) i = 1
            })
        });

        db.all(`SELECT * FROM reklamy WHERE rowid = "${i}"`, (err, r) => {
            if (r.length <= 0) return i = 1

            if (r[0].weryfikacja === "TAK") {
                const serwer = client.guilds.cache.get(r[0].serwer);
                const reklama = r[0].reklama;
                const premium = r[0].premium;
                const zaproszenie = "discord.gg/" + r[0].zaproszenie;
                const id = i;

                kanaly.forEach((k) => {
                    if (client.channels.cache.get(k)) {
                        if (premium === "NIE") {
                            client.channels.cache.get(k).send(`ID: \`${serwer.id}; ${id}\`\nZaproszenie: ${zaproszenie}\n${reklama}`)
                            console.log("Wysłąno nie premium o id " + id)
                        } else {
                            const embed = new Discord.MessageEmbed()
                                .setTitle(`${serwer.name}`)
                                .setColor(`RANDOM`)
                                .setDescription(`ID: \`${serwer.id}; ${id}\`\nZaproszenie: [${serwer.name}](https://${zaproszenie})\n${reklama}`)
                            client.channels.cache.get(k).send(embed)
                            console.log("Wysłąno premium o id " + id)
                        }
                    }
                })

                const embed = new Discord.MessageEmbed()
                    .setTitle(`Wysłanie reklamy!`)
                    .setColor(`RANDOM`)
                    .setDescription(`Wysłano reklamę o id: ${id}(\`${serwer.name}\`).`)
                client.channels.cache.get(client.config.logch).send(embed)
                i++
            }
        });
    }, 10 * 60 * 1000);
};