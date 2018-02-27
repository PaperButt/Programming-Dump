function onload() {

}

function spawn_object(name) {
  var obj = $("#templates #objectum .objectum").clone();
  var obj_name = "object" + $(".objectum").length;
  obj.find(".name_of_object").html(obj_name);
  $("#environment_objects .inner_absolute_content .inner_menu").append(obj);
  return obj;
}

function select_object(obj) {
  obj = $(obj).parent().parent();
  obj.find(".right_side button").css("visibility", "hidden");
  obj.addClass("obj_selected");
  $("#transfer_tab .inner_absolute_content .inner_menu").append(obj);
}

function transfer_right() {
  $("#transfer_tab .inner_absolute_content .inner_menu .objectum").each(function() {
    $(this).removeClass("obj_selected");
    $(this).find(".right_side button").css("visibility", "visible");
    $("#environment_objects .inner_absolute_content .inner_menu").append($(this));
  });
}

function transfer_left() {
  $("#transfer_tab .inner_absolute_content .inner_menu .objectum").each(function() {
    $(this).removeClass("obj_selected");
    $(this).find(".right_side button").css("visibility", "visible");
    $("#user_objects .inner_absolute_content .inner_menu").append($(this));
  });
}
