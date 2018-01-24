setInterval(function() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  m = check_time(m);
  $(".time").html(h + ":" + m);
}, 500);


function check_time(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
