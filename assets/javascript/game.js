// Welcome to my Mandalorain RPG game!

// Made objects out of each of the characters.
// Couldn't figure out how to add attack power to
// itself every time so I made an baseAP variable
// to use for adding.

var baby = {
  hp: 170,
  ap: 15,
  baseAp: 15,
  cap: 20
};

var mando = {
  hp: 150,
  ap: 20,
  baseAp: 20,
  cap: 25
};
var droid = {
  hp: 110,
  ap: 15,
  baseAp: 15,
  cap: 20
};
var kuiil = {
  hp: 120,
  ap: 25,
  baseAp: 25,
  cap: 15
};

// These three booleans control my click events and
// what they should be doing at different points of
// the game. I used yourOpponent to link the characters
// to their divs and the wins variable to determine
// when all the opponents are defeated and you win.
var fighterSelected = false;
var fighter = false;
var attack = false;
var yourOpponent;
var wins = 0;

// Used variables for the entire character div so
// it makes it a lot easier to move the characters
// around the screen.
var droidChar =
  '<div class="droidDiv character">' +
  '<p>Droid IG-11</p>' +
  '<img src="./assets/images/droid.jpg" alt="" />' +
  '<p class="droidHealth">####</p>' +
  '</div>';
var kuiilChar =
  '<div class="kuiilDiv character">' +
  '<p>Kuiil</p>' +
  '<img src="./assets/images/kuiil.jpg" alt="" />' +
  '<p class="kuiilHealth">####</p>' +
  '</div>';
var mandoChar =
  '<div class="mandoDiv character">' +
  '<p>The Mandalorian</p>' +
  '<img src="./assets/images/mando.jpg" alt="" />' +
  '<p class="mandoHealth">####</p>' +
  '</div>';
var babyChar =
  '<div class="babyDiv character">' +
  '<p>Baby Yoda</p>' +
  '<img src="./assets/images/baby.jpg" alt="" />' +
  '<p class="babyHealth">####</p>' +
  '</div>';

// This function displays each characters health on
// the page when called. Easier to use this than
// updating each character individually.
function healthDisp() {
  $('.babyHealth').text(baby.hp + 'HP');
  $('.mandoHealth').text(mando.hp + 'HP');
  $('.droidHealth').text(droid.hp + 'HP');
  $('.kuiilHealth').text(kuiil.hp + 'HP');
}

// This function sets the opponents to the waiting area
// once the fighter has been picked.
function selectFighter(x, y, z) {
  $('.selectionContainer').css('display', 'none');
  $('.fightBoard').css('display', 'block');
  $('.fightersLeft').html(x + y + z);
  healthDisp();
  fighterSelected = true;
}

// This determines when the player has defeated
// every character and stops the game.
function winner(x) {
  if (x === 3) {
    fighterSelected = false;
    fighter = false;
    attack = false;

    $('.popup1').text("You've beat them all! Congrats!");
    $('.popup2').text('Press button to retry');
    $('.attackBtn').css('display', 'none');
    $('.restart').css('display', 'block');
  }
}

// Starting the game
healthDisp();
$('.selectionContainer').css('display', 'block');
$('.fightBoard').css('display', 'none');

