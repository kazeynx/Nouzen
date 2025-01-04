const colors = require("colors");
module.exports = {
    execute(client) {
       console.clear();
console.log(`                           
                                            ┯━━━━━━━━━━━━━━━</>━━━━━━━━━━━━━━━┯
                                            ━━━━━━━━━━━━━━━┛ X ┗━━━━━━━━━━━━━━━
    
                                                         © Kazeynx
                                                        2025 - ${new Date().getFullYear()}
                                                    All Rights Reserved
    
                                            ━━━━━━━━━━━━━━━┓ X ┏━━━━━━━━━━━━━━━
                                            ┷━━━━━━━━━━━━━━━</>━━━━━━━━━━━━━━━┷

                                         ╦══╩═════════════════════════════════╩══╦
                                                  ╔╗ ╗╔  ╦╗╗ ╔╦╗ ╔╗ ═╗ ╦
                                                  ╚╗ ╚╣  ║║║  ║  ╠╣ ╔╩╦╝
                                                  ╚╝  ╩  ╩╚╝  ╩  ╝╚ ╩ ╚═
                                         ╩══╦═════════════════════════════════╦══╩
                                  ╦═════════╬═════════════════════════════════╬═════════╦
    ${colors.white(colors.bold(`                              ║`))} ${colors.red(`System`)} ${colors.white(` ║`)} ${colors.cyan(colors.bold(`         Version ${require(`${process.cwd()}/package.json`).version}`))} ${colors.white(colors.bold(`         ║`))} ${colors.green(colors.bold(`  </>`))} ${colors.white(colors.bold(`  ║`))}
                                  ╠═════════╬═════════════════════════════════╬═════════╣
    ${colors.white(colors.bold(`                              ║`))} ${colors.red(`System`)} ${colors.white(` ║`)} ${colors.cyan(colors.bold(` https://discord.gg/USTAWBKyZT`))} ${colors.white(colors.bold(` ║`))} ${colors.green(colors.bold(`  </>`))} ${colors.white(colors.bold(`  ║`))}
                                  ╩═════════╩═════════════════════════════════╩═════════╩
                                         ╩══╦═════════════════════════════════╦══╩
                                  ╠═════════╩═════════════════════════════════╩═════════╣
                                  ╠═════════╦═════════════════════════════════╦═════════╣
                                         ╦══╩═════════════════════════════════╩══╦
        
════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════

${colors.cyan(colors.bold(`${client.user.username}`))} | Yokoso, watashi no Soul Society!`);
},
  };

  