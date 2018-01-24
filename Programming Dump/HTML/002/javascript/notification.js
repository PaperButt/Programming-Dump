// To dissmiss a notification we first slide and fade it away and then remove it
function notification_dismiss(item) {
  var notification = $(item).parent();
  notification.css("min-height", "0px");
  notification.css("max-height", "0px");
  notification.css("padding", "0px auto");
  notification.css("margin-top", "0px");
  notification.css("margin-bottom", "0px");
  notification.css("opacity", "0");
  notification.css("pointer-events", "none");
  notification.css("filter", "blur(5px)");
  $(item).remove();
  setTimeout(function() {
    notification.remove();
    check_notifications();
  }, 650);
}

// Spawning a empty notification we clone the template and append it to the area
function spawn_notification() {
  var notification = $("#templates #notification .notification_toast").clone();
  $("#notifications").append(notification);
  check_notifications();
}

/*
Hidding the area is simple we translate it to the side and then change the
button text
*/
var notification_area_hidden = true;

function hide_notifications() {
  switch (notification_area_hidden) {
    case false:
      $("#notifications_hide").css("transform", "translateY(-100%)");
      $("#inner_menu_content").css("filter", "blur(0px)");
      notification_area_hidden = true;
      break;
    case true:
      $("#notifications_hide").css("transform", "translateY(0%)");
      $("#inner_menu_content").css("filter", "blur(5px)");
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
  var notifications = $("#notifications .notification_toast");
  console.log(notifications.length);
  if (notifications.length == 0) {
    $("#notifications").append("<p id=\"no_notifications\">no notifications</p>");
    notification_number_shown = false;
  } else {
    $("#no_notifications").remove();
    if (notification_number_shown == false) {
      notification_number_shown = true;
    }
  }
}

// Custom messages and titles in notifications are spawned with this function
// Returns a "Toasted" message
function toast_notification(title, message) {
  var notification = $("#templates #notification .notification_toast").clone();
  notification.find(".notification_title p").html(title.toUpperCase());
  notification.find(".notification_message p").html(message);
  $("#notifications").append(notification);
  check_notifications();
  return ("Toasted");
}

// Dissmiss all notifications
function clear_all_notifications() {
  notification_dismiss($("#notifications .notification_dismiss"));
}

$("#notification_arrow a.time").mouseenter(function(){
  console.log("hi");
});
