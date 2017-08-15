/** 
 * JQuery file for the MODX middleFinger extra
 * 
 * Copyright 2016 by demon.devin <demon.devin@gmail.com>
 * Created on 12-03-2016
 *
 * middleFinger is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 2 of the License, or (at your option) any later
 * version.
 *
 * middleFinger is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * middleFinger; if not, write to the Free Software Foundation, Inc., 59 Temple
 * Place, Suite 330, Boston, MA 02111-1307 USA
 * @package middlefinger
 */
 
 $(function () {

  var $doc = $(document),
  $context = $(".menu:not(.sublet)");

  $doc.on("contextmenu", function (e) {

    var $window = $(window),
    $sub = $context.find(".sublet");

    $sub.removeClass("oppositeX oppositeY");

    e.preventDefault();

    var w = $context.width();
    var h = $context.height();
    var x = e.clientX;
    var y = e.clientY;
    var ww = $window.width();
    var wh = $window.height();
    var padx = 30;
    var pady = 20;
    var fx = x;
    var fy = y;
    var hitsRight = (x + w >= ww - padx);
    var hitsBottom = (y + h >= wh - pady);

    if (hitsRight) {
      fx = ww - w - padx;
    }

    if (hitsBottom) {
      fy = wh - h - pady;
    }

    $context
    .css({
      left : fx - 1,
      top : fy - 1
    });

    var sw = $sub.width();
    var sh = $sub.height();
    var sx = $sub.offset().left;
    var sy = $sub.offset().top;
    var subHitsRight = (sx + sw - padx >= ww - padx);
    var subHitsBottom = (sy + sh - pady >= wh - pady);

    if (subHitsRight) {
      $sub.addClass("oppositeX");
    }

    if (subHitsBottom) {
      $sub.addClass("oppositeY");
    }

    $context.addClass("middleFinger");

    $doc.on("mousedown", function (e) {

      var $tar = $(e.target);

      if (!$tar.is($context) && !$tar.closest(".menu").length) {

        $context.removeClass("middleFinger");
        $doc.off(e);

      }

    });

  });

  $context.on("mousedown touchstart", ".item:not(.item--disabled)", function (e) {

    if (e.which === 1) {

      var $item = $(this);

      $item.removeClass("item--active");

      setTimeout(function () {
        $item.addClass("item--active");
      }, 10);

    }

  });

});
