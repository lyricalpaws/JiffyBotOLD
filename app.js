/**
*This is a Discord bot made by Paws#0001
*
**/

//Settings
const botname = "Jiffybot";
const version = "2.0.0"
const prefix = "//";
const lib = "Discord.js"


const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./settings.json")
const ddiff = require('return-deep-diff');
const superagent = require("superagent");
const chancejs = require("chance");
const dblclient = require("dbl.js");
const catFacts = require('cat-facts');
const dogFacts = require('dog-facts');
const hastebin = require('hastebin-gen');
const translate = require('google-translate-api');
const moment = require('moment');
require('moment-duration-format');



/**
* Setup
**/
//client.on("debug", (m) => console.log("[debug]", m));
//client.on("warn", (m) => console.log("[warn]", m));

client.on('ready', () => {
    console.log("I am on " + client.guilds.size + " server(s)");
    client.user.setPresence( { game: {name: ` ${client.guilds.size} servers || //help for commands.`, type: 3}});
});

client.on('disconnect', () => {
    console.log(`You have been disconnected at ${new Date()}`);
});

client.on ('error', error => {
console.log(error)
});

client.on('reconnecting', () => {
    console.log(`Reconnecting at ${new Date()}`);
});

client.on("guildCreate", guild => {
    client.user.setPresence( { game: {name: ` ${client.guilds.size} servers || //help for commands.`, type: 3}});
});

client.on("guildDelete", guild => {
    client.user.setPresence( { game: {name: ` ${client.guilds.size} servers || //help for commands.`, type: 3}});
});


var users = new Array();

class vUser {
    constructor(id) {
        this.id = id;
        this.vMessages = new Array();
    }

    addMessage(vMessage) {
        this.vMessages.push(vMessage);
    }

    getID() {
        return this.id;
    }

    tick(message) {
    	console.log("tick");
    }
}

class vMessage {

    constructor(text) {
        this.text = text;
        this.date = Date.now();
    }

    timedOut() {
        if ((Date.now() - this.date) >= (antiSpamTimeInSeconds * 1000)) {
            return true;
        } else {
            return false;
        }
    }

}




