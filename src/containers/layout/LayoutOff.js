import React from "react";

class LayoutOff extends React.Component {
    render () {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default LayoutOff;