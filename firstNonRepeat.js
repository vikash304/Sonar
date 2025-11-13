function nonRepeat(str) {
  let result = "";
  let repeat = "";
  // Vikish
  for (let i = 0; i < str.length; i++) {
    let flag = false;
    for (let j = i + 1; j < str.length; j++) {
      if (str[i] == str[j]) {
        flag = true;
        break;
      }
    }
    if (!flag) {
      result = str[i];
      console.log(result);
      break;
    }
  }
}

nonRepeat("VikiSh");
