import React, { useEffect, useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { Row, Col } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import {
  BrowserRouter as Router, Switch, Route, Link, Redirect, NavLink 
} from "react-router-dom";

import LandingPage from '../views/Registration/LandingPage/LandingPage'
import LoginPage from '../views/Registration/LoginPage/LoginPage';
import RegisterPage from '../views/Registration/RegisterPage/RegisterPage';
import MainPage from '../views/MainPage/MainPage';
import Board from '../views/Board/Board';
import Wiki from '../views/Wiki/Wiki';
import Piki from '../views/Piki/Piki';
import Tiki from '../views/Tiki/Tiki';
import Side from '../side/Side.js';
import Auth from '../../hoc/auth'

const { Title } = Typography;
const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;

function Ssssssss(props) {
    
    const [number, setNumber] = useState();

    useEffect( () => { 
    });

    return (
        <Layout style={{backgroundColor:'#BBBBBB',width:"1024px"}}>

            <Router>
            
                <Header className="header">
                    <Menu 
                        theme="dark" 
                        mode="horizontal" 
                        onClick={(v)=>{}}
                        selectedKeys={[]}
                    >
                        <Menu.Item key="/main">메인<Link to="/main" /></Menu.Item>
                        <Menu.Item key="/piki">피키<Link to="/piki"/></Menu.Item>
                        <Menu.Item key="/wiki">위키<Link to="/wiki"/></Menu.Item>
                        <Menu.Item key="/tiki">티키<Link to="/tiki" /></Menu.Item>
                        <Menu.Item key="/board">게시판<Link to="/board"/></Menu.Item>
                        <Menu.Item key="/login">로그인<Link to="/login" /></Menu.Item>
                    </Menu>
                </Header>
            
                <Layout>

                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content
                            className="site-layout-background"
                            style={{ padding: 24, margin: 0, minHeight: 1000 }}
                        >
                            <div>
                                {/* A <Switch> looks through all its children <Route>
                                    elements and renders the first one whose path
                                    matches the current URL. Use a <Switch> any time
                                    you have multiple routes, but you want only one
                                    of them to render at a time */}
                                <Switch>
                                    {/* <Route exact path="/" component={Auth(LandingPage, null )  } />*/}
                                    <Route exact path="/main" component={MainPage} />
                                    <Route path="/wiki" component={Wiki} />
                                    <Route path="/piki" component={Piki} />
                                    <Route path="/tiki" component={Tiki} />
                                    <Route path="/board" component={Board} />
                                    <Route exact path="/login" component={Auth(LoginPage, false) } />
                                    <Route exact path="/register" component={Auth(RegisterPage, false)} />

                                    <Redirect exact path="/*" to="/main" />

                                </Switch>
                            </div>
                        </Content>
                    </Layout>

                    <Sider width={300} className="site-layout-background"> <Side/> </Sider>
                   
                </Layout>
            
                <Footer style={{ textAlign: 'center', height:' 200px' }}>
                    JADAL 2020 
                </Footer>
            
            </Router>
            
        </Layout>
    )
}

export default Ssssssss
