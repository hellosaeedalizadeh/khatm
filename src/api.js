import axios from 'axios';
import {getLocalStorage, setLocalStorage} from "./localStorage";

const base = 'http://139.59.210.242:8080'
const api = {
    login: base + '/user/login',
    verify: base + '/user/verify',
    collectives: base + '/khatm',
    create: base + '/khatm/create',
    userQuotas: base + '/quote/',
    khatms: base + '/khatm',
    features: base + '/khatm/features',
    public: base + '/khatm/publics'
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function login(credential) {
    let data = {}
    if(!!credential && validateEmail(credential)) {
        data.email = credential
    } else {
        data.phone = !!credential ? credential : ''
    }

    return axios.post(api.login, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function verify(credential, code) {
    let data = {}
    if(!!credential && validateEmail(credential)) {
        data.email = credential
    } else {
        data.phone = !!credential ? credential : ''
    }

    data.code = code

    return axios.post(api.verify, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function getFeatures() {
    return axios.get(api.features, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function getCollectives() {
    return axios.get(api.public, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function getAllKhatms() {
    let user = getLocalStorage('khatm-token')

    return axios.get(api.khatms, {
        headers: {
            'Content-Type': 'application/json',
            token: user.token
        }
    })
}

export function getKhatms(id) {
    let user = getLocalStorage('khatm-token')

    return axios.get(api.khatms + '/' + id, {
        headers: {
            'Content-Type': 'application/json',
            token: user.token
        }
    })
}

export function getQuotas() {
    let user = getLocalStorage('khatm-token')

    return axios.get(api.userQuotas, {
        headers: {
            'Content-Type': 'application/json',
            token: user.token
        }
    })
}

export function createKhatm(data) {
    let user = getLocalStorage('khatm-token')

    return axios.post(api.create, data, {
        headers: {
            'Content-Type': 'application/json',
            token: user.token
        }
    })
}

export function getQuitas(khatmId, quotas) {
    let url = base + `/khatm/${khatmId}/quote/${quotas}`
    let user = getLocalStorage('khatm-token')

    return axios.post(url, null, {
        headers: {
            'Content-Type': 'application/json',
            token: user.token
        }
    })
}

export function finishQuota(khatmId, quote) {
    let url = base + `/quote/${khatmId}`
    let user = getLocalStorage('khatm-token')
    console.log(quote)
    return axios.put(url, quote, {
        headers: {
            'Content-Type': 'application/json',
            token: user.token
        }
    })
}

export function changeIsPublic(khatm) {
    let user = getLocalStorage('khatm-token')

    return axios.put(api.khatms + '/' + khatm.id, khatm, {
        headers: {
            'Content-Type': 'application/json',
            token: user.token
        }
    })
}