function nonRepeat(str) {
  let result = "";
  let repeat = "";
  // Vikish
  for (let i = 0; i < str.length; i++) {
    let flag = false;

    if (!repeat.includes(str[i])) {
      for (let j = i + 1; j < str.length; j++) {
        if (str[i] == str[j]) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        result = result + str[i];
      } else {
        repeat = repeat + str[i];
      }
    }
  }
  console.log(result);
}

nonRepeat("Vikish");

nonRepeat("ffish");

nonRepeat("fishh");
nonRepeat("ffishh");
