import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import './index.scss'
import ServiceMenu from "./components/serviceMenu/index";
import LanguageMenu from "./components/languageMenu/index";

class Header extends Component{
    render() {
        let style = this.props.color ?
            {background: '#536c79', color: '#fff'}
            :
            {background: 'transparent', color: '#fff'}
            console.log(style)
        return (
            <div className="header">

                <AppBar position="fixed" color='default' style={style}>
                    <Toolbar>
                        <IconButton color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" style={{flex: 'auto'}}>
                            سرویس ختم
                        </Typography>

                        <ServiceMenu/>
                        <LanguageMenu/>
                    </Toolbar>
                </AppBar>

            </div>
        )
    }
}

export default Header