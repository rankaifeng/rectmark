let baseUrl = "http://192.168.100.137:3000/";

/* POST 请求 */
export function httpPost(url, data, callBack) {
    httpRequest(url, "POST", data, callBack);
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
    alert(error);
}

function requestSuess(callBack, result) {
    setTimeout(() => {
        return callBack(result);
    }, 3000);
}

/* 用于判断是get请求还是post 因为默认get请求是没有body参数的 */
function fetchGetOrPost(url, data, type) {
    let fetchData = {
        method: type,
        mode: "cors",
        headers: addHeaders()
    };
    if (type === "POST") {
        fetchData.body = data;
    }
    return fetch(baseUrl + url, fetchData);
}

/* 添加header头部信息 */
function addHeaders() {
    let headers = {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    };
    return headers;
}
