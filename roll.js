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
  chosen = r(999);
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
  $(sel).animate({ backgroundPosition: "(0px " + offset + ")" }, time, 'linear', function() { stop(s + 1); });
//  $(sel).css({backgroundPosition: "0px " + offset});
}

function doit() {
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

$(function() {
    choosenew();
    });