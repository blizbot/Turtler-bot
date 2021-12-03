const Discord = require('discord.js')
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const {
  duration
} = require("../../handlers/functions")
const { MessageMenuOption, MessageMenu } = require("discord-buttons")
module.exports = {
  name: "help",
  category: "🔰 Info",
  aliases: ["h", "commandinfo", "halp", "hilfe"],
  usage: "help [Command/Category]",
  description: "Returns all Commmands, or one specific command",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    let settings = client.settings.get(message.guild.id)
    try {
      if (args[0]) {
        const embed = new Discord.MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null);
        const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
        var cat = false;
        if(args[0].toLowerCase().includes("cust")){
          let cuc = client.customcommands.get(message.guild.id, "commands");
          if (cuc.length < 1) cuc = ["NO CUSTOM COMMANDS DEFINED YET, do it with: `!setup-customcommands`"]
          else cuc = cuc.map(cmd => `\`${cmd.name}\``)
          const items = cuc


          const embed = new Discord.MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle(`🦾 **Custom Commands [${cuc[0].includes("NO") ? 0 : items.length}]**`)
            .setDescription(items.join(", "))
            .setFooter(`No custom information for the Custom Commands ;(`, client.user.displayAvatarURL());
          
          message.channel.send(embed)
          return;
        }var cat = false;
        if (!cmd) {
          cat = client.categories.find(cat => cat.toLowerCase().includes(args[0].toLowerCase()))
        }
        if (!cmd && (!cat || cat == null)) {
          return message.channel.send(embed.setColor(es.wrongcolor).setDescription(`No Information found for command **${args[0].toLowerCase()}**`));
        } else if (!cmd && cat) {
          var category = cat;
          const items = client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
          const embed = new Discord.MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle(`MENU 🔰 **${category.toUpperCase()} [${items.length}]**`)
            .setFooter(`To see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());

          if (category.toLowerCase().includes("custom")) {
            const cmd = client.commands.get(items[0].split("`").join("").toLowerCase()) || client.commands.get(client.aliases.get(items[0].split("`").join("").toLowerCase()));
            try {
              embed.setDescription(`**${category.toUpperCase()} [${items.length}]**`, `> \`${items[0]}\`\n\n**Usage:**\n> \`${cmd.usage}\``);
            } catch {}
          } else {
            embed.setDescription(`${items.join(", ")}`)
          }
          return message.channel.send(embed)
        }
        if (cmd.name) embed.addField("**<a:emoji_7:862271073907245057> Command name**", `\`${cmd.name}\``);
        if (cmd.name) embed.setTitle(`<a:emoji_7:862271073907245057> Detailed Information about: \`${cmd.name}\``);
        if (cmd.description) embed.addField("**<a:emoji_7:862271073907245057> Description**", `\`\`\`${cmd.description}\`\`\``);
        if (cmd.aliases) try {
          embed.addField("**<a:emoji_7:862271073907245057> Aliases**", `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``);
        } catch {}
        if (cmd.cooldown) embed.addField("**<a:emoji_7:862271073907245057> Cooldown**", `\`\`\`${cmd.cooldown} Seconds\`\`\``);
        else embed.addField("**<a:emoji_7:862271073907245057> Cooldown**", `\`\`\`3 Seconds\`\`\``);
        if (cmd.usage) {
          embed.addField("**<a:emoji_7:862271073907245057> Usage**", `\`\`\`${config.prefix}${cmd.usage}\`\`\``);
          embed.setFooter("Syntax: <> = required, [] = optional", es.footericon);
        }
        if (cmd.useage) {
          embed.addField("**<a:emoji_7:862271073907245057> Useage**", `\`\`\`${config.prefix}${cmd.useage}\`\`\``);
          embed.setFooter("Syntax: <> = required, [] = optional", es.footericon);
        }
        return message.channel.send(embed);
      }

        let option1 = new MessageMenuOption()
        .setLabel("​Information")
        .setValue("​Information")
        .setDescription("🔰 ​Information Commands")
        .setDefault()
        .setEmoji("🔰")
        
        let option2 = new MessageMenuOption()
            .setLabel("Music Related")
            .setValue("Music Related")
            .setDescription("Music Commands")
            .setDefault()
            .setEmoji("891240754993844244")
        let setting = new MessageMenuOption()
            .setLabel("Settings & 👑 Owner")
            .setValue("Settings & 👑 Owner")
            .setDescription("⚙ Settings & 👑 Owner Commands")
            .setDefault()
            .setEmoji("892078131765190686")
        let rank = new MessageMenuOption()
            .setLabel("Voice & 📈 Ranking")
            .setValue("Voice & 📈 Ranking")
            .setDescription("🎤 Voice & 📈 Ranking Commands")
            .setDefault()
            .setEmoji("🎤")
        let game = new MessageMenuOption()
            .setLabel("Mini Games & 🕹️ Fun")
            .setValue("Mini Games & 🕹️ Fun")
            .setDescription("🎮 Mini Games & 🕹️ Fun Commands")
            .setDefault()
            .setEmoji("864352938134994994")
        let admin = new MessageMenuOption()
           .setLabel("Administration & 💪 Setup")
           .setValue("Administration & 💪 Setup")
           .setDescription("🚫 Administration & 💪 Setup Commands")
           .setEmoji("892090597433823323")

        let nsfw = new MessageMenuOption()
           .setLabel("NSFW​")
           .setValue("NSFW​")
           .setDescription("🔞 NSFW​ Commands")
           .setEmoji("🔞")
        
          let custom = new MessageMenuOption()
           .setLabel("Custom Commands")
           .setValue("Custom Commands")
           .setDescription("🦾 Custom Commands")
           .setEmoji("🦾")
          
          let mine = new MessageMenuOption()
            .setLabel("Minecraft")
           .setValue("Minecraft")
           .setDescription("🤞 Minecraft Commands")
           .setEmoji("878601446529040444")

                    
          let search = new MessageMenuOption()
            .setLabel("Search")
           .setValue("Search")
           .setDescription("🔎 Search Commands")
           .setEmoji("864351720796061706")

        let selection = new MessageMenu()
            .setID("Selection")
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder("Commands")
            .addOption(option1)
            .addOption(option2)
            .addOption(setting)
            .addOption(rank)
            .addOption(game)
            .addOption(admin)
            .addOption(nsfw)
            .addOption(custom)
            .addOption(mine)
            .addOption(search)


        let embed = new Discord.MessageEmbed()
        .setThumbnail(client.user.displayAvatarURL())
