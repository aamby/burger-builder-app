import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
import CommonHelper from '../../../helpers/CommonHelper';

const buildControls = (props) =>{
    return(
        <div className={classes.BuildControls}>
            <p>Current Price = <strong>${props.totalPrice.toFixed(2)}</strong></p>
            {props.ingredientControls.map((ctrl,i)=>{
                return <BuildControl 
                        key={i} 
                        label={ctrl.label} 
                        rate = {ctrl.rate.toFixed(2)}
                        addHandler = {()=>props.addHandler(ctrl.type, ctrl.rate)}
                        removeHandler = {()=>props.removeHandler(ctrl.type)}
                        disabled = {(-1 === CommonHelper.isItemExists(props.ingredients, ctrl.type, false))}
                        />;
            })}
            <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.orderClicked}>Order Now</button>
        </div>
    );
}

export default buildControls;