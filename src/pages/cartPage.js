import React from 'react';
import { connect } from 'react-redux';
import { Table,Input } from 'reactstrap';
import {updateCart} from '../actions'

class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    printCart=()=>{
        return this.props.cart.map((item, index)=>{
           return <div className="row">
                <div className="col-md-2">
                    <img src={item.img} width="100%"/>

                </div>
                <div className="col-md-6">
                    <h3 style={{fontWeight:'bolder'}} >{item.name}</h3>
                    <h2 style={{fontWeight:'bolder'}}>Rp.{item.price.toLocaleString()}</h2>

                </div>
                <div className="col-md-4 d-flex justify-content-between align-items-center">
                <div className="d-flex">
                                <span>Jumlah :</span>
                                <span style={{ width: '30%',cursor:'pointer', display: 'flex', alignItems: 'center',border: '1px solid gray' }}>
                                    <span className="material-icons cursor-pointer" onClick={this.onBtDec}>
                                        remove
                                    </span>
                                    <Input size="sm" placeholder="qty" value={item.stock} style={{ width: "50%", display: 'inline-block' }} />
                                    <span className="material-icons" style={{cursor:'pointer'}} onClick={()=>this.onBtInc[index]}>
                                        add
                                    </span>
                                </span>
                            </div>
                            <h4>Rp.{item.subTotal.toLocaleString()}</h4>
                </div>
            </div>
        })
    }
    onBtInc=(index)=>{
        this.props.cart[index].stock +=1
        this.props.updateCart([...this.props.cart])
    }
    onBtDec=(index)=>{
        this.props.cart[index].stock -=1
        this.props.updateCart([...this.props.cart])
    }
    render() { 
        console.log(this.props.cart)
        return ( 
            <div className="container">
                <h1 className="text-center mt-5" >Keranjang Belanja</h1>
               <div>
                   {this.printCart()}
               </div>
            </div>
         );
    }
}
const mapToProps=({authReducers})=>{
    return{
        ...authReducers
    }
}
 
export default connect(mapToProps,{updateCart}) (CartPage);