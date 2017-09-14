/*
A twitch.tv chat bot by Gabriel Caterson.
6/18/2017

*/

var tmi = require('tmi.js');

//FOR CREATING A NEW BOT: Set up your channel stuff here!
//############################################################
var channelName = "sittiponder";
var botUsername = "Sittibotter";
var oauthToken = "oauth:0e380g6jfy0imfeqv452h2rw2jls69";
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
  if(message === "!hello"){
    client.action(channelName, "Hey " + user['display-name'] + ", stop talking about me.");
  }
});

client.on('connected', function(address, port) {
  client.action(channelName, "Hello, I'm Sittibotter and I like burritos.");
});



//meow
