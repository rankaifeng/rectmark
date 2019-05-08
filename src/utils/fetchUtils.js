let baseUrl = "http://192.168.100.137:3001/";

/* POST 请求 */
export function httpPost(url, data, callBack) {
    httpRequest(url, data, 'PUT', callBack);
}

/* GET 请求 */
export function httpGet(url, callBack) {
    httpRequest(url, "", "GET", callBack);
}

/* 网络请求统一调用 */
function httpRequest(url, data, type, callBack) {
    fetchGetOrPost(url, data, type)
        .then(response => response.json())
        .then(res => requestSuess(callBack, res))
        .catch(error => requestError(error));
}

function requestError(error) {
    alert("连接服务器失败！");
}

function requestSuess(callBack, result) {
    callBack(result.data);
}

/* 用于判断是get请求还是post 因为默认get请求是没有body参数的 */
function fetchGetOrPost(url, data, type) {
    let fetchData = {
        method: type,
        mode: "cors",
        headers: addHeaders()
    };
    if (type === "PUT") {
        fetchData.body = JSON.stringify(data);
    }
    return fetch(`${baseUrl}${url}`, fetchData);
}

/* 添加header头部信息 */
function addHeaders() {
    return {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    };
}
