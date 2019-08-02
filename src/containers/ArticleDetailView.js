import React from 'react';
import axios from 'axios';

import { Card, Button } from 'antd';

import CustomForm from '../components/Form';

export default class ArticleDetail extends React.Component {

    state = {
        article: {}
    }

    handleDelete = (event) => {
        const articleID = this.props.match.params.articleID;
        axios.delete(`http://0.0.0.0:8000/api/${articleID}/delete/`);
        this.props.history.push('/');
        this.forceUpdate();
    }

    componentDidMount() {
        const articleID = this.props.match.params.articleID;
        axios.get(`http://0.0.0.0:8000/api/${articleID}/`)
        .then(res => {
            this.setState({
                article: res.data
            });
        });
    }

    render() {
        return (
            <div>
                <Card title={this.state.article.title}>
                <p>{this.state.article.content}</p>
                </Card>
                <CustomForm 
                    requestType = 'put'
                    articleID = {this.props.match.params.articleID}
                    btnText = 'Update'
                />
                <form onSubmit={this.handleDelete}>
                    <Button type="danger" htmlType = "submit">Delete</Button>
                </form>
            </div>
        )
    }
}