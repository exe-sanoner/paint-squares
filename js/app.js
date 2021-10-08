$(document).ready(function () {
  // let $gridSquare = $('.gridSquare')

  // $gridSquare.attr({
  //     width: $window.width(),
  //     height: $window.height()
  // });

  // CREATE THE TABLE

  (function createGrid() {
    let $window = $(window);

    let unitSize = $window.width() / 100; // width (and height) of one square
    let unitsWide = 100; // number of squares along x-axis
    let unitsTall = 100; // number of squares along y-axis

    let gridSquare = $('<div class="grid-square"></div>');
    gridSquare.appendTo($("body"));

    for (let i = 0; i < unitsWide * unitsTall; i++) {
      $('<div class="square"></div>')
        .css({
          width: unitSize,
          height: unitSize,
        })
        .appendTo(gridSquare);
    }
  })();

  // LEFT-CLICK EVENTS

  // $(() => {
  //   let IsClickDown = false;
  //   let currentColor = "colorBtn1";

  //   $(".square").bind({
  //     mousedown: function (event) {
  //       let selected = $(event.target);
  //       if (event.which === 1 && !selected.hasClass(currentColor)) {
  //         IsClickDown = true;
  //         selected.addClass(currentColor);
  //       } else {
  //         selected.removeClass(currentColor);
  //       }
  //     },
  //     on:
  //       ("dragstart",
  //       function (event) {
  //         event.preventDefault();
  //       }),
  //     mouseenter: function (event) {
  //       if (IsClickDown) {
  //         let selected = $(event.target);
  //         // selected.addClass(colorBtn1);
  //         if (IsClickDown == true && !$(event.target).hasClass(currentColor)) {
  //           selected.toggleClass(currentColor);
  //         }
  //       }
  //     },
  //     mouseup: function () {
  //       IsClickDown = false;
  //     },
  //   });
  // });

  // RIGHT-CLICK EVENTS

  $(document).contextmenu(function (e) {
    // Get window size
    let winWidth = $(document).width();
    let winHeight = $(document).height();
    // Click position coordinates
    let mouseX = e.pageX;
    let mouseY = e.pageY;
    // console.log("🐤", mouseX, mouseY);
    // Width and Height size of selector
    let menuWidth = $("div.color-selector").width();
    let menuHeight = $("div.color-selector").height();
    // Min margin (minimum distance from the specific edge of the window)
    let minEdgeMargin = -15;

    // Detect if the place where the selector label appears exceeds the range of the window
    // First: lower right corner exceeds the window
    if (
      mouseX + menuWidth + minEdgeMargin >= winWidth &&
      mouseY + menuHeight + minEdgeMargin >= winHeight
    ) {
      menuLeft = mouseX - menuWidth - minEdgeMargin + "px";
      menuTop = mouseY - menuHeight - minEdgeMargin + "px";
    }
    // Second: right side exceeds the window
    else if (mouseX + menuWidth + minEdgeMargin >= winWidth) {
      menuLeft = mouseX - menuWidth - minEdgeMargin + "px";
      menuTop = mouseY + minEdgeMargin + "px";
    }
    // Third: bottom side exceeds the window
    else if (mouseY + menuHeight + minEdgeMargin >= winHeight) {
      menuLeft = mouseX + minEdgeMargin + "px";
      menuTop = mouseY - menuHeight - minEdgeMargin + "px";
    }
    // Other: the window is not exceeded
    else {
      menuLeft = mouseX + minEdgeMargin + "px";
      menuTop = mouseY + minEdgeMargin + "px";
    }

    // Display Selector Menu
    $("div.color-selector")
      .css({
        left: menuLeft,
        top: menuTop,
      })
      .fadeIn();

    // COLOR SELECTOR

    let IsClickDown = false;
    let currentColor = null;
    let newColor = null;
    let colors = "btn1-color btn2-color btn3-color btn4-color btn5-color";

    $(".btn1-color").on("click", function () {
      currentColor = "btn1-color";
    });
    $(".btn2-color").on("click", function () {
      currentColor = "btn2-color";
    });
    $(".btn3-color").on("click", function () {
      currentColor = "btn3-color";
    });
    $(".btn4-color").on("click", function () {
      currentColor = "btn4-color";
    });
    $(".btn5-color").on("click", function () {
      currentColor = "btn5-color";
    });

    // PAINT SQUARE

    // ❌ ARREGLAR MANEJO CLICKS ❌
    $(".square").bind({
      mousedown: function (event) {
        // console.log("🐤", "mousedown");
        // console.log("🐤", currentColor);
        let selected = $(event.target);
        if (event.which === 1 && !selected.hasClass(currentColor)) {
          IsClickDown = true;
          selected.removeClass(colors);
          selected.addClass(currentColor);
        }
      },
      mouseup: function () {
        IsClickDown = false;
      },
      click: function (event) {
        let selected = $(event.target);
        // console.log("🐤", "click");
        if (event.which === 1) {
          selected.removeClass(colors);
          selected.addClass(currentColor);
        }
      },
      dragstart: function (event) {
        event.preventDefault();
        console.log("🐤", "drag");
      },

      // Paint while holding down the button
      mouseenter: function (event) {
        // console.log("🐤", "mouseeenter");
        if (IsClickDown) {
          let selected = $(event.target);
          if (!$(event.target).hasClass(currentColor)) {
            selected.removeClass(colors).toggleClass(currentColor);
          }
        }
      },
    });
    // Disable right click
    return false;
  });

  // ❌  CUANDO HAGO ESTO SE ME REINICIAN LOS COLORES ❌
  // HIDE selector if move outside
  $("div.color-selector").mouseleave(function () {
    $(this).fadeOut(500);
  });

  // HIDE selector if select button color
  $("div.color-selector").click(function () {
    $(this).fadeOut(500);
  });
});
