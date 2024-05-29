const dotenv = require("dotenv");

dotenv.config();
console.log(process.env.API_URL);
module.exports = {
  API_URL: process.env.API_URL,
};
const API_URL = process.env.API_URL;

async function fetchData(endpoint) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
