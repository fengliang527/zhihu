import React from 'react'
import axios from 'axios'
import '../assest/css/style.css'
import {NavLink} from 'react-router-dom'

export default class Detail extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        content: '',
        show: false,
        title: '',
        image: '',
        liek: 0,
        long: 0,
        short: 0,
        yellowStart: false,
    }

    componentWillMount() {
        axios.get('/api/4/news/' + this.props.history.location.state.sid).then(
            res => {
                console.log(res)
                this.setState({
                    content: res.data,
                    title: res.data.title,
                    image: res.data.image

                })
            }
        )
        axios.get(`/api/4/story/${this.props.history.location.state.sid}/short-comments`).then(res => {
            // console.log(res.data.comments)
            this.setState({
                short: res.data.comments.length
            })
        })
        axios.get(`/api/4/story/${this.props.history.location.state.sid}/long-comments`).then(res => {
            // console.log(res.data.comments)
            this.setState({
                long: res.data.comments.length
            })
        })
        for (var i = 0; i < localStorage.length; i++) {
            if (Number(localStorage.key(i)) === this.props.history.location.state.sid) {
                this.setState({
                    yellowStart: true
                })
            }
            console.log(this.state.yellowStart)
        }
    }

    back() {
        this.props.history.go(-1)
    }

    change() {
        if (this.state.show) {
            this.setState({
                show: false
            })
        } else {
            this.setState({
                show: true
            })
        }
        console.log(this.state.show)
    }

    stop(e) {
        e.stopPropagation()
    }

    save(i) {
        if (this.state.yellowStart === true) {
            localStorage.removeItem(this.props.history.location.state.sid)
        } else {
            localStorage.setItem(this.props.history.location.state.sid, JSON.stringify({
                title: this.state.title,
                image: this.state.image,
                id: this.props.history.location.state.sid
            }))
        }
        this.props.history.push({
            pathname: '/collect',
            state: {sid: this.props.history.location.state.sid}
        })
    }

    toShort() {
        this.props.history.push({
            pathname: '/short',
            state: {sid: this.props.history.location.state.sid}
        })
    }

    render() {
        return (
            <div>
                <div className='top-wrap'>
                    <div className='d-top'>
                        <div className='d-back' onClick={this.back.bind(this)}><img
                            src={require("../assest/img/back.png")} alt=""/></div>
                        <div className='d-top-right'>
                            <span onClick={this.change.bind(this)}><img src={require("../assest/img/share.png")}
                                                                        alt=""/></span>
                            <span onClick={this.save.bind(this)}><NavLink to='/collect'/><img
                                src={this.state.yellowStart === false ? require("../assest/img/start.png") : require("../assest/img/yellowStart.png")}
                                alt=""/></span>
                            <span className='d-remark' onClick={this.toShort.bind(this)}><NavLink to='/short'/><img
                                src={require("../assest/img/newsss.png")}
                                alt=""/>{this.state.long + this.state.short}</span>
                            <span><img src={require("../assest/img/good.png")} alt=""/></span>
                        </div>
                    </div>
                </div>
                <div>
                    <div id='img-place-holder'><img src={this.state.content.image} alt=""/></div>
                    <div dangerouslySetInnerHTML={{__html: this.state.content.body}}/>
                    {/*  html前面是双下划线  1.dangerouslySetInnerHTMl 是React标签的一个属性，类似于angular的ng-bind；
                        2.有2个{{}}，第一{}代表jsx语法开始，第二个是代表dangerouslySetInnerHTML接收的是一个对象键值对;
                        3.既可以插入DOM，又可以插入字符串；*/}
                </div>
                <div className='d-bg' onClick={this.change.bind(this)}
                     style={{display: this.state.show === true ? 'block' : 'none'}}>
                    <div className='share' onClick={(e) => this.stop(e)}>
                        <span className='share-title'>分享</span>
                        <div className='share-tag'>
                            <img src={require("../assest/img/share-tag.png")} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}