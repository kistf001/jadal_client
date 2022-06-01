import React, { useEffect } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Input,Button,Checkbox ,Typography } from 'antd';

const {Title}=Typography;

function LandingPage(props) {
    return (
        <>
            <Title>티키:리스트</Title>
            
            <div style={{
                display: 'flex',
                width: '100%',
            }}>
                Tiki는 실시간 스트리밍의 중계번역 지원을 위한 것입니다.

            </div>

            
            <Button type="primary" size={13} > 게시하기 </Button>


        </>
    )
}

export default withRouter(LandingPage)