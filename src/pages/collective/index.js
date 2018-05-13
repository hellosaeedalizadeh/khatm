import React, {Component} from 'react'
import './index.scss'
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import {getCollectives, getFeatures} from "../../api";
import Header from "../../components/header/index";
import KhatmCard from "../../components/khatmCard/index";

class Collective extends Component{
    constructor(props) {
        super(props)

        this.state = {
            collectives: []
        }
    }

    componentDidMount() {
        if(!!this.props.isHome) {
            getFeatures().then(res => {
                this.setState({collectives: res.data})
            }, err => {
                console.log(err)
            })
        } else {
            getCollectives().then(res => {
                this.setState({collectives: res.data})
            }, err => {
                console.log(err)
            })
        }
    }

    generateCollectives(item, index) {
        return (
            <Grid item xs={12} sm={12} md={12} lg={12} key={index}>
                <Paper>
                    <KhatmCard item={item} id={index}/>
                </Paper>
            </Grid>
        )
    }

    render() {
        return (
            <div className="collective">
                {!this.props.isHome &&
                <Header color={true}/>
                }

                <div className="wrapper">
                    <Grid container spacing={24}>
                        {this.state.collectives.map(this.generateCollectives)}
                    </Grid>
                </div>
            </div>
        )
    }
}

export default Collective