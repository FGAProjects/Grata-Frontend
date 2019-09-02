import React, { Component } from 'react';
import { Icon, Input, AutoComplete } from 'antd';

const { Option, OptGroup } = AutoComplete;

const dataSource = [
    {
      title: 'Projetos',
      children: [
        {
            title: 'Reuniões ',
            count: 10000,
        },
      ],
    },
];
  
  function renderTitle(title) {
    return (
      <span>
        {title}
        <a
          style={{ float: 'right' }}
          href="https://www.google.com/search?q=antd"
          target="_blank"
          rel="noopener noreferrer"
        >
          more
        </a>
      </span>
    );
  }
  
  const options = dataSource
    .map(group => (
      <OptGroup key={group.title} label={renderTitle(group.title)}>
        {group.children.map(opt => (
          <Option key={opt.title} value={opt.title}>
            {opt.title}
            <span className="certain-search-item-count">{opt.count} people</span>
          </Option>
        ))}
      </OptGroup>
    ))
    .concat([
      <Option disabled key="all" className="show-all">
        <a href="https://www.google.com/search?q=antd" target="_blank" rel="noopener noreferrer">
          View all results
        </a>
      </Option>,
    ]);
  
  function Complete() {
    return (
        <div className="certain-category-search-wrapper" style={{ width: '100%', paddingBottom: 20 }}>
            <AutoComplete
                className="certain-category-search"
                dropdownClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={false}
                dropdownStyle={{ width: 300 }}
                size="large"
                style={{ width: '100%' }}
                dataSource={options}
                placeholder="POR ENQUANTO NÃO FUNCIONA"
                optionLabelProp="value"
            >
            <Input suffix={<Icon type="search" className="certain-category-icon" />} />
            </AutoComplete>
        </div>
    );
  }


class AutoCompleteComponent extends Component {
    render () {
        return (
            <Complete />
        )
    }
}

export default AutoCompleteComponent;

// import { AutoComplete } from 'antd';

// function onSelect(value) {
//   console.log('onSelect', value);
// }

// class Complete extends React.Component {
//   state = {
//     dataSource: [],
//   }

//   handleSearch = (value) => {
//     this.setState({
//       dataSource: !value ? [] : [
//         value,
//         value + value,
//         value + value + value,
//       ],
//     });
//   }

//   render() {
//     const { dataSource } = this.state;
//     return (
//       <AutoComplete
//         dataSource={dataSource}
//         style={{ width: 200 }}
//         onSelect={onSelect}
//         onSearch={this.handleSearch}
//         placeholder="input here"
//       />
//     );
//   }
// }

// ReactDOM.render(<Complete />, mountNode);