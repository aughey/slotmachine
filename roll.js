function animatefunction(a,b)
{
  a.html(a + " " + b);
}

function reanimate(slot) {
  animate(slot,0);
}

var totalheight = 2500.0;
var numoffset = totalheight / 10;
var chosen = 0;
var numfunctions = [reanimate,reanimate,reanimate];
var t = 2000;

function animate(slot,offset) {
  var time = t * (totalheight - offset) / totalheight;
  offset = String(-offset) + "px";
  var s = slot;
  var sel = "#num" + slot;
  $(sel).css({backgroundPosition: "0px " + offset});
  var topscroll = String(-totalheight) + "px";
  $(sel).animate({ backgroundPosition: "(0px " + topscroll + ")" }, time, 'linear', function() { var f = numfunctions[s]; f(s,0); });
}

function r(max) {
  return Math.floor(Math.random() * max);
}

function choosenew() {
  var max = parseInt($('#maxroll').attr('value'));
  var repick=true;
  while(repick) {
    repick = false;
    chosen = r(max) + 1;
    $('.prize .winner').each(function(i,v) { if($(v).html() == String(chosen)) { repick = true; } });
  }
  $("#rand").html(chosen);
}

function result(index) {
  var c = String(chosen);
  if(chosen < 9) {
    c = "00" + c;
  } else {
    if(chosen < 99) {
      c = "0" + c;
    }
  }
  return parseInt(c[index]);
}

function dostop(slot) {
  if(slot > 2)
    return;

  var sel = "#num" + slot;

  var offset = -result(slot) * numoffset;
  var time = t * (-offset) / totalheight;
  offset = String(offset) + "px";

  var s = slot;
  $(sel).css({backgroundPosition: "0px 0px"});
  //$(sel).animate({ backgroundPosition: "(0px " + offset + ")" }, time, 'linear', function() { stop(s + 1); });
  $(sel).animate({ backgroundPosition: "(0px " + offset + ")" }, time, 'linear', function() { slotstopped(s) });
}

function slotstopped(slot) {
  $('#num' + slot).css('border','4px solid green');
  numfunctions[slot] = null;
  if(numfunctions[0] == null && numfunctions[1] == null && numfunctions[2] == null) {
    var winner = $("#" + curroll).find('.winner');
    winner.html(chosen);
    winner.css('background-color','lightgreen');
  }
}

function doit() {
  $('#num0').stop().css('border','1px solid black');
  $('#num1').stop().css('border','1px solid black');
  $('#num2').stop().css('border','1px solid black');

  numfunctions[0] = reanimate;
  numfunctions[1] = reanimate;
  numfunctions[2] = reanimate;
  animate(0,-r(totalheight));
  animate(1,-r(totalheight));
  animate(2,-r(totalheight));
}

function stop(num) {
  numfunctions[num] = dostop;
}

var curroll = null;

function loadprize() {
  if( $(this).find('.winner').html() != "") {
    return;
  }
  curroll = this.id;
  var amount = $(this).find('.amount').html();
  $('#prizeinfo').html(amount);
  // $('#prizeinfo').animate({backgroundColor: 'red'}, 2000);
  $('#prizeinfo').stop();
  $('#prizeinfo').css('backgroundColor','white');
  if(amount == "Grand Prize $3,000") {
    $('#prizeinfo').pulse({backgroundColors: ['white','lightgreen']}, 2000);
  }
  choosenew();
  doit();
}

function runevent() {
  var max = parseInt($('#numprizes').attr('value'));
  var incr = parseInt($('#prizeincr').attr('value'));  
  var dollar = parseInt($('#startdollar').attr('value'));  
  var prizes = $('#prizes');
  var i;
  for(i=1;i<=max;i++) {
    prizes.append("<tr class='prize' id='prize" + i + "'><td class='amount'>$" + dollar + "</td><td><div class='winner'></div></td></tr>");
    dollar += incr;
  }
  prizes.append("<tr class='prize' id='prize" + i + "'><td class='amount'>Grand Prize $3,000</td><td><div class='winner'></div></td></tr>");

  var prize = $('.prize');
  var h = $(window).height() / prize.size() * 0.70;
  prize.css('font-size',String(h) + 'px');

  prize.click(loadprize);
  
  $('#configtime').hide();
  $('#showtime').show();
}

$(function() {
    choosenew();


    });
