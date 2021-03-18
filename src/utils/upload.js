import axios from 'axios'
import { Notify } from 'vant'

export function SimpleFormUploadToQiniu(staticData, file){
    return new Promise((resolve,reject) =>{
        var fromData = new FormData()
        fromData.append('key', staticData.file_path)
        fromData.append('token', staticData.token)
        fromData.append('file', file)
        fromData.append('accept', 'application/json')
        
        let config = {
            timeout:1000,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        axios.post(staticData.upload_url,fromData,config).then((rsp) => {
            resolve(rsp)
        }).catch((error) =>{
            Notify({ type: 'danger', message: error.message })
            reject.apply(error)
            console.log(error)
        })

    })
}

export function SimpleFormUploadToQiniuWithForm(formData,url){
    return new Promise((resolve,reject) =>{
        let config = {
            // withCredentials: true, 
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        axios.post(url,formData,config).then((rsp) => {
            resolve(rsp)
        }).catch((error) =>{
            Notify({ type: 'danger', message: error.message })
            reject.apply(error)
            console.log(error)
        })

    })
}