function startGoingCrazy(id) {
  var el = $('#' + id);

  setInterval(function() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    el.css('backgroundColor', 'rgb(' + r + ',' + g + ',' + b + ')');
  }, 150);
}

function getId() {
  return Math.random().toString(36).substr(2,5);
}

function rainback(event) {
  var el = $(event.target);
  var children = el.children('option').length;
  var fontSize = parseInt(el.css('font-size'));
  var offset = {top: el.offset().top, left: el.offset().left };

  var rainEl = $('<div />');
  var id = 'rainback-' + getId();

  rainEl.css({
    position: 'absolute',
    top: offset.top,
    left: offset.left,
    width: el.width(),
    height: children * fontSize * 1.4,
    backgroundColor: 'blue',
    transition: 'backgroundColor 0.15s linear'
  }).attr({
    class: 'rainback',
    id: id
  });

  $('body').append(rainEl);
  startGoingCrazy(id);
}

function teardownTheRain() {
  $('.rainback').remove();
}

$(document).ready(function() {
  $('select').on('mousedown', rainback);
  $('select').on('blur', teardownTheRain);
});