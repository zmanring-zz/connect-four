$(function() {

  var layout = {};
  var players = ['0', '1'];
  var maxX = $('.connect-four tbody tr:first td').length;
  var maxY = $('.connect-four tbody tr').length;

  var coords = [
    { x:1, y:0 },
    { x:-1, y:0 },
    { x:0, y:-1 },
    { x:0, y:1 },
    { x:1, y:-1 },
    { x:1, y:1 },
    { x:-1, y:1 },
    { x:-1, y:-1 }
  ];

  console.log(maxX, maxY);

  var data = $('.connect-four tbody .chip').map(function() {
    return $(this).data('loc')
  }).get();

  $.each(data, function(index, value) {
    $.each(players, function(index, player) {
      layout[player + '-' + value] = [];
    })
  })

  console.log(layout);


  // Helpers
  function changePlayer() {
    var player = $('.connect-four').data('player');

    $('.connect-four').data('player', (player+1)%2);

  }

  function addChip(column) {

    $($('.connect-four tbody tr').get().reverse()).each(function(i, elem) {
      var chip = $($(elem).children('td')[column]).find('div');

      if (chip.hasClass('clean')) {

        var player = $('.connect-four').data('player');
        chip.addClass('p' + player).removeClass('clean');

        var x = chip.parents('td').prevAll().length + 1;
        var y = chip.parents('tr').prevAll().length + 1;

        checkForMatch(x,y);

        changePlayer();
        return false;
      }

    });

  }

  function checkForMatch(x,y) {

    if (!$('.clean').length) {
      $('.connect-four thead .buttons').hide();
      $('.connect-four thead .winner h1').html('Tie game!');
      $('.connect-four thead .winner').show();
    }

    var tempArray = [ $('.connect-four tbody tr:nth-child(' + y + ') td:nth-child(' + x + ')') ];
    var player = $('.connect-four').data('player');

    function check(coord) {

      var elem = $('.connect-four tbody tr:nth-child(' + (y+coord.y) + ') td:nth-child(' + (x+coord.x) + ')');

      if (elem.length > 0 && $(elem).children('.chip').hasClass('p' + player)) {

        tempArray.push(elem);

        // set new x,y
        x = x+coord.x;
        y = y+coord.y;

        check(coord);

      }
      return tempArray;
    }

    $.each(coords, function(i, coord) {

      var matches = check(coord);
      if (matches.length >= 4) {
        // pass off to winner function
        winnersCircle(matches);
      }

      // must clear array before next coord
      tempArray = [ $('.connect-four tbody tr:nth-child(' + y + ') td:nth-child(' + x + ')') ];

    });

  }

  function winnersCircle(matches) {

    var color = ['Red', 'Black'];

    $('.connect-four thead .buttons').hide();
    $('.connect-four thead .winner h1').html(color[$('.connect-four').data('player')] + ' wins!');
    $('.connect-four thead .winner').show();

    $.each(matches, function(i, elem) {
      console.log(elem);
      elem.children('.chip').addClass('winner');
    })
  }


  //  Events
  var $cols = $('.connect-four colgroup');

  $('.connect-four').on('mouseover', 'td', function(event) {

    var i = $(this).prevAll('td').length,
      $column = $($cols[i]),
      $row = $(this).parent();

    $row.addClass('hover');
    $column.addClass('hover');

  }).on('mouseout', 'td', function(event) {

    var i = $(this).prevAll('td').length,
      $column = $($cols[i]),
      $row = $(this).parent();

    $row.removeClass('hover');
    $column.removeClass('hover');

  });

  $('.connect-four thead .chip').on('click mouseover', function(event) {

    var $this = $(this),
      player = $('.connect-four').data('player');

    $this.addClass('p' + player);

    if (event.type === 'click') {

      var column = $(this).parents('td').prevAll('td').length;
      addChip(column);

      // after addChip
      var player = $('.connect-four').data('player');
      $this.removeClass().addClass('chip').addClass('p' + player);

    }

  }).on('mouseout', function(event) {
    var $this = $(this);

    $this.removeClass().addClass('chip');

  });

  $('.connect-four .restart').on('click', function() {
    $('.connect-four tbody .chip').removeClass().addClass('chip clean');
    $('.connect-four thead .buttons').show();
    $('.connect-four thead .winner').hide();
  });

});