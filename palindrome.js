function checkPalindrome(str) {
  let isNotPalindrome = true;
  for (let i = 0; i < str.length / 2; i++) {
    isNotPalindrome = true;
    if (str[i] != str[str.length - 1 - i]) {
      isNotPalindrome = false;
      break;
    }
  }
  return isNotPalindrome;
}

let isNotPalindrome = checkPalindrome("vikash");
console.log(isNotPalindrome);
