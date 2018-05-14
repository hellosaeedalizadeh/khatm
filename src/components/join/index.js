import React, {Component} from 'react'
import Typography from 'material-ui/Typography';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './index.scss'
import Button from 'material-ui/Button';
import ContactMail from '@material-ui/icons/ContactMail';
import email from "../../img/khatm-mail.png";
import {METADATA} from "../../meta";
import {RomanToArabic} from "../../helper";
import Link from "react-router-dom/Link";

const META = METADATA()

class Join extends Component{
    constructor(props) {
        super(props)

        this.state = {
            quotas: this.props.quotas
        }

        this.changeIsJoinVisible = this.changeIsJoinVisible.bind(this)
    }

    componentWillReceiveProps(np) {
        this.setState({quotas: np.quotas})
    }

    changeIsJoinVisible() {
        this.props.changeJoinVisible(false)
    }

    render() {
        //let percentage = Math.floor(Math.random() * 100)
        if(this.state.quotas === undefined || this.state.quotas.length <= 0) {
            return null
        }
        let khatmType = META[this.state.quotas[0].type].title
        return (
            <div className="join-khatm-card">
                <div className="right-box">

                    <Link to="/quotas">
                    <Button variant="raised" color="secondary">مشاهده سهم</Button>
                    </Link>

                    <Typography color="secondary" style={{textAlign: 'center'}} onClick={this.changeIsJoinVisible}>
                        دریافت سهم بیشتر
                    </Typography>

                </div>
                <div className="left-box">
                    <Typography variant="headline" component="h3" style={{lineHeight: '50px'}}/>

                    <div className="landing-box-1">
                        <Typography variant="headline" component="h3" style={{lineHeight: '50px'}}>
                            تبریک! {khatmType} {RomanToArabic(this.state.quotas[0].start_at)}
                            {this.state.quotas.length > 1 &&
                            ` تا پایان ${RomanToArabic(this.state.quotas[this.state.quotas.length - 1].start_at)}`
                            } به شما تعلق گرفت.
                        </Typography>

                        <Typography color="textSecondary">
                            در صورت تمایل٬ با درج ایمیل یا تلفن همراه ما می توانیم این سهم را به شما یادآوری کنیم.
                        </Typography>
                    </div>

                    <div className="reminder">
                        <div className="reminder-logo">
                            <ContactMail/>
                        </div>
                        <input type="text" placeholder="Email or Phone"/>
                        <button>ثبت</button>
                    </div>
                    <Typography color="textSecondary">
                        در صورت بروز هر گونه مشکل با <img src={email} className="image" /> تماس بگیرید.
                    </Typography>

                </div>
            </div>
        )
    }
}

export default Join