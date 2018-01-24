console.log("BOOT STARTED");

$(window).ready(function boot() {
  toast_notification("Boot Complete","The boot process was successful");
  check_notifications();
  setTimeout(function() {
    $("#notifications_hide").css("transform", "translateY(-100%)");
  }, 1000);
});
