function onload() {
  for (var i = 0; i < 100; i++) {
    if (i % 5 == 0) {
      var k = i * 5 + 5;
      var l = k + 5;
      var o = l + 5;
      var g = o + 5;
      var b = g + 5;
      $("#circles").prepend('<svg height="100%" width="100%"><circle cx="50%" cy="50%" r=' + k + 'px fill=\"black\" /></svg>');
      $("#circles").prepend('<svg height="100%" width="100%"><circle cx="50%" cy="50%" r=' + l + 'px fill=\"white\" /></svg>');
      $("#circles").prepend('<svg height="100%" width="100%"><circle cx="50%" cy="50%" r=' + o + 'px fill=\"red\" /></svg>');
      $("#circles").prepend('<svg height="100%" width="100%"><circle cx="50%" cy="50%" r=' + g + 'px fill=\"green\" /></svg>');
      $("#circles").prepend('<svg height="100%" width="100%"><circle cx="50%" cy="50%" r=' + b + 'px fill=\"blue\" /></svg>');
    }
  }
}