.setColor(es.color)
.setFooter("Turtler | Made by: BlizDia", client.user.displayAvatarURL())
.setTitle(`Information about the  <a:blue_yes:905842248695046165>`)
.addField("<a:blue_yes:905842248695046165> **__My Features__**",
`>>> **58+ Systems**, like: <:Twitter:912596352746291231> **Twitter-** & <:YouTube:912596468186103880> **Youtube-Auto-Poster** 
**Application-**, Ticket-, **Welcome-Images-** and Reaction Role-, ... Systems
:notes: An advanced <a:question:912598623366283276> **Music System** with **Audio Filtering**
:video_game: Many **Minigames** and :joystick: **Fun** Commands (150+)
:no_entry_sign: **Administration** and **Auto-Moderation** and way much more!`)
        .addField("<a:question:912598623366283276> **__How do you use me?__**",
`>>> \`${prefix}setup\` and react with the Emoji for the right action,
but you can also do \`${prefix}setup-SYSTEM\` e.g. \`${prefix}setup-welcome\``)
.addField("<a:online:910130110747791390> **__STATS:__**",                           
`>>> <a:coin:906106739609436200>●**Total Users:** \`${client.users.cache.size} Users\`
<a:coin:906106739609436200>●**Total Server:** \`${client.guilds.cache.size} Servers\`
<a:coin:906106739609436200>●**Total Guilds:** \`${client.guilds.cache.size} Guilds\`
<a:coin:906106739609436200>●**Total Commands:** \`${client.commands.map(a=>a).length} Commands\`
<a:coin:906106739609436200>●**Uptime:** \`${duration(client.uptime).map(i=> `${i}`).join(", ")}\``)

