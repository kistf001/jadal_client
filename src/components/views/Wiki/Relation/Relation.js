import React, { useEffect } from 'react'
import axios from 'axios';
import { 
    BrowserRouter as Router,
    Switch, Route, Link, Redirect, withRouter
} from "react-router-dom";

import { Table, Tag, Space } from 'antd';

function LandingPage(props) {

    useEffect( () => {
        console.log("1","Relation viewer",props.match.params);
    });
    return (
        <>준비중인 기능입니다.</>
    )

}

export default withRouter(LandingPage)
