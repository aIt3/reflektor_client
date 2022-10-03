 

const cors = require('cors');               // <== IMPORT
 

module.exports = app => {

  app.use(

    cors({

      origin: ['http://localhost:3000', 'iframely.com', 'jsbin.com', 'null.jsbin.com']  

    })
  );



};