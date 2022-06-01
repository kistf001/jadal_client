import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { Button, Radio, Input } from 'antd';

import RawEditor from './JadalRawEditor/JadalRawEditor'
import TimeStamper from './JadalTimeStamper/JadalTimeStamper'
import LyricEditor from './JadalLyricEditor/JadalLyricEditor'

import {User, sayBye}  from '../../../utillity/ContentsParser'

let asdfadf ;
let contents_id;
function LandingPage(props) {

    const { TextArea } = Input;
    const [EditorType, setEditorType] = useState("RAW");
    const [Ready, setReady] = useState(0);

    useEffect(() => {


        asdfadf = new User();


        /* 첫번째로 주소를 읽어냄 */
        contents_id = props.match.params.id;
        
        
        /* 올바른 값인지 확인함 틀리면 에러 맞다면 다음단계 */
        if (isNaN(contents_id)){ //console.log( "숫자가 아닙니다. ");
            return ( <>잘못된 접근입니다.</> )
        } 
    
    
        /* 해당 주소를 이용해 엑시오스를 통해서 위키콘텐츠를 가져옴 */
        load_lyric_data()

    }, [])

    
    const handleSizeChange = e => {
        setEditorType(e.target.value); //console.log(e.target.value);
    };

    const load_lyric_data = () =>{
        axios
            .get("/api/wiki/view/"+contents_id)
            .then((Response)=>{
                let raw_editor_buffer;
                raw_editor_buffer = Response["data"][0];
                asdfadf.name(raw_editor_buffer)
                console.log(asdfadf.lyricReadMulti(1))
                setReady(1);
            })
            .catch();
    }
    const send_modified_data = () =>{
        
        asdfadf.timeSave();
        //console.log(asdfadf.cheackAndThrow())
        if(asdfadf.cheackAndThrow()!=null){
            axios
            .post("/api/wiki/edit",{
                lastContents:asdfadf.cheackAndThrow(),
                contentsId:props.match.params.id
            })
            .then((Response)=>{
                console.log(Response["data"])
            })
            .catch();
        }
        props.history.push("/wiki/view/"+props.match.params.id)
        
    }


    return (
        Ready===1?
        <>
            <Radio.Group defaultValue={"RAW"} onChange={handleSizeChange} >
                <Radio.Button value="RAW">RAW 에디터</Radio.Button>
                <Radio.Button value="default">자달타임스템퍼</Radio.Button>
                <Radio.Button value="small">자달가사편집기</Radio.Button>
            </Radio.Group>
            {EditorType==='RAW'? <RawEditor dataSend={asdfadf}/>:<></>}
            {EditorType==='default'? <TimeStamper dataSend={asdfadf}/>:<></>}
            {EditorType==='small'? <LyricEditor dataSend={asdfadf}/>:<></>}
            <Button type="primary" size={13} onClick={send_modified_data}> 저장 </Button>
        </>
        :
        <>
        </>
    );


}

export default withRouter(LandingPage)