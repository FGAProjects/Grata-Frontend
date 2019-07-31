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
        axios.delete(`https://api-grata.herokuapp.com/api/${articleID}/delete/`);
        this.props.history.push('/');
        this.forceUpdate();
    }

    componentDidMount() {
        this.fetchDataFromApi();
    }

    fetchDataFromApi = () => {

        const articleID = this.props.match.params.articleID;
        axios.get(`https://api-grata.herokuapp.com/api/${articleID}/`)
          .then(res => {
              this.setState({
                  article: res.data
              });
          });
        setTimeout(() => {
            this.fetchDataFromApi();
        }, 100);
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