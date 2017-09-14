/*
A twitch.tv chat bot by Gabriel Caterson.
6/18/2017

Features:
    -Death counter

Pending in this version:
    -Naughty list

My to-do list:
    -Cleverbot API inclusion?
    -Nice list?
    -Random Potro sayings at random times
    -name color changer?

Chad words:
    Cowboy
    buckaroo
    Becky
    Partner
    Gewd

Chad names:
    Evan Spagevan (or any spaglatin variant)
    Goob
    Zacky


Chad phrases:
    Why do you smell like chicken nuggets?
    You know what they say... sometimes you (two partially or completely unrelated things).
    Oh no!
    Saying the same thing twice (like bot bot).

Channel memes:
    Minecraft is scripted
    Robert's puns
    Zack dies first
*/

var tmi = require('tmi.js');
var fs = require('fs'); //naughtyList.json require
var listFile;
fs.readFile('/Users/gabrielcaterson/twitchBot/naughtyList.json', 'utf8', function (err, data) {
    if (err) throw err;
    listFile = JSON.parse(data);
});

var deathCounter = 0;
var naughtyKid;

//FOR CREATING A NEW BOT: Set up your channel stuff here!
//############################################################
var channelName = "chad_potro";
var botUsername = "chad_botro";
var oauthToken  = "oauth:flq11mxstbaiijpk2bg93cuhur8rpx";
//############################################################

var options = { //Login stuff.
    options: {
        debug: true
    },
    connection: {
        cluster: "aws",
        reconnect: true
    },
    identity: {
        username: botUsername,
        password: oauthToken
    },
    channels: [channelName]
};


var client = new tmi.client(options);
client.connect();

client.on("chat", function(channel, user, message, self){ //Help messages.
    if(message === "!help"){

        client.action(channelName, "What's up, " + user['display-name'] + "? I'm " + botUsername + ". Here's some stuff I can do:");

        client.action(channelName, "!death -- Adds a death to the " + channelName + " death counter.");

        client.action(channelName, "!deathreset -- Resets the " + channelName + " death counter.");

        client.action(channelName, "!naughty Becky (or whoever else) -- Adds a buckaroo to the naughty list.");

        client.action(channelName, "!nice Daddy_Doo (or whoever else)-- Adds a buckaroo the to the nice list.");

    } else if (message === "!death"){ //Death counter messages.
        deathCounter ++;
        if (deathCounter === 1){
            client.action(channelName, deathCounter + " death so far, buckaroo!");
        } else {
            client.action(channelName, deathCounter + " deaths so far!");
        }
    } else if (message === "!deathreset"){ //Resets death counter.
        deathCounter = 0;
        client.action(channelName, "The death counter is now 0. ");
    } else if (message.includes("!naughty ")) {
        naughtyKid = message;
        naughtyKid = naughtyKid.replace("!naughty ","") //Take "!naughty " out of the message.
        if (Object.values(listFile).indexOf(naughtyKid) != 0) { //If the user's name starts somewhere in the naughty list.
            client.action(channelName, listFile.naughty);
        } else {
            client.action(channelName, "Ride /'em cowboy!");
        }
        //client.action(channelName, Object.values(listFile));
        client.action(channelName, naughtyKid + " has been added to the naughty list! ");
    }

});

client.on('connected', function(address, port) { //Hello message.
    client.action(channelName, "Hey buckaroos! Type !help to see what I do.");
});



//meow
