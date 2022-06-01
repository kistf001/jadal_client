import React, { useEffect,useState } from 'react'
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter
} from "react-router-dom";
import { Input,Button,Checkbox,Card  } from 'antd';
import { Typography, Divider } from 'antd';

import { Row, Col,  Radio, Menu,Dropdown  } from 'antd';
const { Title, Paragraph, Text } = Typography;

function LandingPage(props) {

    const [UserData, setUserData] = useState();
    const [Titless   , setTitle   ] = useState();
    const [Contents, setContents] = useState();
    const [Page, setPage] = useState();
    
    useEffect( () => {
        axios
            .post(
                '/api/piki',
                {
                    cmd:"post",
                    id:props.match.params.id
                }
            )
            .then((Response)=>{     
                setUserData(
                    Response["data"].contents.split('\n').map( line => {
                        return (<span>{line}<br/></span>);
                    })
                )
                setTitle   (Response["data"].title)
                console.log(Response["data"])
            })
            .catch();
    }, []);


    return ( <> 
        
        <Row>
            <Col flex={1}> <Title>{Titless}</Title> </Col>
            <Col flex={3} style={{textAlign: 'right'}}>
                <Button type="primary" size={13} > 편집하기 </Button>
                <Button type="primary" size={13} > 게시하기 </Button>
                <Button type="primary" size={13} > 게시하기 </Button>
            </Col>
        </Row>

        <br/>
        
        {UserData}
        
    </>);

}

export default withRouter(LandingPage)