// var api_server = api_server + "/";


function ajaxCallPost(url, param, callbackSuccess, callbackFail) {
    console.log("=========================================================")
    console.log("endPoint : " + url);
    console.log(param);
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json",
        dataType: "JSON",
        data: JSON.stringify(param),
        success: function (res) {
            console.log(res);
            console.log("=========================================================")
            callbackSuccess(res);
        },
        error: function (xhr, status, error) {
            console.log(error);
            console.log("=========================================================")
            callbackFail(error);
        }
    });
}

function ajaxCallPostGet(url, callbackSuccess, callbackFail) {
    console.log("=========================================================")
    console.log("endPoint : " + url);

    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json",
        dataType: "JSON",
        data: null,
        success: function (res) {
            console.log(res);
            console.log("=========================================================")
            callbackSuccess(res);
        },
        error: function (xhr, status, error) {
            console.log(error);
            console.log("=========================================================")
            callbackFail(error);
        }
    });
}

function ajaxUpload(inputFile, subPash, callback) {
    console.log("file::::::::::::::::" + inputFile);
    var formData = new FormData();
    formData.append("file", inputFile);
    formData.append("sub_path", subPash);
    jQuery.ajax({
        url: "/api/file/ajaxupload"
        , type: "POST"
        , processData: false
        , contentType: false
        , data: formData
        , success: function (data_url) {
            callback(data_url)
        }
    });
}


function getreviewList() {
    review = "";
    $.ajax({
        type: "POST",
        url: api_server + "getreview",
        data: null,
        processData: false,
        contentType: false,
        async: false,
        success: function (data) {
            if (data.status == 200) {
                review = data.data;
            } else {


            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
    return review

}

function setReview(data) {
    var wholeLog = data;
    var log_table = getid("log_table").getElementsByTagName("tbody")[0];
    var prechildren = log_table.getElementsByTagName("tr");
    for (let j = prechildren.length - 1; j > 0; j--) {
        prechildren[j].remove();
    }

    let category = getCategory();
    for (let i = 0; i < wholeLog.length; i++) {
        let dataItem = wholeLog[i];
        let item = document.createElement("tr");
        let create_dt = document.createElement("td");
        let gallery_num = document.createElement('td');
        let package_name = document.createElement('td');
        let category_seq = document.createElement('td');
        category_seq.innerHTML = dataItem['category_seq'];
        for (let j = 0; j < category.length; j++) {
            if (category[j]['category_seq'] == dataItem['category_seq']) {
                category_seq.innerHTML = category[j]['name'];
            }
        }
        let tag = document.createElement('td');
        let addr = document.createElement('td');
        let show_yn = document.createElement('td');
        let copy = document.createElement('td');
        create_dt.innerHTML = dataItem['create_dt'];
        gallery_num.innerHTML = dataItem['gallery_num'];
        package_name.innerHTML = dataItem['package_name'];
        tag.innerHTML = dataItem['tag'];
        addr.innerHTML = dataItem['addr'];
        show_yn.innerHTML = dataItem['show_yn'];

        copy.innerHTML = "복사";
        item.appendChild(create_dt);
        item.appendChild(gallery_num);
        item.appendChild(category_seq);
        item.appendChild(package_name);
        item.appendChild(tag);
        item.appendChild(addr);
        item.appendChild(show_yn);
        item.appendChild(copy);
        log_table.appendChild(item);

    }

}
