


import React, { useEffect,useState  } from 'react'
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function LandingPage(props) {
  	const [value, setValue] = useState('');
    return (
        <ReactQuill 
        	value={value} 
			onChange={props.onChange}
        	style={{height: "200px"}} 
        	theme="snow"
		/>
    )
}

export default withRouter(LandingPage)
