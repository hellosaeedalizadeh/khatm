import React, {Component} from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from "./pages/home/index";
import Khatm from "./pages/khatm/index";
import MyKhatm from "./pages/myKhatm/index";
import Collective from "./pages/collective/index";
import Quotas from "./pages/quotas/index";
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
//import Profile from "./pages/profile/index";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#80cbc4',
            main: '#009688',
            dark: '#00695c',
            contrastText: '#fff',
        },
        secondary: {
            light: '#fff',
            main: '#f7f7f7',
            dark: '#efefef',
            contrastText: '#333',
        }
    },
    typography: {
        fontFamily: 'IRANSans',
    }
});

class Router extends Component{
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                    <div>
                        <Route path="/khatm" exact component={Home}/>
                        <Route path="/khatm/mykhatm" exact component={MyKhatm}/>
                        <Route path="/khatm/quotas" exact component={Quotas}/>
                        <Route path="/khatm/collective" exact component={Collective}/>
                        <Route path="/khatm/details/:id" exact component={Khatm}/>

                        {/*<Route path="/profile" exact component={Profile}/>*/}
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>
        )
    }
}

export default Router