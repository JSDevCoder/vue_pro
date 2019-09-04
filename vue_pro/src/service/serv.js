import axios from '../request/axios'
import apis from '../request/apis'

export default {
    /**
     * 用户登录
     * @param {string} url 
     * @param {object} data 
     */
    login(mobile, password) {
        return axios.post(apis.login, {
            mobile,
            password
        }).catch(err => {
            console.log(err)
            alert('请求失败')
        });
    }
}