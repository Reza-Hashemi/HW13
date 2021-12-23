const fs = require("fs");
const { promiseAccess, promiseReadFile } = require("./Promise");

// promiseAccess("names.txt")
//   .then(function () {
//     return promiseReadFile("names.txt");
//   })
//   .then(function (data) {
//     console.log(data);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

// promiseAccess("numbers.txt")
//   .then(function () {
//     return promiseReadFile("numbers.txt");
//   })
//   .then(function (data) {
//     console.log(data);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

function parsed([numbers, names]) {
  let person = {};
  let splittedData = names.split("\r\n");
  for (const element of splittedData) {
    [key, value] = element.split(" - ");
    person[key] = value;
  }
  let numbersObject = {};
  let splittedData2 = numbers.split("\r\n");
  for (const element of splittedData2) {
    [key, value] = element.split(" - ");
    if (!!numbersObject[key]) {
      numbersObject[key] = [...numbersObject[key], value];
    } else {
      numbersObject[key] = [value];
    }
  }
  formatter(person, numbersObject);
}

Promise.all([promiseAccess("numbers.txt"), promiseAccess("names.txt")])
  .then(function () {
    return Promise.all([
      promiseReadFile("numbers.txt"),
      promiseReadFile("names.txt"),
    ]);
  })
  .then(parsed)
  .catch(function (err) {
    console.log(err);
  });

function formatter(person, numbers) {
  let para = "";
  for (const key in person) {
    switch (numbers[key]?.length) {
      case undefined:
        para += `${person[key]} hasn't any phone number`;
        break;
      case 1:
        para += `${person[key]}'s phone number is ${numbers[key][0]}.\n`;
        break;
      default:
        para += `${person[key]}'s phone  numbers are ${numbers[key].join(
          ","
        )} .\n`;
        break;
    }
  }
  console.log(para);
}