.addField("<a:867324408308695070:892077506860040233> **Ping**", `>>>  <:875933762972692510:912944567706333196>:**\`${Math.round(Date.now() - message.createdTimestamp)}ms\`
     <:875933754382749746:912944567937019904> **Api Latency:** \`${client.ws.ping}ms\``)

        
        .addField("<a:787506318629142528:891453513316565052> **__Developer__**",
 `>>> \` • BlizDia
\``)
.setImage("https://media.discordapp.net/attachments/915084031295639572/916188531611828284/standard_3.gif")

        
let embed0 = new Discord.MessageEmbed()
.setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
.setTitle(`🔰 Information Commands 🔰`)
.setDescription(`> ${client.commands.filter((cmd) => cmd.category === "🔰 Info").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
.addField(settings.ECONOMY ? "💸 **Economy** | <a:yes:833101995723194437> ENABLED" : "💸 **Economy** | <:emoji_35:865126603273273355> DISABLED",`> ${client.commands.filter((cmd) => cmd.category === "💸 Economy").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
.addField(settings.SCHOOL ? "🏫 **School** | <a:yes:833101995723194437> ENABLED" : "🏫 **School** | <:emoji_35:865126603273273355> DISABLED", `> ${client.commands.filter((cmd) => cmd.category === "🏫 School Commands").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
.setFooter(`Turtler | Made by: BlizDia\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())

          let embed1 = new Discord.MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(`🎶 Music Related Commands :notes:`)
            .setDescription(`🎶 **Music**${settings.MUSIC ? " | <a:yes:833101995723194437> ENABLED" : " | <:emoji_35:865126603273273355> DISABLED"}\n> ${client.commands.filter((cmd) => cmd.category === "🎶 Music").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .addField(settings.MUSIC ? "👀 **Filter** | <a:yes:833101995723194437> ENABLED" : "👀 **Filter** | <:emoji_35:865126603273273355> DISABLED", `>>> ${client.commands.filter((cmd) => cmd.category === "👀 Filter").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .addField(settings.MUSIC ? "⚜️ **Custom Queue(s)** | <a:yes:833101995723194437> ENABLED" : "⚜️ **Custom Queue(s)** | <:emoji_35:865126603273273355> DISABLED", `${client.commands.filter((cmd) => cmd.category === "⚜️ Custom Queue(s)").map((cmd) => `\`${cmd.name}\``).join(", ")}`.substr(0, 1024))
            .setFooter(`Turtler | Made by: BlizDia\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())

              let embed2 = new Discord.MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(`⚙️ Settings & Owner Commands 👑`)
            .setDescription(`⚙️ **Settings**\n> ${client.commands.filter((cmd) => cmd.category === "⚙️ Settings").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .addField("👑 **Owner**", `>>> ${client.commands.filter((cmd) => cmd.category === "👑 Owner").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .addField("⌨️ **Programming**", `${client.commands.filter((cmd) => cmd.category === "⌨️ Programming").map((cmd) => `\`${cmd.name}\``).join(", ")}`.substr(0, 1024))
            .setFooter(`Turtler | Made by: BlizDia\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())

           let embed3 = new Discord.MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(`🎤 Voice & Ranking Commands 📈`)
            .setDescription(`🎤 **Voice**${settings.VOICE ? " | <a:yes:833101995723194437> ENABLED" : " | <:emoji_35:865126603273273355> DISABLED"}\n> ${client.commands.filter((cmd) => cmd.category === "🎤 Voice").map((cmd) => `**Command:**\n>>> \`${cmd.name}\`\n\n**Usage:**\n ${cmd.usage}`)}`)
            .addField("📈 **Ranking**", `>>> ${client.commands.filter((cmd) => cmd.category === "📈 Ranking").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .addField(settings.SOUNDBOARD ? "🔊 **Soundboard** | <a:yes:833101995723194437> ENABLED" : "🔊 **Soundboard** | <:emoji_35:865126603273273355> DISABLED", `${client.commands.filter((cmd) => cmd.category === "🔊 Soundboard").map((cmd) => `\`${cmd.name}\``).join(", ")}`.substr(0, 1024))
            .setFooter(`Turtlr | Made by: BlizDia\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())
            
              let embed4 = new Discord.MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(`🎮 Mini Games & Fun Commands 🕹️`)
            .setDescription(`🕹️ **Fun**${settings.FUN ? " | <a:yes:833101995723194437> ENABLED" : " | <:emoji_35:865126603273273355> DISABLED"}\n> ${client.commands.filter((cmd) => cmd.category === "🕹️ Fun").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .addField(settings.MINIGAMES ? "🎮 **Mini Games** | <a:yes:833101995723194437> ENABLED" : "🎮 **Mini Games**| <:emoji_35:865126603273273355> DISABLED", `> ${client.commands.filter((cmd) => cmd.category === "🎮 MiniGames").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .setFooter(`Turtler | Made by: Made by BlizDia\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())

            let embed5 = new Discord.MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(`🚫 Administration & Setup Commands 💪`)
            .setDescription(`🚫 **Admin**\n> ${client.commands.filter((cmd) => cmd.category === "🚫 Administration").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .addField("💪 **Setup**", `>>> ${client.commands.filter((cmd) => cmd.category === "💪 Setup").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .setFooter(`Turtler | Made by: BlizDia\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())

            let embed6 = new Discord.MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(settings.NSFW ? "🔞 NSFW Commands 🔞 | <a:yes:833101995723194437> ENABLED" : "🔞 NSFW Commands 🔞 | <:emoji_35:865126603273273355> DISABLED")
            .setDescription(`> ${client.commands.filter((cmd) => cmd.category === "🔞 NSFW").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .setFooter(`Turtler | Made by: BlizDia\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())
          
          let embed7 = new Discord.MessageEmbed()
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setTitle("🦾 Custom Commands")
          .setFooter(`Turtler | Made by: Blizdia\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());
          let cuc = client.customcommands.get(message.guild.id, "commands");
          if (cuc.length < 1) cuc = ["NO CUSTOM COMMANDS DEFINED YET, do it with: `!setup-customcommands`"]
          else cuc = cuc.map(cmd => `\`${cmd.name}\``)
          const items = cuc
            embed7.setTitle(`🦾 **Custom Commands [${cuc[0].includes("NO") ? 0 : items.length}]**`)
            embed7.setDescription(items.join(", "))
        
        let embed8 = new Discord.MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(`🤞 Mincraft`)
            .setDescription(`> ${client.commands.filter((cmd) => cmd.category === "🤞 Mincraft").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .setFooter(`Turtlrt | Made by: BlizDia\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL());

        let embed9 = new Discord.MessageEmbed()
            .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
            .setTitle(`🔎 Search`)
            .setDescription(`> ${client.commands.filter((cmd) => cmd.category === "🔎 Search").map((cmd) => `\`${cmd.name}\``).join(", ")}`)
            .setFooter(`Turtler | Made by: BlizDia\nTo see command Descriptions and Information, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())


        let menumsg = await message.channel.send(embed, selection)

        function menuselection(menu) {
            switch(menu.values[0]) {
                case "​Information": 
                    menu.reply.send(embed0 , true)
                break;
                case "Music Related": 
                    menu.reply.send(embed1, true)
                break;
                case "Settings & 👑 Owner": 
                    menu.reply.send(embed2, true)
                break;
                case "Voice & 📈 Ranking": 
                    menu.reply.send(embed3, true)
                break;
                case "Mini Games & 🕹️ Fun":
                     menu.reply.send(embed4 ,true)
                break;
                case "Administration & 💪 Setup":
                     menu.reply.send(embed5, true)
                break;
                    case "NSFW​":
                     menu.reply.send(embed6, true)
                break;
                    case "Custom Commands":
                     menu.reply.send(embed7, true)
                break;
                    case "Minecraft":
                     menu.reply.send(embed8, true)
                break;
                    case "Search":
                     menu.reply.send(embed9, true)
                break;


            }
        }

        client.on("clickMenu", (menu) => {
            if(menu.message.id == menumsg.id) {
                if(menu.clicker.user.id == message.author.id) menuselection(menu)
                else menu.reply.send(":x: you are not allowed to pick something", true)
            }
        })
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`<:emoji_35:865126603273273355> An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
}