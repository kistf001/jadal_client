import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { 
    BrowserRouter as Router,
    Switch, Route, Link, Redirect, withRouter
} from "react-router-dom";

import {Row, Col,  Input, Table,Button,Radio,Tag, Space,Typography  } from 'antd';

const { Title,Text } = Typography;

const { Column, ColumnGroup } = Table;
const { Search } = Input;

let dfdf = 0;

let coadudao = 0;
let PagePublicVar =0
let dsdasdasd = 30;

function LandingPage(props) {

    const [Page, setPage] = useState(PagePublicVar);

    const [UserData, setUserData] = useState();
    const [sort_type, setsort_type] = useState("a");

    const [CCCCC, setCCCCC] = useState();
    
    useEffect( () => {
        coadudao = coadudao + 1
        //console.log("1","List viewer",props.match.params, coadudao);
        loadItem()
    }, [Page,props.match.params]);

    var loadItem = () => {
        axios
            .post(
                "/api/wiki/list",
                {
                    page:Page
                }
            )
            .then((Response)=>{
                PagePublicVar = Page;
                //console.log(Response)
                setCCCCC(Response['data'].map((v,i)=>{
                    return (<>
                        <Row>
                            <Col span={8}>
                                <Link 
                                    style={{
                                        textOverflow: "ellipsis",
                                        whiteSpace  :"nowrap",
                                        overflow     :"hidden",
                                        display      :"block"
                                    }}
                                    to={"/wiki/view/"+v.key}
                                >{v.key} : {v.title_o}</Link>
                            </Col>
                            <Col 
                                span={12}
                                style={{
                                    textOverflow: "ellipsis",
                                    whiteSpace  :"nowrap",
                                    overflow     :"hidden",
                                    display      :"block"
                                }}
                            >{v.title_t}</Col>
                            <Col span={4} style={{textAlign: "right"}}>미리보기</Col>
                        </Row>
                    </>);//
                }));
            })
            .catch();
    };
    

    let handleSubmit = (e) => {
        e.preventDefault();
        setsort_type(e.target.value);
    }

    
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

        <Title>위키:리스트</Title>

        {/* 검색창 */}
        <Col>
            <Row>
                <Search 
                    placeholder="제목 또는 가사를 검색해 보세요" 
                    enterButton 
                />
            </Row>
        </Col>
        
        
        {/* 새노래 등록 버튼 */}
        <Col>
            <Button type="dashed" block onClick={()=>{
                props.history.push("/wiki/generate/song")
            }}> 새로운 노래정보 등록 </Button>
        </Col>
        <Col>
            <Button type="dashed" block onClick={()=>{
                props.history.push("/wiki/generate/creator")
            }}> 크리에이터 등록 </Button>
        </Col>

            
        {/* 목록표시 */}
        <Col>
            <Row>
                
                <Radio.Group value={sort_type} onChange={handleSubmit}>
                    <Radio.Button value="a">최근 추가된 노래</Radio.Button>
                    <Radio.Button value="b">업적</Radio.Button>
                    <Radio.Button value="c">시리즈</Radio.Button>
                    <Radio.Button value="d">발매시기</Radio.Button>
                    <Radio.Button type="secondary" value="e">창작자 목록</Radio.Button>
                </Radio.Group>
            </Row>
        </Col>
        

        {button_set()}
        {/* 게시글 목록표 */}
        <Col>
            {/* <Table dataSource={UserData} size="small" pagination="false">
                <Column
                    title="제목"
                    key="action" dataIndex="title"
                    render={ (text, record) => (
                        <Link to={"/wiki/view/"+record.key}>{record.title}</Link>
                    )}
                />
                <Column title="제작자" dataIndex="age" width="10%"/>
                <Column title="발매일" dataIndex="age" width="10%"/>
            </Table>*/}
            {CCCCC}
        </Col>


        {button_set()}

    </>);

        

}




export default withRouter(LandingPage)
