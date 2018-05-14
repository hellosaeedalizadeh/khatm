import React, {Component} from 'react'
import Collective from "../collective/index";
import './index.scss'
import {getLocalStorage, setLocalStorage} from "../../localStorage";
import Button from "material-ui/Button/Button";
import Dialog from "material-ui/Dialog/Dialog";
import DialogTitle from "material-ui/Dialog/DialogTitle";
import DialogContent from "material-ui/Dialog/DialogContent";
import DialogContentText from "material-ui/Dialog/DialogContentText";
import TextField from "../../../node_modules/material-ui/TextField/TextField";
import DialogActions from "material-ui/Dialog/DialogActions";
import Countdown from 'react-countdown-now';
import Typography from "material-ui/Typography/Typography";
import CreateKhatm from "../../components/createKhatm/index";
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp'
import {login, verify} from '../../api';
import Header from "../../components/header/index";

const khatm = getLocalStorage('khatm-token')

class Home extends Component{
    constructor(props) {
        super(props)

        this.state = {
            reminder: '',
            verificationSent: false,
            verificationCode: '',
            isValidToken: !!khatm && Object.keys(khatm).length > 0,
            countdown: true,
            createKhatm: false
        }

        this.changeReminder = this.changeReminder.bind(this)
        this.registerUser = this.registerUser.bind(this)
        this.changeVerificationCode = this.changeVerificationCode.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.backToVerification = this.backToVerification.bind(this)
        this.triggerBtn = this.triggerBtn.bind(this)
        this.createKhatm = this.createKhatm.bind(this)
        this.changeCreateKhatm = this.changeCreateKhatm.bind(this)
        this.handleFinal = this.handleFinal.bind(this)
    }

    changeReminder(e) {
        this.setState({reminder: e.target.value})
    }

    registerUser() {
        login(this.state.reminder).then(res => {
            this.setState({verificationSent: true})
        }, err => {
            console.error(err)
        });
    }

    changeVerificationCode(e) {
        this.setState({verificationCode: e.target.value})
    }

    handleClose() {
        login('').then(res => {
            setLocalStorage('khatm-token', {
                token: res.data.accessToken,
                reminder: ''
            })
            this.setState({isValidToken: true})
        }, err => {
            console.error(err)
        });
    }

    backToVerification() {
        this.setState({verificationSent: false, countdown: true})
    }

    triggerBtn() {
        this.setState({countdown: false})
    }

    handleFinal() {
        verify(this.state.reminder, this.state.verificationCode).then(res => {
            setLocalStorage('khatm-token', {
                token: res.data.accessToken,
                reminder: this.state.reminder
            })
            this.setState({isValidToken: true})
        }, err => {
            console.error(err)
        });
    }

    createKhatm() {
        this.setState({createKhatm: true})
    }

    changeCreateKhatm() {
        this.setState({createKhatm: !this.state.createKhatm})
    }

    render() {
        return (
            <div className="home">
                <Header color={false}/>

                <div className="home-banner">
                    <div className="wrapper">
                        <Typography variant="headline" color="secondary" className="home-header">
                            ختم قرآن کریم
                        </Typography>

                        <Typography color="secondary" className="home-subheader">
                            فَاقْرَءُوا مَا تَيَسَّرَ مِنَ الْقُرْآنِ (۷۳:۲۰)  پس هر چه از قرآن مُیسر می‌شود بخوانید.
                        </Typography>

                        <div className="btn-holder">
                            <Button
                                variant="raised"
                                color="primary"
                                className="btn btn-active"
                                onClick={this.createKhatm}
                                size='large'
                            >
                                ایجاد ختم جدید
                            </Button>
                            <Button
                                variant="raised"
                                color="primary"
                                disabled={true}
                                className="btn btn-disabled"
                                size='large'
                            >
                                دانلود اپلیکیشن
                            </Button>
                        </div>

                        <CreateKhatm
                            visible={this.state.createKhatm}
                            close={this.changeCreateKhatm}
                        />

                        <div className="fab-holder">
                            <Button variant="fab" aria-label="delete" className="arrow-up">
                                <a href={'#collectives'}>
                                    <KeyboardArrowUp />
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="wrapper" style={{paddingBottom: '50px'}}>
                    <a id="collectives"/>
                    <Typography variant="headline" color="secondary" className="public-khatms">
                        ختم های عمومی
                    </Typography>

                    <Collective hasCreate={true} isHome={true}/>
                </div>

                <Dialog
                    className="dialog-back"
                    open={!this.state.verificationSent && !this.state.isValidToken}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">سلام</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            شما همواره می‌توانید از خدمات فرقان به‌صورت رایگان و ناشناس استفاده کنید.
                            <br/>
                            در صورتی‌که تمایل دارید تاریچه فعالیت‌های خود را مشاهده و از خدمات ویژه ما بهره مند شوید، ثبت نام کنید.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="ایمیل یا تلفن همراه"
                            type="text"
                            fullWidth
                            value={this.state.reminder}
                            onChange={this.changeReminder}
                            autoComplete={false}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            تمایلی ندارم
                        </Button>
                        <Button
                            variant="raised"
                            onClick={this.registerUser}
                            color="primary"
                            disabled={this.state.reminder.length < 1}
                        >
                            ارسال کد فعال سازی
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    className="dialog-back"
                    open={this.state.verificationSent && !this.state.isValidToken}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">سپاس</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            لطفا کد فعال سازی ارسال شده را در پایین وارد کنید.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="کد فعال سازی"
                            type="text"
                            fullWidth
                            value={this.state.verificationCode}
                            onChange={this.changeVerificationCode}
                            autoComplete={false}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.backToVerification} color="primary" disabled={this.state.countdown}>
                            تلاش مجدد
                            {this.state.countdown &&
                            <span>در
                            <Countdown
                                date={Date.now() + 100000}
                                onComplete={this.triggerBtn}
                                renderer={({ hours, minutes, seconds, completed }) => {
                                    if (!completed)  return <span>{minutes}:{seconds}</span>;
                                }}
                            /> دیگر
                        </span>
                            }
                        </Button>
                        <Button variant="raised" onClick={this.handleFinal} color="primary">
                            پذیرش
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default Home