// 'use strict';

// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();

// app.post('https://us-central1-delivery-form-api.cloudfunctions.net/api/report', bodyParser.json(), (req, res) => {
//   // TODO: Validate the field types
//   if (!req.body.trackingNumber) {
//     return res.status(400).json({
//       message: 'Tracking Number has to be a number',
//       reason: 'ValidationError',
//       location: 'trackingNumber'
//     });
//   }
//   // TODO: Store the message
//   return res.status(204).end();
// });

// app.listen(8080);