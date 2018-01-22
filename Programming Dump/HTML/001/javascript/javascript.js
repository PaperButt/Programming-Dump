// Always check for initial number of notifications so user knows even at load
function onload() {
  check_notifications();
}

// To dissmiss a notification we first slide and fade it away and then remove it
function notification_dismiss(item) {
  var notification = $(item).parent();
  notification.css("right", "-20%");
  notification.css("opacity", "0");
  notification.css("pointer-events", "none");
  $(item).remove();
  setTimeout(function() {
    notification.remove();
    check_notifications();
  }, 650);
}

// Spawning a empty notification we clone the template and append it to the area
function spawn_notification() {
  var notification = $("#templates #notification .notification_toast").clone();
  $("#notification_area").append(notification);
  check_notifications();
}

/*
Hidding the area is simple we translate it to the side and then change the
button text
*/
var notification_area_hidden = false;

function hide_notifications() {
  switch (notification_area_hidden) {
    case false:
      $("#notification_area").css("transform", "translateX(100%)");
      $("#notification_arrow a").html("<");
      notification_area_hidden = true;
      break;
    case true:
      $("#notification_area").css("transform", "translateX(0%)");
      $("#notification_arrow a").html(">");
      notification_area_hidden = false;
      break;
  }
}

/*
Showing the number of undissmissed notifications is also simple, we first count
how many notifications there are inside the area by using length, with that we
change the HTML inside the <p> element after the arrow next to the area to the
amount of notifications.

If the number of notifications is 0 then we show that message on where the first
notification was supposed to be.
*/
var notification_number_shown;

function check_notifications() {
  var notifications = $("#notification_area .notification_toast");
  if (notifications.length == 0) {
    $("#notification_area").append("<p id=\"no_notifications\">no notifications</p>");
    $("#notification_arrow p").remove();
    notification_number_shown = false;
    $("#notification_arrow p").css("background", "transparent");
  } else {
    $("#no_notifications").remove();
    if (notification_number_shown == false) {
      $("#notification_arrow").append("<p></p>");
      notification_number_shown = true;
    }
    $("#notification_arrow p").html(notifications.length);
    $("#notification_arrow p").css("background", "var(--color-notification-background)");
  }
}

// Custom messages and titles in notifications are spawned with this function
// Returns a "Toasted" message
function toast_notification(title, message) {
  var notification = $("#templates #notification .notification_toast").clone();
  notification.find(".notification_title").html(title);
  notification.find(".notification_message").html(message);
  $("#notification_area").append(notification);
  check_notifications();
  return ("Toasted");
}
