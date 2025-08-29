const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const serverless = require("serverless-http");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const FULL_NAME = "dhruv_agarwal"; 
const DOB = "08062003";      
const EMAIL = "dhruv0806a@gmail.com"; 
const ROLL_NUMBER = "22BCE2825"; 

function alternatingCaps(str) {
  let result = "";
  let toggle = true; 
  for (let i = str.length - 1; i >= 0; i--) {
    const char = str[i];
    if (/[a-zA-Z]/.test(char)) {
      result += toggle ? char.toUpperCase() : char.toLowerCase();
      toggle = !toggle;
    }
  }
  return result;
}

app.post("/bfhl", (req, res) => {
  try {
    const inputArray = req.body.data;

    if (!Array.isArray(inputArray)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input. 'data' should be an array."
      });
    }

    let evenNumbers = [];
    let oddNumbers = [];
    let alphabets = [];
    let specialChars = [];
    let sum = 0;
    let concatAlpha = "";

    inputArray.forEach(item => {
      if (/^-?\d+$/.test(item)) { 
        let num = parseInt(item, 10);
        if (num % 2 === 0) {
          evenNumbers.push(item); 
        } else {
          oddNumbers.push(item);
        }
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) { 
        alphabets.push(item.toUpperCase());
        concatAlpha += item;
      } else { 
        specialChars.push(item);
      }
    });

    const response = {
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialChars,
      sum: sum.toString(),
      concat_string: alternatingCaps(concatAlpha)
    };

    res.status(200).json(response);

  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: error.message
    });
  }
});


module.exports = app;
module.exports.handler = serverless(app);
