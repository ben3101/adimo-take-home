// Using PlayWright to scrape Tesco's dynamic webpage with FireFox browser
const { firefox } = require('playwright'); 
const { getTescoProductObjects, getTotalPrice, savetoJSONFile } = require('./helper_functions');

(async () => { 
    const browser = await firefox.launch({ headless: true }); 
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
    });
    const page = await context.newPage();

    try{
        // Visit the webpage
        const url = 'https://www.tesco.com/groceries/en-GB/search?query=nestle';
        console.log(`Visiting ${url}...`);
        await page.goto(url); 
    
        // Extract the product information and store in an array of objects
        console.log("Extracting product data from webpage...");
        const itemObjects = await getTescoProductObjects(page);

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
        savetoJSONFile(jsonData, "./product_data/tesco_nestle_products.json");
    }catch(e){
        console.log(e);
    }finally{
        await browser.close();
    }
})();    