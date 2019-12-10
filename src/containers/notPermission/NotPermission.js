import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import { Link } from 'react-router-dom';

import notPermission from '../../images/notPermission/notPermission.gif';

class NotPermission extends Component {

    render() {
        return (
            <div align = 'center'>
                <div className = 'contentNotPermission'>
                    <h1 className = 'texth1'> 
                        Caro Usuário (a), Você Não Possui Autorização Para Acessar Esta Página.
                    </h1>
                    <img className = 'imgContent' src = { notPermission } alt = '' />

                    <Button
                        className = 'buttonEdit' 
                        type = 'ghost' 
                        htmlType = 'submit'
                        style = {{
                            marginBottom: '30px'
                        }} 
                    >
                        <Link to = { '/' } >
                            <Icon className = 'icons' type = 'arrow-right'/>
                                Página Inicial
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }
}

export default NotPermission;