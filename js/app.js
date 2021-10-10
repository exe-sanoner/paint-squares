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
  const colorBtn1 = $(".btn1-color");
  const colorBtn2 = $(".btn2-color");
  const colorBtn3 = $(".btn3-color");
  const colorBtn4 = $(".btn4-color");
  const colorBtn5 = $(".btn5-color");
  const colorBtn6 = $(".btn6-color");
  const colorBtn7 = $(".btn7-color");
  const colorBtn8 = $(".btn8-color");

  const defaultColor = "btn8-color";

  let currentColor = null;
  let IsClickDown = false;

  let initWithDefaultColor = true;

  $(".square").bind({
    mousedown: function (event) {
      let selected = $(event.target);
      IsClickDown = true;
      if (event.which === 1 && initWithDefaultColor === true) {
        if (!selected.hasClass(defaultColor)) {
          selected.removeClass(colors).addClass(defaultColor);
        } else if (selected.hasClass(defaultColor)) {
          IsClickDown = true;
          selected.removeClass(defaultColor);
        }
      }
    },

    // Paint while holding down the button
    mouseenter: function (event) {
      let selected = $(event.target);
      if (
        event.which === 1 &&
        initWithDefaultColor === true &&
        IsClickDown &&
        !selected.hasClass(defaultColor)
      ) {
        selected.removeClass(colors).addClass(defaultColor);
      }
    },
    mouseup: function () {
      IsClickDown = false;
    },
  });

  // RIGHT-CLICK EVENTS
  $(document).contextmenu(function (event) {
    createColorSelector(event);
    initWithDefaultColor = false;

    colorBtn1.on("click", function () {
      currentColor = "btn1-color";
    });
    colorBtn2.on("click", function () {
      currentColor = "btn2-color";
    });
    colorBtn3.on("click", function () {
      currentColor = "btn3-color";
    });
    colorBtn4.on("click", function () {
      currentColor = "btn4-color";
    });
    colorBtn5.on("click", function () {
      currentColor = "btn5-color";
    });
    colorBtn6.on("click", function () {
      currentColor = "btn6-color";
    });
    colorBtn7.on("click", function () {
      currentColor = "btn7-color";
    });
    colorBtn8.on("click", function () {
      currentColor = "btn8-color";
    });

    // PAINT SQUARE

    $(".square").bind({
      mousedown: function (event) {
        // Prevents other listeners of the same event from being called
        // Listeners called in the order in which they were added
        event.stopImmediatePropagation();
        let selected = $(event.target);
        IsClickDown = true;
        if (event.which === 1) {
          if (!selected.hasClass(currentColor)) {
            selected.removeClass(colors).addClass(currentColor);
          } else if (selected.hasClass(currentColor)) {
            IsClickDown = true;
            selected.removeClass(colors);
          }
        }
      },

      // Paint while holding down the button
      mouseenter: function (event) {
        let selected = $(event.target);
        if (
          event.which === 1 &&
          IsClickDown &&
          !selected.hasClass(currentColor)
        ) {
          selected.removeClass(colors).toggleClass(currentColor);
        }
      },
      mouseup: function () {
        IsClickDown = false;
      },
    });

    // Disable browser-specific context menu
    return false;
  });

  // Hide selector if move outside
  $("div.color-selector").mouseleave(function () {
    $(this).fadeOut(500);
  });

  // Hide selector if select button color
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
      .fadeIn(500);
  }
});
