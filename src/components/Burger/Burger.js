import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger =(props)=>{
    let transformedIngredients = <p>Please add some ingredients!</p>;
    if(props.ingredients.length > 0){
        transformedIngredients = props.ingredients.map((ig,i)=>{
            return <BurgerIngredient key={i} type={ig.name} />
        });
    }

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;