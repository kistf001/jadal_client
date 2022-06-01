import React, { useRef, useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import {
    BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter
} from "react-router-dom";

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

            "<===INFO===>\n" +
            "title=\n" +
            "other_title=\n" +
            "composer=\n" +
            "release=\n" +
            "site=\n" +
            "<==========>\n" +
            "singer=\n" +
            "site_other=\n" +
            "parent_song=\n" +
            "lyric=\n" +
            "pv=\n" +
            "<==========>\n" +
            "album=\n" +
            "other_contents=\n" +
            "tag=\n" +
            "<==========>\n" +
            "ver=2\n" +
            "<===++++===>\n\n" +

            "[BPM=000.00|TRANS=000.000]\n\n"// +
            
            //"||SEC||0000:00.000->9999:59.999\n" +
            //"||JPO||\n" +
            //"||KRL||\n" +
            //"||KRT||\n" +
            //"||END||\n\n"+
            //
            //"||SEC||0000:00.000->9999:59.999\n" +
            //"||JPO||\n" +
            //"||KRL||\n" +
            //"||KRT||\n" +
            //"||END||\n\n"

        )

    }


    let SEND_SONG_INFORMATION_TO_SERVER = () => {

        if( Type == "a"){
        }

        else if (Type == "b"){
            axios
                .post(
                    "/api/wiki/generate",
                    {contents:lyric}
                )
                .then((Response)=>{
                    console.log(Response);
                    props.history.push('/wiki/view/'+2000);
                })
                .catch();
        }

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
                    label="원제목" name="title_o" rules={[{ required: true, message: adsf }]}
                ><Input defaultValue={title_o}/></Form.Item>

                <Form.Item
                    label="번역 제목" name="title_t" rules={[{ required: true, message: adsf }]}
                ><Input defaultValue={title_t}/></Form.Item>

                <Form.Item
                    label="작곡가" name="composer" rules={[{ required: true, message: adsf }]}
                ><Input defaultValue={composer}/></Form.Item>

                <Form.Item
                    label="발표일" name="release_date" rules={[{ required: true, message: adsf }]}
                ><DatePicker/></Form.Item>

                <Form.Item
                    label="최초 발표 사이트" name="release_url" rules={[{ required: true, message: adsf }]}
                ><Input defaultValue={release_site}/></Form.Item>

                <Form.Item
                    label="사용된 보컬로이드" name="singer"
                ><Input /></Form.Item>

                <Form.Item
                    label="재게제 영상 주소" name="release_url_other"
                ><Input /></Form.Item>

                <Form.Item
                    label="조상이 되는 노래" name="ancestor"
                ><Input /></Form.Item>

                <Form.Item name="lyric" label="가사">
                    <Input.TextArea autoSize={{ minRows: 16 }} />
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

        let asdfklaf = templete_lyric().split("\n").map((v,i)=>{
            if(v.match(/^title=/)) { return v.replace(/title=.*/,"title="+title_o)+"\n"}
            else if(v.match(/^other_title=/)) { return v.replace(/^other_title=.*/,"other_title="+title_t)+"\n"}
            else if(v.match(/^composer=/)) { return v.replace(/^composer=.*/,"composer="+composer)+"\n"}
            else if(v.match(/^release=/)) { return v.replace(/^release=.*/,"release="+release_date)+"\n"}
            else if(v.match(/^site=/)) { return v.replace(/^site=.*/,"site="+release_site)+"\n"}
            else { return v +"\n" }
        }).join("")
        
        if(lyric!=""){
            lyric = (lyric+"\n").replace(/\n\n*/g,"\n").split("\n").map((v,i)=>{
                     if ( (i%3)==0 ){ return "||KRO||" + v + "\n" }
                else if ( (i%3)==1 ){ return "||KRL||" + v + "\n" }
                else if ( (i%3)==2 ){ return "||KRT||" + v + "\n" }
            }).join("")
        }
        else {
            asdfklaf = (
                asdfklaf + 
                "||SEC||0000:00.000->9999:59.999\n||JPO||\n||KRL||\n||KRT||\n||END||\n\n"
            );
        }

        lyric = asdfklaf

        return (<>
            <TextArea autoSize 
                defaultValue={asdfklaf} rows={20}
                onChange={(e)=>{lyric = e.target.value}}
            />
            
            <Button type="primary" onClick={SEND_SONG_INFORMATION_TO_SERVER} 
                block>저장하고 싱크 편집기로 이동하기</Button>
        </>);

    }

    
    return (<>
        <Title>노래 정보 등록하기</Title> 
        <Radio.Group defaultValue={"a"} onChange={(e)=>{setType(e.target.value);}}>
            <Radio.Button value="a">자달 손쉬운 생성기</Radio.Button>
            <Radio.Button value="b">자달 RAW 생성기</Radio.Button>
        </Radio.Group>
        {Type==="a" ? <>{EASY_EDITOR()}</> : <>{RAW_EDITOR()}</>}
    </>);


}


export default withRouter(LandingPage)