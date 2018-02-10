function onload() {
  spawn_slot();
  spawn_slot();
  spawn_slot();
  get_that_json();
}

function spawn_slot() {
  var item_slot = $("#templates #slot .slot").clone();
  $("#inventory").append(item_slot);
}

var items = [];

function get_that_json() {
  $.getJSON("json/item_library.json", function(data) {
    $.each(data, function(key, val) {
      items.push(key, val);
    });

    items = Object.values(data);

    console.log(items);

    console.log(items[1].item_id);

    console.log(items.find(function(item) {
      console.log("finding");
      return item.item_id == "002";
    }));

  });
}

function get_item_by_ID(id) {
  var item_found = -1;
  item_found = items.find(function(item) {
    return item.item_id == id;
  });
  return item_found;
}

function get_item_by_name(name) {
  var item_found = -1;
  item_found = items.find(function(item) {
    return item.item_properties.item_name.toUpperCase() == name.toUpperCase();
  });
  return item_found;
}

function get_free_slot_index() {
  var slots = $("#inventory .slot");
  var slot_index = -1;
  console.log(slots);
  slots.each(function(slot) {
    console.log(slots[slot]);
    console.log($(slots[slot]).hasClass("available"));
    if ($(slots[slot]).hasClass("available")) {
      slot_index = slot;
      return false;
    }
  });
  console.log(slot_index);
  return slot_index;
}

function spawn_item(id) {
  var item = get_item_by_ID(id);
  console.log("Item Found: " + item.item_properties.item_name);
  var free_slot_index = get_free_slot_index();
  var free_slot = null;
  if (free_slot_index >= 0) {
    free_slot = $("#inventory .slot")[free_slot_index];
  } else {
    console.error("Could not find free slot");
    return 0;
  }
  var item_html = $("#templates #item .item").clone().find(".item_name p");
  item_html.html(item.item_properties.item_name);
  console.log(item_html);
  $(free_slot).find(".slot_image .background").html(item_html);
  $(free_slot).removeClass("available");
  $(free_slot).addClass("full");
}

function use_item(slot) {
  var is_the_slot_filled = $(slot).parent().parent().hasClass("full");
  switch (is_the_slot_filled) {
    case false:
      console.log("NO");
      break;
    case true:
      console.log("OK");
      $(slot).parent().parent().remove();
      spawn_slot();
      break;
  }
}
