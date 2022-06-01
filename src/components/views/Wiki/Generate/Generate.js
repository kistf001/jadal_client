import React, { useRef, useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import {
    BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter
} from "react-router-dom";

import { Row, Col, Button, Radio, DatePicker, Divider,Menu,Dropdown  } from 'antd';
import { Typography, Space,Form,  Checkbox  } from 'antd';

import { Input, Select } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import Song from './Song/Song';
import Creater from './Creater/Creater';

const { Title,Text } = Typography;
const { Option } = Select;

const { TextArea } = Input;


function LandingPage(props) {


    const [UserData, setUserData] = useState(0);
    //const [Type, setType] = useState("a");


    useEffect( () => { 

        console.log(props.match.params.id)
        setUserData(props.match.params.id)
    }, []);
    
    
    return (<>{
    
        UserData==="song"?
        <><Song/></>
        :
        <><Creater/></>
    
    }</>);


}


export default withRouter(LandingPage)