exports.run = async (client) => {
    console.log(`Bot ${client.user.tag} załadowany!`)
    client.user.setPresence({ activity: { name: `${client.prefix}pomoc` }, status: 'online' })

    const db = client.db;
    db.run("CREATE TABLE IF NOT EXISTS reklamy (serwer TEXT, kanal TEXT, reklama TEXT, premium TEXT, weryfikacja TEXT)");
}