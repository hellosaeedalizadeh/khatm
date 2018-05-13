import React, {Component} from 'react'
import KhatmCard from "./components/khatmCard/index";
import Card, { CardContent } from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import './index.scss'
import Header from "../../components/header/index";
import {getQuotas} from "../../api";

class Quotas extends Component{
    constructor(props) {
        super(props)

        this.state = {
            quotas: []
        }
    }

    componentDidMount() {
        getQuotas().then(res => {
            console.log(res)
            this.setState({quotas:res.data})
        }, err => {
            console.log(err)
        })
    }

    generateKhatm(item, index) {
        return (
            <Grid item xs={12} sm={12} md={6} lg={6} key={index}>
                <Paper>
                    <KhatmCard item={item} id={index}/>
                </Paper>
            </Grid>
        )
    }

    render() {
        return (
            <div className="quotas">

                <Header color={true}/>

                <div className="wrapper">
                    <Grid container spacing={24}>
                        {this.state.quotas.map(this.generateKhatm)}
                    </Grid>
                </div>
            </div>
        )
    }
}

export default Quotas