import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { Button, Radio, Input } from 'antd';

let contents_id;

function LandingPage(props) {

    const { TextArea } = Input;
    
    const [number, setNumber] = useState(0);
    
    useEffect( () => {
        console.log(props.dataSend.lyricReadAll())
        setNumber(1);
    }, []);


    /* 만약 setNumber가 0이 아니라면(데이터가 올바르게 받아졌으면) textarea를 출력한다. */
    return ( 
        0 === number ? 
        <>준비중입니다.</> 
        :
        <>준비중입니다.</>
    );


}

export default withRouter(LandingPage)