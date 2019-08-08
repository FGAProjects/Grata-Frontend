import React from 'react';
import { connect } from 'react-redux';

class Profile extends React.PureComponent {
    render() {
        return (
            <div>
                Hi {this.props.username}
            </div>
        )
    }
}
//USADO PARA PASSAR INFORMAÇÕES ENTRE COMPONENTES

const mapStateToProps = state => {
    return {
        token: state.token,
        username: state.username
    }
}

export default connect(mapStateToProps)(Profile);