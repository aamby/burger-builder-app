import React from 'react';
import classes from './NavigationItem.css';
import { Link } from 'react-router-dom';

const navigationItem =(props)=>(
    <li className={classes.NavigationItem}>
        <Link 
            to={{
                pathname: props.link,
                // hash:'#JumpToSection',
                // search:'?query-string=true'
            }}             
            className={props.active ? classes.active : null}
            onClick={props.linkClicked}
        >{props.children}</Link>
    </li>
);

export default navigationItem;

