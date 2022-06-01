import React, { useEffect,useState } from 'react'
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter
} from "react-router-dom";
import { Checkbox,Card  } from 'antd';
import {Row, Col,  Input, Table,Button,Radio,Tag, Space  } from 'antd';
const { Search } = Input;

let fkdfklf =0
let dsdasdasd = 30;

function LandingPage(props) {

    const [UserData, setUserData] = useState();
    const [Page, setPage] = useState(fkdfklf);

    
    useEffect( () => {
        axios
            .post(
                "/api/piki",
                {
                    id:props.match.params.ad, 
                    cmd:"users", 
                    page:Page
                }
            )
            .then((Response)=>{
                console.log(props.match.params.ad);
                console.log(Response['data']);
                console.log(Response['data'].length);
                dsdasdasd = Response['data'].length
                if(dsdasdasd!=0){

                    fkdfklf = Page
                    
                    setUserData(Response['data'].map((v,i)=>{
                        return <> 
                        <Row>
                            <Col span={16}><Link to={props.match.url+"/"+v.key}>{v.title}</Link></Col>
                            <Col span={8} style={{textAlign: "right"}}>{v.date_p}</Col>
                        </Row>
                    </>}))
                }
                else { }
            })
            .catch();
    }, [props.match.params.id,Page]);


    let button_set = (e) => {
        return (<>
        <Button 
            type="primary" 
            onClick={()=>{
                if(Page>0){
                    setPage(Page-1)
                }
            }}
        >이전 페이지</Button>

        <Button 
            type="primary" 
            onClick={()=>{
                setPage(0);
            }}
        >처음으로</Button>

        <Button 
            type="primary" 
            onClick={()=>{
                if(30==dsdasdasd){
                    setPage(Page+1);
                }
            }}
        >다음 페이지</Button>
        
        </>);
    }

    
    return ( <>
        <Search placeholder="제목 또는 가사를 검색해 보세요" enterButton />
        {button_set()}
        {UserData}
        {Page}<br/>
        {button_set()}
    </>);


}

export default withRouter(LandingPage)