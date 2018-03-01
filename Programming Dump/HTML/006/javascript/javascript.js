var time = 0;

var energy;
var max_energy = 20;
var health;
var max_health = 100;
var resources;

var activities = [];

function onload() {
  get_that_json();
  load();
  set_energy(energy);
  set_health(health);
  check_time();
}

// Load the JSONs

function get_that_json() {
  $.getJSON("json/activities.json", function(data) {
    $.each(data, function(key, val) {
      activities.push(key, val);
    });

    activities = Object.values(data);

  });
}

// Load and Save System using the browser localStorage

function load() {
  if (localStorage.firsttime == undefined) {
    localStorage.firsttime = false;
    localStorage.energy = 20;
    localStorage.health = 100;
    localStorage.resources = '[{"resource_id":"000","resource_name":"Gold","amount":"0"},{"resource_id":"001","resource_name":"Vibridium","amount":"0"}]';
    localStorage.time = 0;
  }
  energy = localStorage.energy;
  health = localStorage.health;
  time = localStorage.time;
  resources = JSON.parse(localStorage.resources);

  return [energy, health, resources, time];
}

function save() {
  localStorage.energy = energy;
  localStorage.health = health;
  localStorage.resources = JSON.stringify(resources);
  localStorage.time = time;
}

function reset_save() {
  localStorage.clear();
  window.location.reload(true);
}

// TIM-E System

function count_time() {
  time++;
  $("#time_counter_number").html(time);
  work_evolve_time();
  use_energy(-1);
  lose_health(3);
}

function check_time() {
  $("#time_counter_number").html(time);
  return time;
}

// User Stats functions

function set_energy(energy_set) {
  if (energy_set > max_energy) {
    energy_set = 20;
  } else if (energy_set < 0) {
    energy_set = 0;
  }
  energy = parseInt(energy_set);
  check_stats();
}

function use_energy(use) {
  x = energy - use;
  set_energy(x);
}

function set_health(health_set) {
  if (health_set > max_health) {
    health_set = 100;
  } else if (health_set < 0) {
    health_set = 0;
  }
  health = health_set;
  check_stats();
}

function lose_health(loss) {
  x = health - loss;
  set_health(x);
}

function check_stats() {
  var html = $("#user_energy").html().substr($("#user_energy").html().indexOf("/"), $("#user_energy").html().length);
  $("#user_energy").html(energy + html);
  html = $("#user_health").html().substr($("#user_health").html().indexOf("/"), $("#user_health").html().length);
  $("#user_health").html(health + html);
}

// Resource System

// Activities functions

var copyofactivities = [];

function start_activity(activity) {
  var activity_html = $(activity).find("span").html();
  // var copyofactivities = activities.slice(0);
  copyofactivities = JSON.parse(JSON.stringify(activities));
  var activity_found = copyofactivities.find(function(x) {
    return x.activity.activity_name == activity_html;
  });
  add_work(activity_found);
}

function finish_activity(activity) {
  var health_lost = Math.floor(Math.random() * (activity.activity.max_health_loss - 0));
  var energy_used = Math.floor(Math.random() * (activity.activity.energy_use - 5) + 5);
  var energy_gained = activity.activity.energy_gain;
  var health_healed = activity.activity.health_gain;
  lose_health(-health_healed + health_lost);
  use_energy(-energy_gained + energy_used);
}

// Work System

var active_activities = [];

function check_work() {
  var no_work_html = "<p style='padding: 10px' id='not_working'>Not working</p>";
  if ($("#work_tab .work").length == 0) {
    $("#work_tab").append(no_work_html);
  } else {
    $("#work_tab #not_working").remove();
  }
}

function add_work(activity) {
  var work = $("#templates #template_work .work").clone();
  work.find(".work_title").html(activity.activity.activity_name);
  work.find(".time_left").html(activity.activity.time_used);
  $("#work_tab").append(work);
  active_activities.push(activity);
  check_work();
}

function cancel_work(work) {
  $(work).parent().parent().parent().remove();
}

function work_evolve_time() {
  var activity = active_activities[0];
  if (activity == undefined) {
    return "no work";
  }
  if (activity.activity.time_used < 1) {
    finish_activity(activity);
    $("#work_tab .work")[0].remove();
    active_activities.splice(0, 1);
  } else {
    $("#work_tab .work .work_details progress")[0].value = (parseInt($("#work_tab .work .time_left").html()) - activity.activity.time_used + 1) * 100 / parseInt($("#work_tab .work .time_left").html());
    activity.activity.time_used--;
  }
  check_work();
}
