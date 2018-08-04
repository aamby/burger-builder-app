import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) =>{
    return class extends Component{ //Annonymous class (clas factory)
        state={
            err: null
        }
        componentWillMount(){
             this.requestInterceptor = axios.interceptors.request.use(req =>{ //this will clear the error at the time of request
                this.setState({
                    err: null
                })
                return req;
            });
            this.responseInterceptor = axios.interceptors.response.use(res => res, error =>{
                this.setState({
                    err: error
                })
            });
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        errorConfirmedHandler = () =>{
            this.setState({
                err: null
            })
        }

        render(){
            return (
                <Aux>
                    <Modal show={this.state.err} modalClosed={this.errorConfirmedHandler}>
                        {this.state.err ? this.state.err.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    };
}

export default withErrorHandler;