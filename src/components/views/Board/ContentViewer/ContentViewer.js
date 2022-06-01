import React, { useEffect,useState } from 'react'
import axios from 'axios';
import { withRouter } from "react-router-dom";

import Commneter from './Commenter/Commenter';


import { Typography, Divider } from 'antd';
import { Button } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;


function Laaaaaage(props) {


    const [AAAAA, setAAAAA] = useState('');
    const [PostKey, setPostKey] = useState(0);

    
    //useEffect(() => {
    //    contents_load(props.match.params.contentsKey);
    //})
    useEffect(() => {
        contents_load(props.match.params.contentsKey);
        setPostKey(props.match.params.contentsKey)
        console.log("contents_load",PostKey)
    },[props.match.params.contentsKey])
    
    
    let contents_load =  (ssssssssssss) => {
        axios
            .post('/api/board', {
                command:"contents_request",
                number:ssssssssssss
            })
            .then((Response)=>{
                
                setAAAAA({ 
                    title:Response['data'][0]["title"],
                    contents:Response['data'][0]["contents"],
                    key:ssssssssssss,
                    chage:AAAAA.chage+1
                });

            })
            .catch();
    };

    
    return (<>
        <Typography>
            <Divider />
                <Title>{AAAAA.title}...</Title>
                <Paragraph> {AAAAA.contents} </Paragraph>
            <Divider />
        </Typography>
        {
            props.Auth===0
            ?
                <></>
            :
                props.Auth===true
                ? 
                    /* 글쓰기 버튼 */
                    <>
                        <Commneter contentsNumber={PostKey}></Commneter>
                    </>
                :
                    <p>로그인을 해야 댓글을 쓸수 있음</p>
        }
    </>);


}


export default withRouter(Laaaaaage)
