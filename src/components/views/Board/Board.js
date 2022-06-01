import React, { useEffect,useState } from 'react'
import axios from 'axios';
import {
    BrowserRouter as Router, 
    Switch, Route, Link, Redirect, withRouter
} from "react-router-dom";

import ContentViewer from './ContentViewer/ContentViewer';
import PostEditor from './PostEditor/PostEditor'

import {Row, Col,  Input, Space,Button,Radio,Table, Tag  } from 'antd';

const { Search } = Input;


const { Column, ColumnGroup } = Table;


let board_type;


function LandingPage(props) {


    const [PostList, setPostList] = useState();
    const [Auth, setAuth] = useState(0);


    let board_contents = "";
    

    useEffect( () => {
        console.log(props.match.url);
        board_type = 'free';
        contents_list_load_from_server();
        auth_test();
    }, []);


    let auth_test = () => {
        axios
            .get('/api/users/auth')
            .then((Response)=>{
                console.log('/api/users/auth',Response.data.isAuth)
                setAuth(Response.data.isAuth)
            })
            .catch();
    }


    var contents_list_load_from_server =  () => {
        axios
            .post('/api/board', {command:"list_request",type: board_type} )
            .then((Response)=>{
                console.log(Response['data'])
                setPostList(Response['data'].map((v,k)=>{
                    return({ key: v.key, title: v.title })
                }))
            })
            .catch();
    };
    var contents_send_to_server = (cb) => {
        console.log("board_contents")
        axios
            .post('/api/board', {
                command:"contents_write",
                contents:board_contents,
                type:board_type
            })
            .then((Response)=>{
                //console.log("Response['data']");
                //if(Response['data'].isAuth==false){
                //    alert('로그인해주세요.');
                //} 
                //else {
                //    cb();
                //}
            })
            .catch();
    };


    var handleSubmit = (e) => {
        e.preventDefault();
        board_type = e.target.value;
        contents_list_load_from_server();
    }
    
    let send_post_and_after_action = (e) => {
        console.log(e)
        contents_send_to_server(()=>{contents_list_load_from_server()});
    }

    let PostEditorValueChange = (e) => { 
        board_contents = e  
    }


    /*  */
    var contents_viewer = () => {
        return (<> 
            <Switch> 
                <Route 
                    path={`${props.match.url}/:contentsKey`} 
                    render={() => <ContentViewer Auth={Auth}/>}
                /> 
            </Switch>
        </>)
    }
    var editior = () => {

        return (<> 
            {
                Auth===0
                ?
                    <></>
                :
                    Auth===true
                    ? 
                        /* 글쓰기 버튼 */
                        <>
                            <Button type="primary" onClick={send_post_and_after_action}>글쓰기</Button>
                            <PostEditor onChange = {PostEditorValueChange} />
                        </>
                    :
                        <p>로그인을 해야 글을 쓸수 있음</p>
            }
        </>)
    }


    return (<>


        {/* 검색 */}
        <Search placeholder="제목을 검색하세요." enterButton />


        {/* 게시글 종류 */}
        <Radio.Group defaultValue={board_type} onChange={handleSubmit}>
            <Radio.Button value="free">자유게시판</Radio.Button>
            <Radio.Button value="suggest">제안게시판</Radio.Button>
            <Radio.Button value="discuss">토론게시판</Radio.Button>
            <Radio.Button value="singo">신고게시판</Radio.Button>
        </Radio.Group>


        {/* 포스트 리스트를 불러와서 보여준다. */}
        <Table dataSource={PostList} size="small" pagination="false">
            <Column title="" dataIndex="key" width="10%"/>
            <Column
                title="제목"
                dataIndex="title"
                render={ (text, record) => (
                    <Link to={"/board/"+record.key}>{record.title}...</Link> 
                )}
            />
            <Column title="작성자" dataIndex="key" width="10%"/>
            <Column title="작성일" dataIndex="key" width="10%"/>
        </Table>


        {/* 콘텐츠를 불러와서 보여준다. */}
        {contents_viewer()}


        {/* 에디터 */}
        {editior()}


    </>);

}


export default withRouter(LandingPage)
