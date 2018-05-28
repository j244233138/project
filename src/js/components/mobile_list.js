import React from 'react';
import {Row,Col} from 'antd';
import {BrowserRouter as Router, Route, Link, browserHistory} from 'react-router-dom'
import Tlodaer from 'react-touch-loader';
export default class MobileList extends React.Component {
	constructor() {
		super();
		this.state = {
			news: '',
			count:5,
			hasMore:0,
			inistializing:1,
			refreshedAt:Date.now()
		};
	}
	componentWillMount() {
		var myFetchOptions = {
			method: 'GET'
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, myFetchOptions).then(response => response.json()).then(json => this.setState({news: json}));
	};
	loadMore(resolve){
		setTimeout(()=>{
			var count = this.state.count;
			this.setState({
				count:count+5,
			})
			var myFetchOptions = {
				method: 'GET'
			};
			fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.state.count, myFetchOptions).then(response => response.json()).then(json => this.setState({news: json}));
			this.setState({
				hasMore:count>0 && count <50
			})
			resolve();
		},2e3)
	}
	componentDidMount(){
		setTimeout(()=>{
			this.setState({
				hasMore:1,
				inistializing:2
			})
		})
	}
	render() {
		const {news} = this.state;
		const newsList = news.length
			? news.map((newsItem, index) => (
        <section key={index} className="m_article list-item special_section clearfix">
          <Router>
          <Link to={`details/${newsItem.uniquekey}`} target="_blank">
            <div className="m_article_img">
              <img src={newsItem.thumbnail_pic_s} alt={newsItem.title} />
            </div>
            <div className="m_article_info">
              <div className="m_article_title">
                <span>{newsItem.title}</span>
              </div>
              <div className="m_article_desc clearfix">
                <div className="m_article_desc_l">
                  <span className="m_article_channel">{newsItem.realtype}</span>
                  <span className="m_article_time">{newsItem.date}</span>
                </div>
              </div>
            </div>
          </Link>
        </Router>
        </section>
			))
			: '没有加载到任何新闻';
			var {hasMore,inistializing,refreshedAt}=this.state;
		return (
			<div>
				 <Row>
           <Col span={24}>
						 <Tlodaer class="main" onLoadMore={this.loadMore.bind(this)} hasMore={hasMore} inistializing={inistializing}>
							 {newsList}
						 </Tlodaer>
           </Col>
         </Row>
			</div>
		);
	};
}
