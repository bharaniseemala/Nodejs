const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

var PUTRequest = require('./CreateApis/PUTRequest');

app.put('/dispatchorders', (req, res) => {
  
  console.log(req.body);
  res.send(req.body);


});

app.post('/dispatchorders', (req, res) => {
  res.send({ express: 'Hello From Express--------- POST' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));