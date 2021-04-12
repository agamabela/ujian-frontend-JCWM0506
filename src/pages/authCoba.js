import React from 'react';
import axios from 'axios';
import { Container, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { URL_API } from '../helper';
import { authLogin } from '../actions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
class AuthCoba extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            passType: 'password',
            alert: true,
            message: '',
            alertType: '',
         }
    }

    onBtRegis = () => {
      
        let email = this.inRegisEmail.value
        let password = this.inRegisPassword.value
        let role = 'user'
       
        if (email == '' || password == '') {
            // setState untuk membuka alert, dengan mengatur message serta type alert
            this.setState({ alert: !this.state.alert, message: "Isi semua form !", alertType: 'danger' })
            // melakukan reset terhadap alert menggunakan setTimeout
            setTimeout(() => this.setState({ alert: !this.state.alert, message: '', alertType: '' }), 3000)
        } else {
            if (email.includes('@')) {
                axios.get(URL_API + `/users?email=${email}`)
                    .then(res => {
                        if (res.data.length > 0) {
                            this.setState({ alert: !this.state.alert, message: "Email sudah terdaftar", alertType: 'warning' })
                            setTimeout(() => this.setState({ alert: !this.state.alert, message: '', alertType: '' }), 3000)  
                        } else {
                            axios.post(URL_API + `/users`, {
                                email,
                                password,
                                role: 'user'
                            })
                                .then(res => {
                                    this.setState({ alert: !this.state.alert, message: "Registrasi akun sukses ✔", alertType: 'success' })
                                    setTimeout(() => this.setState({ alert: !this.state.alert, message: '', alertType: '' }), 3000)
                                   
                                    this.inRegisEmail.value = null
                                    this.inRegisPassword.value = null
                                    
                                })
                                .catch(err => {
                                    console.log("Error Register", err)
                                })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } else {
                this.setState({ alert: !this.state.alert, message: "Email anda salah ❌", alertType: 'warning' })
                setTimeout(() => this.setState({ alert: !this.state.alert, message: '', alertType: '' }), 3000)
            }
        }
    }
    
    

    handlePassword = () => {
        let huruf = /[a-zA-Z]/
        let numb = /[0-9]/
        let email = this.inRegisEmail.value
        let password = this.inRegisPassword.value
        let role = 'user'
        if (this.inRegisPassword.value.length > 5) { 
        if (huruf.test(this.inRegisPassword.value) || numb.test(this.inRegisPassword.value)) {
            if (huruf.test(this.inRegisPassword.value) && numb.test(this.inRegisPassword.value)) {
                axios.post(URL_API+`/users`,{
                    password,
                    email,
                    role
                }).then(res=>{

                }).catch(err=>{

                })
            } else if (huruf.test(this.inRegisPassword.value)) {
                alert("tidak boleh hanya huruf")
            } else if (numb.test(this.inRegisPassword.value)) {
                alert("tidak boleh hanya angka")
            }
        }
    } else{
        alert("Password kurang dari 6")
    }

    }


    render() { 
        if (this.props.id) {
            return <Redirect to="/" />
        }
        return ( 
        <div>
            <Container className="p-5">
                <h2 style={{ fontWeight: 'bold', textAlign: 'center' }}>Pilihan Masuk</h2>
                <p style={{ textAlign: 'center' }}>Masuk dan selesaikan pesanan dengan data pribadi Anda atau daftar untuk menikmati semua manfaat memiliki akun IKEA.</p>
                <div className="row">
                    <div className="col-6 p-5">
                        <h3>Silakan masuk ke akun Anda</h3>
                        <p>Silakan masuk ke akun Anda untuk menyelesaikan pembayaran dengan data pribadi Anda.</p>
                        <FormGroup>
                            <Label for="textEmail">Email</Label>
                            <Input type="email" id="textEmail" innerRef={elemen => this.inRegisEmail = elemen} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="textPassword">Password</Label>
                            <Input type={this.state.passType} id="textPassword"  innerRef={elemen => this.inRegisPassword = elemen} />
                        </FormGroup>
                        <Button size="lg" style={{ width: '100%', backgroundColor: '#0058AB' }} onClick={this.onBtRegis}>Masuk</Button>
                    </div>
                </div>
            </Container>
        </div> 
        );
    }
}
 
const mapToProps = ({ authReducers }) => {
    return {
        id: authReducers.id
    }
}

export default connect(mapToProps, { authLogin })(AuthCoba);