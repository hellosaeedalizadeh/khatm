import React, {Component} from 'react'
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import KhatmCard from '../../components/khatmCard/index'
import './index.scss'
import Header from "../../components/header/index";
import {getAllKhatms} from "../../api";

class MyKhatm extends Component{
    constructor(props) {
        super(props)

        this.state = {
            khatms: []
        }
    }

    componentWillMount() {
        getAllKhatms().then(res => {
            let khatms = res.data
            this.setState({khatms})
        }, err => {
            console.log(err)
        })
    }

    generateKhatm(item, index) {
        return (
            <Grid item xs={12} sm={12} md={12} lg={12} key={index}>
                <Paper>
                    <KhatmCard
                        item={item}
                        id={index}
                        myKhatm={true}
                    />
                </Paper>
            </Grid>
        )
    }

    render() {
        return (
            <div className="mykhatm">

                <Header color={true}/>

                <div className="wrapper">
                    <Grid container spacing={24}>
                        {this.state.khatms.map(this.generateKhatm)}
                    </Grid>
                </div>
            </div>
        )
    }
}

export default MyKhatm