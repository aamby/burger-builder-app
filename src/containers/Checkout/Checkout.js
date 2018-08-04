import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classes from './Checkout.css';
import Aux from '../../hoc/Aux/Aux';
import axios from '../../dao/axiosDaoInstance';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Checkout extends Component {
    state={
        invoice:{
            ingredients:[],
            totalPrice:0.0,
            orderId:0,
            invoiceId:0,
            customer:{
                name:'',
                email:'',
                phone:'',
                address:''
            }
        },        
        loading:false,
        isError:false
      }

    modalClosedHandler = () =>{
        this.setState({
            loading:false
        });
    }

    componentDidMount() {
        console.log(this.props.match);
        // this.setState({
        //     loading: true,
        //     isError:false
        // });
        // axios.get('/ingredientControls.json')
        // .then(response =>{
        //     this.setState({
        //         ingredientControls : [...response.data],
        //         loading: false,
        //         isError: false
        //     });
        // })
        // .catch(error=>{
        //     this.setState({
        //         loading: false,
        //         isError:true
        //     });
        // });
    }

    render() {
        let modalContent = this.state.isError?<p>Can't load checkout</p> : <Spinner />;
        let invoice = null;
        if(this.state.invoice && !this.state.isError){
            invoice = (
                <div className={classes.Checkout}>Invoice Page</div>
            );
        }
        return (
            <Aux>
                <Modal show={this.state.loading} modalClosed={this.modalClosedHandler}>
                    {modalContent}
                </Modal>
                {invoice}
            </Aux>
        );
    }
}

export default withErrorHandler(withRouter(Checkout), axios);
