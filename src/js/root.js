import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route,HashRouter} from 'react-router-dom';
import {Button} from 'antd';
import PCIndex from './components/pc_index';
import PCNewsDetails from './components/pc_news_details';
import MobileNewsDetails from './components/mobile_news_details';
import MobileIndex from './components/mobile_index';
import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive';
import PCUserCenter from './components/pc_usercenter'
import MobileUsercenter from './components/mobile_usercenter'
export default class Root extends React.Component {
	render() {
		return (
			<div>
				<MediaQuery query='(min-device-width: 1224px)'>
					<HashRouter>
            <Switch>
  						<Route exact path="/" component={PCIndex}></Route>
  						<Route path="/details/:uniquekey" component={PCNewsDetails}></Route>
							<Route path="/usercenter" component={PCUserCenter}></Route>
						</Switch>
          </HashRouter>
				</MediaQuery>
				<MediaQuery query='(max-device-width: 1224px)'>
          <HashRouter>
            <Switch>
              <Route path="/" component={MobileIndex}></Route>
							<Route path="/details/:uniquekey" component={MobileNewsDetails}></Route>
							<Route path="/usercenter" component={MobileUsercenter}></Route>
						</Switch>
          </HashRouter>
				</MediaQuery>
			</div>
		);
	};
}
ReactDOM.render(
	<Root/>, document.getElementById('mainContainer'));
