import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Collapse, Input } from 'reactstrap';
import { URL_API } from '../helper';
import { authReducers } from '../reducers/authReducers';

class ProductDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            thumbnail: 0,
            openType: false,
            qty:1,
            selectedType:{}
        }
    }

    componentDidMount() {
        this.getProductDetail()
    }

    getProductDetail = () => {
        console.log(this.props.location)
        axios.get(URL_API + `/products${this.props.location.search}`)
            .then(res => {
                console.log("data detail product", res.data)
                this.setState({ detail: res.data[0] })
            }).catch(err => {
                console.log(err)
            })
    }
    onBtInc=()=>{
        if(this.state.stock < this.state.selectedType.qty){
        this.setState({qty:this.state.qty+=1})
        } else{
            alert('product that you select is out from stock')
        }
    }
    onBtDec=()=>{
        if(this.state.qty>1){
        this.setState({qty:this.state.qty-=1})
    }
    }

    onBtAddToCart=()=>{
        console.log(this.props.cart)
        if(this.state.selectedType.type){
        this.props.cart.push({
            qty:this.state.stock, 
            nama:this.state.detail.name, 
            type:this.state.selectedType.type,
            harga:this.state.detail.price,
            subTotal: this.state.qty*this.state.detail.harga,
            image:this.state.detail.img[0],

        })
        axios.patch(URL_API+`/users/${this.props.id}`,{cart:this.props.cart})
        .then(res=>{
            alert('add to cart success')
        }).catch(err=>{
            console.log(err)
        })
    }else{
        alert("pilih tipe")
    }
        
    }

    renderImages = () => {
        let  {img}  = this.state.detail
        return img.map((item, index) => {
            return (
                <img className="select-image mb-1" src={item}
                    key={index}
                    width="100%"
                    onClick={() => this.setState({ thumbnail: index })}
                    style={{ borderBottom: this.state.thumbnail == index && "3px solid #407AB1" }}
                />
            ) 
        })
    }

    render() {
        return (
            <div className="row p-5">
                {
                    this.state.detail.id &&
                    <>
                        <div className="col-md-1">
                            {this.renderImages()}
                        </div>
                        <div className="col-md-7">
                            <img src={this.state.detail.img[this.state.thumbnail]} width="100%" />
                        </div>
                        <div className="col-md-4">
                            <div style={{ borderBottom: '1.5px solid gray' }}>
                                <h4 style={{ fontWeight: 'bolder' }}>{this.state.detail.name}</h4>
                                <h6 className="text-mute">{this.state.detail.description}</h6>
                                <h2 style={{ fontWeight: 'bolder' }}>Rp {this.state.detail.price.toLocaleString()}</h2>
                            </div>
                            <div style={{ borderBottom: '1.5px solid gray' }}>
                                <div
                                    style={{ cursor: 'pointer', fontWeight: 'bold' }}
                                    onClick={() => this.setState({ openType: !this.state.openType })}>
                                    Type:{this.state.selectedType.type}</div>
                                <Collapse isOpen={this.state.openType}>
                                    {
                                        this.state.detail.stok.map((item, index) => {
                                            return (
                                                <div>
                                                    <Button outline color="secondary" size="sm"
                                                        style={{ width: '100%', border: 'none', textAlign: 'left' }}
                                                        onClick={()=>this.setState({selectedType:item,qty:1})}
                                                    > {item.type} : {item.qty}</Button>
                                                </div>
                                            )
                                        })
                                    }
                                </Collapse>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <span>Jumlah :</span>
                                <span style={{ width: '30%',cursor:'pointer', display: 'flex', alignItems: 'center',border: '1px solid gray' }}>
                                    <span className="material-icons cursor-pointer" onClick={this.onBtDec}>
                                        remove
                                    </span>
                                    <Input size="sm" placeholder="qty" value={this.state.qty}style={{ width: "50%", display: 'inline-block' }} />
                                    <span className="material-icons" style={{cursor:'pointer'}} onClick={this.onBtInc}>
                                        add
                                    </span>
                                </span>
                            </div>
                            <Button type="button" color="warning" style={{width:'100%'}} onClick={this.onBtAddToCart}>Add to cart</Button>
                        </div>
                    </>
                }
            </div>
        );
    }
}
const mapToProps=({authReducers})=>{
    return{
        ...authReducers
    }
}
export default connect(mapToProps) (ProductDetails);