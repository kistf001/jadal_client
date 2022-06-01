import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Layout, Menu, Breadcrumb,Space, Card } from 'antd';
import {
    BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter
} from "react-router-dom";


function Ssssssss(props) {


    const [number, setNumber] = useState("1");
    

    useEffect(()=>{
        //axios
        //    .get("/api/wiki/ewewew/"+props.match.params.id)
        //    .then((Response)=>{
        //        setNumber(Response["data"].map((v,i)=>{
        //            return (<>{v.key} : {v.title}<br/></>)
        //        }))
        //    })
        //    .catch();
    },[]);


    return (<>{number}</>);


}

export default withRouter(Ssssssss)