// These click events are basically the same besides
// the placement of the characters in the code. So
// I'm just going to explain the first one. They're
// long so I separated them with foward slashes.
$('.babyDiv').click(function() {
  // Once a fighter is clicked the others are placed into
  // the selectFighter function to move everyone into place
  // the function sets fighterSelected to true. Then fighter
  // is set to true.
  if (!fighterSelected) {
    $('.fighter').html(this);
    selectFighter(droidChar, mandoChar, kuiilChar);
    fighter = true;
  }
  // These three click events are for choosing your opponent
  // if one is clicked its moved into position, refreshes
  // everyones health displayed, clears the popup text,
  // changes fighter back to false, attack to true and sets
  // the opponent.
  $('.mandoDiv').click(function() {
    if (fighter) {
      $('.mandoDiv').remove();
      $('.selectOpponent').css('display', 'none');
      $('.selectedOpponent').html(mandoChar);
      healthDisp();
      $('.popup1').text('');
      $('.popup2').text('');
    }
    fighter = false;
    attack = true;
    yourOpponent = mando;
  });

  $('.droidDiv').click(function() {
    if (fighter) {
      $('.droidDiv').remove();
      $('.selectOpponent').css('display', 'none');
      $('.selectedOpponent').html(droidChar);
      healthDisp();
      $('.popup1').text('');
      $('.popup2').text('');
    }
    fighter = false;
    attack = true;
    yourOpponent = droid;
  });

  $('.kuiilDiv').click(function() {
    if (fighter) {
      $('.kuiilDiv').remove();
      $('.selectOpponent').css('display', 'none');
      $('.selectedOpponent').html(kuiilChar);
      healthDisp();
      $('.popup1').text('');
      $('.popup2').text('');
    }
    fighter = false;
    attack = true;
    yourOpponent = kuiil;
  });
  // This click event is for the attack stage. Prior to
  // this the attack button only tells you to select an
  // opponent because youOppenent is empty.
  $('.attackBtn').click(function() {
    if (attack) {
      // These 3 conditionals determine which opponent you picked
      // and the attack button does the fight calculations and
      // shows the info  in the popup divs.
      if (yourOpponent === kuiil) {
        baby.hp -= kuiil.cap;
        kuiil.hp -= baby.ap;
        $('.popup1').text('Baby Yoda attacks for ' + baby.ap);
        $('.popup2').text('Kuiil counter attacks for ' + kuiil.cap);
        baby.ap += baby.baseAp;
        healthDisp();
        // If you characters hp reaches zero the attack button is
        // replaced with a restart button and the popups display
        // a game over message. HP will never display < 0 either.
        if (baby.hp < 1) {
          if (kuiil.hp < 1) {
            kuiil.hp = 0;
          }
          baby.hp = 0;
          healthDisp();
          $('.popup1').text('You died. Game Over');
          $('.popup2').text('Press button to retry');
          $('.attackBtn').css('display', 'none');
          $('.restart').css('display', 'block');
        }
        // This part runs when you opponents hp reaches 0. It also
        // changes the attack and fighter booleans so you can choose
        // your next fighter. wins++
        else if (kuiil.hp < 1) {
          kuiil.hp = 0;
          healthDisp();
          $('.popup1').text('Kuiil has been defeated!');
          $('.popup2').text('Select another opponent.');
          wins++;
          attack = false;
          fighter = true;
        }
        // Checks if you've won at every attack.
        winner(wins);
      }

      if (yourOpponent === mando) {
        baby.hp -= mando.cap;
        mando.hp -= baby.ap;
        $('.popup1').text('Baby Yoda attacks for ' + baby.ap);
        $('.popup2').text('The Mandalorian counter attacks for ' + mando.cap);
        baby.ap += baby.baseAp;
        healthDisp();
        if (baby.hp < 1) {
          if (mando.hp < 1) {
            mando.hp = 0;
          }
          baby.hp = 0;
          healthDisp();
          $('.popup1').text('You died. Game Over');
          $('.popup2').text('Press button to retry');
          $('.attackBtn').css('display', 'none');
          $('.restart').css('display', 'block');
        } else if (mando.hp < 1) {
          mando.hp = 0;
          healthDisp();
          $('.popup1').text('The Mandalorian has been defeated!');
          $('.popup2').text('Select another opponent.');
          wins++;
          attack = false;
          fighter = true;
        }
        winner(wins);
      }

      if (yourOpponent === droid) {
        baby.hp -= droid.cap;
        droid.hp -= baby.ap;
        $('.popup1').text('Baby Yoda attacks for ' + baby.ap);
        $('.popup2').text('Droid IG-11 counter attacks for ' + droid.cap);
        baby.ap += baby.baseAp;
        healthDisp();
        if (baby.hp < 1) {
          if (droid.hp < 1) {
            droid.hp = 0;
          }
          baby.hp = 0;
          healthDisp();
          $('.popup1').text('You died. Game Over');
          $('.popup2').text('Press button to retry');
          $('.attackBtn').css('display', 'none');
          $('.restart').css('display', 'block');
        } else if (droid.hp < 1) {
          droid.hp = 0;
          healthDisp();
          $('.popup1').text('Droid IG-11 has been defeated!');
          $('.popup2').text('Select another opponent.');
          wins++;
          attack = false;
          fighter = true;
        }
        winner(wins);
      }
    } else {
      $('.popup1').text('Please Select Opponent!');
      $('.popup2').text('');
      setTimeout(function() {
        $('.popup1').text('');
      }, 1500);
    }
  });
}); //End of click
//
//
//
//

