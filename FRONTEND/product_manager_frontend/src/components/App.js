import React, { Component } from 'react';
import './App.css';
import HeadTitle from './HeadTitle';
import Products from './Products';
import axios from 'axios';
// import dataProducts from 'https://localhost:4000/getdata01';
const getProductData = () => axios.get('/getdata01').then((res) => res.data)

const addProductAction = (product_name, product_price, images) => {
  return axios.post('/add', { product_name, product_price, images })   // get(lấy data về) ko cần tham số nhưng post(đẩy data lên) thì cần tham số(trong case này là 3 đối tượng {} name,price,link)
    .then((res) => res.data)
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      product_name: '',
      product_price: '',
      images: ''
    }
  }

  componentWillMount() {
    if (this.state.data === null) {
      //console.log(getProductData()); // promise
      getProductData().then((res) => { // res:data trả về, lấy data trong promise là getProdutData
        this.setState({
          data: res
        });
      })
    }
  }

  printData = () => {
    if (this.state.data !== null) {
      return this.state.data.map((value, key) =>
        (<Products
          key={key}
          product_name={value.product_name}
          product_price={value.product_price}
          images={value.images}
        />)
      )
    }
  }

  isChange = (event) => {
    var name = event.target.name; // get value 
    var value = event.target.value;
    //console.log(name);
    //console.log(value);

    this.setState({ // set data to state
      [name]: value
    });
    //console.log(this.state);

  }

  handleClick = () => { // click add button to get data from state
    var { product_name, product_price, images } = this.state; // = var product_name = this.state.product_name;
    //var {product_price} = this.state;
    //var {image} = this.state
    var dataTemp = [];
    var item = {};
    item.product_name = product_name;
    item.product_price = product_price;
    item.images = images;

    dataTemp = this.state.data;
    if (item.product_name !== '') {
      dataTemp.push(item);
      this.setState({
        data:dataTemp
      });
    }

    console.log(dataTemp);

    addProductAction(product_name, product_price, images).then((response) => {
      console.log(response)
    })
  }

  render() {

    // // Make a request for a user with a given ID
    // axios.get('http://localhost:5000/getdata01')
    //   .then(function (response) {
    //     // handle success
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   })
    console.log(this.state.data);
    return (
      <div className="App">
        <HeadTitle />
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="row">
                {this.printData()}
              </div>
            </div>
            <div className="col-4">
              <div className="row">
                <div className="col-8 mx-auto">
                  <form>
                    <div className="form-group">
                      <label htmlFor="product_name">Product Name</label>
                      <input type="text" onChange={(event) => this.isChange(event)} className="form-control" name="product_name" id="product_name" aria-describedby="name_text" placeholder="Enter product name" />
                      <small id="name_text" className="form-text text-muted">Enter text</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="product_price">Product Price</label>
                      <input type="text" onChange={(event) => this.isChange(event)} className="form-control" name="product_price" id="product_price" aria-describedby="price_text" placeholder="Enter product price" />
                      <small id="price_text" className="form-text text-muted">Enter number</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="product_name">Image link</label>
                      <input type="text" onChange={(event) => this.isChange(event)} className="form-control" name="images" id="images" aria-describedby="name_text" placeholder="Enter image link" />
                      <small id="name_text" className="form-text text-muted">Enter link</small>
                    </div>
                    <button type="reset" onClick={() => this.handleClick()} className="btn btn-info">Add new</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
