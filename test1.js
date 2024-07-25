function checkCondition(var1, var2) {
  return (
    (var1 === "{" && var2 === "}") ||
    (var1 === "[" && var2 === "]") ||
    (var1 === "(" && var2 === ")")
  );
}

function checkBalance(word) {
  let check = true;
  if (word.length % 2 === 1) {
    check = false;
  } else {
    for (let index = 0; index < word.length / 2; index++) {
      const j = word.length - 1 - index;
      if (!checkCondition(word[index], word[j])) {
        check = false;
      }
    }
  }
  return check;
}

console.log(checkBalance("({{}})"));
