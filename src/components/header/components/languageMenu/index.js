import React, {Component} from 'react'
import IconButton from 'material-ui/IconButton';
import Language from '@material-ui/icons/Language';

class LanguageMenu extends Component{
    render() {
        return (
            <IconButton>
                <Language color='secondary'/>
            </IconButton>
        )
    }
}

export default LanguageMenu