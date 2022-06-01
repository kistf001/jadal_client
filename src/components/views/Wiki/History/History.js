import React, { useRef, useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import {
    BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter
} from "react-router-dom";

import { Row, Col, Button, Radio, Divider,Menu,Dropdown  } from 'antd';
import { Typography, Space  } from 'antd';


let dfkal = null;
function LandingPage(props) {

    const [UserData, setUserData] = useState(0);

    useEffect( () => { 
        console.log("1","History viewer",props.match.params);
        axios
            .post("/api/wiki/history", {
                page:1,
                id:props.match.params.id
            })
            .then((Response)=>{
                console.log(Response['data'])
                dfkal = Response['data']

                dfkal = dfkal.map((d)=>{
                    return (
                        <> 
                            => {d["date"]} r{d["revision"]} (요약:{d['summary']} ) {d['user']}<br/> 
                        </>
                    )
                });

                setUserData(dfkal)
            })
            .catch();
    }, []);

    return (<>
        
        <div><Button type="primary">좋아요</Button></div>
        <div>{UserData}</div>
        
    </>);


}


export default withRouter(LandingPage)