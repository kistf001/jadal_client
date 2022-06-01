import React, { useEffect,useState } from 'react'
import axios from 'axios';
import { 
    BrowserRouter as Router,
    Switch, Route, Link, Redirect, withRouter
} from "react-router-dom";
import { Input,Button,Checkbox,Card  } from 'antd';

import {Row, Col,   Table,Radio,Tag, Space ,Typography } from 'antd';

const { Search } = Input;
const { Title,Text } = Typography;

let datadasda = 0;

function LandingPage(props) {

    const [UserData, setUserData] = useState(0);
    
    useEffect( () => {
        axios
            .post(
                "/api/piki",
                {cmd:"list"}
            )
            .then((Response)=>{
                console.log("useEffect",Response)
                let piki_user_data = Response['data'];
                if(piki_user_data.length!=0){
                    let pud_2_array = piki_user_data.map((v,i)=>{
                        return({ userName:v.name, cNum:v.counter, key:v.key })
                    })
                    console.log(pud_2_array);
                    datadasda = 1; setUserData(pud_2_array);
                }
                else {
                    
                }
            })
            .catch();
    }, []);

    let user_list = (data) => {

        if(data!=0){
            let pud_2_array = [];
            for (var key in data) { 
                pud_2_array.push(<>
                    <Card 
                        title={ <Link to={"/piki/"+data[key].key} >{data[key].userName}</Link> } 
                        style={{}}
                    > {data[key].cNum} {data[key][2]} </Card>
                </>);
            }
            pud_2_array.push(<>
                <Card 
                    title={ <Link to={"/piki/"+1} >알송</Link> } 
                    style={{}}
                >  </Card>
            </>);
            return (pud_2_array);
        }
        
    }

    return ( <>
        <Title>피키:리스트</Title>
    
        {
            datadasda===1?
                <>
                    <Button type="primary" block >유저 추가</Button>
                    <Button type="primary" block >받기</Button>
                
                    <Col><Row><Search placeholder="제목 또는 가사를 검색해 보세요" enterButton /></Row></Col>
                    {user_list(UserData)}

                    <div style={{ display: 'flex', width: '100%', }}>
                        PIKI는 개인번역을 올리는 공간입니다. <br/>
                        PIKI의 가사는 기본적으로 다른 사람이 수정 할 수 없습니다.  <br/>
                        PIKI의 타임싱크의 수정요건 기본 허가 상태는 모두 개방입니다. <br/>
                        PIKI에 게시하기 위해서는 WIKI의 곡정보 데이터가 존재해야 합니다. <br/>
                    </div>
                </>
            :
                <>
                </>
        }
    </>);

}

export default withRouter(LandingPage)