import React, { useEffect,useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter
} from "react-router-dom";


import UserPage from './UserPage/UserPage';
import UserList from './UserList/UserList';
import PostView from './PostView/PostView';


function LandingPage(props) {

    return ( <>
        <Switch> 
            <Route exact path={'/piki/:ad/:id'} component={PostView} />
            <Route exact path={'/piki/:ad'} component={UserPage} />  
            <Route exact path={'/piki'} component={UserList} /> 
        </Switch>
    </>);

}

export default withRouter(LandingPage)