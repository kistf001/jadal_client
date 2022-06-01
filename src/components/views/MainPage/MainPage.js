import React, { useEffect,useState } from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Layout, Menu, Breadcrumb,Typography } from 'antd';
import DeleteIcon from './icon/youtube.svg'

const { Header, Content, Sider } = Layout;
const { Title,Text } = Typography;


function RegisterPage(props) {

    const [RankingList, setRankingList] = useState(0);

    useEffect( () => {
        axios
            .post(
                '/api/ranking/list'
            )
            .then((Response)=>{ 
                setRankingList(Response['data'])
                //console.log(RankingList)    
            })
            .catch();
    }, []);

    let ranking_item = ()=>{
        if(RankingList!=0){
            let buffer = RankingList.map((v,i)=>{
                return(<>
                    <tr>
                        <td>{v.rank}</td>
                        <td>
                            {v.title}
                            <td>{v.published}</td>
                            <td>{v.composer}</td>
                        </td>
                        <td>
                            <a href={v.url} target="_blank">
                                <img src={DeleteIcon} />
                            </a>
                        </td>
                    </tr>
                </>)
            });
            return (<>
                <table border="4">
                    <tr>
                        <td>순위</td>
                        <td>노래명</td>
                        <td>듣기</td>
                    </tr>
                    {buffer}
                </table>
            </>)
        }
    }
    
    return (
            //<Layout>주간랭킹구, 아따라시이 교꾸를 소개함, 소스는 미쿠디비 적극활용</Layout>
        <>

            <Title>메인</Title>

            <Layout>
                <video controls name="media">
                    <source src="/api/video" type="video/mp4"/>
                </video>
            </Layout>

            <Layout>
                <h2>
                    랭킹정보의 원출저는 
                    <a href={"https://vocaloard.injpok.tokyo"} target="_blank">
                        https://vocaloard.injpok.tokyo
                    </a> 
                    입니다.
                </h2>
            </Layout>
            
            <Layout>
                {ranking_item()}
            </Layout>
        
        </>
    )

}

export default withRouter(RegisterPage)
