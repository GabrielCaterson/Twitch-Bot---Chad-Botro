/*
A twitch.tv chat bot by Gabriel Caterson.
6/18/2017


My to-do list:
Naughty and nice list
*/

var tmi = require('tmi.js');
var deathCounter = 0;

//FOR CREATING A NEW BOT: Set up your channel stuff here!
//############################################################
var channelName = "sittiponder";
var botUsername = "chad_botro";
var oauthToken = "oauth:flq11mxstbaiijpk2bg93cuhur8rpx";
//############################################################


var options = {
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

client.on('chat', function(channel, user, message, self){
  if(message === "!help"){

    client.action(channelName, "What's up, " + user['display-name'] + "? I'm " + botUsername + ". Here's some stuff I can do:");

      client.action(channelName, "!death -- Adds a death to the " + channelName + " death counter.");

      client.action(channelName, "!deathreset -- Resets the " + channelName + " death counter.");

  } else if (message === "!death"){
    deathCounter ++;
    if (deathCounter === 1){
      client.action(channelName, deathCounter + " death so far, buckaroo!");
    } else {
      client.action(channelName, deathCounter + " deaths so far!");
    }
  } else if (message === "!deathreset"){
    deathCounter = 0;
    client.action(channelName, "The death counter is now 0. ");
  }
});

client.on('connected', function(address, port) {
  client.action(channelName, "Hey buckaroos! Type !help to see what I do.");
});



//meow
