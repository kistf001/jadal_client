import React, { useRef, useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import {
    BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter
} from "react-router-dom";

import { Row, Col, Button, Radio, Divider,Menu,Dropdown  } from 'antd';
import { Typography, Space  } from 'antd';

import PikiListing from './PikiListing/PikiListing'

import {User}  from '../../../utillity/ContentsParser'

const { Title,Text } = Typography;

let parsedLyric;

let aaawwweee;

function LandingPage(props) {


    const [Num, setNum] = useState(0);
    const [VideoElementSize, setVideoElementSize] = useState([0,1,1]);
    const [VideoCoveredElementSize, setVideoCoveredElementSize] = useState([0,1,1]);
    const [lyrrr, setlyrrr] = useState(0);
    const [Date, setDate] = useState(0);


    useEffect( () => {
        lyric_show_loop();
        parsedLyric = null;
        parsedLyric = new User();
        console.log("1","document viewer",props.match.params);
        setlyrrr(["","","","","","",])
        lyricDataLoader_wiki();
        return () => { 
            parsedLyric = null; 
            clearInterval(interval1); 
            clearInterval(interval2);
        };
    }, [props.match.params]);


    var lyricDataLoader_user = () => {
        axios
            .get("/api/wiki/other/"+props.match.params.id)
            .then((Response)=>{
            })
            .catch();

    }
    var lyricDataLoader_wiki = () => {
        axios
            .get("/api/wiki/view/"+props.match.params.id)
            .then((Response)=>{
                parsedLyric.name(Response['data'][0])
                setDate(Response['data'][1])
                aaawwweee = parsedLyric.lyricReadAll();
                //console.log("lyricDataLoader_wiki",parsedLyric);
                setNum(Num+1);
            })
            .catch();
    }
    var like = () => {
        axios
            .post("/api/wiki/like",{
                flag:true,
                id:props.match.params.id
            })
            .then((Response)=>{
            })
            .catch();
    }
    var like_cancle = () => {
        axios
            .post("/api/wiki/like",{
                flag:false,
                id:props.match.params.id
            })
            .then((Response)=>{
            })
            .catch();
    }


    /* 가사 보여주는 부분 */
    var interval1, interval2;
    var lyric_show_loop= () => { 
        interval1 = setInterval(()=>{ 
            lyric_Vieweer(); 
        },200) 
    }
    const measuredRef1 = useCallback(node => {
        if (node !== null) { 
            setVideoElementSize([
                node.getBoundingClientRect().left,
                node.getBoundingClientRect().top ,
                node.getBoundingClientRect().width
            ])
        }
    }, []);
    const measuredRef2 = useCallback(node => {
        if (node !== null) { 
            setVideoCoveredElementSize([
                node.getBoundingClientRect().left,
                node.getBoundingClientRect().top
            ])
        }
    }, []);
    let daslkfad = 0, gggggggg = 0, timecount = 0, adfadf = -1;
    var LYRIC_SHOW_HTML = (<> 
        <div style={
            {
                position: "absolute",
                zIndex:"2147483647",
                color:"#FFFFFF",
                top: VideoElementSize[1]-VideoCoveredElementSize[1]+340+"px",
                left: VideoElementSize[0]-VideoCoveredElementSize[0]+"px",
                width: VideoElementSize[2]+"px",
                display: 'flex', 
                textAlign: "center",
                flexDirection: 'column',
                justifyContent: 'flex-start'
            }
        }>
            <div> <span style={{backgroundColor:"#000000"}}> {lyrrr[2]} </span> </div>
            <div> <span style={{backgroundColor:"#000000"}}> {lyrrr[3]} </span> </div>
            <div> <span style={{backgroundColor:"#000000"}}> {lyrrr[4]} </span> </div>
        </div>
    </>);    
    var LYRIC_SHOW_HTML2 = (<> 
        <div style={
            {
                position: "fixed",
                zIndex:"2147483647",
                color:"#FFFFFF",
                top: "80%",
                left: "0%",
                fontSize: "250%",
                width: "100%",
                pointerEvents: "none",
                display: 'flex', 
                textAlign: "center",
                flexDirection: 'column',
                justifyContent: 'flex-start'
            }
        }>
            <div> <span style={{backgroundColor:"#000000"}}> {lyrrr[2]}wew </span> </div>
            <div> <span style={{backgroundColor:"#000000"}}> {lyrrr[3]}wew </span> </div>
            <div> <span style={{backgroundColor:"#000000"}}> {lyrrr[4]}wew </span> </div>
        </div>
    </>);
    var lyric_Vieweer = () => {

        if(daslkfad!=gggggggg){
            timecount = 0; gggggggg = daslkfad;
            for (let i in aaawwweee) {
                // 만약 시작값보다 작다면 빈칸만들고 던짐
                if(daslkfad<aaawwweee[i][5]){ 
                    if(adfadf!=-2) {setlyrrr(["","","","","","",]); adfadf = -2;}
                    break; 
                } 
                //만약 끝 값보다 작다면 채움
                else if(daslkfad<aaawwweee[i][6]){
                    if(adfadf!=i) {setlyrrr(aaawwweee[i]); adfadf = i; }
                    break;
                }
            }
        } 
        
        else {
            timecount++;
            if(timecount>6){ if(adfadf!=-2) {setlyrrr(["","","","","","",]); adfadf = -2;}}
        }

    }


    /* 니코동이랑 통신 */
    window.addEventListener ( 'message' , ( e ) => {   
        /* reference : https://blog.hayu.io/web/create/nicovideo-embed-player-api/ */
        if ( e.origin === 'https://embed.nicovideo.jp' ) {  
            daslkfad=e.data.data.currentTime/1000;//console.log(daslkfad,"asdasdsad"); 
        }
    });


    const contents_html_maker = () => {//console.log("contents_html_maker()");

        const youtube_parser = (<>
            <iframe  ref={measuredRef1}
                src={"https://embed.nicovideo.jp/watch/"+parsedLyric.parser_site+"?jsapi=1"}
                width="640px" height="480px" frameborder="0" 
                allow="autoplay; encrypted-media"
            />
        </>);
        const TIME_LYRIC_OLT = aaawwweee.map((v,index)=>{
            return (<> {v[0]}{"=>"}{v[1]}<br/>{v[2]}<br/>{v[3]}<br/>{v[4]}<br/><br/> </>);
        });


        return (<>
            <div ref={measuredRef2} >
                
                {LYRIC_SHOW_HTML}
                {/*LYRIC_SHOW_HTML2*/}
                    
                    <Title>
                        {String(
                            String(parsedLyric.parser_oTitle).match(/\[\[KR\]\].*\n/,"")
                        ).split(",").map((v,index)=>{
                            if (v.match(/\[\[KR\]\]/)) { return v.replace(/\[\[KR\]\]/,"") }
                        })}
                    </Title> 
                <Row>
                    <Col flex={1} > 
                    </Col>
                    
                    {/*https://stackoverflow.com/questions/
                        32030050/how-can-you-float-right-in-react-native*/}
                    <Col flex={3} style={{textAlign: 'right'}}>
                        <Button type="primary" onClick={()=>{
                            like()
                        }}>좋아요</Button>
                        <Button type="primary" onClick={()=>{
                            props.history.push('/wiki/relation/'+props.match.params.id);
                        }}>관계도</Button>
                        <Button type="primary" onClick={()=>{
                            props.history.push('/wiki/discuss/'+props.match.params.id);
                        }}>토론</Button>
                        <Button type="primary" onClick={()=>{
                            props.history.push('/wiki/edit/'+props.match.params.id);
                        }}>편집</Button>
                        <Button type="primary" onClick={()=>{
                            props.history.push('/wiki/history/'+props.match.params.id);
                        }}>역사</Button>
                        
                        <Dropdown.Button overlay={()=>{
                            return(<>
                                <Menu>
                                    <Menu.Item key="1">1st item</Menu.Item>
                                    <Menu.Item key="2">2nd item</Menu.Item>
                                    <Menu.Item key="3">3rd item</Menu.Item>
                                </Menu>
                            </>)
                        }}>언어선택</Dropdown.Button>
                    </Col>
                </Row>

                <Row>
                    <Col flex={1} > 
                        (원제:{String(parsedLyric.parser_title).replace(/title=|\n/,"")})
                    </Col>
                    <Col flex={3} style={{textAlign: 'right'}}> 최근 수정 시각: {Date} </Col>
                </Row>

                <br/>
                
                <Row> <Col> {youtube_parser} </Col> </Row>
                <Button 
                    type="primary" 
                    size={13} 
                    onClick={()=>{
                        console.log("ASfa");
                    }}
                >크게보기 (준비중)</Button> 
                
                <Row> <PikiListing/> </Row>
                
                <Row> {TIME_LYRIC_OLT} </Row>

                <Divider></Divider>

                {/* 주석을 표시함 */}
                <Row> </Row>
                
            </div>
        </>);
    
    };


    return ( Num > 0 ? contents_html_maker() : <></> );


}


export default withRouter(LandingPage)