var baby = {
  hp: 180,
  ap: 15,
  baseAp: 15,
  cap: 25
};

var mando = {
  hp: 150,
  ap: 15,
  baseAp: 15,
  cap: 25
};
var droid = {
  hp: 110,
  ap: 15,
  baseAp: 15,
  cap: 25
};
var kuiil = {
  hp: 120,
  ap: 15,
  baseAp: 15,
  cap: 15
};

var fighterSelected = false;
var fighter = false;
var attack = false;
var yourOpponent;
var wins = 0;

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

function healthDisp() {
  $('.babyHealth').text(baby.hp + 'HP');
  $('.mandoHealth').text(mando.hp + 'HP');
  $('.droidHealth').text(droid.hp + 'HP');
  $('.kuiilHealth').text(kuiil.hp + 'HP');
}
function selectFighter(x, y, z) {
  $('.selectionContainer').css('display', 'none');
  $('.fightBoard').css('display', 'block');
  $('.fightersLeft').html(x + y + z);
  healthDisp();
  fighterSelected = true;
}

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

healthDisp();
$('.selectionContainer').css('display', 'block');
$('.fightBoard').css('display', 'none');

$('.babyDiv').click(function() {
  if (!fighterSelected) {
    $('.fighter').html(this);
    selectFighter(droidChar, mandoChar, kuiilChar);
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
        baby.hp -= kuiil.cap;
        kuiil.hp -= baby.ap;
        $('.popup1').text('Baby Yoda attacks for ' + baby.ap);
        $('.popup2').text('Kuiil counter attacks for ' + kuiil.cap);
        baby.ap += baby.baseAp;
        healthDisp();
        if (baby.hp < 1) {
          baby.hp = 0;
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
        baby.hp -= mando.cap;
        mando.hp -= baby.ap;
        $('.popup1').text('Baby Yoda attacks for ' + baby.ap);
        $('.popup2').text('The Mandalorian counter attacks for ' + mando.cap);
        baby.ap += baby.baseAp;
        healthDisp();
        if (baby.hp < 1) {
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
        $('.popup1').text('Droid IG-11 attacks for ' + baby.ap);
        $('.popup2').text('Droid IG-11 counter attacks for ' + droid.cap);
        baby.ap += baby.baseAp;
        healthDisp();
        if (baby.hp < 1) {
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

$('.mandoDiv').click(function() {
  if (!fighterSelected) {
    $('.fighter').html(this);
    selectFighter(droidChar, babyChar, kuiilChar);
    fighter = this;
  }
  // if (fighter === this) {
  //   $('.babyDiv').click(function() {
  //     $('.babyDiv').remove();
  //     $('.selectOpponent').css('display', 'none');
  //     $('.selectedOpponent').html(babyChar);
  //   });

  //   $('.droidDiv').click(function() {
  //     $('.droidDiv').remove();
  //     $('.selectOpponent').css('display', 'none');
  //     $('.selectedOpponent').html(droidChar);
  //   });

  //   $('.kuiilDiv').click(function() {
  //     $('.kuiilDiv').remove();
  //     $('.selectOpponent').css('display', 'none');
  //     $('.selectedOpponent').html(droidChar);
  //   });
  // }
}); //End of click

$('.droidDiv').click(function() {
  if (!fighterSelected) {
    $('.fighter').html(this);
    selectFighter(babyChar, mandoChar, kuiilChar);
    fighter = this;
  }
  // if (fighter === this) {
  //   $('.babyDiv').click(function() {
  //     $('.babyDiv').remove();
  //     $('.selectOpponent').css('display', 'none');
  //     $('.selectedOpponent').html(babyChar);
  //   });

  //   $('.mandoDiv').click(function() {
  //     $('.mandoDiv').remove();
  //     $('.selectOpponent').css('display', 'none');
  //     $('.selectedOpponent').html(mandoChar);
  //   });

  //   $('.kuiilDiv').click(function() {
  //     $('.kuiilDiv').remove();
  //     $('.selectOpponent').css('display', 'none');
  //     $('.selectedOpponent').html(droidChar);
  //   });
  // }
}); //End of click

$('.kuiilDiv').click(function() {
  if (!fighterSelected) {
    $('.fighter').html(this);
    selectFighter(droidChar, mandoChar, babyChar);
    fighter = this;
  }

  // if (fighter === this) {
  //   $('.babyDiv').click(function() {
  //     $('.babyDiv').remove();
  //     $('.selectOpponent').css('display', 'none');
  //     $('.selectedOpponent').html(babyChar);
  //   });

  //   $('.mandoDiv').click(function() {
  //     $('.mandoDiv').remove();
  //     $('.selectOpponent').css('display', 'none');
  //     $('.selectedOpponent').html(mandoChar);
  //   });

  //   $('.droidDiv').click(function() {
  //     $('.droidDiv').remove();
  //     $('.selectOpponent').css('display', 'none');
  //     $('.selectedOpponent').html(droidChar);
  //   });
  // }
}); //End of click

// Reset Button
$('.restart').click(function() {
  window.location.reload();
});
