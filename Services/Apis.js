import axios from 'axios'
const constant = require('./Constants')
export default{
    
    Add : function(){
        return axios.post(constant.URL + constant.Add)
    },
}