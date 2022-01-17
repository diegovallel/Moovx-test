const Joi = require('joi');
/**
 * @swagger
 * definitions:
 *   Orders:
 *     type: object
 *     required:
 *       - salesOrders
 *       - purchaseOrders
 *     properties:
 *       salesOrders:
 *         type: array
 *         example: 
 *          [{
 *                  'id': 'S1',  
 *                  'created': '2020-01-02',
 *                  'quantity': 4
 *           }]
 *            
 *       purchaseOrders:
 *         type: array
 *         example: 
 *           [{
 *                  'id': 'P1',  
 *                  'receiving': '2020-01-04',
 *                  'quantity': 4
 *           }]
 */

 const ordersSchema = Joi.object().keys({
    salesOrders: Joi.array()
                    .items({
                        id: Joi.string().required(),
                        created: Joi.string().required(),
                        quantity: Joi.number().required()
                    }),
    purchaseOrders: Joi.array()
                    .items({
                        id: Joi.string().required(),
                        receiving: Joi.string().required(),
                        quantity: Joi.number().required()
                    }),
});

module.exports = {
    ordersSchema
};
