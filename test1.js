function checkCondition(var1, var2) {
  return (
    (var1 === "{" && var2 === "}") ||
    (var1 === "[" && var2 === "]") ||
    (var1 === "(" && var2 === ")")
  );
}

function convertData(val) {
  //   const char = "{[()]}";
  //   const regex = new RegExp(`[${char}]`, "g");
  //   const result = val.match(regex);
  //   return result ? result.join("") : "";
  const dataValid = ["{", "}", "[", "]", "(", ")"];
  let result = "";
  for (let index = 0; index < val.length; index++) {
    if (dataValid.includes(val[index])) {
      result = result + val[index];
    }
  }
  return result;
}

function checkBalance(data) {
  let check = true;
  const word = convertData(data);
  console.log(word);
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
  return check ? "Seimbang" : "Tidak Seimbang";
}

console.log(checkBalance("({123[]12323})"));
console.log(checkBalance("([{3122])"));
