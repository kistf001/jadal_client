import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Input,Button,Checkbox  } from 'antd';

const { TextArea } = Input;

/* CORS 이슈의 해결 */
//https://xiubindev.tistory.com/115


//const flasklfd = () =>{ 
//    console.log(daslkfad) 
//    end = new Date();  // 종료
//    console.log(end - start);
//    start = new Date();  // 시작
//}

let daslkfad;

let raw_editor_buffer = 'dsadasdasdqqqqqqqqqq';

let start, end;
    
let contents_id = 0;
    
let next_line_cheack = false;

function LandingPage(props) {


    const { TextArea } = Input;
    const [number, setNumber] = useState(0);
    const [Lyric  , setLyric  ] = useState("");


    useEffect( () => {

        /* 첫번째로 주소를 읽어냄 */
        contents_id = props.match.params.id;

        /* 올바른 값인지 확인함 틀리면 에러 맞다면 다음단계 */
        if (isNaN(contents_id)){//console.log( "숫자가 아닙니다. ");
            return ( <>잘못된 접근입니다.</> );
        } 

        setLyric(props.dataSend.lyricReadMulti(1));
        setNumber(1);

    }, []);


    // 니코동이랑 통신함
    window.addEventListener ( 'message' , ( e ) => {   
        /* reference : https://blog.hayu.io/web/create/nicovideo-embed-player-api/ */
        if ( e.origin === 'https://embed.nicovideo.jp' ) {  
            daslkfad=e.data.data.currentTime/1000;
            //console.log(e.data.data.currentTime,"asdasdsad"); 
        }
    });


    const line_position_prev = () => {
        props.dataSend.lyricPositionPrev()
        setLyric(props.dataSend.lyricReadMulti(1));
        console.log(Lyric)
    }
    const line_position_next = () => {
        props.dataSend.lyricPositionNext()
        setLyric(props.dataSend.lyricReadMulti(1));
        console.log(Lyric)
    }
    const to_zero = () => { 
        props.dataSend.lyricPositionZero(); 
        setLyric(props.dataSend.lyricReadMulti(1)); 
    }


    const return_point = () => {
        line_position_prev();
    }
    const next_point = () => {
        line_position_next();
    }


    const set_start_next_point = () => {
        props.dataSend.lyricWriteTimeStart(daslkfad)
        //timestemp_sec_start[yaya] = second_to_minuite_string(daslkfad);
        if(next_line_cheack){
            line_position_next();
        }
    }
    const set_end_next_point = () => {
        props.dataSend.lyricWriteTimeEnd(daslkfad)
        //timestemp_sec_end[yaya] = second_to_minuite_string(daslkfad);
        if(next_line_cheack){
            line_position_next();
        }
    }


    const nextLine=(e)=>{ next_line_cheack = e.target.checked; }


    //const youtube = (<>
    //    <iframe  
    //        src={"https://embed.nicovideo.jp/watch/"+String(parser_site)+"?jsapi=1"} 
    //        width="100%" height="100%"
    //        frameborder="0" allow="autoplay; encrypted-media" allowFullScreen
    //    >
    //        {window.postMessage}
    //    </iframe>
    //</>);
    const niconico = (<>
        <iframe  
            src={
                "https://embed.nicovideo.jp/watch/"+
                String(props.dataSend.parser_site)+
                "?jsapi=1"
            } 
            width="100%" height="300px"
            frameborder="0" allow="autoplay; encrypted-media" allowFullScreen
        >
        </iframe>
    </>);


    return ( 
        number===1?
        <>

            {niconico}

            <br/><br/>
            시작{Lyric[0][0]}__끝{Lyric[0][1]}<br/>
            {Lyric[0][2]}<br/>
            {Lyric[0][3]}<br/>
            {Lyric[0][4]}

            <br/><br/>
            시작{Lyric[1][0]}__끝{Lyric[1][1]}<br/>
            {Lyric[1][2]}<br/>
            {Lyric[1][3]}<br/>
            {Lyric[1][4]}<br/>

            <Button type="primary" size={13} onClick={set_start_next_point} > 
                시작을 정하고 다음 구절로 
            </Button>
            <Button type="scondery" size={13} onClick={return_point}>이전</Button>
            <Button type="scondery" size={13} onClick={to_zero}>처음위치로</Button>
            <Button type="scondery" size={13} onClick={next_point}>다음</Button>
            <Button type="primary" size={13} onClick={set_end_next_point} > 
                끝점을 정하고 다음 구절로 
            </Button>
            <Checkbox onChange={nextLine}>시간 설정 후 다음줄로</Checkbox>

            <br/><br/>
            시작{Lyric[2][0]}__끝{Lyric[2][1]}<br/>
            {Lyric[2][2]}<br/>
            {Lyric[2][3]}<br/>
            {Lyric[2][4]}<br/><br/>

        </> 
        :
        <></>
    );


}

export default withRouter(LandingPage)