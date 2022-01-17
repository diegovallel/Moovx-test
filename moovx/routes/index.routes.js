const express = require("express");
const app = express();

const orderController = require('../controllers/orders');

const { ordersSchema } = require("../schemas/request");

// Import the swagger libraries
const swaggerJSDoc = require('swagger-jsdoc');  
const swaggerUI = require('swagger-ui-express'); 
// Set the configuration for swagger. Set the tags and the authentication for the endpoints that need it.
const swaggerOptions = {  
    swaggerDefinition: {  
        info: {  
            title:'Moovx Test',  
            version:'1.0.0'  
        },
        tags: [
            {
              name: 'Orders',
              description: 'Orders API',
            }
          ],         
    },  
    apis:['./routes/index.routes.js', './schemas/request.js'],  
}  
const swaggerDocs = swaggerJSDoc(swaggerOptions);  

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocs)
});
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs)); 
// Routes of the endpoint for the application

/**
 * @swagger
 * /orders/allocate:
 *   post:
 *     description: Find the match between the purchase orders and the sale orders.  
 *     tags:
 *       - Orders
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Data
 *         description: Orders data. Objects of sales and purchase
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Orders'
 *     responses:
 *       200:
 *         description: information of when the products are sent to the clients in each sale.
 */
app.post("/orders/allocate", async (req, res) => {

    const bodyValidation = ordersSchema.validate(req.body);

    if (bodyValidation['error']) {
        return res.status(400).json({
            status: 400,
            message: "Invalid request data",
            detail: bodyValidation['error']['details'][0]['message']
        });
    }

    let { salesOrders, purchaseOrders } = req.body
    const controller = await new orderController();
    const response = await controller.allocate(salesOrders, purchaseOrders);
    res.json({
        status: 200,
        data: response
    })
});

module.exports = app