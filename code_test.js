const Discord = require("discord.js");
const { prefix, token } = require('./config.json');
var client = new Discord.Client();
const config = require('./config.json');
var client = new Discord.Client();
var channel = client.channels.find("name", "general");
var request = require ("request");
var resultOpts = ["Result", "Exact result", "Decimal approximation"];
const weather = require('weather-js'); 
const formatTime = require('formatTime');

//help
client.on('message', message => {
    
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    client.user.setGame(config.game_status);
    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    if (message.content === `${prefix}helpme`) {
        message.channel.send(
            "  ```Commands List\n\
[1]  help      ||    Display this message\n\
[2]  sinfo    ||    Display Server Name and ID\n\
[3]  whois     ||    Display Your/User Info\n\
[4]  ping      ||    Display Bot Ping\n\
[5]  avatar    ||    Display Your/User Avatar\n\
[6]  8ball     ||    Ask a Question\n\
[7]  roll      ||    Roll a Dice\n\
[8]  flip      ||    Flip a Coin\n\
[9]  purge     ||    Delete Messages\n\
[10] weather   ||    Display Current Weather```\n``` [IMPORTANT] All commands are in Lower Case```");

    }
    //avatar
    else if (command === 'avatar') {
        if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: ${message.author.displayAvatarURL}`);
        }
    
        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar:\n\
             ${user.displayAvatarURL}`;
        });
    
        message.channel.send(avatarList);
    }
//ping
else if (message.content === `${prefix}ping`) {
    message.channel.send(`:ping_pong: My ping is ${client.ping}. You are on **${message.guild.name}**`);
    console.log("a user has executed a ping command!");
}
//server

if(command=='sinfo'){
    
         const embed = new Discord.RichEmbed()
         .setAuthor(message.guild.name, message.guild.iconURL)
         .setColor(3447003)
         .setDescription(`Owner: ${message.guild.owner.user.tag} (${message.guild.owner.id})`)
         .addField('Member Count', `${message.guild.memberCount - message.guild.members.filter(m=>m.user.bot).size} (${message.guild.members.filter(m=>m.user.bot).size} bots)`, true)
         .addField('AFK Timeout', `${message.guild.afkTimeout / 60} minutes`, true)
         .addField('AFK Channel', `${message.guild.afkChannelID === null ? 'No AFK Channel' : client.channels.get(message.guild.afkChannelID).name} (${message.guild.afkChannelID === null ? '' : message.guild.afkChannelID})`, true)
         .addField('Location', message.guild.region, true)
         .addField('Created', message.guild.createdAt.toLocaleString(), true)
         .addBlankField(true)
         .setTimestamp()
         .setFooter(client.user.username, client.user.avatarURL);
        
         message.channel.send({embed});
       
        
  
 }
 
//whois
else if (command === 'whois') {
    if (!message.mentions.users.size) {
        message.channel.send(`Your username: **${message.author.username}**\nYour ID: **${message.author.id}**`)

    }

    const avatarList = message.mentions.users.map(user => {
        message.channel.send( `**Username**: ${user.username} \n **ID**: ${message.author.id}`)
    });

}
//meme
if (message.content === "--meme") {
    var textArray = [
      'THIS IS A SUPER FUNNY MEME OMG!',
      'THIS IS A SUPER FUNNY MEME OMG!',
      'THIS IS A SUPER FUNNY MEME OMG!', 
      'THIS IS A SUPER FUNNY MEME OMG!' 
    ];
    var Meme = Math.floor(Math.random()*textArray.length);
    message.reply(`${textArray[Meme]}`)
  }



//roll?
if (message.content === "--roll") {
    var result = Math.floor((Math.random() * 100) + 1);
    message.channel.send( "You rolled a: " + result);
}
//8ball?
if (message.content.startsWith('--8ball')) {
    var sayings = ["It is certain",
                                    "It is decidedly so",
                                    "Without a doubt",
                                    "Yes, definitely",
                                    "You may rely on it",
                                    "As I see it, yes",
                                    "Most likely",
                                    "Outlook good",
                                    "Yes",
                                    "Signs point to yes",
                                    "Reply hazy try again",
                                    "Ask again later",
                                    "Better not tell you now",
                                    "Cannot predict now",
                                    "Concentrate and ask again",
                                    "Don't count on it",
                                    "My reply is no",
                                    "My sources say no",
                                    "Outlook not so good",
                                    "Very doubtful"];

        var result = Math.floor((Math.random() * sayings.length) + 0);
        message.channel.send( sayings[result]);
}
//flip
if (message.content === "--flip") {
    var result = Math.floor((Math.random() * 2) + 1);
    if (result == 1) {
        message.reply( "In the air and and and : You got **HEADS**");
    } else if (result == 2) {
        message.reply( "In the air and and and : You got **TAILS**");
    }
}
//info
if(message.content==="--info"){
    message.channel.send({embed: {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: "Invite Bot Here",
        url: "https://discordapp.com/api/oauth2/authorize?client_id=379561893905563649&scope=bot&permissions=1",
        description: "This Bot is just for Fun.",
        fields: [{
            name: "Developer",
            value: "Hmmmm.. I guess i developed myself LOL"
          },
          {
            name: "YT Channel",
            value: "Here is the   [YouTubeChannel](https://www.youtube.com/channel/UCjlKuj6P-zAqeu5YaQte3jQ?view_as=subscriber) "
          },
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© ﾉﾑ™_り3ﾑり"
        }
      }
    });
}

