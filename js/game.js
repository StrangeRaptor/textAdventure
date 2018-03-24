//Shortcut Selectors
var mainView = document.getElementById('mainView');
var input = document.getElementById('inputBox').value;

//Clear Input Box and Scroll
clearS = function() {
  document.getElementById('inputBox').value = '';
  mainView.scrollTop = mainView.scrollHeight;
};

//Add Text
addT = function(a,x) {
  var div = document.createElement('div');
  var br = document.createElement('br');
  mainView.appendChild(div).classList.add(x);
  if (x == "userT") {
    a = '>'+a;
    mainView.lastChild.innerHTML = a;
    mainView.appendChild(br);
  }
  mainView.lastChild.innerHTML = a;
};

//Typing Effect
type = function(text,clss,speed) {
  var textA = text.split('');
  var i = 0;
  var div = document.createElement('div');
  mainView.appendChild(div).classList.add(clss);
  loop = function() {
    if(textA[i] == ' '){
      mainView.lastChild.innerText += textA[i] + textA[i+1];
      i = i + 2;
      clearS();
      if (i < textA.length) {
        setTimeout(loop, speed);
      };
    }else{
      mainView.lastChild.innerText += textA[i];
      i++;
      clearS();
      if (i < textA.length) {
        setTimeout(loop, speed);
      };
    };
  };
  loop();
}

//Move The Player In A Chosen Direction
move = function(x){
  if (world[player["CURRENTLOC"]][x] != 'Blocked') {
    addT('You make your way ' + x.toLowerCase() + '... <br><br><br><br><br><br><br><br>','PCT');
    player["CURRENTLOC"] = world[player["CURRENTLOC"]][x];
    sLocation(player["CURRENTLOC"]);
    clearS();
  }else{
    addT('The Path is blocked.','PCT');
    clearS();
  }
};

//Show Player Location and Movement Options
sLocation = function(cloc) {
  addT("<br><u>"+cloc + "</u><br>" + world[cloc]["DESC"] + "<br><br>",'PCT');
  addT("North: " + world[cloc]["NORTH"], 'PCT');
  addT("East: " + world[cloc]["EAST"], 'PCT');
  addT("South: " + world[cloc]["SOUTH"], 'PCT');
  addT("West: " + world[cloc]["WEST"] + '<br><br><br><br>', 'PCT');
};

//Player Information
var player = {
  NAME: '',
  CURRENTLOC: 'Haunted Manor Lobby',
  LEVEL: 1,
  HEALTH: 20,
  ITEMS: ['',''],
  PC: 0
};

//Action Help
var aHelp = {
  help : 'Help: learn the usage of commands,<br> help <-command->',
  north : 'North: move the character north,<br> north',
  east : 'East: move the character north,<br> east',
  south : 'South: move the character north,<br> south',
  west : 'West: move the character north,<br> west',
  eat: 'Eat: use this command to eat items and various other things!,<br> eat <-thing->',
  attack: 'Attack: use this command to attack things you want to harm!,<br> attack <-thing->',
  save: 'Save: Save your progress and data!, save'
};

//Stores Previous Input
var previousInput = '';

//The World Around The Player
var world = {
  'Haunted Manor Lobby' : {
    DESC: 'This old manor was once a lively place... Now all that you can hear are the echoed screams of children...',
    NORTH: 'Haunted Manor Upstairs',
    EAST: 'Blocked',
    SOUTH: 'Blocked',
    WEST: 'Blocked'},
  'Haunted Manor Upstairs' : {
    DESC: 'The upstairs area is ruined. The paint on the walls are peeling and there is a faint stench of sawdust in the air... Screaming can also be heard in the distance...',
    NORTH: 'Blocked',
    EAST: 'Blocked',
    SOUTH: 'Haunted Manor Lobby',
    WEST: 'Blocked'
  },
  'Greyman Town' : {

  }
};

//Post Insert Name Message For New User Without A Name
if (player["NAME"] == '') {
  addT('Welcome new user! Please insert your name!', "PCT");
};

//Submit input
var submitInput = function() {
  input = document.getElementById('inputBox').value.replace(/[^a-zA-Z ]/g, "");
  var userText = input.replace(/^\s+/, '').replace(/\s+$/, '');
  if (userText == "") {
    return false;
  }else if (userText != "") {
    var z = input.toLowerCase();
    z = z.split(' ');
    if (z[0] == 'help') {
      addT(input, "userT");
      if (player["NAME"] == '') {
        addT('Set your name first! You can check help later!');
        clearS();
      }else{
      input = checkAction(input, false);
      clearS();
      };
    }else if (player["NAME"] == '') {
      addT(input, "userT");
      input = checkAction(input, true);
      newName(input);
      clearS();
    }else{
      addT(input, "userT");
      interpretAction(input);
      clearS();
    }
  }
};

//Get The Player to Input Their Name If They Currently Don't Have One
newName = function(x) {
  if (x != 'yes' && x != 'no'){
    addT('Are you sure that "' + x + '" is your name? (y/n)', 'PCT');
    previousInput = x;
  }else if (previousInput == 'no' || x == 'no' || previousInput == '' || previousInput == 'yes') {
    addT('Please enter a name:', 'PCT');
    previousInput = x;
  }else if (x == 'yes' && x != 'no') {
    player["NAME"] = previousInput;
    addT('Welcome ' + player["NAME"] + ' to the game!<br>','PCT');
    sLocation(player["CURRENTLOC"]);
    clearS();
  }
};

