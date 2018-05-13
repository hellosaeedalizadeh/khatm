import React, {Component} from 'react'
import IconButton from 'material-ui/IconButton';
import Apps from '@material-ui/icons/Apps';

class ServiceMenu extends Component{
    render() {
        return (
            <div style={{display: 'inline'}}>
                <IconButton><Apps color='secondary'/></IconButton>
            </div>
        )
    }
}

export default ServiceMenu