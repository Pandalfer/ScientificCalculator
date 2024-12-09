import * as script from "./script.js";
import {
  calculate,
  clear,
  deActivateShiftAndAlpha,
  input,
  isAlphaActive,
  isShiftActive,
  output,
} from "./script.js";

let numbers = document.getElementsByClassName("number");
for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", appendToInput, false);
}

let permutations = document.getElementById("multiply");
permutations.addEventListener("click", getPermutations, false);

let combinations = document.getElementById("divide");
combinations.addEventListener("click", getCombinations, false);

let pol = document.getElementById("add");
pol.addEventListener("click", getPol, false);

let randomNumber = document.getElementById("random");
randomNumber.addEventListener("click", randomNum, false);

let round = document.getElementById("zero");
round.addEventListener("click", roundNumber, false);

let answerButton = document.getElementById("Ans");
answerButton.addEventListener("click", showAnswer, false);
window.answer = 0;
window.answerJustOccurred = false;

let engineeringNotationButton = document.getElementById("ENG");
engineeringNotationButton.addEventListener(
  "click",
  showEngineeringNotation,
  false,
);
window.engineeringNotationOffset = 1;

window.isInStandardForm = false;

let standardFormButton = document.getElementById("10x");
standardFormButton.addEventListener("click", showStandardForm, false);

let rec = document.getElementById("subtract");
rec.addEventListener("click", getRec, false);

let sin = document.getElementById("sin");
sin.addEventListener("click", sinFunction, false);

let cos = document.getElementById("cos");
cos.addEventListener("click", cosFunction, false);

let tan = document.getElementById("tan");
tan.addEventListener("click", tanFunction, false);

let memoryButton = document.getElementById("memory");
memoryButton.addEventListener("click", memory, false);

let negative = document.getElementById("negative");
negative.addEventListener("click", getNegative, false);

let factorialButton = document.getElementById("x-1");
factorialButton.addEventListener("click", factorialFunction, false);

let DMS = document.getElementById("DMS");
DMS.addEventListener("click", getDMS, false);

let store = document.getElementById("store");
store.addEventListener("click", storeData, false);
window.isStoring = false;

let format = document.getElementById("SD");
format.addEventListener("click", changeFormat, false);

let bracketStart = document.getElementById("bracketStart");
bracketStart.addEventListener("click", appendToInput, false);

let bracketEnd = document.getElementById("bracketEnd");
bracketEnd.addEventListener("click", bracketFunction, false);

let fraction = document.getElementById("fraction");
fraction.addEventListener("click", getFraction, false);

let root = document.getElementById("root");
root.addEventListener("click", getRoot, false);

let square = document.getElementById("square");
square.addEventListener("click", getSquare, false);

let exponent = document.getElementById("exponent");
exponent.addEventListener("click", getExponent, false);

let log = document.getElementById("log");
log.addEventListener("click", getLog, false);

let ln = document.getElementById("ln");
ln.addEventListener("click", getLn, false);

let minMax = document.getElementById("minMax");
minMax.addEventListener("click", getMinMax, false);

let cubed = document.getElementById("cubed");
cubed.addEventListener("click", getCubed, false);

let absolute = document.getElementById("absolute");
absolute.addEventListener("click", getAbsolute, false);

let sign = document.getElementById("sign");
sign.addEventListener("click", getSign, false);

function insertChar(char) {
  if (answerJustOccurred) {
    script.clear();
  }
  input.textContent += char;
  lastAction[0] = "add";
  lastAction[1] = char;
}

function resetVariables() {
  isStoring = false;
  answerJustOccurred = false;
  deActivateShiftAndAlpha();
}

function storeVariable(variable, char) {
  if (
    localStorage.getItem(`${variable}Value`) === null ||
    isNaN(localStorage.getItem(`${variable}Value`))
  ) {
    localStorage.setItem(`${variable}Value`, "0");
  }
  localStorage.setItem(`${variable}Value`, calculate());
  script.clear();
  isStoring = false;
  input.textContent = `${char} -> ` + localStorage.getItem(`${variable}Value`);
  output.textContent = localStorage.getItem(`${variable}Value`);
  return;
}

