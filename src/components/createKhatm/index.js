import React, {Component} from 'react'
import Drawer from 'material-ui/Drawer';
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import './index.scss'
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from "material-ui/Typography/Typography";
import TextField from "material-ui/TextField/TextField";
import Tooltip from "material-ui/Tooltip/Tooltip";
import FormControlLabel from "material-ui/Form/FormControlLabel";
import Checkbox from "material-ui/Checkbox/Checkbox";
import ContactMail from '@material-ui/icons/ContactMail';
import LinkIcon from "@material-ui/icons/Link";
import { Link } from "react-router-dom";
import Button from "material-ui/Button/Button";
import {createKhatm} from "../../api";
import {METADATA} from "../../meta";

const META = METADATA()

class CreateKhatm extends Component{
    constructor(props) {
        super(props)

        this.state = {
            show: false,
            stepper: {
                steps: 3,
                activeStep: 0
            },
            khatm: {
                title: '',
                type: 1,
                isPublic: false,
                //id: 1,
                //creator: '',
                //passed: 20,
                //isFinished: false,
                reminder: '',
                //details: [],
                //created_at: '',
                //updated_at: ''
            }
        }

        this.toggleDrawer = this.toggleDrawer.bind(this)
        this.handleNext = this.handleNext.bind(this)
        this.selectType = this.selectType.bind(this)
        this.changeTitle = this.changeTitle.bind(this)
        this.changeIsPublic = this.changeIsPublic.bind(this)
        this.changeReminder = this.changeReminder.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({show: nextProps.visible})
    }

    toggleDrawer() {
        this.props.close()
    }

    handleNext = () => {
        let {stepper} = this.state

        if(stepper.activeStep === 1) {
            createKhatm(this.state.khatm).then(res => {
                stepper.activeStep = 1 + stepper.activeStep
                console.log(res.data)
                this.setState({stepper, khatm: res.data})
            }, err => {
                console.log(err)
            })
        } else {
            stepper.activeStep = 1 + stepper.activeStep
            if (stepper.steps > stepper.activeStep) {
                this.setState({stepper})
            }
        }
    };

    selectType(e) {
        let khatm = this.state.khatm
        khatm.type = e.target.id
        this.setState({khatm})
        this.handleNext()
    }

    changeTitle(e) {
        let khatm = this.state.khatm
        khatm.title = e.target.value
        this.setState({khatm})
    }

    changeIsPublic(e) {
        let khatm = this.state.khatm
        khatm.isPublic = !khatm.isPublic
        this.setState({khatm})
    }

    changeReminder(e) {
        let khatm = this.state.khatm
        khatm.reminder = e.target.value
        this.setState({khatm})
    }

