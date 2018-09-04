import React, { Component } from 'react'
import axios from 'axios';

const addProductAction = (product_name, product_price, images) => {
    return axios.post('/add',{product_name, product_price, images})   // get(lấy data về) ko cần tham số nhưng post(đẩy data lên) thì cần tham số(trong case này là 3 đối tượng {} name,price,link)
        .then((res) => res.data)
}                                                                                                                                                
export default class AddProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_name:'',
            product_price:'',
            images:''
        }
    }
    
    isChange =(event) => {
        var name = event.target.name; // get value 
        var value = event.target.value;
        //console.log(name);
        //console.log(value);
        
        this.setState({ // set data to state
            [name]:value
        });
        //console.log(this.state);
        
    }

    handleClick = () => {
        console.log(JSON.stringify(this.state)); // click add button to get data from state
        var {product_name,product_price,images} = this.state; // = var product_name = this.state.product_name;
        //var {product_price} = this.state;
        //var {image} = this.state
        addProductAction(product_name,product_price,images).then((response) => {
            console.log(response)
        })
    }

    render() {
        return (
            <div className="container">
                
            </div>
        )
    }
}