$('.mandoDiv').click(function() {
  if (!fighterSelected) {
    $('.fighter').html(this);
    selectFighter(droidChar, babyChar, kuiilChar);
    fighter = this;
  }
  $('.babyDiv').click(function() {
    if (fighter) {
      $('.babyDiv').remove();
      $('.selectOpponent').css('display', 'none');
      $('.selectedOpponent').html(babyChar);
      healthDisp();
      $('.popup1').text('');
      $('.popup2').text('');
    }
    fighter = false;
    attack = true;
    yourOpponent = baby;
  });

  $('.droidDiv').click(function() {
    if (fighter) {
      $('.droidDiv').remove();
      $('.selectOpponent').css('display', 'none');
      $('.selectedOpponent').html(droidChar);
      healthDisp();
      $('.popup1').text('');
      $('.popup2').text('');
    }
    fighter = false;
    attack = true;
    yourOpponent = droid;
  });

  $('.kuiilDiv').click(function() {
    if (fighter) {
      $('.kuiilDiv').remove();
      $('.selectOpponent').css('display', 'none');
      $('.selectedOpponent').html(kuiilChar);
      healthDisp();
      $('.popup1').text('');
      $('.popup2').text('');
    }
    fighter = false;
    attack = true;
    yourOpponent = kuiil;
  });

  $('.attackBtn').click(function() {
    if (attack) {
      if (yourOpponent === kuiil) {
        mando.hp -= kuiil.cap;
        kuiil.hp -= mando.ap;
        $('.popup1').text('The Mandalorian attacks for ' + mando.ap);
        $('.popup2').text('Kuiil counter attacks for ' + kuiil.cap);
        mando.ap += mando.baseAp;
        healthDisp();
        if (mando.hp < 1) {
          if (kuiil.hp < 1) {
            kuiil.hp = 0;
          }
          mando.hp = 0;
          healthDisp();
          $('.popup1').text('You died. Game Over');
          $('.popup2').text('Press button to retry');
          $('.attackBtn').css('display', 'none');
          $('.restart').css('display', 'block');
        } else if (kuiil.hp < 1) {
          kuiil.hp = 0;
          healthDisp();
          $('.popup1').text('Kuiil has been defeated!');
          $('.popup2').text('Select another opponent.');
          wins++;
          attack = false;
          fighter = true;
        }
        winner(wins);
      }
      if (yourOpponent === baby) {
        mando.hp -= baby.cap;
        baby.hp -= mando.ap;
        $('.popup1').text('The Mandalorian attacks for ' + mando.ap);
        $('.popup2').text('Baby Yoda counter attacks for ' + baby.cap);
        mando.ap += mando.baseAp;
        healthDisp();
        if (mando.hp < 1) {
          if (baby.hp < 1) {
            baby.hp = 0;
          }
          mando.hp = 0;
          healthDisp();
          $('.popup1').text('You died. Game Over');
          $('.popup2').text('Press button to retry');
          $('.attackBtn').css('display', 'none');
          $('.restart').css('display', 'block');
        } else if (baby.hp < 1) {
          baby.hp = 0;
          healthDisp();
          $('.popup1').text('Baby Yoda has been defeated!');
          $('.popup2').text('Select another opponent.');
          wins++;
          attack = false;
          fighter = true;
        }
        winner(wins);
      }
      if (yourOpponent === droid) {
        mando.hp -= droid.cap;
        droid.hp -= mando.ap;
        $('.popup1').text('The Mandalorian attacks for ' + mando.ap);
        $('.popup2').text('Droid IG-11 counter attacks for ' + droid.cap);
        mando.ap += mando.baseAp;
        healthDisp();
        if (mando.hp < 1) {
          if (droid.hp < 1) {
            droid.hp = 0;
          }
          mando.hp = 0;
          healthDisp();
          $('.popup1').text('You died. Game Over');
          $('.popup2').text('Press button to retry');
          $('.attackBtn').css('display', 'none');
          $('.restart').css('display', 'block');
        } else if (droid.hp < 1) {
          droid.hp = 0;
          healthDisp();
          $('.popup1').text('Droid IG-11 has been defeated!');
          $('.popup2').text('Select another opponent.');
          wins++;
          attack = false;
          fighter = true;
        }
        winner(wins);
      }
    } else {
      $('.popup1').text('Please Select Opponent!');
      $('.popup2').text('');
      setTimeout(function() {
        $('.popup1').text('');
      }, 1500);
    }
  });
}); //End of click
//
//
//
//

