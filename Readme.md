# Node.js Challenge
 This method generates a match between purchase orders and sales generated by customers. The method returns the id generated from the sale by the customer and the date it can be shipped according to the amount of stock

To test the app, There are two ways:

# Run Script 

## steps

## PART I: Run script
Inside the folder there is an script called moovx_test.js. This file have the script to make the match between the demand and supply and the inputs of the salesOrders and purchaseOrders as in the .dat file. To change the values ​​of these two objects, they must be changed within the code. To run the script use the next command:

```
node moovx_test.js
```

# Run endpoint 

Inside the folder there is the project moovx that is an API to test the script wiith the different sales and purchase orders that the user wants to enter.

## Steps

## PART I:  install the api-service dependencies
```
cd moovx
npm install
```

## PART II: Run the app
Inside of the project (moovx) please run
```
node index.js
```

The app would run in:

`http://localhost:8080/` 


## PART III: Endpoint

The endpoint is the following:

<strong> Api-Service: </strong>
- /orders/allocate


## PART IV: Test the endpoints

There are two ways to test the apps. For postman or swagger.

To have access to swagger, once run `node index.js`, use the next url:

`http://localhost:8080/api-docs/#/`


<strong>Thank you!!</strong>
