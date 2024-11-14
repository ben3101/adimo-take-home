const axios = require('axios');
const { JSDOM } = require("jsdom");
const { getAdimoCheeseObjects, getTotalPrice, savetoJSONFile } = require('./helper_functions');

const url = 'https://cdn.adimo.co/clients/Adimo/test/index.html';
console.log(`Visiting ${url}...`);
axios.get(url)
    .then(async response => {
        // HTML is inside response.data
        const dom = new JSDOM(response.data);
        const document = dom.window.document;
        
        // Extract the product information and store in an array of objects
        console.log("Extracting product data from webpage...");
        const itemObjects = await getAdimoCheeseObjects(document);

        // Find total item count and calculate average price
        console.log("Calculating total item count and average price...");
        const itemCount = itemObjects.length;
        const totalPrice = getTotalPrice(itemObjects);
        const averagePrice = parseFloat(totalPrice / itemCount).toFixed(2);

        // Create object to represent json data, write this data to a JSON file
        const jsonData = {
            products: itemObjects,
            itemCount,
            averagePrice
        };
        savetoJSONFile(jsonData, "./product_data/adimo_cheese_products.json");
    })
    .catch(error => {
        // Print error if any occured
        console.log(error);
    });