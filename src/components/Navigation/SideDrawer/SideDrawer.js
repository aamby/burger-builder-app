import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer =(props)=>{
    let attchedClasses=[classes.SideDrawer, classes.Close];
    if(props.open){
        attchedClasses=[classes.SideDrawer, classes.Open];
    }
    return(
        <Aux>
            <Backdrop show={props.open} backdropClicked={props.sideDrawerClosed}/>
            <div className={attchedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems linkClicked={props.sideDrawerClosed}/>
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;