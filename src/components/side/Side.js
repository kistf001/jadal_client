import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Layout, Menu, Breadcrumb,Space, Card } from 'antd';
import {
    BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter
} from "react-router-dom";


const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;


function Ssssssss(props) {

    const [number, setNumber] = useState("1");
    const [number2, setNumber2] = useState("1");
    
    useEffect( () => {
        console.log(props)
        daslkfa();
        var aklakfl = setInterval(() => {daslkfa();}, 10000);
        return (()=>{ clearInterval(aklakfl) })
    }, []);


    var daslkfa = () => {
        axios
        .post("/api/modifiedCheack")
        .then((Response)=>{
            //console.log("modifiedCheack",Response)
            // 최근 수정된 위키 내역
            setNumber(Response.data[0].map((v,i)=>{
                return (<>
                    <div 
                        style={{
                            textOverflow : "ellipsis",
                            whiteSpace : "nowrap",
                            overflow : "hidden",
                            display : "block"
                        }}
                    >
                        {v.date} <Link to={"/wiki/view/"+v.key}>{v.title}  ...</Link> <br/>
                    </div>
                </>)
            })); console.log();
            // 최근 추가된 위키 내역
            setNumber2(Response.data[1].map((v,i)=>{
                return (<>
                    <div 
                        style={{
                            textOverflow : "ellipsis",
                            whiteSpace : "nowrap",
                            overflow : "hidden",
                            display : "block"
                        }}
                    >
                        {v.date} <Link to={"/wiki/view/"+v.key}>{v.title}  ...</Link> <br/>
                    </div>
                </>)
            })); console.log();
        })
        .catch();
    }


    return (
        <>


            <Content
                className="site-layout-background"
                style={{
                    margin: '0px 16px',
                    minHeight: 280,
                    backgroundColor:"#FFFFFF"
                }} >최근 수정된 위키<br/>{number}</Content>

            <Content
                className="site-layout-background"
                style={{
                    margin: '24px 16px',
                    minHeight: 280,
                    backgroundColor:"#FFFFFF"
                }} >최근 추가된 위키<br/>{number2}</Content>


        </>
    )
}

export default withRouter(Ssssssss)