    render() {
        let activeStep = this.state.stepper.activeStep
        return (
            <div className="create-khatm">
                <Drawer anchor="bottom" open={this.state.show} onClose={this.toggleDrawer}>
                    <Stepper nonLinear activeStep={activeStep} className="stepper-holder">
                        <Step>
                            <StepLabel>انتخاب نوع ختم</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>مشخصات</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>انتشار</StepLabel>
                        </Step>
                    </Stepper>

                    {activeStep === 0 &&
                    <div className="stepper-content-holder step1">
                        <Grid container spacing={24}>
                            <Grid item xs={6} sm={6} md={3} lg={3}>
                                <Paper className="item">
                                    <Typography color="secondary">
                                        روزانه یک
                                    </Typography>

                                    <Typography color="secondary" variant="headline" component="h3" style={{lineHeight: '50px'}}>
                                        صفحه
                                    </Typography>

                                    <button id={0} onClick={this.selectType}>انتخاب</button>
                                </Paper>
                            </Grid>
                            <Grid item xs={6} sm={6} md={3} lg={3}>
                                <Paper className="item">
                                    <Typography color="secondary">
                                        روزانه یک
                                    </Typography>

                                    <Typography color="secondary" variant="headline" component="h3" style={{lineHeight: '50px'}}>
                                        حزب
                                    </Typography>

                                    <button id={1} onClick={this.selectType}>انتخاب</button>
                                </Paper>
                            </Grid>
                            <Grid item xs={6} sm={6} md={3} lg={3}>
                                <Paper className="item">
                                    <Typography color="secondary">
                                        روزانه یک
                                    </Typography>

                                    <Typography color="secondary" variant="headline" component="h3" style={{lineHeight: '50px'}}>
                                        جزء
                                    </Typography>

                                    <button id={2} onClick={this.selectType}>انتخاب</button>
                                </Paper>
                            </Grid>
                            <Grid item xs={6} sm={6} md={3} lg={3}>
                                <Paper className="item">
                                    <Typography color="secondary">
                                        روزانه یک
                                    </Typography>

                                    <Typography color="secondary" variant="headline" component="h3" style={{lineHeight: '50px'}}>
                                        منزیل
                                    </Typography>

                                    <button id={3} onClick={this.selectType}>انتخاب</button>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                    }

                    {activeStep === 1 &&
                    <div className="stepper-content-holder">
                        <Grid container spacing={24}>
                            <Grid item xs={6} sm={6} md={6} lg={6}>
                                <TextField
                                    id="full-width"
                                    label="عنوان ختم"
                                    placeholder="عنوان ختم را وارد کنید...[حداکثر ۴۰ حرف]"
                                    helperText={`شماره ختم: ${META[this.state.khatm.type].title} (${META[this.state.khatm.type].counts} سهم )`}
                                    margin="normal"
                                    fullWidth
                                    value={this.state.khatm.title}
                                    onChange={this.changeTitle}
                                />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={6} style={{paddingTop: 45}}>
                                <Tooltip
                                    title="با انتخاب این گزینه٬ ختم شما در صفحه ختم های گروهی نمایش داده می شود."
                                    placement="left"
                                >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="primary"
                                                checked={this.state.khatm.isPublic}
                                                onChange={this.changeIsPublic}
                                            />
                                        }
                                        label={<span>عمومی <small> (ختم گروهی)</small></span>}
                                        style={{width: '160px'}}
                                    />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} >
                                <div className="reminder-holder">
                                    <div className="reminder">
                                        <div className="reminder-logo">
                                            <ContactMail/>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Email or Phone"
                                            value={this.state.khatm.reminder}
                                            onChange={this.changeReminder}
                                        />
                                    </div>
                                    <Typography color="textSecondary">
                                        در صورت تمایل٬ با درج ایمیل یا تلفن همراه ما می توانیم این ختم را به شما یادآوری کنیم.
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    }

                    {activeStep === 2 &&
                    <div className="stepper-content-holder">
                        <Typography variant="headline" component="h3" style={{lineHeight: '50px'}}>
                            تبریک! ختم شما ایجاد گردید.
                        </Typography>
                        <Typography color="textSecondary">
                            شما می توانید <Link to="/mykhatm">ختم ها</Link> و <Link to="/quotas">سهم های</Link> خود را در <Link to="/">نمایه کاربری</Link> مدیریت نمایید.
                        </Typography>

                        <div className="landing-box" style={{margin: '30px auto 100px'}}>
                            <Tooltip title="کپی شود" placement="top">
                                <div className="landing-box-logo">
                                    <LinkIcon />
                                </div>
                            </Tooltip>
                            <a href="" target="_blank" className="landing-link">
                                <span style={{color: '#009688'}}>https</span>://FORGHAN.com/khatm/{this.state.khatm.id}
                            </a>
                            <div className="landing-box-tip">
                                <Typography color="textSecondary">
                                    شما می توانید با استفاده از پیوند بالا٬ این ختم را با دوستانتان به اشتراک بگذارید.
                                </Typography>
                            </div>
                        </div>
                    </div>
                    }


                    {activeStep === 1 &&
                    <div>
                        <Button
                            variant="raised"
                            onClick={this.handleNext}
                            color="primary"
                            fullWidth
                            disabled={this.state.khatm.title.length < 1}
                        >
                            مرحله بعد
                        </Button>
                    </div>
                    }

                    {activeStep === 2 &&
                    <Button variant="raised">
                        اشتراک
                    </Button>
                    }

                </Drawer>
            </div>
        )
    }
}

export default CreateKhatm