function getSign() {
  if (!isShiftActive && !isAlphaActive) {
    insertChar("sign(");
  }
  resetVariables();
}

function getAbsolute() {
  if (!isShiftActive && !isAlphaActive) {
    insertChar("abs(");
  }
  resetVariables();
}

function getCubed() {
  if (!isShiftActive && !isAlphaActive) {
    insertChar("³");
  }
  resetVariables();
}

function getMinMax() {
  if (!isShiftActive && !isAlphaActive) {
    insertChar("max(");
  } else if (isShiftActive && !isAlphaActive) {
    insertChar("min(");
  }
  resetVariables();
}

function getLn() {
  if (!isShiftActive && !isAlphaActive) {
    insertChar("ln(");
  } else if (isShiftActive && !isAlphaActive) {
    insertChar("e^");
  }
  resetVariables();
}

function getLog() {
  if (!isShiftActive && !isAlphaActive) {
    insertChar("log(");
  }
  resetVariables();
}

function getExponent() {
  if (!isShiftActive && !isAlphaActive) {
    insertChar("^");
  }
  resetVariables();
}

function getSquare() {
  if (!isShiftActive && !isAlphaActive) {
    insertChar("²");
  }
  resetVariables();
}

function getRoot() {
  if (!isShiftActive && !isAlphaActive) {
    insertChar("√(");
  } else if (isShiftActive && !isAlphaActive) {
    insertChar("∛(");
  }
  resetVariables();
}

function getFraction() {
  if (!isShiftActive && !isAlphaActive) {
    insertChar("/");
  }
  resetVariables();
}

function changeFormat() {
  if (!isShiftActive && !isAlphaActive) {
    if (isStoring) {
      storeVariable("y", "y");
      return;
    }

    if (answerJustOccurred) {
      let currentOutput = output.textContent;
      if (currentOutput.includes("/")) {
        output.textContent = parseFloat(currentOutput.split("/")[0]);
      } else if (!isNaN(currentOutput) && currentOutput.includes(".")) {
        output.textContent = parseFloat(currentOutput).toPrecision(10);
      } else {
        let numerator = parseFloat(currentOutput);
        let denominator = 1;
        output.textContent = `${numerator}/${denominator}`;
      }
    }
  } else if (isAlphaActive && !isShiftActive) {
    insertChar("y");
  }
  resetVariables();
}

function getDMS() {
  if (!isShiftActive && !isAlphaActive) {
    if (isStoring) {
      storeVariable("b", "B");
      return;
    }
    insertChar("°");
  } else if (isShiftActive && !isAlphaActive) {
    if (answerJustOccurred) {
      output.innerHTML = primeFactorization(output.textContent);
    }
  } else if (isAlphaActive && !isShiftActive) {
    insertChar("B");
  }
  resetVariables();
}

function primeFactorization(n) {
  const factors = {};
  let divisor = 2;

  while (n > 1) {
    while (n % divisor === 0) {
      factors[divisor] = (factors[divisor] || 0) + 1;
      n /= divisor;
    }
    divisor++;
  }

  return Object.entries(factors)
    .map(([base, exponent]) => `${base}<sup>${exponent}<sup>`)
    .join(" &times; ");
}

function getNegative() {
  if (!isShiftActive && !isAlphaActive) {
    if (isStoring) {
      storeVariable("a", "A");
      return;
    }
    insertChar("(-)");
  }
  if (isAlphaActive && !isShiftActive) {
    insertChar("A");
  }
  resetVariables();
}

