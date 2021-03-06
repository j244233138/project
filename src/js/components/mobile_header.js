import React from 'react';
import { Row, Col } from 'antd';
import { Menu, Icon, message, Form, Input, Button, CheckBox, Modal, Tabs } from 'antd';
const FromItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
import {Link,Router, Route, browserHistory} from 'react-router-dom'

class MobileHeader extends React.Component{
  constructor(){
    super();
    this.state={
      current: 'top',
      modalVisible:false,
      action:'login',
      hasLogined:false,
      userNickName:'',
      userid:0
    }
  }
  setmodalVisible(value){
    this.setState({
      modalVisible:value
    })
  }
  componentWillMount(){
    if(localStorage.userid!=''){
      this.setState({hasLogined:true});
      this.setState({userNickName:localStorage.userNickName,userid:localStorage.userid})
    }
  }
  handleClick(e){
    if(e.key=='register'){
      this.setState({current:'register' })
      this.setmodalVisible(true);
    }else{
      {
        this.setState({current:e.key})
      }
    }
  }
  handleSubmit(e)
	{
		//页面开始向 API 进行提交数据
		e.preventDefault();
		var myFetchOptions = {
			method: 'GET'
		};
		var formData = this.props.form.getFieldsValue();
		console.log(formData);
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
		+ "&username="+formData.userName+"&password="+formData.password
		+"&r_userName=" + formData.r_userName + "&r_password="
		+ formData.r_password + "&r_confirmPassword="
		+ formData.r_confirmPassword, myFetchOptions)
		.then(response => response.json())
		.then(json => {
			this.setState({userNickName: json.NickUserName, userid: json.UserId});
			localStorage.userid= json.UserId;
			localStorage.userNickName = json.NickUserName;
		});
		if (this.state.action=="login") {
			this.setState({hasLogined:true});
		}
		message.success("请求成功！");
		this.setmodalVisible(false);
    this.props.form.resetFields();
	};
  login(){
    this.setmodalVisible(true)
  }
  callback(key) {
		if (key == 1) {
			this.setState({action: 'login'});
		} else if (key == 2) {
			this.setState({action: 'register'});
		}
	};
  render(){
    let {getFieldDecorator} = this.props.form;
    const userShow = this.state.hasLogined ?
    <Link to={`usercenter`}>
      <Icon type='inbox'/>
    </Link>
    :
    <Icon type='setting' onClick={this.login.bind(this)}/>;
    return(
      <div id="mobileheader">
        <header>
          <img src="/src/images/logo.png" alt='logo'/>
          <span>ReactNews</span>
          {userShow}
        </header>
        <Modal title='用户中心' wrapClassName='vertical-center-modal' visible={this.state.modalVisible} onCancel = {()=> this.setmodalVisible(false)} onOk={()=> this.setmodalVisible(false)} Oktext='关闭'>
          <Tabs type='card'>
            <TabPane tab='登录' key='1'>
              <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                <FromItem label='账户'>
                  {getFieldDecorator('userName', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                  })(
                  <Input placeholder='请输入您的账户号'/>
                  )}
                </FromItem>
                <FromItem label='密码'>
                  {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your password!' }],
                  })(
                  <Input type='password' placeholder='请输入您的密码'/>
                  )}
                </FromItem>
                <Button type='primary' htmlType='submit'>登录</Button>
              </Form>
            </TabPane>
            <TabPane tab='注册' key='2'>
              <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                <FromItem label='账户'>
                  {getFieldDecorator('r_userName', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                  })(
                  <Input placeholder='请输入您的账户号'/>
                  )}
                </FromItem>
                <FromItem label='密码'>
                  {getFieldDecorator('r_password', {
                  rules: [{ required: true, message: 'Please input your password!' }],
                  })(
                  <Input type='password' placeholder='请输入您的密码'/>
                  )}
                </FromItem>
                <FromItem label='确认密码'>
                  {getFieldDecorator('r_confirmPassword', {
                  rules: [{ required: true, message: 'Please input your password!' }],
                  })(
                  <Input type='password' placeholder='请再次输入您的密码'/>
                  )}
                </FromItem>
                <Button type='primary' htmlType='submit'>注册</Button>
              </Form>
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    )
  }
}
export default MobileHeader = Form.create({})(MobileHeader);
