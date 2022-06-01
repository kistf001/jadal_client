import React, { createElement, useState,useEffect } from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";

import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

class App extends React.Component {


    state = {
        comments: [],
        submitting: false,
        value: ''
    };
    

    load_comment = async (contentsNumber) => {
        this.state.comments = []
        axios
            .post('/api/board', {
                command:"comment_request",
                number:contentsNumber
            })
            .then((Response)=>{
                //console.log(""), console.log(""), console.log("");
                //console.log("commtenter");

                if(Response['data'].length>0){
                    
                    // 카운트를 돌면서 
                    let data_counter = 0;
                    while(Response['data'].length>data_counter){
                        console.log(Response['data'][data_counter]);
                        this.setState({comments: [
                            ...this.state.comments,
                            {
                                author: Response['data'][data_counter].user,
                                content: <p>{Response['data'][data_counter].contents}</p>,
                                datetime: Response['data'][data_counter].date
                            },
                        ],});

                        data_counter++;
                    }
                }

            })
            .catch();

    };
    send_comment = async (contentsNumber) => {

        console.log({
            command:"comment_write",
            number:contentsNumber,
            comment:"dssdsd"
        })
        
        axios
            .post('/api/board', {
                command:"comment_write",
                number:contentsNumber,
                comment:this.state.value
            })
            .then((Response)=>{
                //console.log(""), console.log(""), console.log("");
                //console.log("commtenter");
                //console.log(Response['data']['results']);
            })
            .catch();
    }


    constructor(props) { 
        super(props); 
        this.load_comment(Number(this.props.contentsNumber));
        //console.log("constructor(props) ",props.contentsNumber)
    }


    /* 댓글 불러오기 */
    //componentDidMount() { }
    componentDidUpdate(prevProps) { 
        if (this.props.contentsNumber !== prevProps.contentsNumber) {
            this.load_comment(Number(this.props.contentsNumber));
            //console.log(
            //    "componentDidUpdate(state) ",
            //    prevProps.contentsNumber,
            //    this.props.contentsNumber
            //)
        }
    }


    /* 에디터 파트 */ 
    handleSubmit = (ddddd) => {

        //console.log(ddddd);
        
        if (!this.state.value) {
            return;
        }
        
        this.send_comment(this.props.contentsNumber)

        // 버튼을 빙글빙글로 만든다.
        this.setState({
            submitting: true,
        });

        // 서버에 등록 될 때까지 빙글빙글로 만들고
        setTimeout(() => {
            this.load_comment(this.props.contentsNumber)
            this.setState({
                submitting: false,
                value: '',
                //comments: [
                //...this.state.comments,
                //    {
                //        author: 'Han Solo',
                //        //avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                //        content: <p>{this.state.value}</p>,
                //        datetime: moment().fromNow(),
                //    },
                //],
            });
        }, 1000);
        
    };

    handleChange = e => {
        console.log(e);
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const { comments, submitting, value } = this.state;
        return (<>
            {comments.length > 0 && <CommentList comments={comments} />}
            <Comment
                avatar={
                    <Avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        alt="Han Solo"
                    />
                }
                content={
                    <Editor
                        onChange={this.handleChange}
                        onSubmit={this.handleSubmit}
                        submitting={submitting}
                        value={value}
                    />
                }
            />
        </>);
    }
    
}


export default withRouter(App);