function memory() {
  if (!isShiftActive && !isAlphaActive) {
    if (isStoring) {
      storeVariable("memory", "M");
      return;
    }
    if (
      localStorage.getItem("memoryValue") === null ||
      isNaN(localStorage.getItem("memoryValue"))
    ) {
      localStorage.setItem("memoryValue", "0");
    }
    insertChar("M+");

    deActivateShiftAndAlpha();
  } else if (isShiftActive && !isAlphaActive) {
    insertChar("M-");
  } else if (isAlphaActive && !isShiftActive) {
    insertChar("M");
  }
  resetVariables();
}

function sinFunction() {
  if (!isShiftActive && !isAlphaActive) {
    if (isStoring) {
      storeVariable("d", "D");
      return;
    }
    insertChar("sin(");
  } else if (isShiftActive && !isAlphaActive) {
    insertChar("sin⁻¹(");
  } else if (isAlphaActive && !isShiftActive) {
    insertChar("D");
  }
  resetVariables();
}

function cosFunction() {
  if (!isShiftActive && !isAlphaActive) {
    if (isStoring) {
      storeVariable("e", "E");
      return;
    }
    insertChar("cos(");
  } else if (isShiftActive && !isAlphaActive) {
    insertChar("cos⁻¹(");
  } else if (isAlphaActive && !isShiftActive) {
    insertChar("E");
  }
  resetVariables();
}

function tanFunction() {
  if (!isShiftActive && !isAlphaActive) {
    if (isStoring) {
      storeVariable("f", "F");
      return;
    }
    insertChar("tan(");
  } else if (isShiftActive && !isAlphaActive) {
    insertChar("tan⁻¹(");
  } else if (isAlphaActive && !isShiftActive) {
    insertChar("F");
  }
  resetVariables();
}

function getRec() {
  if (!script.isShiftActive && !script.isAlphaActive) {
    insertChar("-");
  } else if (script.isShiftActive && !script.isAlphaActive) {
    insertChar("Rec(");
  }
  resetVariables();
}

function getPol() {
  if (!isShiftActive && !isAlphaActive) {
    insertChar("+");
  } else if (isShiftActive && !isAlphaActive) {
    insertChar("Pol(");
  }
  resetVariables();
}

function getCombinations() {
  if (!isShiftActive && !isAlphaActive) {
    insertChar("÷");
  } else if (isShiftActive && !isAlphaActive) {
    insertChar("C");
  }
  resetVariables();
}

function getPermutations() {
  if (!isShiftActive && !isAlphaActive) {
    insertChar("x");
  } else if (isShiftActive && !isAlphaActive) {
    insertChar("P");
  }
  resetVariables();
}

function roundNumber() {
  if (!isShiftActive && !isAlphaActive) {
    insertChar("0");
  } else if (isShiftActive && !isAlphaActive) {
    insertChar("Rnd(");
  }
  resetVariables();
}

function randomNum() {
  if (!isShiftActive && !isAlphaActive) {
    insertChar(".");
  } else if (isShiftActive && !isAlphaActive) {
    insertChar("Ran#");
  } else if (isAlphaActive && !isShiftActive) {
    insertChar("RanInt#(");
  }
  resetVariables();
}

function showAnswer() {
  if (answerJustOccurred) {
    if (!isShiftActive) {
      script.clear();
    } else if (isShiftActive) {
      script.clearOutput();
    }
  }

  if (!isShiftActive) {
    insertChar("Ans");
  } else {
    insertChar("%");
  }
  resetVariables();
}

function showStandardForm() {
  if (!isShiftActive && !isAlphaActive) {
    insertChar("x10^");
  } else if (isShiftActive && !isAlphaActive) {
    insertChar("π");
  } else if (isAlphaActive && !isShiftActive) {
    insertChar("e");
  }
  resetVariables();
}

export function factorial(x) {
  if (x === 0) {
    return 1;
  }
  return x * factorial(x - 1);
}

function factorialFunction() {
  if (!isShiftActive && !isAlphaActive) {
    storeVariable("c", "C");

    insertChar("⁻¹");
  } else if (isShiftActive && !isAlphaActive) {
    insertChar("!");
  } else if (isAlphaActive && !isShiftActive) {
    insertChar("ℂ");
  }
  resetVariables();
}

