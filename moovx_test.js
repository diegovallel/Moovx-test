/**
 * This method generates a match between purchase orders and sales generated by customers. The method returns the id generated from the sale by the customer 
 * and the date it can be shipped according to the amount of stock
 * 
 * @param {array} salesOrders 
 * @param {array} purchaseOrders 
 * @returns 
 */

function allocate(salesOrders, purchaseOrders) {

    // Sort the sales orders by date
    salesOrders.sort(function(a,b){
        return new Date(a.created) - new Date(b.created);
    });

    // Sort the pruchase orders by date
    purchaseOrders.sort(function(a,b) {
        return new Date(a.receiving) - new Date(b.receiving);
    }); 
    
    // Initialize the quantity
    let quantity = 0;

    // Map the sales orders
    let response = salesOrders.map(function(sale){

        // Iterate in the purachase orders
        while(purchaseOrders.length) {
            
            // Get the next pruchase order
            let order = purchaseOrders.shift();

            // Sum the quantity that are available according to the purchase orders
            quantity = order.quantity + quantity;
            
            // Compare the sale to the quantity of the sotck
            if (sale.quantity <= quantity) {
                
                // Extract the quantity from the stock
                quantity -= sale.quantity;

                // Get the date to send the order
                let dateToSend = sale.created <= order.receiving ? order.receiving : sale.created;

                return {
                    "ID": sale.id,
                    "date": dateToSend
                };
            }
        }

        return {
            "ID": sale.id,
            "date": "Pending order"
        };
    });

    return response;
}


const salesOrders = [{
  'id': 'S1',
  'created': '2020-01-02',
  'quantity': 6
}, {
  'id': 'S2',  
  'created': '2020-11-05',
  'quantity': 2  
}, {
  'id': 'S3',  
  'created': '2019-12-04',
  'quantity': 3  
}, {
  'id': 'S4',  
  'created': '2020-01-20',
  'quantity': 2  
}, {
  'id': 'S5',  
  'created': '2019-12-15',
  'quantity': 9  
}];
 
const purchaseOrders = [{
  'id': 'P1',  
  'receiving': '2020-01-04',
  'quantity': 4
}, {
  'id': 'P2',  
  'receiving': '2020-01-05',
  'quantity': 3  
}, {
  'id': 'P3',  
  'receiving': '2020-02-01',
  'quantity': 5  
}, {
  'id': 'P4',  
  'receiving': '2020-03-05',
  'quantity': 1  
}, {
  'id': 'P5',  
  'receiving': '2020-02-20',
  'quantity': 7
}];

console.log(allocate(salesOrders, purchaseOrders));