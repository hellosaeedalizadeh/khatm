import React, {Component} from 'react'
import Typography from 'material-ui/Typography';
import Link from '@material-ui/icons/Link';
import Tooltip from 'material-ui/Tooltip';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './index.scss'
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Avatar from 'material-ui/Avatar';
import Join from "../join/index";
import {METADATA} from "../../meta";
import {RomanToArabic} from "../../helper";
import FormControlLabel from "material-ui/Form/FormControlLabel";
import Checkbox from "material-ui/Checkbox/Checkbox";
import {changeIsPublic, getQuitas} from "../../api";

const META = METADATA()

class KhatmCard extends Component{
    constructor(props) {
        super(props)

        this.state = {
            khatm: this.props.item,
            amountOfQuotas: 1,
            isJoinVisible: false,
            quotas: []
        }

        //this.changeJoinVisible = this.changeJoinVisible.bind(this)
        this.changeQuota = this.changeQuota.bind(this)
        this.changeJoin = this.changeJoin.bind(this)
        this.generateProgress = this.generateProgress.bind(this)
        this.changeIsPublic = this.changeIsPublic.bind(this)
    }

    componentWillReceiveProps(np) {
        let khatm = np.item
        this.setState({khatm})
    }

    changeJoinVisible(khatmId) {
        getQuitas(khatmId, this.state.amountOfQuotas).then(res => {
            console.log(res.data)
            this.setState({isJoinVisible: !this.state.isJoinVisible, quotas: res.data})
        }, err => {
            console.log(err)
        })
    }

    changeJoin() {
        this.setState({isJoinVisible: !this.state.isJoinVisible})
    }

    generateOptions(remains, type) {
        let options = []
        for(let i=1;i <= remains;++i) {
            options.push(<MenuItem value={i} key={i}>{RomanToArabic(i) + ' ' + META[type].title}</MenuItem>)
        }
        return options
    }

    changeQuota(e) {
        console.log(e.target.value)
        this.setState({amountOfQuotas: e.target.value})
    }

    generateProgress(item) {
        return (
            <div>
                {!!this.props.myKhatm ?
                    <Button
                        variant="raised"
                        color="secondary"
                        style={{marginTop: '45px'}}
                    >اشتراک</Button>
                    :
                    <div>
                        <Button variant="raised" color="secondary" onClick={this.changeJoinVisible.bind(this, item.id)}>پیوستن</Button>
                        <Typography color="secondary" style={{textAlign: 'center'}}>
                            دریافت

                            <Select
                                value={this.state.amountOfQuotas}
                                onChange={this.changeQuota}
                                inputProps={{
                                    name: 'age',
                                    id: 'age-simple',
                                }}
                                style={{color: '#fff'}}
                            >
                                {!!item.progress && this.generateOptions(item.progress.all - item.progress.reserve, item.type)}
                            </Select>
                        </Typography>
                    </div>
                }
            </div>
        )
    }

    changeIsPublic() {
        let khatm = this.state.khatm
        khatm.isPublic = !khatm.isPublic
        changeIsPublic(khatm).then(res => {
            console.log(res)
            this.setState({khatm})
        }, err => {
            console.log(err)
        })
    }

    render() {
        let item = this.state.khatm
        if(item === undefined) return null
        let percentage = !!item.progress ? (Math.floor(item.progress.reserve / item.progress.all * 100)) : 0

        if(this.state.isJoinVisible) {
            return (
                <Join
                    changeJoinVisible={this.changeJoin}
                    quotasCounts={this.state.amountOfQuotas}
                    quotas={this.state.quotas}
                />
            )
        }
        return (
            <div className="collective-khatm-card">
                <div className="right-box">
                    <div className="progress-bar-holder">
                        <CircularProgressbar
                            percentage={percentage}
                            strokeWidth={3}
                            className="circle-bar"
                            initialAnimation={true}
                            textForPercentage={null}
                        />
                        <div className="progress-bar-content">
                            <span>
                                پیشرفت
                                <br/>
                                <span className="progress-bar-percentage">{RomanToArabic(percentage)}%</span>
                            </span>
                        </div>
                    </div>

                    {(item.progress.all - item.progress.reserve !== 0) && this.generateProgress(item)}

                </div>
                <div className="left-box">
                    <Typography variant="headline" component="h3" style={{lineHeight: '50px'}}>
                        {item.title}
                    </Typography>

                    <Typography color="textSecondary">
                        {!!item.progress && RomanToArabic(item.progress.all - item.progress.reserve)} {META[item.type].title} باقی مانده است
                    </Typography>

                    <div className="landing-box">
                        <Tooltip title="کپی شود" placement="top">
                            <div className="landing-box-logo">
                                <Link />
                            </div>
                        </Tooltip>
                        <a href={item.url} target="_blank" className="landing-link">
                            <span style={{color: '#009688'}}>https</span>://FORGHAN.com/khatm/{item.id}
                        </a>
                        <div className="landing-box-tip">
                            <Typography color="textSecondary">
                                شما می توانید با استفاده از پیوند بالا٬ این ختم را با دوستانتان به اشتراک بگذارید.
                            </Typography>
                        </div>
                    </div>


                    {!!this.props.myKhatm ?
                        <Tooltip
                            title="با انتخاب این گزینه٬ ختم شما در صفحه ختم های گروهی نمایش داده می شود."
                            placement="left"
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color="primary"
                                        onChange={this.changeIsPublic}
                                        checked={this.state.khatm.isPublic}
                                    />
                                }
                                label={<span>عمومی <small> (گروهی)</small></span>}
                                style={{width: '150px', marginTop: '23px'}}
                            />
                        </Tooltip>
                        :
                        <div>
                            <Typography variant="headline" style={{fontSize: '20px', marginTop: '25px'}}>
                                مشارکت کنندگان
                            </Typography>

                            <div className="participants">
                                {/*<Avatar
                                    alt="Adelle Charles"
                                    src="http://placehold.it/50x50"
                                />
                                <Avatar
                                    alt="Adelle Charles"
                                    src="http://placehold.it/50x50"
                                />
                                <Avatar
                                    alt="Adelle Charles"
                                    src="http://placehold.it/50x50"
                                />
                                <div>
                                    و {RomanToArabic(Math.floor(Math.random() * 100))} کاربر دیگر
                                </div>*/}
                                {RomanToArabic(item.contributors.length)} کاربر
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default KhatmCard