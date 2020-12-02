module.exports = client => {
    const { readdirSync } = require("fs");
    const { sep } = require("path");
  
    const loadevn = () => {
      readdirSync("./wydarzenia/").forEach(dirs => {
        const events = readdirSync(`./wydarzenia/${sep}${dirs}${sep}`).filter(
          files => files.endsWith(".js")
        );
        for (const file of events) {
          const wyd = require(`../wydarzenia/${dirs}/${file}`);
          console.log(`Załadowano wydarzenie: ${dirs}/${events}`);
          client.on(file.split(".")[0], (...args) => wyd.run(client, ...args));
        }
      });
    };
    loadevn();
  };
  