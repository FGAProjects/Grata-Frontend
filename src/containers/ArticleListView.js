import React from 'react';
import Articles from '../components/Article';
import CustomForm from '../components/Form';
import axios from 'axios';

export default class ArticleList extends React.Component {

    state = {
        articles: []
    }

    componentDidMount() {
        this.fetchDataFromApi();
    }

    fetchDataFromApi = () => {
        axios.get('https://api-grata.herokuapp.com/api/')
        .then(res => {
            this.setState({
                articles: res.data
            });
        });
        setTimeout(() => {
            this.fetchDataFromApi();
        }, 100);
    }

    render() {
        return (
            <div>
                <Articles data={this.state.articles}/>
                <br />
                <h2>Create an article</h2>
                <CustomForm 
                    requestType = 'post'
                    articleID = {null}
                    btnText = 'Create'
                />
            </div>
        )
    }
}