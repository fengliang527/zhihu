import React from 'react'
import {NavLink} from "react-router-dom";
var str = []
export default class Collect extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        content: [],
        show:false
    }

    componentDidMount() {
        str=[]
        for (var i=0; i<localStorage.length; i++) {
            if (str.includes(JSON.parse(localStorage.getItem(localStorage.key(i))))===false){
                str.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
            }
        }
        this.setState({
            content:str
        })
        console.log(str)
    }
    name(i){
        this.props.history.push({pathname:"/detail",
            state:{
                sid:i
            }})
    }
    change() {
        this.setState({
            show: true
        })
    }

    stop(e) {
        e.stopPropagation()
    }

    back(e) {
        this.setState({
            show: false
        })

    }
    render() {
        return (
            <div className='c-bg'>
                <div className='c-top'>
                    < img onClick={this.change.bind(this)} src={require('../assest/img/caidan.png')} alt=""/>
                    <span>{localStorage.length}条收藏</span>
                </div>
                <div className='i-news'>
                    <div className='news-wrap'>
                        <ul>
                            {
                                str.map((val, index) => {
                                    return (<li className='clearfix' key={index} onClick={this.name.bind(this,val.id)}>
                                        <NavLink to='/detail'>
                                            <h3>{val.title}</h3>
                                            <div><img src={val.image} alt=""/></div>
                                        </NavLink>
                                    </li>)
                                })}
                        </ul>
                    </div>
                </div><div className='center-wrap' style={{display: this.state.show === true ? 'block' : 'none'}}
                           onClick={(e) => this.back(e)}>
                <div className='self-center' onClick={(e) => this.stop(e)}>
                    <div className='self-top'>
                        <div className='user'><span><img src="#" alt=""/></span>
                            <strong>开始看</strong>
                        </div>
                        <div className='coll-dow'>
                            <span onClick={(e) => this.back(e)}><img src={require('../assest/img/start.png')} alt=""/></span>
                            <span onClick={(e) => this.back(e)}>我的收藏</span>
                            <span><img src={require('../assest/img/dowload.png')} alt=""/></span>
                            <span>离线下载</span>
                        </div>
                    </div>
                    <NavLink to='/index'>
                    <div className='back-index' onClick={this.back.bind(this)}>
                        <span></span>首页
                    </div>
                    </NavLink>
                </div>
            </div>

            </div>
        )
    }
}