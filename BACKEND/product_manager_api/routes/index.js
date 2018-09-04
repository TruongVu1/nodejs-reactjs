var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sanpham',
  password: '123456',
  port: 5432,
})

/* GET home page. */
router.get('/', function (req, res, next) {
});

// api get data from postgreSQL
router.get('/getdata01', function (req, res, next) {
  //console.log('day la api lay data cho react js');

  // có proxy rồi nên ko cần cái này nữu
  // // Website you wish to allow to connect
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // // Request methods you wish to allow
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // // Request headers you wish to allow
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // // Set to true if you need the website to include cookies in the requests sent
  // // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);

  // get data
  pool.query('SELECT * FROM product_info', (error, response) => { // arrow func xét xem hàm querry có đúng hay sai, sai trả về error, đúng thì response lại
    if (error) {
      console.log(error);
    }
    else {
      //console.log(response);
      res.send(response.rows)
    }
    //pool.end();
  })
  //res.render('index', { title: 'Express' });
});

router.get('/add', function (req, res, next) {
  res.render('add', {});
});

router.post('/add', function (req, res, next) { // gửi data vô node
  product_name = req.body.product_name,
  product_price = req.body.product_price,
  images = req.body.images;

  pool.query("insert into product_info (product_name, product_price, images) values ($1, $2, $3)",[product_name,product_price,images], (err,response) => {
    if(err){
      res.send(err);
      res.send(0);
    } else {
      res.send(1);
    }
  })
});

module.exports = router;
