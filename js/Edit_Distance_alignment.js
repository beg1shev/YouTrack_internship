function levenshteinDistance(str1, str2){
  let matrix = Array(str1.length + 1).fill().map(() => Array(str2.length + 1).fill(0));
  for (let i = 0; i < str1.length + 1; i++){
    matrix[i][0] = i;
  }

  for (let j = 0; j < str2.length + 1; j++){
    matrix[0][j] = j;
  }
  str1 = str1.split("");
  str2 = str2.split("");

  for (let [i, x] of str1.entries()){
    for (let [j, y] of str2.entries()){
    const toAdd = x === y ? 0 : 1;
    matrix[i + 1][j + 1] = Math.min(matrix[i][j] + toAdd, matrix[i + 1][j] + 1, matrix[i][j + 1] + 1);
    }
  }
  return matrix;
}

function editAlign(str1, str2) {
  const matrix = levenshteinDistance(str1, str2);
  let out1 = "";
  let out2 = "";
  let x = str1.length;
  let y = str2.length;

  while (x !== 0 && y !== 0){
    const minimum = Math.min(matrix[x - 1][y - 1], matrix[x][y - 1], matrix[x - 1][y]);

    if (matrix[x][y] === matrix[x - 1][y - 1] && matrix[x - 1][y - 1] === minimum){
      out1 = str1[x - 1] + out1;
      out2 = str2[y - 1] + out2;
      x--;
      y--;
    }
    else {
      if (matrix[x][y - 1] === minimum){
        out2 = str2[y - 1] + out2;
        out1 = "-" + out1;
        y--;
      }
      else if (matrix[x - 1][y] === minimum) {
        out1 = str1[x - 1] + out1;
        out2 = "-" + out2;
        x--;
      }
      else {
        out1 = str1[x - 1] + out1;
        out2 = str2[y - 1] + out2;
        x--;
        y--;
      }
    }
  }

  return [out1, out2, matrix[str1.length][str2.length]];
}

let str1 = "";
let str2 = "";

function getValue(id) {
  if (id === "firstWord"){
    str1 = document.getElementById(id).value;
  }
  else {
    str2 = document.getElementById(id).value;
  }
}

function calculate(){
  const result = editAlign(str1, str2);
  const resString1 = result[0];
  const resString2 = result[1];
  const distance = result[2];
  document.getElementById("distance").innerHTML = distance;
  document.getElementById("augString1").innerHTML = resString1;
  document.getElementById("augString2").innerHTML = resString2;
}