$('.droidDiv').click(function() {
  if (!fighterSelected) {
    $('.fighter').html(this);
    selectFighter(babyChar, mandoChar, kuiilChar);
    fighter = true;
  }
  $('.mandoDiv').click(function() {
    if (fighter) {
      $('.mandoDiv').remove();
      $('.selectOpponent').css('display', 'none');
      $('.selectedOpponent').html(mandoChar);
      healthDisp();
      $('.popup1').text('');
      $('.popup2').text('');
    }
    fighter = false;
    attack = true;
    yourOpponent = mando;
  });

  $('.babyDiv').click(function() {
    if (fighter) {
      $('.babyDiv').remove();
      $('.selectOpponent').css('display', 'none');
      $('.selectedOpponent').html(babyChar);
      healthDisp();
      $('.popup1').text('');
      $('.popup2').text('');
    }
    fighter = false;
    attack = true;
    yourOpponent = baby;
  });

  $('.kuiilDiv').click(function() {
    if (fighter) {
      $('.kuiilDiv').remove();
      $('.selectOpponent').css('display', 'none');
      $('.selectedOpponent').html(kuiilChar);
      healthDisp();
      $('.popup1').text('');
      $('.popup2').text('');
    }
    fighter = false;
    attack = true;
    yourOpponent = kuiil;
  });

  $('.attackBtn').click(function() {
    if (attack) {
      if (yourOpponent === kuiil) {
        droid.hp -= kuiil.cap;
        kuiil.hp -= droid.ap;
        $('.popup1').text('Droid IG-11 attacks for ' + droid.ap);
        $('.popup2').text('Kuiil counter attacks for ' + kuiil.cap);
        droid.ap += droid.baseAp;
        healthDisp();
        if (droid.hp < 1) {
          if (kuiil.hp < 1) {
            kuiil.hp = 0;
          }
          droid.hp = 0;
          healthDisp();
          $('.popup1').text('You died. Game Over');
          $('.popup2').text('Press button to retry');
          $('.attackBtn').css('display', 'none');
          $('.restart').css('display', 'block');
        } else if (kuiil.hp < 1) {
          kuiil.hp = 0;
          healthDisp();
          $('.popup1').text('Kuiil has been defeated!');
          $('.popup2').text('Select another opponent.');
          wins++;
          attack = false;
          fighter = true;
        }
        winner(wins);
      }
      if (yourOpponent === mando) {
        droid.hp -= mando.cap;
        mando.hp -= droid.ap;
        $('.popup1').text('Droid IG-11 attacks for ' + droid.ap);
        $('.popup2').text('The Mandalorian counter attacks for ' + mando.cap);
        droid.ap += droid.baseAp;
        healthDisp();
        if (droid.hp < 1) {
          if (mando.hp < 1) {
            mando.hp = 0;
          }
          droid.hp = 0;
          healthDisp();
          $('.popup1').text('You died. Game Over');
          $('.popup2').text('Press button to retry');
          $('.attackBtn').css('display', 'none');
          $('.restart').css('display', 'block');
        } else if (mando.hp < 1) {
          mando.hp = 0;
          healthDisp();
          $('.popup1').text('The Mandalorian has been defeated!');
          $('.popup2').text('Select another opponent.');
          wins++;
          attack = false;
          fighter = true;
        }
        winner(wins);
      }
      if (yourOpponent === baby) {
        droid.hp -= baby.cap;
        baby.hp -= droid.ap;
        $('.popup1').text('Droid IG-11 attacks for ' + droid.ap);
        $('.popup2').text('Baby Yoda counter attacks for ' + baby.cap);
        droid.ap += droid.baseAp;
        healthDisp();
        if (droid.hp < 1) {
          if (baby.hp < 1) {
            baby.hp = 0;
          }
          droid.hp = 0;
          healthDisp();
          $('.popup1').text('You died. Game Over');
          $('.popup2').text('Press button to retry');
          $('.attackBtn').css('display', 'none');
          $('.restart').css('display', 'block');
        } else if (baby.hp < 1) {
          baby.hp = 0;
          healthDisp();
          $('.popup1').text('Baby Yoda has been defeated!');
          $('.popup2').text('Select another opponent.');
          wins++;
          attack = false;
          fighter = true;
        }
        winner(wins);
      }
    } else {
      $('.popup1').text('Please Select Opponent!');
      $('.popup2').text('');
      setTimeout(function() {
        $('.popup1').text('');
      }, 1500);
    }
  });
}); //End of click
//
//
//
//

