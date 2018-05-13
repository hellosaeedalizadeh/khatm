import React, {Component} from 'react'
import './index.scss'
import Grid from 'material-ui/Grid';
import KhatmCard from "../../components/khatmCard/index";
import Paper from 'material-ui/Paper';
import Header from "../../components/header/index";
import {getKhatms} from "../../api";

class Khatm extends Component{
    constructor(props) {
        super(props)

        this.state = {
            khatm: null
        }
    }

    componentDidMount() {
        let id = this.props.match.params.id
        getKhatms(id).then(res => {
            let khatm = res.data
            console.log(khatm)
            this.setState({khatm})
        }, err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className="khatm">

                <Header color={true}/>

                <div className="wrapper">
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Paper>
                                {!!this.state.khatm &&
                                <KhatmCard
                                    item={this.state.khatm}
                                    id={0}
                                />
                                }
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default Khatm