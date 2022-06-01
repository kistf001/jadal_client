import React, { useRef, useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter} 
from "react-router-dom";

import { Row, Col, Button, Radio, DatePicker, Divider,Menu,Dropdown  } from 'antd';
import { Typography, Space,Form,  Checkbox  } from 'antd';

import { Input, Select } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const { Title,Text } = Typography;
const { Option } = Select;

const { TextArea } = Input;


let title_o = "";
let title_t = "";
let composer = "";
let release_date = "";
let release_site = "";
let user_vocalo = "";
let Ancestor = "";
let lyric = "";
let lyric_configuration = "";


function LandingPage(props) {


    const [UserData, setUserData] = useState(0);
    const [Type, setType] = useState("a");


    useEffect( () => { 
        title_o = "";
        title_t = "";
        composer = "";
        release_date = "";
        release_site = "";
        user_vocalo = "";
        Ancestor = "";
        lyric = "";
    }, []);
    

    let templete_lyric = (e) => {

        return (

            "<===INFO===>"

        )

    }
  
    
    let EASY_EDITOR = () =>{

        let adsf = "반드시 적어야하는 항목입니다."

        return(<>
        
            <Form
                name="basic" 
                labelCol={{ span: 4 }} 
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }} 
                onFinish={(fdfdf)=>{console.log(fdfdf);}} 
                onValuesChange={(e)=>{console.log(e)}}
            >

                <Form.Item
                    label="작곡가 이름" name="title_o" rules={[{ required: true, message: adsf }]}
                ><Input defaultValue={title_o}/></Form.Item>

                <Form.Item
                    label="번역된 작곡가 이름" name="title_t" rules={[{ required: true, message: adsf }]}
                ><Input defaultValue={title_t}/></Form.Item>

                <Form.Item name="lyric" label="가사"> <Input.TextArea autoSize={{ minRows: 16 }}/>
                </Form.Item>

                <Form.Item label="가사 형태" name="size"
                    rules={[{ required: true, message: adsf }]}
                >
                    <Radio.Group >
                        <Radio.Button value="1">원어</Radio.Button>
                        <Radio.Button value="2">원어+독음</Radio.Button>
                        <Radio.Button value="3">원어+번역</Radio.Button>
                        <Radio.Button value="4">원어+독음+번역</Radio.Button>
                        <Radio.Button value="5">가사없음</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Button type="primary" block htmlType="submit">저장하고 싱크 편집기로 이동하기</Button>
                
            </Form>
        
        </>);
    }
    let RAW_EDITOR = () => { 

        return (<>
        </>);

    }

    
    return (<>
        <Title>크리에이터 정보 등록하기</Title> 
        <Radio.Group defaultValue={"a"} onChange={(e)=>{setType(e.target.value);}}>
            <Radio.Button value="a">자달 손쉬운 생성기</Radio.Button>
            <Radio.Button value="b">자달 RAW 생성기</Radio.Button>
        </Radio.Group>
        {Type==="a" ? <>{EASY_EDITOR()}</> : <>{RAW_EDITOR()}</>}
    </>);


}


export default withRouter(LandingPage)