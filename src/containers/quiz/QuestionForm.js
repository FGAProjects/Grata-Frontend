import React from 'react';
import { Form, Input, Icon, Button } from 'antd';
import Hoc from '../../hoc/hoc';

const FormItem = Form.Item;

let id = 0;

class QuestionForm extends React.Component {
	
	remove = k => {

		const { form } = this.props;
		const keys = form.getFieldValue('keys');
		
		if (keys.length === 1) return;
		
		form.setFieldsValue({
			keys: keys.filter(key => key !== k)
		});
	};

  	add = () => {
		
		const { form } = this.props;
		const keys = form.getFieldValue('keys');
		const nextKeys = keys.concat(++id);
		
		form.setFieldsValue({
			keys: nextKeys
		});
  	};

  	render() {
		  
		const { getFieldDecorator, getFieldValue } = this.props.form;
		getFieldDecorator('keys', { initialValue: [] });
		const keys = getFieldValue('keys');
		const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 15, offset: 1 },
            }
        };
		const formItems = keys.map((k, index) => (

			<FormItem label = { index === 0 ? 'Escolhas' : ''} key = { k } {...formItemLayout }>
				{
					getFieldDecorator(`questions[${ this.props.id }]choices[${k}]`, {
						validateTrigger: ['onChange', 'onBlur'],
						rules: [{
							required: true,
							whitespace: true,
							message: 'Por Favor, Adicione Uma Opção Para Resposta.'
						}]
					})(
						<Input placeholder = 'Escolha a Resposta'/>
					)
				}

				{ keys.length > 1 ? (
					<Icon
						className = 'dynamic-delete-button'
						type = 'minus-circle-o'
						disabled = { keys.length === 1 }
						onClick = {() => this.remove(k)}
					/>
				) : null }
			</FormItem>
		));

    	return (
      
			<Hoc>
				<FormItem label = 'Pergunta: ' {...formItemLayout }>
				{
					getFieldDecorator(`question[${ this.props.id }]`, {
						validateTrigger: ['onChange', 'onBlur'],
						rules: [{
							required: true,
							message: 'Por Favor, Insira Uma Pergunta'
						}]
					})(
						<Input placeholder = 'Adicionar Uma Pergunta' />
					)
				}
				</FormItem>
				
				{ formItems }


				<FormItem>
					<div align = 'center'>
						<Button type = 'dashed' onClick = { this.add } style = {{ width: "60%" }}>
							<Icon type = 'plus'/> Adicione Uma Opção de Respota
						</Button>
					</div>
				</FormItem>
			</Hoc>
		);
	}
}

export default QuestionForm;