//Check What Action The Player is Doing
checkAction = function(x, r){
  var z = x.toLowerCase();
  z = z.split(' ').filter(Boolean);
  if(z[0] == 'yes' || z[0] == 'y'){
    return 'yes';
  }else if (z[0] == 'no' || z[0] == 'n'){
    return 'no';
  }else if (z[0] == 'help' && player["NAME"] != '') {
    displayHelp(z);
    return z[0];
  }else if (player["NAME"] != '') {
    if (z[0] == 'north') {
      return 'NORTH';
    }else if (z[0] == 'east') {
      return 'EAST';
    }else if (z[0] == 'south') {
      return 'SOUTH';
    }else if (z[0] == 'west') {
      return 'WEST';
    }else if (z[0] == 'inspect') {
      return z;
    }
  }else if (r == true){
    return x;
  }else if (r == false){
    return false;
  }
};

//(*-_-)
herMessage = function(z,t) {
  var i = 0
  document.getElementById('inputBox').style.display = 'none';
  run = function() {
    if (i < z.length && i != undefined) {
      var x = z[i].length;
      console.log(t/x);
      type(z[i],'PCT',t/x);
      i++;
      clearS();
      setTimeout(run, x^t);
    }else{
      document.getElementById('inputBox').style.display = 'inline-block';
      clearS();
    }
  };
  run();
};

//(*^-^)
displayHelp = function(x){
  if (x.length > 1) {
    if (x[x.length-1] == 'me' && player["PC"] == 0) {
      player["PC"] = [1,0,0,0,0,0];
      herMessage(['(*^-^) Really?',"(*^-^) You have to ask me about commands. That's how this works. Type help then a command.",'(*>v<) Maybe next time you won\'t be so fucking useless...','(*o-o) ...'+player["NAME"]+'... if that even is your real name...'],3750);

    }else if (player['PC'][3] == 1 && x[x.length-1] == 'why') {
      if (player['PC'][4] == 1 && player['PC'][5] != 1) {
        herMessage(["(*._.) .....", "(*v.v) .....", "(*._.) .....", "(*._.) ...my name...", "(*v.v) ...it doesn't exist anymore...", "(*._.) ...it wasn't always like this though...", "(*v.v) ...that's all I'll say for now..."],5100);
        player['PC'][5] = 1;
      };
      if (player['PC'][4] != 1) {
        herMessage(["(*-.-) stop caring...", '(*._.) ....I just rather not answer okay... if you ask why again...', "(*._.) ...maybe...", "(*v_v) I....", "(*v_v) ...maybe... I'll answer...", "(*v_v) ...maybe..."],5050);
        player['PC'][4] = 1;
      };

    }else if (player["PC"][0] == 1 && x[x.length-1] == 'you') {

      if (x[x.length-2] == 'help' && player['PC'][1] == 0) {
        player['PC'][1] = 1;
        herMessage(['(*^-^) How cute of you, thinking I would actually need help from you out of all people.','(*-_-) Are you so vain that you think that you\'d actually be able to help me cope with any of my problems?','...','...','...','(*-#-) Just play the game already.'],3750)
        player['PC'][3] = 0;

      }else if (x[x.length-2] == 'love' && player['PC'][2] == 0) {
        if (x[x.length-3] == 'i') {
          player['PC'][2] = 1;
          herMessage(['(*-_-) How flattering... Already in love with a girl you\'ve just met.','(*^-^) Are you high?','(*^-^) Or do you just act retarded?','(*^-^) Oh I\'m sorry to hear that your lack of brain cells isn\'t caused by drugs or an accident.','(*^-^) Maybe next time you can back the fuck up and play the game. It really isn\'t that hard.'],4500);
          player['PC'][3] = 0;
        }else {
          addT('Cannot find help for command "' + x[1] + '"','PCT');
        }

      }else if (x[x.length-2] == 'fuck') {
        herMessage(['(*-^-) ....', '(*oAo) DON\'T BE SUCH A LITTLE FUCKING SHIT','(*oAo) YOU THINK I\'M HERE FOR FUN YOU LITTLE SHIT?','(*oAo) DO YOU THINK LITTLE MISS ----- WANTED THIS FUCKING LIFE, HUH?', '(*O<o) BET YOU NEVER FUCKING THOUGHT ABOUT THAT SO FUCK YOU!','(*-_-) ...sheesh... you\'re getting my CPU heated...'],3000);
        player['PC'][1] = 0;
        player['PC'][3] = 0;

      }else if(x[x.length-2] == 'are'){
        if (x[x.length-3] == 'who') {
          herMessage(["(*-.-) None of your buisness...", "(*-.-) focus on your own damn life..."],4000);
          player['PC'][3] = 1;
        }
      }else {
        addT('Cannot find help for command "' + x[1] + '"','PCT');
      }

    }else if (aHelp[x[x.length-1]] != undefined && aHelp[x[x.length-1]] != '') {
      addT(aHelp[x[x.length-1]], 'PCT');
    }else {
      addT('Cannot find help for command "' + x[1] + '"','PCT');
    }

  }else {
    addT("Here are some things you can type!",'PCT');
    addT(Object.keys(aHelp).toString().split(',').join(', '), 'PCT');
  }
};

//Interpret What The Player Wants To Do
interpretAction = function(x) {
  var z = checkAction(x, false);
  if (z == false) {
    addT("Sorry I couldn't understand what you wanted. Try typing \"help\" for some actions.",'PCT');
  }else{
    processInput(z);
  }
};

//Ensures The Input is in The Correct Functions
processInput = function(x) {
  if (x == 'NORTH' || x == 'EAST' || x == 'SOUTH' || x == 'WEST') {
    move(x);
  }else if (x == 'inventory') {
    displayInventory();
  };
};
