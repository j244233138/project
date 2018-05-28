import React from 'react';
import {Row, Col, BackTop,Card} from 'antd';
import { Menu, Icon, message, Form, Input, Button, CheckBox, Modal, Tabs ,notification} from 'antd';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
const FromItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;

class CommonComments extends React.Component{
  constructor(){
    super();
    this.state={
      comments:''
    }
  }
  componentDidMount() {
		var myFetchOptions = {
			method: 'GET'
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
			this.setState({comments: json});
		})
	};
  handleSubmit(e){
    e.preventDefault();
    var myFetchOptions = {
			method: 'GET'
		};
    var formdata = this.props.form.getFieldsValue()
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid="+localStorage.userid+"&uniquekey="+this.props.uniquekey+"&commnet=" + formdata.remark, myFetchOptions).then(response => response.json()).then(json => {
      notification['success']({message:'ReactNews提醒',description:'评论成功！'});
      this.componentDidMount();
      this.props.form.resetFields();
		})
  }
  addUserCollection(){
    var myFetchOptions = {
			method: 'GET'
		};
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey,myFetchOptions)
    .then(response=>response.json())
    .then(json=>{
      //收藏成功以后进行一下全局的提醒
      notification['success']({message:'ReactNews提醒',description:'收藏此文章成功！'})
    })
  }
  render(){
    let {getFieldDecorator} = this.props.form;
    const {comments} = this.state;

    const commneList = comments.length ?

    comments.slice(comments.length-10,comments.length).map((comment,index)=>(
      <Card key={index} title={comment.UserName} extra={<a href="#">发布于 {comment.datetime}</a>}>
      <p>{comment.Comments}</p>

      </Card>
    ))
    :
    '没有加载到任何评论';
    return(
      <div class="comment">
        <Row>
          <Col span={24}>
            {commneList}
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <FromItem label="您的评论">
                   {getFieldDecorator('remark', {
                   rules: [{ required: true, message: 'Please input your password!' }],
                   })(
                   <Input type="textarea" placeholder="随便写" />
                 )}
              </FromItem>
              <Button type='primary' htmlType='submit'>评论提交</Button>
              &nbsp;&nbsp;
              <Button type='primary' htmlType='submit' onClick={this.addUserCollection.bind(this)}>收藏该文章</Button>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}
export default CommonComments= Form.create({})(CommonComments);
