

//
// var api_server = api_server+"/";

function getip() {
    $.getJSON("https://api.ipify.org/?format=json", function (e) {
        console.log(e.ip);
    });
}

function ismoblie() {
    // 디바이스 종류 설정
    var pc_device = "win16|win32|win64|mac|macintel";

    // 접속한 디바이스 환경
    var this_device = navigator.platform;

    if (this_device) {

        if (pc_device.indexOf(navigator.platform.toLowerCase()) < 0) {
            console.log('MOBILE');
            return true;
            // return false;
        } else {
            console.log('PC');
            return false;
        }

    }
}

function globallog(content) {

    $.getJSON("https://api.ipify.org/?format=json", function (e) {
        ip = e.ip;
        member_seq = sessionStorage.getItem("member_seq");
        name = sessionStorage.getItem("name");
        device_type = "PC";
        if (ismoblie()) {
            device_type = "MOBILE";
        }
        var formData = new FormData();
        formData.append("member_seq", member_seq);
        formData.append("ip", ip);
        formData.append("content", content);
        formData.append("device_type", device_type);
        formData.append("name", name);
        $.ajax({
            type: "POST",
            url: api_server + "globallog",
            data: formData,
            processData: false,
            contentType: false,

            success: function (data) {
                console.log("log writed" + data.status);
                console.log("log writed" + data.err);
            }
            ,
            err: function (err) {
                alert(err.status);
            }
        });


    });


}

function login() {

    var formData = new FormData();
    var nametext = document.getElementById("nametext");
    var passtext = document.getElementById("passtext");
    formData.append("id", nametext.value);
    formData.append("password", sha256(passtext.value));

    $.ajax({
        type: "POST",
        url: api_server + "adlogin",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            if (data.status == 200) {
                sessionStorage.setItem("isLogin", "1");
                sessionStorage.setItem("member_type", data.member_type);
                sessionStorage.setItem("member_id", data.id);
                sessionStorage.setItem("member_seq", data.member_seq);
                sessionStorage.setItem("name", data.name);


                globallog("로그인 성공");

                alert("로그인에 성공했습니다.")
                location.href = "/";

            } else {
                sessionStorage.setItem("isLogin", "0");
                globallog("로그인 실패");
                alert("로그인에 실패하였습니다.");
            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });


}

function logout() {
    sessionStorage.setItem("isLogin", "0");
    sessionStorage.setItem("member_type", "0");
    sessionStorage.setItem("member_id", "0");
    alert("로그아웃 되었습니다.");
    location.href = "/login";

}

function getlog() {

    logs = "";


    $.ajax({
        type: "POST",
        url: api_server + "getlog",
        data: null,
        processData: false,
        contentType: false,
        async: false,
        success: function (data) {
            if (data.status == 200) {
                logs = data.data;
            } else {


            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
    return logs

}


function getdeletebox() {

    deletebox = "";


    $.ajax({
        type: "POST",
        url: api_server + "getdeletebox",
        data: null,
        processData: false,
        contentType: false,
        async: false,
        success: function (data) {
            if (data.status == 200) {
                deletebox = data.data;
            } else {


            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
    return deletebox

}

function deletelog(log_seq) {

    var formData = new FormData();
    formData.append("log_seq", log_seq);

    $.ajax({
        type: "POST",
        url: api_server + "deletelog",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            if (data.status == 200) {
                alert("로그가 삭제되었습니다.");
            } else {
                alert("로그 삭제에 실패했습니다.");
            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });

}

