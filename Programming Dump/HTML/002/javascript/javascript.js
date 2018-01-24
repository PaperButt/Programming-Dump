function onload() {}

var phone_is_hidden = true;

function hide_phone() {
  switch (phone_is_hidden) {
    case true:
      // setTimeout(function() {
        $("#phone_hide .arrow").css("transform", "rotate(0deg)");
      // }, 300);
      $("#phone").css("transform", "translateX(0%)");
      phone_is_hidden = false;
      break;
    case false:
      // setTimeout(function() {
        $("#phone_hide .arrow").css("transform", "rotate(180deg)");
      // }, 300);
      $("#phone").css("transform", "translateX(-105%)");
      phone_is_hidden = true;
      break;
  }
}