function standardForm(num) {
  let exponent = 0;

  if (num < engineeringNotationOffset) {
    while (num < engineeringNotationOffset) {
      num *= 10;
      exponent--;
    }
  } else if (num >= 10 * engineeringNotationOffset) {
    while (num >= 10 * engineeringNotationOffset) {
      num /= 10;
      exponent++;
    }
  }

  let precision = 4;
  num = parseFloat(num.toPrecision(precision));

  return `${num}x10^${exponent}`;
}

function showEngineeringNotation() {
  if (answerJustOccurred) {
    if (!isShiftActive && !isAlphaActive) {
      if (!isInStandardForm) {
        script.output.textContent = standardForm(answer);
        isInStandardForm = true;
      } else {
        if (engineeringNotationOffset >= 1000000000) {
          engineeringNotationOffset = 1;
          isInStandardForm = false;
          script.output.textContent = answer;
        } else {
          engineeringNotationOffset *= 1000;
          script.output.textContent = standardForm(answer);
        }
      }
      script.output.textContent = standardForm(answer);
    } else if (isShiftActive && !isAlphaActive) {
      if (!isInStandardForm) {
        script.output.textContent = standardForm(answer);
        isInStandardForm = true;
      } else {
        if (engineeringNotationOffset <= 0.000000001) {
          engineeringNotationOffset = 1;
          isInStandardForm = false;
          script.output.textContent = answer;
        } else {
          engineeringNotationOffset /= 1000;
          script.output.textContent = standardForm(answer);
        }
      }
    }
  }
  resetVariables();
}

export function storeData() {
  if (!isShiftActive && !isAlphaActive) {
    isStoring = true;
  }
  if (isShiftActive && !isAlphaActive) {
    clear();
    input.innerHTML += `
      A: ${localStorage.getItem("aValue")}&nbsp;&nbsp;&nbsp;&nbsp;
      B: ${localStorage.getItem("bValue")}&nbsp;&nbsp;&nbsp;&nbsp;
      C: ${localStorage.getItem("cValue")}<br>
      
      D: ${localStorage.getItem("dValue")}&nbsp;&nbsp;&nbsp;&nbsp;
      E: ${localStorage.getItem("eValue")}&nbsp;&nbsp;&nbsp;&nbsp;
      F: ${localStorage.getItem("fValue")}<br>
      
      X: ${localStorage.getItem("xValue")}&nbsp;&nbsp;&nbsp;&nbsp;
      Y: ${localStorage.getItem("yValue")}&nbsp;&nbsp;&nbsp;&nbsp;
      M: ${localStorage.getItem("memoryValue")}`;
    answerJustOccurred = true;
  }
}

export function appendToInput() {
  if (output.textContent === "Syntax Error") {
    clear();
  }
  if (answerJustOccurred) {
    if (isFinite(this.textContent)) {
      clear();
      lastAction[0] = "add";
      lastAction[1] = `${this.textContent}`;
      answerJustOccurred = false;
    } else if (!isFinite(this.textContent)) {
      input.textContent = input.textContent + this.textContent;
      lastAction[0] = "add";
      lastAction[1] = `${this.textContent}`;
      answerJustOccurred = false;
      return;
    }
  }
  lastAction[0] = "add";
  lastAction[1] = `${this.textContent}`;
  input.textContent = input.textContent + this.textContent;
  deActivateShiftAndAlpha();
  isStoring = false;
}

export function bracketFunction() {
  if (!isShiftActive && !isAlphaActive) {
    if (isStoring) {
      storeVariable("x", "𝑥");
      return;
    }

    insertChar(")");
  } else if (isShiftActive && !isAlphaActive) {
    insertChar(",");
  } else if (isAlphaActive && !isShiftActive) {
    insertChar("𝑥");
  }
  resetVariables();
}
