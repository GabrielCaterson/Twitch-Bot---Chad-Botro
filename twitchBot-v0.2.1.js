/*
A twitch.tv chat bot by Gabriel Caterson, A.K.A. Sittiponder.
6/18/2017

Current Features:
    v0.1
        -Death counter

Pending in this version:
    -Naughty list

My to-do list:
    -!help cooldown
    -Nice list?
    -Coin Flip
    -Random # between 1 and X
    -Cleverbot API inclusion?
    -Random Potro sayings at random times
    -name color changer?

Chad words:
    Cowboy
    Buckaroo
    Becky
    Partner
    Gewd
    Spaghetti
    Anything spelled weird (like money = mooney, chicken = chickown)


Chad names:
    Chad Official:
        Evan Spagevan (or any spaglatin variant)
        Goob
        Zacky
        Spaghetti (name)
        Poopy (name)
        Becky (name)
        Pirate (name)
        (name) Scooby
    Chad inspired:
        Firetruck (name)
        Number (name)
        Hotdog (name)
        Noodle (name)
        Go Cart (name)
        Astronaut (name)
        Space Pirate (name)
        (name) Mc(name)
        (name)(name)
        Crocodile Mc(name)
        Vegetable (name)
        (username)aroo


        (partial name)(partial name)
        (name with a vowel changed)
        (name with a vowel doubled (like o or e)(ex: SPAGEETT_, Sittipoonder))


Chad phrases:
    Chad Official:
        Why do you smell like chicken nuggets?
        You know what they say... sometimes you (two partially or completely unrelated things)
        Oh no!
        Saying the same thing twice (like bot bot)
        Ride 'em cowboy!
        Oh boy!
        Gonna have a real gewd time.
        Real gewd.
        OHHHHHHH! OWNED!
        (blank): the (blank) (like gay: the song, or TV Show: the TV Show)
    Chad Inspired:



Channel memes:
    Minecraft is scripted
    Robert's puns
    Zack dies first


Chad's naughty list insults:
    Chad Official:
        (username) smells like chicken nuggets.
        Hey, (username), when are you getting back from the toilet store?
        (username) should go sniff a lamp.
        Hey look, it's poopy (username).
        (username) is at the supermarket.


        Add a random "OOHHHH! OWNED!!!" to another insult.

    Chad inspired:
        I bet (username) goes to the grocery store.
        (username) eats computer keyboards.
        (username), you're a (username).
        Uh oh, (username). Looks like you're a baddy bad buckaroo.
        (username), go take a bath bath. >> setTimeout(5000) Come on poopy (username). It's bath bath time.
        (username) has a belly button.
        Hey, (username). Sports.
        (username) has bug poop.


Chad's nice list complements:
    Chad Official:
        (username) is soccer
        (username) is a gewd (username). A real gewd (username)
        Check it out, cowboys, it's spaghetti (username)
        (username) Spag(username) is gewd

    Chad Inspired:
        Hey (username), you're invited to my spaghetti wedding! copyThis pastaThat
        Look out! It's (username) the (username)!


*/

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


var tmi = require('tmi.js');
var fs = require('fs'); //naughtyList.json require
var listFile;

var deathCounter = 0;
var naughtyKid;

function readNaughtyList(){ //Reads the naughty list JSON file.
    fs.readFile('./twitchBot/naughtyList.json', 'utf8', function (err, data) {
        if (err) throw err;
        listFile = JSON.parse(data);
    });
}
readNaughtyList();

function addNaughtyKid(kidName){ //Adds a kid to the naughty list.
    listFile.naughty.push({kidName});
    listFile.naughty = JSON.stringify(listFile);
    client.action(channelName, listFile.naughty);
    fs.writeFile("naughtyList.json", listFile, "utf8", function (err, data) {
        if (err) throw err;
    });
    readNaughtyList();
}




var client = new tmi.client(options);
client.connect();

client.on("chat", function(channel, user, message, self){ //Help messages.
    if(message === "!help"){

        client.action(channelName, "What's up, " + user['display-name'] + "? I'm " + botUsername + " version 0.2.1. I'm in beta, so don't complain when I glitch out and take over the world accidentally. Here's some stuff I can do (on purpose):");
        client.action(channelName, "!death -- Adds a death to the " + channelName + " death counter");
        client.action(channelName, "!deathreset -- Resets the " + channelName + " death counter");
        client.action(channelName, "!naughty Becky (or whoever else) -- Adds a buckaroo to the naughty list");
        client.action(channelName, "!nice Daddy_Doo (or whoever else) -- Adds a buckaroo to the nice list");

    } else if (message === "!death"){ //Death counter messages.
        deathCounter ++;
        if (deathCounter === 1){
            client.action(channelName, deathCounter + " death so far, buckaroo!");
        } else {
            client.action(channelName, deathCounter + " deaths so far!");
        }

    } else if (message === "!deathreset"){ //Resets death counter.
        deathCounter = 0;
        client.action(channelName, "The death counter is now 0.");

    } else if (message.includes("!naughty ")) {
        naughtyKid = message;
        naughtyKid = naughtyKid.replace("!naughty ",""); //Take "!naughty " out of the message.

        if (Object.values(listFile.naughty).toString().indexOf(naughtyKid) > -1) { //If the user's name starts somewhere in the naughty list.
            client.action(channelName, "Wait, what? " + naughtyKid + " is already on the naughty list. FailFish This is just great. Now I'm confused because I'm just a bot, and you're asking me to do something impossible. I can't create two of " + naughtyKid + ". Come on, cowboy. Do something right for once.");

        } else if (Object.values(listFile.nice).toString().indexOf(naughtyKid) > -1){//If the user's name starts somewhere in the nice list.
            client.action(channelName, listFile.naughty);//debug
            client.action(channelName, "Ohhh boy! We got a gewd buckaroo turned bad! " + naughtyKid + " is on the naughty list now!");
            addNaughtyKid(naughtyKid);

            client.action(channelName, listFile.naughty);//debug

        } else {
            client.action(channelName, "BEEP...     BOOP...     OTHER ROBOT NOISES...     Okay spaghetti " + user["display-name"] + ". I put " + naughtyKid + " on the naughty list for ya");
        }

    }

});

client.on('connected', function(address, port) { //Hello message.
    client.action(channelName, "Hey buckaroos! Type !help to see what I do.");
});



//meow