$('.kuiilDiv').click(function() {
  if (!fighterSelected) {
    $('.fighter').html(this);
    selectFighter(droidChar, mandoChar, babyChar);
    fighter = true;
  }
  $('.mandoDiv').click(function() {
    if (fighter) {
      $('.mandoDiv').remove();
      $('.selectOpponent').css('display', 'none');
      $('.selectedOpponent').html(mandoChar);
      healthDisp();
      $('.popup1').text('');
      $('.popup2').text('');
    }
    fighter = false;
    attack = true;
    yourOpponent = mando;
  });

  $('.droidDiv').click(function() {
    if (fighter) {
      $('.droidDiv').remove();
      $('.selectOpponent').css('display', 'none');
      $('.selectedOpponent').html(droidChar);
      healthDisp();
      $('.popup1').text('');
      $('.popup2').text('');
    }
    fighter = false;
    attack = true;
    yourOpponent = droid;
  });

  $('.babyDiv').click(function() {
    if (fighter) {
      $('.babyDiv').remove();
      $('.selectOpponent').css('display', 'none');
      $('.selectedOpponent').html(babyChar);
      healthDisp();
      $('.popup1').text('');
      $('.popup2').text('');
    }
    fighter = false;
    attack = true;
    yourOpponent = baby;
  });

  $('.attackBtn').click(function() {
    if (attack) {
      if (yourOpponent === baby) {
        kuiil.hp -= baby.cap;
        baby.hp -= kuiil.ap;
        $('.popup1').text('Kuiil attacks for ' + kuiil.ap);
        $('.popup2').text('Baby Yoda counter attacks for ' + baby.cap);
        kuiil.ap += kuiil.baseAp;
        healthDisp();
        if (kuiil.hp < 1) {
          if (baby.hp < 1) {
            baby.hp = 0;
          }
          kuiil.hp = 0;
          healthDisp();
          $('.popup1').text('You died. Game Over');
          $('.popup2').text('Press button to retry');
          $('.attackBtn').css('display', 'none');
          $('.restart').css('display', 'block');
        } else if (baby.hp < 1) {
          baby.hp = 0;
          healthDisp();
          $('.popup1').text('Baby Yoda has been defeated!');
          $('.popup2').text('Select another opponent.');
          wins++;
          attack = false;
          fighter = true;
        }
        winner(wins);
      }
      if (yourOpponent === mando) {
        kuiil.hp -= mando.cap;
        mando.hp -= kuiil.ap;
        $('.popup1').text('Kuiil attacks for ' + kuiil.ap);
        $('.popup2').text('The Mandalorian counter attacks for ' + mando.cap);
        kuiil.ap += kuiil.baseAp;
        healthDisp();
        if (kuiil.hp < 1) {
          if (mando.hp < 1) {
            mando.hp = 0;
          }
          baby.hp = 0;
          healthDisp();
          $('.popup1').text('You died. Game Over');
          $('.popup2').text('Press button to retry');
          $('.attackBtn').css('display', 'none');
          $('.restart').css('display', 'block');
        } else if (mando.hp < 1) {
          mando.hp = 0;
          healthDisp();
          $('.popup1').text('The Mandalorian has been defeated!');
          $('.popup2').text('Select another opponent.');
          wins++;
          attack = false;
          fighter = true;
        }
        winner(wins);
      }
      if (yourOpponent === droid) {
        kuiil.hp -= droid.cap;
        droid.hp -= kuiil.ap;
        $('.popup1').text('Kuiil attacks for ' + kuiil.ap);
        $('.popup2').text('Droid IG-11 counter attacks for ' + droid.cap);
        kuiil.ap += kuiil.baseAp;
        healthDisp();
        if (kuiil.hp < 1) {
          if (droid.hp < 1) {
            droid.hp = 0;
          }
          kuiil.hp = 0;
          healthDisp();
          $('.popup1').text('You died. Game Over');
          $('.popup2').text('Press button to retry');
          $('.attackBtn').css('display', 'none');
          $('.restart').css('display', 'block');
        } else if (droid.hp < 1) {
          droid.hp = 0;
          healthDisp();
          $('.popup1').text('Droid IG-11 has been defeated!');
          $('.popup2').text('Select another opponent.');
          wins++;
          attack = false;
          fighter = true;
        }
        winner(wins);
      }
    } else {
      $('.popup1').text('Please Select Opponent!');
      $('.popup2').text('');
      setTimeout(function() {
        $('.popup1').text('');
      }, 1500);
    }
  });
}); //End of click
//
//
//
//

// Reset button function for reloading the page
$('.restart').click(function() {
  window.location.reload();
});
