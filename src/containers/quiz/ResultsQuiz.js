import React, { Component } from 'react';
import { Skeleton, Comment, Avatar, Form, Button, List, Input, Modal, message } from 'antd';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import moment from 'moment';

import Hoc from '../../hoc/hoc';
import Homepage from '../homepage/Homepage';

import { getUser } from '../../store/actions/auth';
import { getMeeting } from '../../store/actions/meeting';
import { getChoices } from '../../store/actions/choices';
import { createComment, getComments, deleteComment } from '../../store/actions/comment';
import { getGradedQuesttionaires } from '../../store/actions/quiz';

const { TextArea } = Input;
const { confirm } = Modal;

class ResultsQuiz extends Component {


    //                 backgroundColor: [
    //                     'rgba(255, 99, 132, 0.6)',
    //                     'rgba(54, 162, 235, 0.6)',
    //                     'rgba(255, 206, 86, 0.6)',
    //                     'rgba(75, 192, 192, 0.6)',
    //                     'rgba(153, 102, 255, 0.6)',
    //                     'rgba(255, 159, 64, 0.6)',
    //                     'rgba(255, 99, 132, 0.6)',
    //                 ]
    //             }]
    //         }
    //     }
    // }

    state = {

        comments: [],
        submitting: false,
        value: '',
    };

    componentDidMount() {
        
        if (this.props.token !== undefined && this.props.token !== null) {
        
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user.token;
            const questtionaire_id = this.props.match.params.questtionaire_id;
            const meeting_id = this.props.match.params.meeting_id;
            this.props.getMeeting(token, meeting_id);
            this.props.getUser(token, this.props.currentUser.userId);
            this.props.getGradedQuesttionaires(token, questtionaire_id);
            this.props.getComments(token, questtionaire_id);
            this.props.getChoices(token);
            this.forceUpdate();
        }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
		
		if (newProps.token !== this.props.token) {
		
			if (newProps.token !== undefined && newProps.token !== null) {
                
                const questtionaire_id = newProps.match.params.questtionaire_id;
                const meeting_id = newProps.match.params.meeting_id;
                this.props.getMeeting(newProps.token, meeting_id);
                this.props.getGradedQuesttionaires(newProps.token, questtionaire_id);
                this.props.getUser(newProps.token, newProps.currentUser.userId);
                this.props.getChoices(newProps.token);
                this.props.getComments(newProps.token, questtionaire_id);
				this.forceUpdate();
            }
        }
    }

    handleSubmit = () => {

        const { currentUser } = this.props;
        const questtionaire_id = this.props.match.params.questtionaire_id;
        const meeting_id = this.props.match.params.meeting_id;
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user.token;

        if (!this.state.value) {
            return;
        }
    
        this.setState({
            submitting: true,
        });
    
        setTimeout(() => {
            
            const { currentUser } = this.props;

            this.setState({
                
                submitting: false,
                value: '',
                comments: [
                {
                    author: <p> { currentUser.name } </p>,
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    content: <p> { this.state.value } </p>,
                    datetime: moment().fromNow(),
                },
                ...this.state.comments,
                ],
            });
        }, 1000);

        const comment = {
            user: currentUser.id,
            questtionaire: questtionaire_id,
            description: this.state.value
        } 

        this.props.createComment(token, comment);
        this.props.history.push(`/resultado_questionario/${ meeting_id }/${ questtionaire_id }/`);
    };

    handleChange = e => {
        this.setState({
          value: e.target.value,
        });
    };

    deleteComment = (comment_id) => {
        
        const propsForms = this.props;
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user.token;
        const questtionaire_id = this.props.match.params.questtionaire_id;
        const meeting_id = this.props.match.params.meeting_id;
		
		confirm ({
			title: 'Excluir Comentário',
			content: 'Tem Certeza Que Deseja Excluir Este Comentário?',
			okText: 'Sim',
			okType: 'danger',
			cancelText: 'Não',
		
			onOk() {

				propsForms.deleteComment(token, comment_id);
				Modal.success({
					title: 'Ação Concluída!',
					content: 'Comentário Excluído Com Sucesso!',
                });
                propsForms.history.push(`/resultado_questionario/${ meeting_id }/${ questtionaire_id }/`);
			},
			onCancel() {
				message.success('Exclusão de Comentário Cancelado Com Sucesso!');
			},
		});
	}

