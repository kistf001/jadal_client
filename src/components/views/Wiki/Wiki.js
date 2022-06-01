import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { 
    BrowserRouter as Router,
    Switch, Route, Link, Redirect, withRouter
} from "react-router-dom";

import DocumentViewer from './DocumentViewer/DocumentViewer';
import History from './History/History';
import Relation from './Relation/Relation';
import Generate from './Generate/Generate';
import Listing from './Listing/Listing';
import Discuss from './Discuss/Discuss';
import Edit from './Editor/Editor';

import {Row, Col,  Input, Table,Button,Radio,Tag, Space  } from 'antd';

function LandingPage(props) {

    return ( <>

        <Col>
            <Switch> 
                <Route exact path={"/wiki"} component={Listing} />
                <Route path={"/wiki/generate/:id"} component={Generate} />
                <Route path={"/wiki/relation/:id"} component={Relation} />
                <Route path={"/wiki/view/:id"} component={DocumentViewer} /> 
                <Route path={"/wiki/history/:id"} component={History} /> 
                <Route path={"/wiki/discuss/:id"} component={Discuss} /> 
                <Route path={"/wiki/edit/:id"} component={Edit} /> 
            </Switch>
        </Col>

    </>); //console.log("1","document viewer",props.match.params);

}

export default withRouter(LandingPage)
