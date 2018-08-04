import React from 'react';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems =(props)=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/' linkClicked={props.linkClicked} active>Burger Builder</NavigationItem>
        <NavigationItem link='/settings' linkClicked={props.linkClicked}>Settings</NavigationItem>
        <NavigationItem link='/checkout' linkClicked={props.linkClicked}>Checkout</NavigationItem>
    </ul>
);

export default navigationItems;