    render() {
        
        const resultsGraded = this.props.resultsGraded;
        const commentsList = this.props.comments;
        const { comments, submitting, value } = this.state;
        let dataSourceComments = {
            innerArray: [

            ]
        };
        let dataSource = {
            
        };
        let dataSourceQuestions = {
            innerArray: [

            ]
        };
        let dataSourceAnswers = {
            innerArray: [

            ]
        };

        for(let aux = 0; aux < resultsGraded.length; aux ++) {

            dataSourceQuestions.innerArray.push(resultsGraded[aux].quiz)
            dataSourceAnswers.innerArray.push(resultsGraded[aux].choice)
        }
        const datas = [65, 59, 80, 81, 56]


        dataSource = {
            labels: dataSourceQuestions.innerArray,
            datasets: [{
                label: 'Rainfall',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: datas
            }]
        }

        for(let aux = 0; aux < commentsList.length; aux ++) {
            
            dataSourceComments.innerArray.push({
                actions: [
                    <Button
                        key = { aux } 
                        onClick = { () => this.deleteComment(commentsList[aux].id) }
                        type = 'ghost' 
                        htmlType = 'submit'
                        className = 'buttonDelete' 
                    >
                        Excluir Comentário
                    </Button>
                ],
                author: <p><b> { commentsList[aux].user } </b></p>,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: (
                    <p style = {{ fontSize: '14px', textAlign: 'justify' }}>
                        { commentsList[aux].description }
                    </p>
                ),
            });
        }

        return (

            <Hoc>
                {
                    this.props.token === null ? (
                        <Homepage/>
                    ) : (
                        this.props.loading ? (
                            <Skeleton active />
                        ) : (
                            <Hoc>
                                {
                                    <div className = 'container'>
                                        <div className = 'comment'>
                                            <div className = 'contentComment'>
                                                { comments.length > 0 && <CommentList comments = { comments} />}
                                                <Comment
                                                    avatar={
                                                        <Avatar
                                                            src = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                                                            alt = 'Han Solo'
                                                        />
                                                    }
                                                    content = {
                                                        <Editor
                                                            onChange = { this.handleChange }
                                                            onSubmit = { this.handleSubmit }
                                                            submitting = { submitting }
                                                            value = { value }
                                                        />
                                                    }
                                                />
                                                <List
                                                    className = 'comment-list'
                                                    header = { `${ dataSourceComments.innerArray.length } Comentários`}
                                                    itemLayout = 'horizontal'
                                                    dataSource = { dataSourceComments.innerArray }
                                                    renderItem = { item => (
                                                        <li>
                                                            <Comment
                                                                actions = { item.actions }
                                                                author = { item.author }
                                                                avatar = { item.avatar }
                                                                content = { item.content }
                                                                datetime = { item.datetime }
                                                            />
                                                        </li>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className = 'graphic'>
                                            <h1 className = 'texth1'> Porcentagem de Respostas </h1>
                                            <Pie
                                                data = { dataSource }
                                                options = { option }
                                            /> 
                                        </div>
                                    </div>
                                }
                            </Hoc>
                        )
                    )
                }
            </Hoc>
        );
    }
}

const CommentList = ({ comments }) => (
    <List
        dataSource = { comments }
        header = {`${ comments.length } ${ comments.length > 1 ? 'Comentários' : 'Comentário'}`}
        itemLayout = 'horizontal'
        renderItem = { props => <Comment {...props} />}
    />
);
  
const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
        <Form.Item>
            <TextArea 
                rows = { 4 } 
                onChange = { onChange } 
                value = { value } 
            />
        </Form.Item>
        <Form.Item>
            <Button 
                className = 'buttonSave'
                htmlType = 'submit' 
                loading = { submitting } 
                onClick = { onSubmit } 
                type = 'ghost'>
                Adicionar Comentário
            </Button>
        </Form.Item>
    </div>
);

const mapStateToProps = state => {
	
	return {
	
		token: state.auth.token,
        loading: state.quiz.loading,
        currentQuesttionaire: state.quiz.currentQuesttionaire,
        resultsGraded: state.quiz.resultsGraded,
        currentMeeting: state.meeting.currentMeeting,
        currentUser: state.auth.currentUser,
        choices: state.choices.choices,
        comments: state.comment.comments
    };
};

const option = {
    tooltips: {
        callbacks: {
            label: function(tooltipItem, data) {
                var dataset = data.datasets[tooltipItem.datasetIndex];
                var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                var total = meta.total;
                var currentValue = dataset.data[tooltipItem.index];
                var percentage = parseFloat((currentValue/total * 100).toFixed(1));

                return currentValue + ' (' + percentage + '%)';
            },
            title: function(tooltipItem, data) {
                return data.labels[tooltipItem[0].index];
            }
        }
    }
}

const mapDispatchToProps = dispatch => {
	
	return {
        
        getUser: (token, userId) => dispatch(getUser(token, userId)),
        getGradedQuesttionaires: (token, questtionaire_id) => dispatch(getGradedQuesttionaires(token, questtionaire_id)),
        getMeeting: (token, meeting_id) => dispatch(getMeeting(token, meeting_id)),
        getChoices: (token) => dispatch(getChoices(token)),
        getComments: (token, questtionaire_id) => dispatch(getComments(token, questtionaire_id)),
        createComment: (token, comment) => dispatch(createComment(token, comment)),
        deleteComment: (token, comment_id) => dispatch(deleteComment(token, comment_id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsQuiz);