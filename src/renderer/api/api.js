import axios from 'axios'

var baseURL = 'http://localhost:3000/';

export default {
    POST: function (url, params, callback) {
        let requestURL = baseURL + url;
        axios.post(requestURL, '{}', {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => {
                //判断接口规范
                if (response.status === 200) {
                    callback(response.data);
                } else {
                    console.log('请求失败');
                }
            })
            .catch(function (error) {
                console.log(error);
            })

    },
    GET: function (url, params, callback) {
        let requestURL = baseURL + url;
        axios.get(requestURL, {
                params
            })
            .then((response) => {
                console.log('GET##接口url：' + requestURL + '\n##请求参数\n' + JSON.stringify(params));
                //判断接口规范
                if (response.status === 200) {
                    callback(response.data);
                } else {
                    console.log('请求失败');
                }
                // console.log(response);//请求正确时执行的代码
            }).catch(function (response) {
                console.log(response); //发生错误时执行的代码

            })

    }
}
