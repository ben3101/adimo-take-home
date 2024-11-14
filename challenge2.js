// Using PlayWright to scrape Tesco's dynamic webpage
const { firefox } = require('playwright'); 
const { getTescoProductObjects, getTotalPrice, savetoJSONFile } = require('./helper_functions');

// Take user input via command line arguments and use as the search term
const args = process.argv.slice(2);
const searchTerm = args[0] || "nestle";
const url = `https://www.tesco.com/groceries/en-GB/search?query=${encodeURIComponent(searchTerm)}`;

(async () => { 
    const browser = await firefox.launch({ headless: true }); 
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
    });
    const page = await context.newPage();

    try{
        // Visit the webpage
        console.log(`Visiting ${url}`);
        await page.goto(url); 
    
        // Extract the product information and store in an array of objects
        console.log("Extracting product data from webpage...");
        const itemObjects = await getTescoProductObjects(page);

        // Find total item count and calculate average price
        console.log("Calculating total item count and average price...");
        const itemCount = itemObjects.length;
        const totalPrice = getTotalPrice(itemObjects);
        const averagePrice = parseFloat(totalPrice / itemCount).toFixed(2);

        // Create object to represent json data
        const jsonData = {
            products: itemObjects,
            itemCount,
            averagePrice
        };

        // Sanitize the user input before using it in the JSON file name
        const productName = searchTerm.replace(/[^a-z0-9]/gi,'_').toLowerCase();
        savetoJSONFile(jsonData, `./product_data/tesco_${productName}_products.json`);
    }catch(e){
        console.log(e);
    }finally{
        await browser.close();
    }
})();    