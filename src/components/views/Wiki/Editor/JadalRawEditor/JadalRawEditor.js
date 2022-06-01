import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { Button, Radio, Input } from 'antd';

let contents_id = 0;

function LandingPage(props) {

    const { TextArea } = Input;
    const [number, setNumber] = useState(0);
    
    useEffect( () => {

        /* 첫번째로 주소를 읽어냄 */
        contents_id = props.match.params.id;

        /* 올바른 값인지 확인함 틀리면 에러 맞다면 다음단계 */
        if (isNaN(contents_id)){//console.log( "숫자가 아닙니다. ");
            return ( <>잘못된 접근입니다.</> );
        } 
        
        setNumber(props.dataSend.lyricReadRaw());

    }, []);


    const textarea_refrash = (e) => {
        props.dataSend.lyricWriteRaw(e.target.value)
    };


    /* 만약 setNumber가 0이 아니라면(데이터가 올바르게 받아졌으면) textarea를 출력한다. */
    return ( 
        0 === number ? 
        <>오류가 발생했습니다.</> :
        <> 
            <TextArea defaultValue={number} rows={20} onChange={textarea_refrash} />
        </>
    );


}

export default withRouter(LandingPage)