//purge
if (command === 'purge') {
    const amount = parseInt(args[0]);

    if (isNaN(amount)) {
        return message.reply('that doesn\'t seem to be a valid number.');
    }   
    if (isNaN(amount)) {
        return message.reply('that doesn\'t seem to be a valid number.');
    }
    else if (amount < 2 || amount > 100) {
        return message.reply('you need to input a number between 2 and 100.');
    }
    message.channel.bulkDelete(amount);    
}
//weather bruhh
if (message.content.startsWith( '--weather')) { 
    if (!message.mentions.users.size) {
        

    }
    weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) { // Make sure you get that args.join part, since it adds everything after weather.
        if (err) message.channel.send(err);

        // We also want them to know if a place they enter is invalid.
        if (result === undefined || result.length === 0) {
            message.channel.send('**Please enter a valid location.**') // This tells them in chat that the place they entered is invalid.
            return; // This exits the code so the rest doesn't run.
        }

        // Variables
        var current = result[0].current; // This is a variable for the current part of the JSON output
        var location = result[0].location; // This is a variable for the location part of the JSON output

        // Let's use an embed for this.
        const embed = new Discord.RichEmbed()
            .setDescription(`**${current.skytext}**`) // This is the text of what the sky looks like, remember you can find all of this on the weather-js npm page.
            .setAuthor(`Weather for ${current.observationpoint}`) // This shows the current location of the weather.
            .setThumbnail(current.imageUrl) // This sets the thumbnail of the embed
            .setColor(0x00AE86) // This sets the color of the embed, you can set this to anything if you look put a hex color picker, just make sure you put 0x infront of the hex
            .addField('Timezone',`UTC${location.timezone}`, true) // This is the first field, it shows the timezone, and the true means `inline`, you can read more about this on the official discord.js documentation
            .addField('Degree Type',location.degreetype, true)// This is the field that shows the degree type, and is inline
            .addField('Temperature',`${current.temperature} Degrees`, true)
            .addField('Feels Like', `${current.feelslike} Degrees`, true)
            .addField('Wind',current.winddisplay, true)
            .addField('Humidity', `${current.humidity}%`, true)

            // Now, let's display it when called
            message.channel.send({embed});
    });
}
//help
if (command == "help") { // creates a command *help
    var embedhelpmember = new Discord.RichEmbed() // sets a embed box to the variable embedhelpmember
        
        .setTitle("**Current Commands**\n")
        .addField(" - Prefix", ":robot: Current Prefix is    --") // sets the title to List of Commands
        .addField(" - help", ":fast_forward: Displays this message (Correct usage: --help)") // sets the first field to explain the command *help
        .addField(" - info", ":information_source: Tells info about myself :grin:") // sets the field information about the command *info
        .addField(" - ping", ":ping_pong: Tests your ping (Correct usage: --ping)") // sets the second field to explain the command *ping
        .addField(" - weather", ":thunder_cloud_rain:Grab Weather around the world (Correct usage: --weather [location]") // sets the third field to explain the command *cookie
        .addField(" - 8ball", ":8ball: Answers to all of your questions! (Correct usage: --8ball [question])") // sets the field to the 8ball command
        .addField(" - flip", ":black_circle: Flip a Coin (Correct usage: --flip)")
        .addField(" - roll", ":game_die: Roll a Dice (Correct usage: --roll)") // sets a field
        .addField(" - avatar", ":frame_photo: Grab Your/User Avatar  (Correct usage: --avatar <@user>)")
        .addField(" - whois", ":spy: Get Info about User/yourself (Correct usage: --whois <@user>)") //sets a field
        .addField(" - purge", ":x: Delete some trash  (Correct Usage:) --purge [amount] ")
        .addField(" - sinfo", ":couple: Grab Server Info  (Correct Usage: --server")
        .setColor(0xFF0000)
        .setFooter("All commands are in lowercase  ") // sets the footer to "You need help, do you?" 
        message.channel.send(embedhelpmember);
    }
    //extra
    





});

//joined
client.on('guildMemberAdd', member => {
    let guild = member.guild;
    const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('User Update',
      `${member.user} has joined! :white_check_mark: `)
      client.channels.find("name", "spawn_point").sendEmbed(embed);
  });
//leave
client.on('guildMemberRemove', member => {
    let guild = member.guild;
    const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('User Update',
      `${member.user} has left! :neutral_face: `)
      client.channels.find("name", "spawn_point").sendEmbed(embed);
  });
//role made
client.on('roleCreate', role => {
    let channel =  
    client.channels.find("name", "testing-").sendMessage(`**${role.name}** has been made :spy:`);
 });

client.on('disconnect', function() {
    console.log("An error cause your bot to go offline! ");
  });





client.login(config.token);
