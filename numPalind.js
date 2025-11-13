function checkPalindrome(num) {
  //   let r = 1 % 10;
  //   let j = 1 / 10;
  //   console.log(r);
  //   console.log(j);

  let isPalindrome = false;
  let k = 10;
  let r = 0;
  let result = 0;
  for (let j = num; j >= 1; ) {
    r = j % k;
    j = j / k;
    result = result * k;
    result = result + Math.round(r);
  }
  if (result == num) {
    isPalindrome = true;
  }
  return isPalindrome;
}

let isPalindrome = checkPalindrome(1331);
console.log(isPalindrome);
