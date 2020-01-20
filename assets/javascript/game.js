var baby = {
  hp: 180,
  ap: 15,
  cap: 25
};

var mando = {
  hp: 150,
  ap: 15,
  cap: 25
};
var droid = {
  hp: 120,
  ap: 15,
  cap: 25
};
var kuiil = {
  hp: 100,
  ap: 15,
  cap: 25
};

var fighterSelected = false;
var fighter = false;
var attack = false;
var opponentSelected = '';

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
    }
    fighter = false;
    attack = true;
  });

  $('.droidDiv').click(function() {
    if (fighter) {
      $('.droidDiv').remove();
      $('.selectOpponent').css('display', 'none');
      $('.selectedOpponent').html(droidChar);
      healthDisp();
    }
    fighter = false;
    attack = true;
  });

  $('.kuiilDiv').click(function() {
    if (fighter) {
      $('.kuiilDiv').remove();
      $('.selectOpponent').css('display', 'none');
      $('.selectedOpponent').html(kuiilChar);
      $('.kuiilDiv').addClass('current');
      healthDisp();
    }
    fighter = false;
    attack = true;
  });

  $('.attackBtn').click(function() {
    if (attack) {
    } else {
      $('.popup1').text('Please Select Opponent!');
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
