function startGoingCrazy(id) {
  var el = $('#' + id);

  setInterval(function() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    el.css('backgroundColor', 'rgb(' + r + ',' + g + ',' + b + ')');
  }, 100);
}

function getId() {
  return Math.random().toString(36).substr(2,5);
}

function rainback(event) {
  var el = $(event.target);
  var children = el.children('option').length;
  var fontSize = parseInt(el.css('font-size'));
  var selectedIndex = el.children('option:selected').index();
  var offset = {top: el.offset().top, left: el.offset().left };
  
  offset.top = offset.top - (selectedIndex * fontSize * 1.4);

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

  $('#' + id).on('mouseup', function(event) {
    event.stopPropagation();
  });

  $(document).on('mouseup', function() {
    teardownTheRain();
  });
}

function teardownTheRain() {
  $('.rainback').remove();
}

function isYosemite() {
  var userAgent = navigator.userAgent.toLowerCase();
  return /mac os x 10_10/.test(userAgent);
}

$(document).ready(function() {
  if (isYosemite()) {
    $('select').on('mousedown', rainback);
    $('select').change(function() {
      teardownTheRain();
    });
  }
});