client.on('message', message => {

 const args = message.content.slice(prefix.length).trim().split(/ +/g);
 const command = args.shift().toLowerCase();

if (message.author.bot) return;

    let shouldAd = true;

    let user = null;
    users.forEach(u => {
        if (u.getID() == message.author.id) {
            user = u;
            shouldAd = false;
        }
    });


    if (shouldAd) {
        users.push((user = new vUser(message.author.id, message)));
    }

    user.addMessage(new vMessage(message.content));
    user.tick(message);

    if (message.channel.type === 'dm'){
       if (message.content.startsWith(prefix)) return;
       client.users.get('[your ID]').send(`${message.author.username}#${message.author.discriminator} (${message.author.id}): ${message.content}`);
    }
    if (!message.content.startsWith(prefix)) return;

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

    if (command === "purge") {
     if (message.member.hasPermission("MANAGE_MESSAGES")) {
     		let dev = args[0]
            let usr = "No username specified"
            let usrname = "everyone"
            if (message.content.toString().includes("@")) {
                usr = message.content.substr(message.content.indexOf("@"));
            }
            message.channel.fetchMessages({
                limit: dev
            }).then(messages => {
               let toDelmessages = new Array();
                messages.forEach(m => {
                    if (usr.includes(m.author.id)) {
                        usrname = m.author.username;
                        toDelmessages.push(m);
                   }
               });
               if (usr == "No username specified") {
                   message.channel.bulkDelete(messages);
                } else {
                    if (toDelmessages.length <= 0) {
                        usrname = "no one"
                    } else {
                        message.channel.bulkDelete(toDelmessages).catch(console.error);
                    }
                }
                message.channel.send("I am deleting all messages from " + usrname);
            });

        } else {
            message.reply("You must have a role with the MANAGE_MESSAGES permision.");
        }

   }




    if (command === "echo") {
        let dev = message.content.slice(6).trim();
        message.channel.send(dev);
    }

    if (command === 'ping') {
      let embed = new Discord.RichEmbed()
            .setColor("7C31D9")
            .addField(":ping_pong: Pong!", `${Date.now() - message.createdTimestamp} ms`);

        message.channel.sendEmbed(embed);
    }

    if (command === 'foo'){
        message.channel.send('bar');
    }

 if (command === "help"){
  let tool = new Discord.RichEmbed()
  .setColor("7C31D9")
  .setTitle("Tools 🔨")
  .addField("help", "DM's the help menu")
  .addField("echo", "Echos your message back to you.")
  .addField("ping", "Pings the bot and displays it's answer.")
  .addField("bot", "Dislays statistics on the bot.")
  .addField("info <User>", "Gives you information on the pinged user from discord.")
  .addField("invite", "Gives you the link to invite me to your server.")
  .addField("bug reporting", "Send a dm to the bot to report a bug!")
  .addField("translate", "Translates the given text in to english")

  let fun = new Discord.RichEmbed()
  .setColor("F1EE03")
  .setTitle("Fun")
  .addField("foo", "Returns bar.")
  .addField("time", "What time is it?")
  .addField("murder <User>", "Lets you kill someone.")
  .addField("hug <User>", "You can hug a person!")
  .addField("cookie <User>", "Gives a cookie to a person!")
  .addField("kiss <User>", "Gives a kiss to a person!")
  .addField("riot", "Retonerfwhen?")
  .addField("neko", "Returns a random neko image.")
  .addField("cat", "Returns a random cat image and fact")
  .addField("dog", "Returns a random dog image and fact")
  .addField("hammer", "b a n n e")
  .addField("whoa", "Returns a silly gif.")

  let admin = new Discord.RichEmbed()
  .setColor("F02121")
  .setTitle("Admin")
  .setFooter("IMPORTANT: You need a role with Kick members to: Kick and Warn, Manage messages for purge and Mute members to mute users")
  .addField("purge <User>", "Deletes a lot of messages from everyone or the specified user.")
  .addField("mute <User>", "Mutes a specified user.")
  .addField("warn <User>", "Warns a specified user.")
  .addField("kick <User>", "Kicks a specified user.")
  .addField("ban <User>", "Bans a specified user.")

  let dev = new Discord.RichEmbed()
  .setColor("248311")
  .setTitle("Dev <:MBlep:363052180598423553>")
  .addField("eval", "Evaluates the given code.")
  .addField("owo", "OwO What's this~?")
  .addField("restart", "Fairly obvious")

    if (message.author.id !== "[your ID]"){
  message.author.sendEmbed(tool).catch(console.error)
  message.author.sendEmbed(fun).catch(console.error)
  message.author.sendEmbed(admin).catch(console.error)
  message.channel.send("<:Yes:363053009804197888> I have DM'ed you my commands.").catch(console.error)
 }
 else {
  message.author.sendEmbed(tool).catch(console.error)
  message.author.sendEmbed(fun).catch(console.error)
  message.author.sendEmbed(admin).catch(console.error)
  message.author.sendEmbed(dev).catch(console.error)
  message.channel.send("<:Yes:363053009804197888> I have DM'ed you my commands.").catch(console.error)
 }
 }

    if (command === 'riot') {
        message.reply("too stronk, reto pls nerf.");
    }

    if (command === 'time') {
      message.reply("It\'s always high noon here, Partner");
    }

    if (command === 'owo'){
    message.channel.send({embed: {
    color:  15537404,
    title: "Why.",
    url: "https://cdn.discordapp.com/attachments/344198568720203777/346823903580127242/CgZDMJo.jpg",
    description: "Rawr x3 nuzzles how are you pounces on you you\'re so warm o3o notices you have a bulge o: someone\'s happy :wink: nuzzles your necky wecky~ murr~ hehehe rubbies your bulgy wolgy you\'re so big :oooo rubbies more on your bulgy wolgy it doesn\'t stop growing ·///· kisses you and lickies your necky daddy likies (; nuzzles wuzzles I hope daddy really likes $: wiggles butt and squirms I want to see your big daddy meat~ wiggles butt I have a little itch o3o wags tail can you please get my itch~ puts paws on your chest nyea~ its a seven inch itch rubs your chest can you help me pwease squirms pwetty pwease sad face I need to be punished runs paws down your chest and bites lip like I need to be punished really good~ paws on your bulge as I lick my lips I\'m getting thirsty. I can go for some milk unbuttons your pants as my eyes glow you smell so musky :v licks shaft mmmm~"
}})}

    if (command === "hammer") {
        message.channel.send("https://cdn.discordapp.com/attachments/344198568720203777/344200341257977866/1f528.png");
    }

    if (command === "invite") {
        message.channel.send("Please use https://discordapp.com/api/oauth2/authorize?client_id=297391906936193030&scope=bot&permissions=335015038 to invite me to your server!")
    }

    if (command === "whoa") {
    message.channel.send("https://cdn.discordapp.com/attachments/344198568720203777/348579591083786240/9eb.gif")
    }

 if (command === 'info') {
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return; else{

        let embed = new Discord.RichEmbed()
            .setTitle(user.username)
            .setColor("#9B59B6")
            .setURL(user.avatarURL)
            .addField("Full Username", `${user.username}#${user.discriminator}`)
            .addField("ID", user.id)
            .addField("Status", user.presence.status)
            .addField("Created At", user.createdAt)
            .setFooter("Information sourced from Discord", "https://cdn.discordapp.com/attachments/344198568720203777/363674952496578561/314003252830011395.png");

        message.channel.sendEmbed(embed);
    }
 }

 if (command === "murder") {
    let user = message.mentions.users.first();
    if (message.mentions.users.size < 1) return; else{
    message.channel.send(`:knife: I have successfully killed **${user.username}**. :knife:`)
 }}

if (command === "mute") {
 if (message.member.hasPermission("MUTE_MEMBERS")) {
  let reason = args.slice(1).join(' ');
 let user = message.mentions.users.first();
 let modlog = message.guild.channels.find('name', 'log');
 let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'muted');
 if (!modlog) return message.reply('I cannot find a log channel').catch(console.error);
 if (!muteRole) return message.reply('I cannot find a mute role').catch(console.error);
 if (reason.length < 1) return message.reply('You must supply a reason for the mute.').catch(console.error);
 if (message.mentions.users.size < 1) return message.reply('You must mention someone to mute them.').catch(console.error);
 message.delete();
 const embed = new Discord.RichEmbed()
   .setColor(0x00AE86)
   .addField('Action:', 'Un/Mute')
   .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
   .addField('Modrator:', `${message.author.username}#${message.author.discriminator}`)
   .addField('Reason', reason);

 if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').catch(console.error);


 if (message.guild.member(user).roles.has(muteRole.id)) {
   message.guild.member(user).removeRole(muteRole).then(() => {
     client.channels.get(modlog.id).sendEmbed(embed).catch(console.error);
   });
 } else {
   message.guild.member(user).addRole(muteRole).then(() => {
     client.channels.get(modlog.id).sendEmbed(embed).catch(console.error);
   });


 }
 }
};

if (command === "warn") {
 if (message.member.hasPermission("KICK_MEMBERS")) {
  let reason = args.slice(1).join(' ');
 let user = message.mentions.users.first();
 let modlog = message.guild.channels.find('name', 'log');
 if (!modlog) return message.reply('I cannot find a log channel');
 if (reason.length < 1) return message.reply('You must supply a reason for the warning.');
 if (message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.').catch(console.error);
 message.delete();
 const embed = new Discord.RichEmbed()
 .setColor(0x32CD32)
 .addField('Action:', 'Warning')
 .addField('User:', `${user.username}#${user.discriminator}`)
 .addField('Modrator:', `${message.author.username}#${message.author.discriminator}`)
 .addField('Reason', reason);
 return client.channels.get(modlog.id).sendEmbed(embed);

 }
}

if (command === "kick") {
 if (message.member.hasPermission("KICK_MEMBERS")) {
   let reason = args.slice(1).join(' ');
 let user = message.mentions.users.first();
 let modlog = message.guild.channels.find('name', 'log');
 if (!modlog) return message.reply('I cannot find a log channel');
 if (reason.length < 1) return message.reply('You must supply a reason for the kick.');
 if (message.mentions.users.size < 1) return message.reply('You must mention someone to kick them.').catch(console.error);
message.delete();
 if (!message.guild.member(user).kickable) return message.reply('I cannot kick that member');
 message.guild.member(user).kick();

 const embed = new Discord.RichEmbed()
   .setColor(0xe5ac10)
   .addField('Action:', 'kick')
   .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
   .addField('Modrator:', `${message.author.username}#${message.author.discriminator}`)
   .addField('Reason', reason);
 return client.channels.get(modlog.id).sendEmbed(embed);
 }
}

if (command === "ban"){
 if (message.member.hasPermission("BAN_MEMBERS")) {
 let reason = args.slice(1).join(' ');
 let user = message.mentions.users.first();
 let modlog = message.guild.channels.find('name', 'log');
 if (!modlog) return message.reply('I cannot find a log channel');
 if (reason.length < 1) return message.reply('You must supply a reason for the ban.');
 if (message.mentions.users.size < 1) return message.reply('You must mention someone to ban them.').catch(console.error);

 if (!message.guild.member(user).bannable) return message.reply('I cannot ban that member');
 message.guild.ban(user, 2);
 message.delete();

 const embed = new Discord.RichEmbed()
   .setColor(0xa50d0d)
   .addField('Action:', 'Ban')
   .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
   .addField('Modrator:', `${message.author.username}#${message.author.discriminator}`)
   .addField('Reason', reason);
 return client.channels.get(modlog.id).sendEmbed(embed);
 }
}

if(command === "cookie") {
 let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.channel.send(`**:cookie: | ${message.author.username} gave the air a cookie.**`).catch(console.error);
  else{
    message.channel.send(`**:cookie: | ${message.author.username} just gave ${user.username} a cookie!**`)
  }
}

if(command === "hug"){
 let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.channel.send(`**${message.author.username} just hugged no-one.**`).catch(console.error);
  else{
    message.channel.send(`**${message.author.username} hugged ${user.username}!**`)
  }
}

    if (command === "neko") {
        message.delete();
        superagent.get("https://nekos.life/api/neko", (err, res) => {
            if (err) { return message.channel.send(":x: An error has occurred. Details: " + err) }
            message.channel.send("", { embed: new Discord.RichEmbed().setTitle(`Random Neko requested by ${message.author.username}`).setColor("7C31D9").setImage(res.body.neko).setFooter("Image by nekos.life") })
        })
    }

 if (command === 'bot'){
        let embed = new Discord.RichEmbed()
            .setAuthor(`${botname}`)
            .setColor("7C31D9")
 		        .setThumbnail("https://cdn.discordapp.com/avatars/297391906936193030/9a718f68e5420b5db31d412a5da96c07.png")
            .addField("Bot version", `${version}`)
            .addField("Credits", "Paws#0001 - Developer \nYellowfin_Tunafish#8407 - Host")
            .addField("Support", "https://discord.gg/4fvjgKM")
            .addField("Library:", `${lib}`)
            .addField("In servers:", `${client.guilds.size}`)
            .addField("Total member count:", `${client.users.size}`)

        message.channel.sendEmbed(embed);
  }

 if (command === "eval") {
  if (message.author.id !== "127452209070735361")
      return message.reply("You don't have permissions to use eval! Ehehehe sneaky boy! Gotcha :)");
  else {
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
}

 if (command === 'translate') {
    let translateme = args.slice(0).join(" ")
    translate(translateme, { to: config.translate }).then(res => {
     message.channel.send("", { embed: new Discord.RichEmbed().setTitle("Translate").setColor("#9B59B6").setDescription("From - ** " + res.from.language.iso + "**\nTo - ** " + config.translate + "**\nInput - **" + translateme + "**\nOutput :arrow_down:```" + res.text + "```").setFooter("Powered by Google") })
    }).catch(err => {
        message.channel.send(":x: An error has occurred. Details: " + err)
    });
 }

    if (command === "cat"){
        superagent.get("https://random.cat/meow", (err, res) => {
            if (err) { return message.channel.send(":x: An error has occurred. Details: " + err) }
            message.channel.send("", {
                embed: new Discord.RichEmbed().setTitle("Random Cat").setColor("#9B59B6").setDescription(catFacts.random()).setImage(res.body.file).setFooter("Image by random.cat")
            })
        })
    }

    if (command === "dog"){
        superagent.get("https://random.dog/woof.json", (err, res) => {
            if (err) { return message.channel.send(":x: An error has occurred. Details: " + err) }
            message.channel.send("", { embed: new Discord.RichEmbed().setTitle("Random Dog").setColor("#9B59B6").setDescription(dogFacts.random()).setImage(res.body.url).setFooter("Image by random.dog") })
        })
    }

    if(command === "kiss") {
 let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.channel.send(`**:broken_heart: | ${message.author.username} gave the air a kiss.**`).catch(console.error);
  else{
    message.channel.send(`**:heart: | ${message.author.username} just gave ${user.username} a kiss! (How cute!)**`)
  }
}

	if(command === "setgame"){
		  if (message.author.id !== "127452209070735361")
      return message.reply("You don't have permissions to do that!");
  else {
		let dev = args[0];
		client.user.setPresence( { game: {name: `${dev}`, type: 3}});
    message.delete();
	}
}

  if(command === "restart"){
    if (message.author.id !== "127452209070735361")
      return message.reply("You don't have permissions to do that!");
    else {
      process.exit();
    }
  }

});

client.login(config.token);
