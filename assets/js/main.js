$(function() {

  CONNECTFOUR = {};

  CONNECTFOUR.addChip = function(column) {

    $($('.connect-four tbody tr').get().reverse()).each(function(i, elem) {
      var chip = $($(elem).children('td')[column]).find('div');

      if (chip.hasClass('clean')) {
        var x = chip.parents('td').prevAll().length + 1;
        var y = chip.parents('tr').prevAll().length + 1;

        chip.addClass('p' + CONNECTFOUR.getPlayer()).removeClass('clean');

        CONNECTFOUR.checkForConnectFour(x,y);
        CONNECTFOUR.changePlayer();

        return false;
      }

    });
  }

  CONNECTFOUR.changePlayer = function() {
    $('.connect-four').data('player', (CONNECTFOUR.getPlayer()+1)%2);
  }

  CONNECTFOUR.checkForConnectFour = (function() {

    CONNECTFOUR.coords = [
      { x:1, y:0 },
      { x:-1, y:0 },
      { x:0, y:-1 },
      { x:0, y:1 },
      { x:1, y:-1 },
      { x:1, y:1 },
      { x:-1, y:1 },
      { x:-1, y:-1 }
    ];

    return function checkForConnectFour(x,y) {

      if (!$('.clean').length) {
        $('.connect-four thead .buttons').hide();
        $('.connect-four thead .winner h1').html('Tie game!');
        $('.connect-four thead .winner').show();

      } else {

        var tempArray = [ $('.connect-four tbody tr:nth-child(' + y + ') td:nth-child(' + x + ')') ];

        function checkCoordForMatch(coord) {

          var elem = $('.connect-four tbody tr:nth-child(' + (y+coord.y) + ') td:nth-child(' + (x+coord.x) + ')');

          if (elem.length > 0 && $(elem).children('.chip').hasClass('p' + CONNECTFOUR.getPlayer())) {

            tempArray.push(elem);

            // set new x,y
            x = x+coord.x;
            y = y+coord.y;

            checkCoordForMatch(coord);

          }
          return tempArray;

        }

        $.each(CONNECTFOUR.coords, function(i, coord) {

          var matches = checkCoordForMatch(coord);
          if (matches.length >= 4) {
            CONNECTFOUR.winnersCircle(matches);
          }

          // must clear array before next coord
          tempArray = [ $('.connect-four tbody tr:nth-child(' + y + ') td:nth-child(' + x + ')') ];

        });
      }
    }
  }());

  CONNECTFOUR.getPlayer = function() {
    return $('.connect-four').data('player');
  }

  CONNECTFOUR.winnersCircle = function(matches) {

    var colors = ['Red', 'Black'];

    $('.connect-four thead .buttons').hide();
    $('.connect-four thead .winner h1').html(colors[CONNECTFOUR.getPlayer()] + ' wins!');
    $('.connect-four thead .winner').show();

    $.each(matches, function(i, elem) {
      elem.children('.chip').addClass('winner');
    });
  }

  $('.connect-four thead .chip').on('click mouseover', function(event) {

    var $this = $(this),
      player = CONNECTFOUR.getPlayer();

    $this.addClass('p' + player);

    if (event.type === 'click') {

      var column = $(this).parents('td').prevAll('td').length;
      CONNECTFOUR.addChip(column);

      // after addChip
      var player = CONNECTFOUR.getPlayer();
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