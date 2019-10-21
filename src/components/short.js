import React from 'react'
import axios from 'axios'

export default class Short extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        content: [],
        longContent: [],
        show: false
    }

    // https://news-at.zhihu.com/api/4/story/8997528/long-comments
    componentWillMount() {

        axios.get(`/api/4/story/${this.props.history.location.state.sid}/short-comments`).then(res => {
            // console.log(res.data.comments)
            this.setState({
                content: res.data.comments
            })
        })
        axios.get(`/api/4/story/${this.props.history.location.state.sid}/long-comments`).then(res => {
            // console.log(res.data.comments)
            this.setState({
                longContent: res.data.comments
            })
        })

    }

    change() {
        if (this.state.show === false) {
            this.setState({
                show: true
            })
        } else {
            this.setState({
                show: false
            })
        }

    }
    back() {
        this.props.history.go(-1)
    }

    render() {

        return (
            <div className='remark-wrap'>
                <div className='s-top'>
                    <div className='s-left'>
                        <span onClick={this.back.bind(this)}><img src={require('../assest/img/back.png')}
                                   alt=""/></span><span>{this.state.content.length + this.state.longContent.length}条点评</span>
                    </div>
                    <div className='s-comment'><img src={require('../assest/img/comment.png')} alt=""/></div>
                </div>
                <div className='shortMark' >
                    <div className='pack' onClick={this.change.bind(this)} style={{top: this.state.show === true ? '1.68rem' : ''}}>
                        <span>{this.state.content.length}条短评</span><span><img
                        src={require('../assest/img/pack.png')}
                        alt=""/></span></div>
                    <div className='remark' style={{display: this.state.show === true ? 'block' : 'none'}}>
                        <ul>
                            {this.state.content.map((val, index) => {
                                return (<li key={index} className='clearfix'>
                                    <div className='user-head'><img src={val.avatar} alt=""/></div>
                                    <div className='remark-main'>
                                        <div><span className='author'>{val.author}</span><span className='like-num'><img
                                            className='like' src={require('../assest/img/like.png')} alt=""/>{val.likes}</span>
                                        </div>
                                        <p>{val.content}</p>
                                        <span className='time'>{val.time}</span>
                                    </div>
                                </li>)
                            })}

                        </ul>
                    </div>
                </div>
                <div className='long' style={{display: this.state.show === false ? 'block' : 'none'}}>
                    <div className='pack'><span>{this.state.longContent.length}条长评</span></div>
                    <img style={{display:this.state.longContent.length !==0? 'none':'block' }} src={require('../assest/img/chair.jpg')} alt=""/>
                    <ul style={{display:this.state.longContent.length !==0? 'block':'none' }}>
                        {this.state.longContent.map((val, index) => {
                            return (<li key={index} className='clearfix'>
                                <div className='user-head'><img src={val.avatar} alt=""/></div>
                                <div className='remark-main'>
                                    <div><span className='author'>{val.author}</span><span className='like-num'><img
                                        className='like' src={require('../assest/img/like.png')} alt=""/>{val.likes}</span>
                                    </div>
                                    <p>{val.content}</p>
                                    <span className='time'>{val.time}</span>
                                </div>
                            </li>)
                        })}

                    </ul>
                </div>
            </div>
        )
    }
}
