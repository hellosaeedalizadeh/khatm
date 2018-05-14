import React, {Component} from 'react'
import Button from 'material-ui/Button';
import { CardActions} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import './index.scss'
import {RomanToArabic} from "../../../../helper";
import {METADATA} from "../../../../meta";
import {finishQuota} from "../../../../api";
import Link from "react-router-dom/Link";

const META = METADATA()

class KhatmCard extends Component{
    constructor(props) {
        super(props)

        this.state = {
            item: this.props.item
        }
    }

    componentWillReceiveProps(np) {
        this.setState({item: np.item})
    }

    makeDone(item) {
        item.status = 2
        finishQuota(item.id, item).then(res => {
            this.setState({item: res.data})
        }, err => {
            console.log(err)
        })
    }

    render() {
        let item = this.state.item
        return (
            <div className="quotas-khatm-card">
                <div className="right-box" style={{backgroundColor: item.status === 2 ? '#009688' : '#00BCD4'}}>
                    <Typography variant="headline" color='secondary' style={{fontSize: 21}}>
                        {META[item.type].title}
                    </Typography>
                    <Typography variant="headline" color='secondary' className='number'>
                        {RomanToArabic(item.start_at)}
                    </Typography>
                </div>
                <div className="left-box">
                    {item.status === 2 ?
                        <Link to={`/khatm/${item.refrence_khatm.$id}`}>
                            <Typography color="textSecondary" style={{flexGrow: 2}}>
                                ختم شماره {item.id}
                            </Typography>
                        </Link>
                        :
                        <Typography color="textSecondary" style={{flexGrow: 2}}>
                            مرتبط با
                        </Typography>
                    }

                    {item.status === 2 ?
                        <Typography variant="headline" component="h3" style={{textAlign: 'center'}}>
                            جزاکم الله
                        </Typography>
                        :
                        <Link to={`/khatm/${item.refrence_khatm.$id}`}>
                            <Typography variant="headline" component="h3" style={{textAlign: 'center'}}>
                                ختم شماره {item.id}
                            </Typography>
                        </Link>
                    }

                    <CardActions className='actions'>
                        <Button size="small" color="primary" href={item.url} target="_blank">
                            مشاهده
                        </Button>
                        {item.status === 2 ?
                            <Button size="small" color="primary" disabled={true}>
                                انجام شد
                            </Button>
                            :
                            <Button size="small" color="primary" onClick={this.makeDone.bind(this, item)}>
                                انجام شد؟
                            </Button>
                        }
                    </CardActions>
                </div>
            </div>
        )
    }
}

export default KhatmCard;