const {
    MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const {
    KSoftClient
} = require(`@ksoft/api`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const lyricsFinder = require(`lyrics-finder`);
const {
    format,
    delay,
    swap_pages
} = require(`../../handlers/functions`);
module.exports = {
    name: `lyrics`,
    category: `🎶 Music`,
    aliases: [`songlyrics`, `ly`, `tracklyrics`],
    description: `Shows The Lyrics of the current track`,
    usage: `lyrics [Songtitle]`,
    cooldown: 15,
    parameters: {
        "type": "music",
        "activeplayer": true,
        "previoussong": false
    },
    run: async (client, message, args, cmduser, text, prefix, player) => {
        let es = client.settings.get(message.guild.id, "embed")
        if(!client.settings.get(message.guild.id, "MUSIC")){
          return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:no:833101993668771842> THIS COMMAND IS CURRENTLY DISABLED`)
            .setDescription(`An Admin can enable it with: \`${prefix}setup-commands\``)
          );
        }
        try {
            //get the Song Title
            let title = player.queue.current.title;
            //get the song Creator Author
            let author = player.queue.current.author;
            //if there are search terms, search for the lyrics
            if (args[0]) {
                //get the new title
                title = args.join(` `);
                //sending the Embed and deleting it afterwards
                message.channel.send(new MessageEmbed()
                    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                    .setFooter(es.footertext, es.footericon)
                    .setTitle(`Searching lyrics for: ${emoji.msg.search} \`${title}\``.substr(0, 256))
                )
            }
            //set the lyrics temp. to null
            let lyrics = null;
            //if there is the use of lyrics_finder
            if (config.lyricssettings.lyrics_finder) {
                //if there is the use of ksoft api which is way better
                if (config.lyricssettings.ksoft_api.use_this_instead) {
                    //create a new Ksoft Client
                    const ksoft = new KSoftClient(config.lyricssettings.ksoft_api.api_key);
                    //get the lyrics
                    await ksoft.lyrics.get(title).then(async (track) => {
                        //send error if no lyrics
                        if (!track.lyrics)
                            return message.channel.send(new MessageEmbed()
                                .setColor(es.wrongcolor)
                                .setFooter(es.footertext, es.footericon)
                                .setTitle(`<:no:833101993668771842> No Lyrics found for:`)
                            );
                        //safe the lyrics on the temp. variable
                        lyrics = track.lyrics;
                    });
                    //if no ksoft api use the worse lyrics_finder scraper
                } else {
                    try {
                        //get the lyrics
                        lyrics = await lyricsFinder(title, author ? author : ``);
                        //if no lyrics send and error
                        if (!lyrics)
                            return message.channel.send(new MessageEmbed()
                                .setColor(es.wrongcolor)
                                .setFooter(es.footertext, es.footericon)
                                .setTitle(`<:no:833101993668771842> No Lyrics found for:`)
                            );
                        //catch any errors
                    } catch (e) {
                        //log the Error
                        console.log(String(e.stack).yellow);
                        return message.channel.send(new MessageEmbed()
                            .setColor(es.wrongcolor)
                            .setFooter(es.footertext, es.footericon)
                            .setTitle(`<:no:833101993668771842> No Lyrics found for:`)
                        );
                    }
                }
            }
            //return susccess message
            return swap_pages(client, message, lyrics, `Lyrics for: ${emoji.msg.lyrics} \`${title}\``.substr(0, 256))
            /*
              //create the lyrics Embed
              let lyricsEmbed = new MessageEmbed()
                  .setTitle(`Lyrics for: ${emoji.msg.lyrics} \`${title}\``.substr(0, 256))
                  .setDescription(lyrics)
                  .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
                  .setFooter(es.footertext, es.footericon);
              //safe the description on a temp. variable
              let k = lyricsEmbed.description
              //loop for the length
              for (let i = 0; i < k.length; i += 2048)
                //send an embed for each embed which is too big
                message.channel.send(i >= 2048 ? lyricsEmbed.setDescription(k.substr(i,  i + 2048)).setTitle(`\u200b`): lyricsEmbed.setDescription(k.substr(i,  i + 2048)))
            */
        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:no:833101993668771842> An error occurred`)
            .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
        );
        }
    }
};
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
