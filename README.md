# Adimo take-home
A take-home assessment for Adimo, containing three programs for web scraping tasks in NodeJS.


After running the `npm i` command to install dependencies, the solutions can be run using the appropriate commands in the terminal. For each script, an appropriate JSON file is generated and stored inside the `product_data/` directory.

### First Task
A script has been created using Axios and JSDOM to download and process the HTML for an imaginary cheese store, extracting product information to save in a JSON file. 

The script can be run with the following command:

```js
node app
```

### Challenge 1
Another script is created to scrape the Tesco website and extract the same data. The groceries page is loaded, with a query for 'nestle' products. 

As this is a dynamic website, [PlayWright](https://www.npmjs.com/package/playwright) is used. It may be necessary to use the command `npx playwright install` if this library has not previously been installed.

The script is run with this command:

```js
node challenge1
```

### Challenge 2
The script from the previous challenge is modified to allow a user to provide their own search term to query the Tesco groceries section for different products. The search term can be provided as an argument on the terminal as follows:

```js
node challenge2 "search term"
```