const resultOne = 
 ["13:00",
 "12:30",
 "12:00",
 "11:30",
 "11:00",
 "12:45",
 "12:15",
 "11:45",
 "11:15",
 "10:45",
 "12:30",
 "12:00",
 "11:30",
 "11:00",
 "10:30",
 "12:15",
 "11:45",
 "11:15",
 "10:45",
 "10:15",
 "12:00",
 "11:30",
 "11:00",
 "10:30",
 "10:00",
 "11:45",
 "11:15",
 "10:45",
 "10:15",
 "9:45",
 "11:30",
 "11:00",
 "10:30",
 "10:00",
 "9:30",
 "11:15",
 "10:45",
 "10:15",
 "9:45",
 "9:15",
 "11:00",
 "10:30",
 "10:00",
 "9:30",
 "9:00",
 "12:00",
 "11:30",
 "11:00",
 "10:30",
 "10:00",
 "12:15",
 "11:45",
 "11:15",
 "10:45",
 "10:15",
 "12:30",
 "12:00",
 "11:30",
 "11:00",
 "10:30",
 "12:45",
 "12:15",
 "11:45",
 "11:15",
 "10:45"
 ]; 
 function ChangeFunc() {
  let getResultDiv = document.getElementById("result");
  let fdpSelect = document.getElementById("fdpSelect");
  let fdpValue = fdpSelect.options[fdpSelect.selectedIndex].value;
  let sectorSelect = document.getElementById("sectorSelect");
  let sectorValue = sectorSelect.options[sectorSelect.selectedIndex].value;
  
  if(sectorValue === "sectorOneTwo" && fdpValue === "fdpOne") {
    getResultDiv.innerHTML = "Result: " + resultOne[0]
  }else if (sectorValue === "sectorThree" && fdpValue === "fdpOne") {
    getResultDiv.innerHTML = "Result: " + resultOne[1]
  }else if (sectorValue === "sectorFour" && fdpValue === "fdpOne") {
    getResultDiv.innerHTML = "Result: " + resultOne[2]
}else if (sectorValue === "sectorFive" && fdpValue === "fdpOne") {
  getResultDiv.innerHTML = "Result: " + resultOne[3]
}else if (sectorValue === "sectorSix" && fdpValue === "fdpOne") {
  getResultDiv.innerHTML = "Result: " + resultOne[4]
}else if (sectorValue === "sectorOneTwo" && fdpValue === "fdpTwo") {
  getResultDiv.innerHTML = "Result: " + resultOne[5]
 }else if (sectorValue === "sectorThree" && fdpValue === "fdpTwo") {
  getResultDiv.innerHTML = "Result: " + resultOne[6]
 }else if (sectorValue === "sectorFour" && fdpValue === "fdpTwo") {
  getResultDiv.innerHTML = "Result: " + resultOne[7]
 }else if (sectorValue === "sectorFive" && fdpValue === "fdpTwo") {
  getResultDiv.innerHTML = "Result: " + resultOne[8]
 }else if (sectorValue === "sectorSix" && fdpValue === "fdpTwo") {
  getResultDiv.innerHTML = "Result: " + resultOne[9]
 }else if (sectorValue === "sectorOneTwo" && fdpValue === "fdpThree") {
  getResultDiv.innerHTML = "Result: " + resultOne[10]
 }else if (sectorValue === "sectorThree" && fdpValue === "fdpThree") {
  getResultDiv.innerHTML = "Result: " + resultOne[11]
 }else if (sectorValue === "sectorFour" && fdpValue === "fdpThree") {
  getResultDiv.innerHTML = "Result: " + resultOne[12]
 }else if (sectorValue === "sectorFive" && fdpValue === "fdpThree") {
  getResultDiv.innerHTML = "Result: " + resultOne[13]
 }else if (sectorValue === "sectorSix" && fdpValue === "fdpThree") {
  getResultDiv.innerHTML = "Result: " + resultOne[14]
 }else if (sectorValue === "sectorOneTwo" && fdpValue === "fdpFour") {
  getResultDiv.innerHTML = "Result: " + resultOne[15]
 }else if (sectorValue === "sectorThree" && fdpValue === "fdpFour") {
  getResultDiv.innerHTML = "Result: " + resultOne[16]
 }else if (sectorValue === "sectorFour" && fdpValue === "fdpFour") {
  getResultDiv.innerHTML = "Result: " + resultOne[17]
 }else if (sectorValue === "sectorFive" && fdpValue === "fdpFour") {
  getResultDiv.innerHTML = "Result: " + resultOne[18]
 }else if (sectorValue === "sectorSix" && fdpValue === "fdpFour") {
  getResultDiv.innerHTML = "Result: " + resultOne[19]
 }else if (sectorValue === "sectorOneTwo" && fdpValue === "fdpFive") {
  getResultDiv.innerHTML = "Result: " + resultOne[20]
 }else if (sectorValue === "sectorThree" && fdpValue === "fdpFive") {
  getResultDiv.innerHTML = "Result: " + resultOne[21]
 }else if (sectorValue === "sectorFour" && fdpValue === "fdpFive") {
  getResultDiv.innerHTML = "Result: " + resultOne[22]
 }else if (sectorValue === "sectorFive" && fdpValue === "fdpFive") {
  getResultDiv.innerHTML = "Result: " + resultOne[23]
 }else if (sectorValue === "sectorSix" && fdpValue === "fdpFive") {
  getResultDiv.innerHTML = "Result: " + resultOne[24]
 }else if (sectorValue === "sectorOneTwo" && fdpValue === "fdpSix") {
  getResultDiv.innerHTML = "Result: " + resultOne[25]
 }else if (sectorValue === "sectorThree" && fdpValue === "fdpSix") {
  getResultDiv.innerHTML = "Result: " + resultOne[26]
 }else if (sectorValue === "sectorFour" && fdpValue === "fdpSix") {
  getResultDiv.innerHTML = "Result: " + resultOne[27]
 }else if (sectorValue === "sectorFive" && fdpValue === "fdpSix") {
  getResultDiv.innerHTML = "Result: " + resultOne[28]
 }else if (sectorValue === "sectorSix" && fdpValue === "fdpSix") {
  getResultDiv.innerHTML = "Result: " + resultOne[29]
 }else if (sectorValue === "sectorOneTwo" && fdpValue === "fdpSeven") {
  getResultDiv.innerHTML = "Result: " + resultOne[30]
 }else if (sectorValue === "sectorThree" && fdpValue === "fdpSeven") {
  getResultDiv.innerHTML = "Result: " + resultOne[31]
 }else if (sectorValue === "sectorFour" && fdpValue === "fdpSeven") {
  getResultDiv.innerHTML = "Result: " + resultOne[32]
 }else if (sectorValue === "sectorFive" && fdpValue === "fdpSeven") {
  getResultDiv.innerHTML = "Result: " + resultOne[33]
 }else if (sectorValue === "sectorSix" && fdpValue === "fdpSeven") {
  getResultDiv.innerHTML = "Result: " + resultOne[34]
 }else if (sectorValue === "sectorOneTwo" && fdpValue === "fdpEight") {
  getResultDiv.innerHTML = "Result: " + resultOne[35]
 }else if (sectorValue === "sectorThree" && fdpValue === "fdpEight") {
  getResultDiv.innerHTML = "Result: " + resultOne[36]
 }else if (sectorValue === "sectorFour" && fdpValue === "fdpEight") {
  getResultDiv.innerHTML = "Result: " + resultOne[37]
 }else if (sectorValue === "sectorFive" && fdpValue === "fdpEight") {
  getResultDiv.innerHTML = "Result: " + resultOne[38]
 }else if (sectorValue === "sectorSix" && fdpValue === "fdpEight") {
  getResultDiv.innerHTML = "Result: " + resultOne[39]
 }else if (sectorValue === "sectorOneTwo" && fdpValue === "fdpNine") {
  getResultDiv.innerHTML = "Result: " + resultOne[40]
 }else if (sectorValue === "sectorThree" && fdpValue === "fdpNine") {
  getResultDiv.innerHTML = "Result: " + resultOne[41]
 }else if (sectorValue === "sectorFour" && fdpValue === "fdpNine") {
  getResultDiv.innerHTML = "Result: " + resultOne[42]
 }else if (sectorValue === "sectorFive" && fdpValue === "fdpNine") {
  getResultDiv.innerHTML = "Result: " + resultOne[43]
 }else if (sectorValue === "sectorSix" && fdpValue === "fdpNine") {
  getResultDiv.innerHTML = "Result: " + resultOne[44]
 }else if (sectorValue === "sectorOneTwo" && fdpValue === "fdpTen") {
  getResultDiv.innerHTML = "Result: " + resultOne[45]
 }else if (sectorValue === "sectorThree" && fdpValue === "fdpTen") {
  getResultDiv.innerHTML = "Result: " + resultOne[46]
 }else if (sectorValue === "sectorFour" && fdpValue === "fdpTen") {
  getResultDiv.innerHTML = "Result: " + resultOne[47]
 }else if (sectorValue === "sectorFive" && fdpValue === "fdpTen") {
  getResultDiv.innerHTML = "Result: " + resultOne[48]
 }else if (sectorValue === "sectorSix" && fdpValue === "fdpTen") {
  getResultDiv.innerHTML = "Result: " + resultOne[49]
 }else if (sectorValue === "sectorOneTwo" && fdpValue === "fdpEleven") {
  getResultDiv.innerHTML = "Result: " + resultOne[50]
 }else if (sectorValue === "sectorThree" && fdpValue === "fdpEleven") {
  getResultDiv.innerHTML = "Result: " + resultOne[51]
 }else if (sectorValue === "sectorFour" && fdpValue === "fdpEleven") {
  getResultDiv.innerHTML = "Result: " + resultOne[52]
 }else if (sectorValue === "sectorFive" && fdpValue === "fdpEleven") {
  getResultDiv.innerHTML = "Result: " + resultOne[53]
 }else if (sectorValue === "sectorSix" && fdpValue === "fdpEleven") {
  getResultDiv.innerHTML = "Result: " + resultOne[54]
 }else if (sectorValue === "sectorOneTwo" && fdpValue === "fdpTwelve") {
  getResultDiv.innerHTML = "Result: " + resultOne[55]
 }else if (sectorValue === "sectorThree" && fdpValue === "fdpTwelve") {
  getResultDiv.innerHTML = "Result: " + resultOne[56]
 }else if (sectorValue === "sectorFour" && fdpValue === "fdpTwelve") {
  getResultDiv.innerHTML = "Result: " + resultOne[57]
 }else if (sectorValue === "sectorFive" && fdpValue === "fdpTwelve") {
  getResultDiv.innerHTML = "Result: " + resultOne[58]
 }else if (sectorValue === "sectorSix" && fdpValue === "fdpTwelve") {
  getResultDiv.innerHTML = "Result: " + resultOne[59]
 }else if (sectorValue === "sectorOneTwo" && fdpValue === "fdpThirteen") {
  getResultDiv.innerHTML = "Result: " + resultOne[61]
 }else if (sectorValue === "sectorThree" && fdpValue === "fdpThirteen") {
  getResultDiv.innerHTML = "Result: " + resultOne[62]
 }else if (sectorValue === "sectorFour" && fdpValue === "fdpThirteen") {
  getResultDiv.innerHTML = "Result: " + resultOne[63]
 }else if (sectorValue === "sectorFive" && fdpValue === "fdpThirteen") {
  getResultDiv.innerHTML = "Result: " + resultOne[64]
 }else if (sectorValue === "sectorSix" && fdpValue === "fdpThirteen") {
  getResultDiv.innerHTML = "Result: " + resultOne[65]
 }
}