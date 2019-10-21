import React from 'react';
import './App.css';
import 'antd-mobile/dist/antd-mobile.css';
import {Carousel, WingBlank} from 'antd-mobile';
import Index from "./components/index";
import Router from "./router";
class App extends React.Component {
        render() {
            return(
                <div><Router/></div>

            )
        }
}


export default App;
