// api/bfhl.js (Vercel serverless function)

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

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ is_success: false, message: "Only POST allowed" });
  }

  try {
    const inputArray = req.body?.data;

    if (!Array.isArray(inputArray)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input. 'data' should be an array."
      });
    }

    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;
    let concatAlpha = "";

    for (const item of inputArray) {
      if (typeof item !== "string") {
       
        special_characters.push(String(item));
        continue;
      }

      if (/^-?\d+$/.test(item)) {
        
        const num = parseInt(item, 10);
        if (num % 2 === 0) even_numbers.push(item);
        else odd_numbers.push(item);
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        concatAlpha += item;
      } else {
        special_characters.push(item);
      }
    }

    return res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,     
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),                    
      concat_string: alternatingCaps(concatAlpha)
    });
  } catch (err) {
    return res.status(500).json({ is_success: false, message: err.message });
  }
}
