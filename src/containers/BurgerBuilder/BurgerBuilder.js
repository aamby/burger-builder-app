import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import CommonHelper from '../../helpers/CommonHelper';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../dao/axiosDaoInstance';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {
  state={
    ingredientControls:[],
    ingredients:[],
    totalPrice:0.0,
    purchasable:false,
    ordering:false,
    loading:false,
    isError:false
  }

  componentDidMount() {
    console.log("componentDidMount is called ...");

    this.setState({
      loading: true,
      isError:false
    });

    const authData = {
      username:'roy',
      pwd:'roy'
    };

    axios.post('api/login', {login: authData})
    .then(response =>{
      //console.log(response.headers);
      //console.log(sessionToken);
      const sessionToken = response.headers.authorization;
      const config = {headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionToken
        }};
      if(sessionToken){
        axios.post('api/ingredientcontrols/getall',{},config)
        .then(response =>{
            this.setState({
              ingredientControls : [...response.data.records],
              loading: false,
              isError: false});
        })
        .catch(error=>{
          this.setState({
            loading: false,
            isError: true
          });
        });
      }
      else{
        this.setState({
          loading: false,
          isError: true
        });
      }
    })
    .catch(error=>{
      this.setState({
        loading: false,
        isError: true
      });
    });

    
  }

  addIngredientHandler = (type, rate) =>{
    const allIngredients = [...this.state.ingredients];
    const newPrice = this.state.totalPrice + rate;
    allIngredients.push({name:type, rate:rate});

    this.setState({
      ingredients: [...allIngredients],
      totalPrice: newPrice,
      purchasable: true
    });
  }

  removeIngredientHandler = (type) =>{
    let purchsableState = this.state.purchasable;
    const allIngredients = [...this.state.ingredients];   
    const index = CommonHelper.isItemExists(this.state.ingredients.map(ig=>{return ig.name;}),type,true);

    if(index>=0){
      let newPrice = this.state.totalPrice - allIngredients[index].rate;
      //Sometimes -0.00 is coming, to handle that added that. Later we may fix the issue and will remove this if block
      if(newPrice < 0){
        newPrice=0;
      }

      allIngredients.splice(index,1);
      if(allIngredients.length === 0){
        purchsableState = false;
      }
      else{
        purchsableState = true;
      }
  
      this.setState({
        ingredients:[...allIngredients],
        totalPrice: newPrice,
        purchasable:purchsableState
      });
    }
  }

  orderClickHandler = () =>{
    this.setState({
      ordering: true,
      loading: true
    });
  }

  orderContinuedHandler = () =>{
    this.setState({
      loading: true,
      ordering:false,
    });
    const orderDetails = {
      orderId: CommonHelper.getUniqueNumbers(),
      ingredients: this.state.ingredients,
      totalAmount: this.state.totalPrice
    };

    axios.post('/orders.json', orderDetails)
    .then(response =>{
      this.setState({
        loading: false,
        purchasable: false
      });

      if(response.status === 200){
        console.log('Order saved to cart.');
        console.log('Order: ' + response.data.name);
      }
    })
    .catch(error => {
      this.setState({
        loading: false
      });

      console.log(error)
    });
  }

  modalClosedHandler = () =>{
    this.setState({
      ordering: false,
      loading: false,
    });
  }

  render() {
    let modalContent = null;
    let burgerBuilderControl = this.state.isError?<p>Can't load burger</p> : <Spinner />;

    if(this.state.ingredients && !this.state.isError){ //means if ingredients is not null
      burgerBuilderControl = (
        <Aux>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls 
            ingredientControls = {this.state.ingredientControls}
            ingredients={this.state.ingredients.map(ig=>{return ig.name;})}
            addHandler = {this.addIngredientHandler} 
            removeHandler={this.removeIngredientHandler}
            totalPrice={this.state.totalPrice}
            purchasable = {this.state.purchasable}
            orderClicked = {this.orderClickHandler}
            />
        </Aux>
      );

      modalContent = <OrderSummary 
        ingredients={this.state.ingredients}
        totalPrice={this.state.totalPrice}
        orderCancelled={this.modalClosedHandler}
        orderContinued={this.orderContinuedHandler}
        />;
    }

    if(this.state.loading && !this.state.ordering){
      modalContent = <Spinner />
    }

    return (
        <Aux>
          <Modal show={this.state.loading} modalClosed={this.modalClosedHandler}>
            {modalContent}
          </Modal>
          {burgerBuilderControl}
      </Aux>
    );
  }
}
  
export default withErrorHandler(withRouter(BurgerBuilder), axios);