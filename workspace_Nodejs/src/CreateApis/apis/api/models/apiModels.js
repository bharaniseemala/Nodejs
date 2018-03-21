'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  }
});

var DispatchOrdersSchema = new Schema({
  "DispatchOrders": {
    "MarketPlace": "Myntra",
    "orderId": "asds",
    "orderItems": [{
      "id": "zxZx",
      "quantity": "0",
      "invoiceNumber": "12345",
      "invoiceDate": "2018-02-15T16:17:56+05:30",
      "taxEntries": [{
        "taxRate": "5.5",
        "taxType": "CGST",
        "unitTaxAmount": "26.02",
        "unitTaxableAmount": "711.45"
      }]
    }]
  }
});

var TaxEntries = new Schema({
  taxRate: {
    type: String
  },
  taxtype: {
    type: String
  },
  unitTaxAmount: {
    type: String
  },
  unittaxableAmount: {
    type: String
  }
})

module.exports = mongoose.model('Tasks', TaskSchema);