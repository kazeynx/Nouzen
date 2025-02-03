const colors = require("colors");
const systems = colors.red(colors.bold("Systems"));
const dev = colors.green(colors.bold("</>"));
const discord = colors.cyan(colors.bold("https://discord.gg/USTAWBKyZT"));
const version = require("../../../package.json").version;
const versions = colors.cyan(colors.bold(`Version : ${version}`));
module.exports = {
    execute(client) {
       const centerText = (text) => {
       const terminalWidth = process.stdout.columns;
       const textLength = text.replace(/\x1B\[\d+m/g, "").length;
       const padding = Math.max((terminalWidth - textLength) / 2, 0);
       return " ".repeat(Math.floor(padding)) + text;};
       const kazeynx =`
┯━━━━━━━━━━━━━━━</>━━━━━━━━━━━━━━━┯
━━━━━━━━━━━━━━━┛ X ┗━━━━━━━━━━━━━━━
            
© Kazeynx
2025 - ${new Date().getFullYear()}
All Rights Reserved
        
━━━━━━━━━━━━━━━┓ X ┏━━━━━━━━━━━━━━━
┷━━━━━━━━━━━━━━━</>━━━━━━━━━━━━━━━┷


╦═══════════════════════════════════════╦
╦╔═ ╔═╗ ╔═╦ ╔═╗ ╦ ╦ ╔╗╔ ═╗ ╦
╠╩╗ ╠═╣ ╔═╝ ║╣  ╚╦╝ ║║║ ╔╩╦╝
╩ ╩ ╩ ╩ ╩═╝ ╚═╝  ╩  ╝╚╝ ╩ ╚═
╩══╦═════════════════════════════════╦══╩
╦═════════╬═════════════════════════════════╬═════════╦
║ ${systems} ║         ${versions}         ║   ${dev}   ║
╠═════════╬═════════════════════════════════╬═════════╣
║ ${systems} ║  ${discord}  ║   ${dev}   ║
╩═════════╩═════════════════════════════════╩═════════╩
╩══╦═════════════════════════════════╦══╩
╠═════════╩═════════════════════════════════╩═════════╣
╠═════════╦═════════════════════════════════╦═════════╣
╦══╩═════════════════════════════════╩══╦

═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════

${colors.cyan(colors.bold(`|`))} ${colors.white(colors.bold(`Yokoso, watashi no Soul Society! `))}${colors.cyan(colors.bold(`|`))}`;
       const kazeynxTerm = kazeynx
              .split("\n")
              .map((line) => centerText(line))
              .join("\n");
       console.clear();
       console.log(kazeynxTerm);
},
  };

  