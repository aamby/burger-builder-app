import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classes from './Settings.css';
import Aux from '../../hoc/Aux/Aux';
import axios from '../../dao/axiosDaoInstance';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Settings extends Component {
    state={
        ingredientControls:[],
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
        this.setState({
            loading: true,
            isError:false
        });
        axios.get('/ingredientControls.json')
        .then(response =>{
            this.setState({
                ingredientControls : [...response.data],
                loading: false,
                isError: false
            });
        })
        .catch(error=>{
            this.setState({
                loading: false,
                isError:true
            });
        });
    }

    render() {
        let modalContent = this.state.isError?<p>Can't load settings</p> : <Spinner />;
        let settings = null;
        if(this.state.ingredientControls && !this.state.isError){
            settings = (
                <div className={classes.Settings}>Settings Page</div>
            );
        }
        return (
            <Aux>
                <Modal show={this.state.loading} modalClosed={this.modalClosedHandler}>
                    {modalContent}
                </Modal>
                {settings}
            </Aux>
        );
    }
}

export default withErrorHandler(withRouter(Settings), axios);
