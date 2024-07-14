# React-Native Beer E-Commerce

## Technical requirements for the backend

-Create an API endpoint served by a GET request to the url api/products that returns the list of all products and their details.
-Create an API endpoint served by a GET request to the url api/stock-price/[sku]
that returns the price and number of items in stock for a given product size-variant,
identified by its SKU. For example, for the SKU 10041, the url should be: api/stock-price/10041.
-Make sure you do not modify the "products.js" and stock-price.js files (except for changing prices/stock values inside stock-price.js while you are testing the 5-seconds update requirement for the frontend. Note that to make such a stock/price change effective you should restart the server (i.e., the server does not need to detect changes to stock-price.js).

## Please make sure that you do the following

-Carefully follow all the specifications given above, and the visual specifications given in the Figma link. Note, however, that you do not have to use the exact same fonts as in the Figma, and any close enough font will do.
-Separate the frontend and backend code into two completely separate project folders, each with its own package.json file.
-Include a README.md file in each of the frontend and backend project folders, with clear and full instructions on how to install and run that part of the challenge.
-Any instructions, error-messages, comments, etc. should be written only in English.

# STARTING COMMANDS

## Navigate to BE folder:
cd store/backend/

## INSTALL BACKEND AND DEPENDENCIES
RUN THE COMMAND 'npm install' on backend folder

## TO RUN BACKEND
npm start

## TO RUN TESTS
npm test