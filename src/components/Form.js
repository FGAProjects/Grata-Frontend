/* eslint-disable default-case */
import React from 'react';
import axios from 'axios';

import { Form, Input, Button } from 'antd';

export default class CustomForm extends React.Component {

    handleFormSubmit = (event, requestType, articleID) => {
        event.preventDefault();
        const title = event.target.elements.title.value;
        const content = event.target.elements.content.value;

        switch ( requestType ) {
            case 'post':
                return axios.post('https://api-grata.herokuapp.com/api/create/', {
                    title: title,
                    content: content
                })
                .then(res => console.log(res))
                .catch(error => console.log(error));

            case 'put':
                return axios.put(`https://api-grata.herokuapp.com/api/${articleID}/update/`, {
                    title: title,
                    content: content
                })
                .then(res => console.log(res))
                .catch(error => console.log(error));   
        }
    }

    render() {
        return (
            <div>
                <Form onSubmit={(event) => this.handleFormSubmit(
                    event, this.props.requestType, this.props.articleID)}>
                <Form.Item label="Title">
                    <Input name='title' placeholder="Put a title here" />
                </Form.Item>
                <Form.Item label="Content">
                    <Input name='content' placeholder="Enter some content ..." />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" >{this.props.btnText}</Button>
                </Form.Item>
                </Form>
            </div>
        );
    }
}