const fs = require('fs');

// Scrape the Adimo test webpage and return the cheese products as objects
async function getAdimoCheeseObjects(document){
    const elements = document.querySelectorAll('.item');
    let itemObjects = [];
    try{
        elements.forEach(async (element) => {
            const title = element.querySelector('h1').textContent;
            const imageURL = element.querySelector('img').getAttribute('src');
            const price = parseFloat(element.querySelector('.price').textContent.replace(/\D/g,'') / 100);
            itemObjects.push({
                title: title ? title : "No Title",
                imageURL : imageURL ? imageURL : "No Image Listed",
                price: price ? price : ''
            });
        });
    }catch(e){
        console.log("Error extracting element:",e);
        return [];
    }
    return itemObjects;
}

// Scrape the Tesco webpage and return the products as objects
async function getTescoProductObjects(page){
    const listElements = await page.locator('.LD7hL').all(); 
    let itemObjects = [];
    try{ 
        for (const element of listElements) {
            const titleElement = await element.locator('.styled__Text-sc-1i711qa-1.bsLJsh.ddsweb-link__text');
            const title = (await titleElement.count() > 0) ? await titleElement.innerText() : "N/A";
            const priceElement = await element.locator('.styled__PriceText-sc-v0qv7n-1');
            const price = (await priceElement.count() > 0) ? await priceElement.innerText() : 'N/A';
            const parsedPrice = parseFloat(price.replace(/\D/g,'') / 100);
            const imageElement = await element.locator('img');
            const imageURL = (await imageElement.count() > 0) ? await imageElement.getAttribute('src') : "N/A";

            itemObjects.push({
                title,
                price: parsedPrice,
                imageURL
            });
        }
    }
    catch(e){
        console.log("Error extracting element:",e);
        return [];
    }
    return itemObjects;
}

function getTotalPrice(items){
    let sum = 0;
    items.forEach((item) => {
        if((!item.price) || (item.price === '')){
            return 0;
        }
        sum+=item.price;
    });
    return sum;
}

function savetoJSONFile(jsonData, path){
    fs.writeFile(path, JSON.stringify(jsonData, null, 2), (err) => {
        if(err){
            console.log(err);
        }else{
            console.log(`Data written to ${path}.`);
        }
    },);
}

module.exports = {
    getAdimoCheeseObjects, getTotalPrice, getTescoProductObjects, savetoJSONFile
}