const fetch = window.fetch;

export function getToken() {
    return localStorage.getItem("token");
    //211
    // return 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjE3LCJhY2NvdW50IjoiIiwidXNlcl9uYW1lIjoiIiwicGhvbmUiOiIiLCJ3b2tlciI6IiIsIm1haWwiOiIiLCJzdGF0ZSI6MCwibGVhZGVyX2lkIjowLCJkZXBhcnRtZW50X2lkIjowLCJyb2xlX2lkIjowLCJsYXN0X2xvZ2luX2lwIjoiIiwiY29tcGFueV9pZCI6MCwibGFzdF9sb2dpbl90aW1lIjowLCJkYXRhX3Blcm1pc3Npb25zIjoiIiwiaWF0IjoxNTg5OTY4OTE1fQ.SWaDOluUsWUrbd0r-th2btf2hnDkRMXfOA1lHf9t4Uw';
    //148
    // return 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiYWNjb3VudCI6IiIsInVzZXJfbmFtZSI6IiIsInBob25lIjoiIiwid29rZXIiOiIiLCJtYWlsIjoiIiwic3RhdGUiOjAsImxlYWRlcl9pZCI6MCwiZGVwYXJ0bWVudF9pZCI6MCwicm9sZV9pZCI6MCwibGFzdF9sb2dpbl9pcCI6IiIsImNvbXBhbnlfaWQiOjAsImxhc3RfbG9naW5fdGltZSI6MCwiZGF0YV9wZXJtaXNzaW9ucyI6IiIsImlhdCI6MTU5MDA1MjY5Nn0.eWnmHFV6JDKN_duZXykG0K5tmWKIpkvZD8YGP3CcxwQ';
}
const systemId = window.systemId;
const formatPagination = res => {
    if (typeof res.pagination === "object"){
        res.pagination = {
            ...res.pagination,
            current: res.pagination.currentPage,
            pageSize: res.pagination.listRows,
            total: res.pagination.totalRows,
        }
    }
    return res;
}
export default function request(url, body){
    const defaultOptions = {
        method: 'POST',
        credentials: "include",
        headers: {
          Accept: "application/json",
        //   Authorization: `${getToken()}`
        }
    };
    const newOptions = { ...defaultOptions, body };
    if (!(body instanceof FormData)) {
        newOptions.headers = {
          ...newOptions.headers,
          "Content-Type": "application/json; charset=utf-8"
        };
        newOptions.body = JSON.stringify({ ...newOptions.body, systemId: window.systemId });
    }

    return fetch(url, newOptions )
    .then(res => res.json())
    .then(res => {
        if (res.status){
            if (res.status === 1003) {
                try{
                    window.$$app._store.dispatch({
                        type: "login/reLogin"
                    });
                }catch(e){
                    console.log(e)
                    throw res;
                }
                
            } else {
                throw res;
            }
        }
        return formatPagination(res);
    })
}

export function syncRequest(url, body){ //同步请求
    const params = body || {}
    return new Promise((resolve, reject) => {
        const oAjax = new XMLHttpRequest();
        oAjax.open("POST", url, false);  //false同步请求  （true异步）
        oAjax.setRequestHeader("Content-type", "application/json; charset=utf-8");
        oAjax.setRequestHeader("Authorization", getToken() );
        oAjax.onreadystatechange = function() {
          if (oAjax.readyState === 4 && oAjax.status === 200) {
            console.log(oAjax);
            resolve(JSON.parse(oAjax.responseText));
          } else {
            console.log(oAjax);
          }
        };
        oAjax.send(
            JSON.stringify({
                ...params, 
                systemId: systemId, 
            })
        );
    });
}