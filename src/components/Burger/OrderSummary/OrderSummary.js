import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import CommonHelper from '../../../helpers/CommonHelper';
import Button from '../../UI/Button/Button';


const orderSummary =(props)=>{
    return (
        <Aux>
            <h3>Your Order Summary</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                <li>Salad: {CommonHelper.getItemCount(props.ingredients.map(ig=>{return ig.name;}),'salad')}</li>
                <li>Cheese: {CommonHelper.getItemCount(props.ingredients.map(ig=>{return ig.name;}),'cheese')}</li>
                <li>Meat: {CommonHelper.getItemCount(props.ingredients.map(ig=>{return ig.name;}),'meat')}</li>
                <li>Bacon: {CommonHelper.getItemCount(props.ingredients.map(ig=>{return ig.name;}),'bacon')}</li>
            </ul>
            <h1>Total Price: ${props.totalPrice.toFixed(2)}</h1>
            <p>Continue to Checkout?</p>
            <Button type={'Success'} clicked={props.orderContinued}>CONTINUE</Button>
            <Button type={'Danger'} clicked={props.orderCancelled}>CANCEL</Button>
        </Aux>
    );
}

export default orderSummary;