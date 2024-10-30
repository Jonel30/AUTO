module.exports.config = {
  name: "weather",
  version: "1.0.0",
  role: 0, // Adjust permission level as needed
  hasPrefix: true,
  aliases: ["w"],
  description: "Get the weather information for a specific location.",
  usage: "weather [location]",
  credits: "Developer"
};

module.exports.run = async function({ api, event, args }) {
  // Logic for your new command goes here
  const message = `You used the ${args[0]} command!`;
  api.sendMessage(message, event.threadID, event.messageID); 
};

module.exports.run = async function({ api, event, args }) {
  const city = args[0]; // Assuming the user provides a city name
  
  if (!city) {
    api.sendMessage('Please provide a city name.', event.threadID, event.messageID); 
    return;
  }

  try {
    const response = await fetch(`https://www.weatherbit.io/api=${city}&appid=58b7318791ec46a7a59ad4a8c79ca663`); 
    const data = await response.json();

    if (data.cod === 200) { // Successful response
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      api.sendMessage(`The weather in ${city} is ${temperature} degrees Celsius and ${description}.`, event.threadID, event.messageID); 
    } else {
      api.sendMessage(`Error retrieving weather data for ${city}.`, event.threadID, event.messageID); 
    }

  } catch (error) {
    api.sendMessage(`An error occurred: ${error.message}`, event.threadID, event.messageID); 
  }
};