import React from 'react';
import '../App.css';
import 'antd-mobile/dist/antd-mobile.css';
import axios from 'axios';
import {NavLink} from 'react-router-dom'
import {Carousel, WingBlank} from 'antd-mobile';

export default class Index extends React.Component {
    state = {
        imgHeight: 6.8 + 'rem',
        LBdata: [],
        content: [],
        show: false,
        date: '',
        num: 0,
        before: [],
    }

    componentWillMount() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var strDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var today = year.toString() + month + strDate;
        this.state.date = today

        axios.get('/api/4/news/latest').then((res) => {
            console.log(res)
            this.setState({
                LBdata: res.data.top_stories,
                content: res.data.stories
            })
        })

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

    getweek(time) {
        var week = new Date(time).getDay();
        if (week == 0) {
            week = "星期日";
        } else if (week == 1) {
            week = "星期一";
        } else if (week == 2) {
            week = "星期二";
        } else if (week == 3) {
            week = "星期三";
        } else if (week == 4) {
            week = "星期四";
        } else if (week == 5) {
            week = "星期五";
        } else if (week == 6) {
            week = "星期六";
        }
        return week
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)//监听滚动事件
        // console.log(this.getDate())
    }

    roll(e) {
        clearTimeout(this.timer)//清除定时器，阻止反复触发定时器
        if (window.scrollY === this.state.num && e.nativeEvent.deltaY > 0) {//window.scrollY不变，即页面到了底部，并且滚轮向下滚动
            this.timer = setTimeout(() => {//防抖，节流，
                this.lazy()//调用请求函数
            }, 500)
        }
        this.setState({
            num: window.scrollY
        })
    }

    lazy() {
        axios.get(`api/4/news/before/${this.state.date}`).then((res) => {
            console.log(res)
            this.setState({
                before: this.state.before.concat(res.data),
                date: res.data.date
            })
        })
    }

    name(i) {
        this.props.history.push({
            pathname: "/detail",
            state: {
                sid: i
            }
        })
    }

    render() {
        return (
            <div className='i-wrap' onWheel={(e) => {
                this.roll(e)
            }}>
                <div className='center-wrap' style={{display: this.state.show === true ? 'block' : 'none'}}
                     onClick={(e) => this.back(e)}>
                    <div className='self-center' onClick={(e) => this.stop(e)}>
                        <div className='self-top'>
                            <div className='user'><span><img src="#" alt=""/></span>
                                <strong>开始看</strong>
                            </div>
                            <div className='coll-dow'>
                                <span><img src={require('../assest/img/start.png')} alt=""/></span>
                                <span><NavLink to='/collect'>我的收藏</NavLink></span>
                                <span><img src={require('../assest/img/dowload.png')} alt=""/></span>
                                <span>离线下载</span>
                            </div>
                        </div>
                        <div className='back-index' onClick={this.back.bind(this)}>
                            <span></span>首页
                        </div>
                    </div>
                </div>
                <div className='i-top'>
                    <div><span onClick={this.change.bind(this)}><img src={require('../assest/img/caidan.png')} alt=""/></span>
                        <span onClick={this.lazy.bind(this)}>首页</span>
                    </div>
                    <div><span><img src={require("../assest/img/news.png")} alt=""/></span><span><img
                        src={require('../assest/img/diandian.png')} alt=""/></span></div>
                </div>

                <WingBlank>
                    <Carousel
                        slideWidth={1}
                        autoplay={true}
                        infinite
                        dotActiveStyle={{background: 'white'}}
                    >
                        {this.state.LBdata.map(val => (
                            <a onClick={this.name.bind(this, val.id)}
                               className='i-content'
                               key={val}
                               href={val.url}
                               style={{display: 'inline-block', width: '100%', height: this.state.imgHeight}}
                            >
                                <img
                                    src={val.image}
                                    alt=""
                                    style={{width: '100%', verticalAlign: 'top'}}
                                    onLoad={() => {
                                        // fire window resize event to change height
                                        window.dispatchEvent(new Event('resize'));
                                        this.setState({imgHeight: 6.7 + 'rem'});
                                    }}
                                />
                                <p className='i-title'>{val.title}</p>
                            </a>
                        ))}
                    </Carousel>
                </WingBlank>
                <div className='i-news clearfix'>
                    <h2>今日新闻</h2>
                    <div className='news-wrap'>
                        <ul>
                            {
                                this.state.content.map((val, index) => {
                                    return <li className='clearfix' key={index} onClick={this.name.bind(this, val.id)}>
                                        <NavLink to='/detail'>
                                            <h3>{val.title}</h3>
                                            <div><img src={val.images[0]} alt=""/></div>
                                        </NavLink>
                                    </li>
                                })}
                        </ul>
                    </div>
                </div>
                <div className='before-news' style={{background: '#f3f3f3'}}>
                    {this.state.before.map((value, index) => {
                        return <div><h2 key={index}>{value.date.substr(4, 2)}月{value.date.substr(6, 2)}日&nbsp;&nbsp;{this.getweek(value.date.substr(0, 4)+'-'+value.date.substr(4, 2)+'-'+value.date.substr(6, 2))}</h2>
                            <div className='news-wrap' key={index}>
                                <ul key={index}>
                                    {
                                        this.state.before[index].stories.map((val, ind) => {
                                            return <li className='clearfix' key={ind}
                                                       onClick={this.name.bind(this, val.id)}>
                                                <NavLink to='/detail'>
                                                    <h3>{val.title}</h3>
                                                    <div><img src={val.images[0]} alt=""/></div>
                                                </NavLink>
                                            </li>
                                        })}
                                </ul>
                            </div>
                        </div>
                    })}

                </div>
            </div>

        );
    }
}



