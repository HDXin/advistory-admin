import Axios from 'axios';
import $config from './config';
import Cookies from 'js-cookie';
let baseUrl = $config.apiUrlPrefix[$config.env.NODE_ENV]
const token = Cookies.get('_MCH_AT');
let axios = Axios.create({
    baseURL: baseUrl,
    headers:{
        token: token,
        withCredentials: true
    }
})


/**
 * api
 * 
 * @export
 * @class Api
 * 静态方法 get post put delete
 * 
 * @url 请求路径
 * @pkId 主键
 * @actions 基于url上扩展的方法  
 * 
 */
/** 
 * actions 事例
{
    approval: {
        method: 'put', 
        url: 'approval/{id}'
    }
}
*/
export default class Api {
    constructor(url, pkId, actions = {}) {
        if (!/\/$/.test(url)) {
            url = url + '/';
        }
        this.url = url;
        this.pkId = pkId;
        // 基于baseUrl上扩展的请求
        Object.keys(actions).forEach(key => {
            this[key] = (data, otherOptions) => {
                let url = formatUrl(this.url + actions[key].url, data);
                return send(url, data, otherOptions, actions[key].method);
            }
        })

    }

    get(data, otherOptions) {
        let url = `${this.url}{${this.pkId}}`;
        url = formatUrl(url, data);
        return send(url, data, otherOptions);
    }
    query(data, otherOptions) {
        const url = this.url.substring(0, this.url.length - 1)
        return send(url, data, otherOptions);
    }
    create(data, otherOptions) {
        const url = this.url.substring(0, this.url.length - 1)
        return send(url, data, otherOptions, 'post');
    }
    update(data, otherOptions) {
        let url = `${this.url}{${this.pkId}}`;
        url = formatUrl(url, data);
        return send(url, data, otherOptions, 'put');
    }
    delete(data, otherOptions) {
        let url = `${this.url}{${this.pkId}}`;
        url = formatUrl(url, data);
        return send(url, data, otherOptions, 'delete');
    }


    static get(url, data, otherOptions) {
        url = formatUrl(url, data);
        return send(url, data, otherOptions);
    }
    static post(url, data, otherOptions) {
        url = formatUrl(url, data);
        return send(url, data, otherOptions, 'post');
    }
    static put(url, data, otherOptions) {
        url = formatUrl(url, data);
        return send(url, data, otherOptions, 'put');
    }
    static delete(url, data, otherOptions) {
        url = formatUrl(url, data);
        return send(url, data, otherOptions, 'delete');
    }
}
function send(url, data, otherOptions, method = 'get') {
    return new Promise((resolve, reject) => {
        let config = {};
        if (method == 'get') {
            config = Object.assign({}, { url: url, method: method, params: data }, otherOptions);
        } else {
            config = Object.assign({}, { url: url, method: method, data: data }, otherOptions);
        }
        axios.request(config).then((res) => {
            // if (!res.data) res.data = { code: 200 };
            resolve(res.data);
        }).catch(({ response }) => {
            let { data } = response;
            console.log(response);
            if (response.status == '401') {
                global.$moduleMain.$message.error('请先登录');
                window.loaction.href = '/portal';
            } else {
                reject(data);
            }
        })
    })
}



function isFormatUrl(url) {
    return url.indexOf("{") !== -1 && url.indexOf("}") !== -1;
}

function formatUrl(url, dataModel, options = {}) {
    if (!options.hasOwnProperty("removeFormatModelProp")) {
        //默认移除datamodel中的已经在url中使用的format属性
        options.removeFormatModelProp = true;
    }
    if (isFormatUrl(url)) {
        if (dataModel) {
            Object.keys(dataModel).forEach(function (key) {
                var varName = "{" + key + "}";
                if (url.indexOf(varName) !== -1) {
                    url = url.replace(new RegExp(varName, "gm"), dataModel[key]);
                    //格式化url后是否将datamodel中的对应属性移除
                    if (options.removeFormatModelProp) {
                        delete dataModel[key];
                    }
                }
            });
        } else {
            url.split("{").forEach(function (item) {
                if (item.indexOf("}") === item.length - 1) {
                    url = url.replace("{" + item, "");
                }
            });

        }
        return url;
    } else {
        return url;
    }
}





