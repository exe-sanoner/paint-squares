$(document).ready(function () {
  // CREATE GRID TABLE
  (function createGrid() {
    const $window = $(window);

    const squaresXCount = 100; // number of squares along x-axis
    const squareSide = ($window.width() - (squaresXCount + 1)) / squaresXCount; // width (and height) of one square
    const squaresYCount = Math.floor($window.height() / squareSide); // number of squares along y-axis
    const maxGridHeight = squareSide * squaresYCount + squaresYCount + 1;

    const gridElem = $(".grid-square");
    gridElem.css({ "max-height": maxGridHeight });

    for (let i = 0; i < squaresYCount; i++) {
      for (let j = 0; j < squaresXCount; j++) {
        $('<div class="square"></div>').appendTo(gridElem);
      }
    }
  })();

  const colors =
    "btn1-color btn2-color btn3-color btn4-color btn5-color btn6-color btn7-color btn8-color";
  let currentColor = null;
  let IsClickDown = false;

  // RIGHT-CLICK EVENTS
  $(document).contextmenu(function (e) {
    createColorSelector(e);

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
    $(".btn6-color").on("click", function () {
      currentColor = "btn6-color";
    });
    $(".btn7-color").on("click", function () {
      currentColor = "btn7-color";
    });
    $(".btn8-color").on("click", function () {
      currentColor = "btn8-color";
    });

    // PAINT SQUARE
    $(".square").bind({
      mousedown: function (event) {
        console.log("🐤 mousedown", currentColor);
        let selected = $(event.target);
        if (event.which === 1 /* && !selected.hasClass(currentColor) */) {
          IsClickDown = true;
          selected.removeClass(colors);
          selected.addClass(currentColor);
        }
      },
      mouseup: function () {
        IsClickDown = false;
      },
      // click: function (event) {
      //   let selected = $(event.target);
      //   console.log("🐤 click", currentColor);
      //   if (event.which === 1) {
      //     selected.removeClass(colors);
      //     selected.addClass(currentColor);
      //   }
      // },
      // Paint while holding down the button
      mouseenter: function (event) {
        console.log("🐤 mouseeenter", currentColor);
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

  function createColorSelector(e) {
    // Get window size
    const winWidth = $(document).width();
    const winHeight = $(document).height();
    // Click position coordinates
    const mouseX = e.pageX;
    const mouseY = e.pageY;
    // console.log("🐤", mouseX, mouseY);
    // Width and Height size of selector
    const menuWidth = $("div.color-selector").width();
    const menuHeight = $("div.color-selector").height();
    // Min margin (minimum distance from the specific edge of the window)
    const minEdgeMargin = -5;

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
  }
});
