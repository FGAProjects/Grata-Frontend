import React, { Component } from 'react';
import { Icon, Input, AutoComplete } from 'antd';

import './layout.css';

const { Option, OptGroup } = AutoComplete;

class AutoCompleteComponent extends Component {
	
    render () {

		const dataSource = [{
			title: 'Reuniões',
				children: [{
					title: 'Reuniões ',
					count: 10000,
					},
				],
			  },
		];

		const options = dataSource.map(group => (
			<OptGroup key = { group.title }>
				{ group.children.map(opt => (
					<Option key = { opt.title } value = { opt.title }>
						{opt.title}
						<span className = 'certain-search-item-count'> { opt.count } people</span>
					</Option>
				))}
			</OptGroup>
		));
		
        return (

			<div className = 'autoComplete' 
				style = {{ paddingBottom: 30 }}>
				<AutoComplete
					className = 'certain-category-search'
					dropdownClassName = 'certain-category-search-dropdown'
					dropdownMatchSelectWidth = { false }
					dropdownStyle ={{ width: 300 }}
					size = 'large'
					style ={{ width: '100%' }}
					dataSource ={ options }
					placeholder = 'Procure Por Reuniões Em Que Está Inserido'
					optionLabelProp = 'value'
				>
					<Input 
						suffix = { 
							<Icon type = 'search' className = 'certain-category-icon' />
						} 
					/>
				</AutoComplete>
			</div>
        );
    }
}

export default AutoCompleteComponent;