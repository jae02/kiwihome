// var api_server = "http://localhost:5222/";
var api_server = "http://teambox.kr:5222/";
var optionForm = "";
var categoryinfo = "";
var codi = "";
var q_categoryinfo = "";

function getid(id) {
    return document.getElementById(id);
}

function getclass(name) {
    return document.getElementsByClassName(name)[0];
}

function getclass(name, index) {
    return document.getElementsByClassName(name)[index];
}

function isEmpty(value) {
    if (value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)) {
        return true
    } else {
        return false
    }

}

function generate_token(length) {
    //edit the token allowed characters
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];
    for (var i = 0; i < length; i++) {
        var j = (Math.random() * (a.length - 1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}


function checkIsLogin() {
    if (sessionStorage.getItem("isLogin") == "1") {
        var type = sessionStorage.getItem("member_type");
        var member_type = sessionStorage.getItem("member_type");
        var id = sessionStorage.getItem("member_id");

        var strtype = "";
        if (type == "M") {
            strtype = "최고 관리자 : " + id;
        } else if (type == "A") {
            strtype = "관리자 : " + id;
        } else if (type == "C") {
            strtype = "상담사 : " + id;
        }
        document.getElementsByClassName("menu-header")[0].innerHTML = strtype;

    } else {
        alert("로그인 후 이용해주세요.")
        location.href = "/login";
    }

}

function moveLocation(location1) {
    location.href = "/" + location1;

}

function getQueryStringObject() {
    var a = window.location.search.substr(1).split('&');
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
        var p = a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
}

function setText(id, text) {
    document.getElementById(id).innerHTML = text;
}

function pageNumber(array) {
    let page = 0;
    if (array.length % 10 == 0) {
        page = array.length / 10;

    } else {
        page = array.length / 10 + 1;
    }
    page = parseInt(page);
    return page;
}

function logstart(data) {

    // <li class="page-item">
    //     <a class="page-link">1
    //     </a>
    // </li>
    //

    var wholeLog = data;
    var pageNm = pageNumber(wholeLog)

    var pagediv = getid("page");
    for (let i = 0; i < pageNm; i++) {
        let item = document.createElement("li");
        item.classList.add("page-item")
        let item1 = document.createElement("a");
        item1.classList.add("page-link");
        item1.innerHTML = i + 1;
        item.appendChild(item1);
        pagediv.appendChild(item);

        item.onclick = function () {
            setLog(wholeLog, i + 1);
        };
    }
}

function consultstart(data) {

    // <li class="page-item">
    //     <a class="page-link">1
    //     </a>
    // </li>
    //
    var wholeconsult = data;
    var pageNm = pageNumber(wholeconsult)

    var pagediv = getid("page");
    for (let i = 0; i < pageNm; i++) {
        let item = document.createElement("li");
        item.classList.add("page-item")
        let item1 = document.createElement("a");
        item1.classList.add("page-link");
        item1.innerHTML = i + 1;
        item.appendChild(item1);
        pagediv.appendChild(item);

        item.onclick = function () {
            setconsult(wholeconsult, i + 1);
        };
    }
}

function consultstarttrans(data) {

    // <li class="page-item">
    //     <a class="page-link">1
    //     </a>
    // </li>
    //
    var wholeconsult = data;
    var pageNm = pageNumber(wholeconsult)

    var pagediv = getid("page");
    for (let i = 0; i < pageNm; i++) {
        let item = document.createElement("li");
        item.classList.add("page-item")
        let item1 = document.createElement("a");
        item1.classList.add("page-link");
        item1.innerHTML = i + 1;
        item.appendChild(item1);
        pagediv.appendChild(item);

        item.onclick = function () {
            setconsultrans(wholeconsult, i + 1);
        };
    }
}

function memberstart(data) {

    // <li class="page-item">
    //     <a class="page-link">1
    //     </a>
    // </li>
    //

    var wholeLog = data;
    var pageNm = pageNumber(wholeLog)

    var pagediv = getid("page");
    for (let i = 0; i < pageNm; i++) {
        let item = document.createElement("li");
        item.classList.add("page-item")
        let item1 = document.createElement("a");
        item1.classList.add("page-link");
        item1.innerHTML = i + 1;
        item.appendChild(item1);
        pagediv.appendChild(item);

        item.onclick = function () {
            setmember(wholeLog, i + 1);
        };
    }
}

function setLog(data, page) {


    var pagediv = getid("page");
    pageBtns = pagediv.getElementsByClassName("page-item");
    pageNm = pageNumber(data)
    for (let i = 0; i < pageNm; i++) {
        pageBtns[i].classList.remove("active");
    }
    pageBtns[page - 1].classList.add("active");

    var wholeLog = data;
    var logdata = wholeLog;

    if (wholeLog.length > 10) {
        // 페이징이 필요할 때

        if (wholeLog.length >= page * 10) {
            // 중간 페이지 일 때
            logdata = logdata.slice(page * 10 - 10, page * 10);
        } else {
            // 마지막 페이지일 때

            logdata = logdata.slice(page * 10 - 10, wholeLog.length);
        }
    }
    var log_table = getid("log_table").getElementsByTagName("tbody")[0];
    var prechildren = log_table.getElementsByTagName("tr");
    for (let j = prechildren.length - 1; j > 0; j--) {
        prechildren[j].remove();
    }


    for (let i = 0; i < logdata.length; i++) {
        let dataItem = logdata[i];
        let item = document.createElement("tr");
        let nm = document.createElement('td');
        let name = document.createElement('td');
        let ip = document.createElement('td');
        let content = document.createElement('td');
        let dt = document.createElement('td');
        let delete1 = document.createElement('td');
        nm.innerHTML = dataItem['log_seq'];
        name.innerHTML = dataItem['member_name'];
        ip.innerHTML = dataItem['ip'];
        content.innerHTML = dataItem['content'];
        dt.innerHTML = dataItem['create_dt'];
        delete1.innerHTML = "삭제";
        item.appendChild(nm);
        item.appendChild(name);
        item.appendChild(ip);
        item.appendChild(content);
        item.appendChild(dt);
        item.appendChild(delete1);
        log_table.appendChild(item);

        delete1.onclick = function () {

            var formData = new FormData();
            formData.append("log_seq", dataItem['log_seq']);

            $.ajax({
                type: "POST",
                url: api_server + "disablelog",
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {
                    if (data.status == 200) {
                        alert("로그가 삭제되었습니다.");
                        location.href = "/log";
                    } else {
                        alert("로그 삭제에 실패했습니다.");
                        alert(data.err);
                    }
                }
                ,
                err: function (err) {
                    alert(err.status);
                }
            });


        };
    }

}

function setconsultrans(data, page) {


    var pagediv = getid("page");
    pageBtns = pagediv.getElementsByClassName("page-item");
    pageNm = pageNumber(data)
    for (let i = 0; i < pageNm; i++) {
        pageBtns[i].classList.remove("active");
    }
    pageBtns[page - 1].classList.add("active");

    var wholeLog = data;
    var logdata = wholeLog;

    if (wholeLog.length > 10) {
        // 페이징이 필요할 때

        if (wholeLog.length >= page * 10) {
            // 중간 페이지 일 때
            logdata = logdata.slice(page * 10 - 10, page * 10);
        } else {
            // 마지막 페이지일 때

            logdata = logdata.slice(page * 10 - 10, wholeLog.length);
        }
    }
    var log_table = getid("log_table").getElementsByTagName("tbody")[0];
    var prechildren = log_table.getElementsByTagName("tr");
    for (let j = prechildren.length - 1; j > 0; j--) {
        prechildren[j].remove();
    }

// 순번	접수 채널	견적 번호	고객명	주소	작업	상태	작성일시	담당자	업체평가	삭제
    for (let i = 0; i < logdata.length; i++) {
        let dataItem = logdata[i];
        let item = document.createElement("tr");
        let consulting_seq = document.createElement('td');
        let consulting_send_type = document.createElement('td');
        let consulting_num = document.createElement('td');
        let name = document.createElement('td');
        let addr = document.createElement('td');
        let work = document.createElement('td');
        let delete1 = document.createElement('td');


        consulting_seq.innerHTML = dataItem['consulting_seq'];
        consulting_send_type.innerHTML = dataItem['consulting_send_type'] == 'OFF' ? '쇼룸' : '온라인';
        consulting_num.innerHTML = dataItem['consulting_num'];
        name.innerHTML = dataItem['name'];
        addr.innerHTML = dataItem['addr'];
        work.innerHTML = dataItem['work'];
        delete1.innerHTML = '삭제';
        item.appendChild(consulting_seq);
        item.appendChild(consulting_send_type);
        item.appendChild(consulting_num);
        item.appendChild(name);
        item.appendChild(addr);
        item.appendChild(work);
        item.appendChild(delete1);
        item.onclick = function () {

            moveLocation('itr_visit_est_write_example?seq=' + dataItem['consulting_seq']);
        };
        log_table.appendChild(item);

        // delete1.onclick = function () {
        //
        //     var formData = new FormData();
        //     formData.append("log_seq", dataItem['log_seq']);
        //
        //     $.ajax({
        //         type: "POST",
        //         url: api_server + "disablelog",
        //         data: formData,
        //         processData: false,
        //         contentType: false,
        //         success: function (data) {
        //             if (data.status == 200) {
        //                 alert("로그가 삭제되었습니다.");
        //                 location.href = "/log";
        //             } else {
        //                 alert("로그 삭제에 실패했습니다.");
        //                 alert(data.err);
        //             }
        //         }
        //         ,
        //         err: function (err) {
        //             alert(err.status);
        //         }
        //     });
        //
        //
        // };
    }

}

function setconsult(data, page) {


    var pagediv = getid("page");
    pageBtns = pagediv.getElementsByClassName("page-item");
    pageNm = pageNumber(data)
    for (let i = 0; i < pageNm; i++) {
        pageBtns[i].classList.remove("active");
    }
    pageBtns[page - 1].classList.add("active");

    var wholeLog = data;
    var logdata = wholeLog;

    if (wholeLog.length > 10) {
        // 페이징이 필요할 때

        if (wholeLog.length >= page * 10) {
            // 중간 페이지 일 때
            logdata = logdata.slice(page * 10 - 10, page * 10);
        } else {
            // 마지막 페이지일 때

            logdata = logdata.slice(page * 10 - 10, wholeLog.length);
        }
    }
    var log_table = getid("log_table").getElementsByTagName("tbody")[0];
    var prechildren = log_table.getElementsByTagName("tr");
    for (let j = prechildren.length - 1; j > 0; j--) {
        prechildren[j].remove();
    }

// 순번	접수 채널	견적 번호	고객명	주소	작업	상태	작성일시	담당자	업체평가	삭제
    for (let i = 0; i < logdata.length; i++) {
        let dataItem = logdata[i];
        let item = document.createElement("tr");
        let consulting_seq = document.createElement('td');
        let consulting_send_type = document.createElement('td');
        let consulting_num = document.createElement('td');
        let name = document.createElement('td');
        let addr = document.createElement('td');
        let work = document.createElement('td');
        let delete1 = document.createElement('td');


        consulting_seq.innerHTML = dataItem['consulting_seq'];
        consulting_send_type.innerHTML = dataItem['consulting_send_type'] == 'OFF' ? '쇼룸' : '온라인';
        consulting_num.innerHTML = dataItem['consulting_num'];
        name.innerHTML = dataItem['name'];
        addr.innerHTML = dataItem['addr'];
        work.innerHTML = dataItem['work'];
        delete1.innerHTML = '삭제';
        item.appendChild(consulting_seq);
        item.appendChild(consulting_send_type);
        item.appendChild(consulting_num);
        item.appendChild(name);
        item.appendChild(addr);
        item.appendChild(work);
        item.appendChild(delete1);
        item.onclick = function () {

            moveLocation('itr_est_list_detail?seq=' + dataItem['consulting_seq']);
        };
        log_table.appendChild(item);

        // delete1.onclick = function () {
        //
        //     var formData = new FormData();
        //     formData.append("log_seq", dataItem['log_seq']);
        //
        //     $.ajax({
        //         type: "POST",
        //         url: api_server + "disablelog",
        //         data: formData,
        //         processData: false,
        //         contentType: false,
        //         success: function (data) {
        //             if (data.status == 200) {
        //                 alert("로그가 삭제되었습니다.");
        //                 location.href = "/log";
        //             } else {
        //                 alert("로그 삭제에 실패했습니다.");
        //                 alert(data.err);
        //             }
        //         }
        //         ,
        //         err: function (err) {
        //             alert(err.status);
        //         }
        //     });
        //
        //
        // };
    }

}

function setmember(data, page) {


    var pagediv = getid("page");
    pageBtns = pagediv.getElementsByClassName("page-item");
    pageNm = pageNumber(data)
    for (let i = 0; i < pageNm; i++) {
        pageBtns[i].classList.remove("active");
    }
    pageBtns[page - 1].classList.add("active");

    var wholeLog = data;
    var logdata = wholeLog;

    if (wholeLog.length > 10) {
        // 페이징이 필요할 때

        if (wholeLog.length >= page * 10) {
            // 중간 페이지 일 때
            logdata = logdata.slice(page * 10 - 10, page * 10);
        } else {
            // 마지막 페이지일 때

            logdata = logdata.slice(page * 10 - 10, wholeLog.length);
        }
    }
    var log_table = getid("log_table").getElementsByTagName("tbody")[0];
    var prechildren = log_table.getElementsByTagName("tr");
    for (let j = prechildren.length - 1; j > 0; j--) {
        prechildren[j].remove();
    }


    for (let i = 0; i < logdata.length; i++) {
        // <th>순번</th>
        //                <th>아이디</th>
        //                <th>이름</th>
        //                <th>전화번호</th>
        //                <th>주소</th>
        //                <th>가입일</th>
        //                <th>메시지</th>
        //                <th>삭제</th>
        let dataItem = logdata[i];
        let item = document.createElement("tr");
        let member_seq = document.createElement('td');
        let id = document.createElement('td');
        let name = document.createElement('td');
        let phone = document.createElement('td');
        let addr = document.createElement('td');
        let create_dt = document.createElement('td');
        let message = document.createElement('td');
        let delete1 = document.createElement('td');
        let delete2 = document.createElement('td');
        member_seq.innerHTML = dataItem['member_seq'];
        id.innerHTML = dataItem['id'];
        name.innerHTML = dataItem['name'];
        phone.innerHTML = dataItem['phone'];
        addr.innerHTML = dataItem['addr'];
        create_dt.innerHTML = dataItem['create_dt'];
        message.innerHTML = "메세지";
        delete1.innerHTML = "삭제";
        delete2.innerHTML = "삭제";
        item.appendChild(member_seq);
        item.appendChild(id);
        item.appendChild(name);
        item.appendChild(phone);
        item.appendChild(addr);
        item.appendChild(create_dt);
        item.appendChild(message);
        item.appendChild(delete1);
        item.appendChild(delete2);
        log_table.appendChild(item);

    }

}


function deleteboxstart(data) {

    // <li class="page-item">
    //     <a class="page-link">1
    //     </a>
    // </li>
    //

    var wholeLog = data;
    var pageNm = pageNumber(wholeLog)

    var pagediv = getid("page");
    for (let i = 0; i < pageNm; i++) {
        let item = document.createElement("li");
        item.classList.add("page-item")
        let item1 = document.createElement("a");
        item1.classList.add("page-link");
        item1.innerHTML = i + 1;
        item.appendChild(item1);
        pagediv.appendChild(item);

        item.onclick = function () {
            setDeleteBox(wholeLog, i + 1);
        };
    }
}


function setDeleteBox(data, page) {


    var pagediv = getid("page");
    pageBtns = pagediv.getElementsByClassName("page-item");
    pageNm = pageNumber(data)
    for (let i = 0; i < pageNm; i++) {
        pageBtns[i].classList.remove("active");
    }
    pageBtns[page - 1].classList.add("active");

    var wholeLog = data;


    var logdata = wholeLog;

    if (wholeLog.length > 10) {
        // 페이징이 필요할 때

        if (wholeLog.length >= page * 10) {
            // 중간 페이지 일 때
            logdata = logdata.slice(page * 10 - 10, page * 10);
        } else {
            // 마지막 페이지일 때

            logdata = logdata.slice(page * 10 - 10, wholeLog.length);
        }
    }
    var log_table = getid("log_table").getElementsByTagName("tbody")[0];
    var prechildren = log_table.getElementsByTagName("tr");
    for (let j = prechildren.length - 1; j > 0; j--) {
        prechildren[j].remove();
    }


    for (let i = 0; i < logdata.length; i++) {
        let dataItem = logdata[i];
        let item = document.createElement("tr");
        let nm = document.createElement('td');
        let name = document.createElement('td');
        let ip = document.createElement('td');
        let content = document.createElement('td');
        let dt = document.createElement('td');
        let delete1 = document.createElement('td');
        nm.innerHTML = dataItem['box_seq'];
        name.innerHTML = dataItem['category'];
        ip.innerHTML = dataItem['create_dt'];
        content.innerHTML = dataItem['name'];
        dt.innerHTML = dataItem['reason'];
        delete1.innerHTML = "복원";
        item.appendChild(nm);
        item.appendChild(name);
        item.appendChild(ip);
        item.appendChild(content);
        item.appendChild(dt);
        item.appendChild(delete1);
        log_table.appendChild(item);

    }

}

function searchLog(keyword) {
    let result = [];
    for (let i = 0; i < log.length; i++) {
        if (log[i]['content'].includes(keyword)) {
            result.push(log[i]);
        }
    }
    return result;
}

function searchLogDelete(keyword) {
    let result = [];
    for (let i = 0; i < deletebox.length; i++) {
        if (deletebox[i]['name'].includes(keyword) || deletebox[i]['reason'].includes(keyword) || deletebox[i]['category'].includes(keyword)) {
            result.push(deletebox[i]);
        }
    }
    return result;
}

function onSearchClick() {
    let keyword = getid('keyword').value;
    let localdata = searchLog(keyword);
    setLog(localdata, 1);

}

function onSearchClickDelete() {
    let keyword = getid('keyword').value;
    let localdata = searchLogDelete(keyword);
    setDeleteBox(localdata, 1);

}

function onDateChange() {
    let result = [];
    let date = new Date(getid('date').value);
    for (let i = 0; i < log.length; i++) {
        let date2 = new Date(log[i]['create_dt']);

        if (date.getFullYear() == date2.getFullYear() && date.getMonth() == date2.getMonth() && date.getDate() == date2.getDate()) {
            result.push(log[i]);
        }
    }
    setLog(result, 1);
}

function onDateChangeDelete() {
    let result = [];
    let date = new Date(getid('date').value);
    for (let i = 0; i < deletebox.length; i++) {
        let date2 = new Date(deletebox[i]['create_dt']);

        if (date.getFullYear() == date2.getFullYear() && date.getMonth() == date2.getMonth() && date.getDate() == date2.getDate()) {
            result.push(deletebox[i]);
        }
    }
    setDeleteBox(result, 1);
}

function loadOptions() {

    $.ajax({
        url: "/options",
        async: false,
        success: function (data) {
            // 옵션 form 글로벌 저장
            optionForm = data;
            return data;
        }, err: function (err) {
            alert(err);
        },

        dataType: 'html'
    });
}

function optionChange(index1) {
    let index = parseInt(index1);
    let check = getid('optionlist').getElementsByClassName('selectgroup-item')[index].getElementsByTagName('input')[0].checked;
    alert(check);
    // document.getElementsByClassName('optionCon')[0].innerHTML += optionForm;
}

function execDaumPostcode(element) {
    new daum.Postcode({
        oncomplete: function (data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var extraRoadAddr = ''; // 참고 항목 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== '' && data.apartment === 'Y') {
                extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (extraRoadAddr !== '') {
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            element.value = roadAddr;


        }
    }).open();
}

function getCategory() {
    category = "";
    $.ajax({
        type: "POST",
        url: api_server + "getcategory",
        data: null,
        processData: false,
        contentType: false,
        async: false,
        success: function (data) {
            if (data.status == 200) {
                category = data.data;
            } else {


            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
    return category

}

function getconsultdetail() {
    consultdetail = "";
    if (isEmpty(consulting_seq)) {
        alert("선택된 견적서가 없습니다.");
        return;
    }
    let formData = new FormData();
    formData.append("consulting_seq", consulting_seq);
    $.ajax({
        type: "POST",
        url: api_server + "getconsultdetail",
        data: formData,
        processData: false,
        contentType: false,
        async: false,
        success: function (data) {
            if (data.status == 200) {
                consultdetail = data.data;
                return consultdetail;
            } else {

                alert(data.err);

            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
    return consultdetail;

}

function getallquestion() {
    getallquestion = "";
    $.ajax({
        type: "POST",
        url: api_server + "getallquestion",
        data: null,
        processData: false,
        contentType: false,
        async: false,
        success: function (data) {
            if (data.status == 200) {
                getallquestion = data.data;
            } else {

                alert(data.err);

            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
    return getallquestion

}

function setCategory(data) {

    // <a class="dropdown-item" onclick="setText('selector1','부엌');">부엌</a>
    let con = document.getElementsByClassName('category0')[0];
    for (let i = 0; i < data.length; i++) {
        let item = document.createElement('div');
        item.classList.add('dropdown-item');
        item.onclick = function () {

            categoryClick(data, i);
        };
        item.innerHTML = data[i]['name'];
        con.appendChild(item);
    }
}

function categoryClick(data, i) {
    sessionStorage.setItem("nowCategory", i);
    document.getElementsByClassName('card')[0].style.display = 'block';
    let seq = "";
    let log_table = getid("log_table").getElementsByTagName("tbody")[0];
    let prechildren = log_table.getElementsByTagName("tr");
    for (let j = prechildren.length - 1; j > 0; j--) {

        prechildren[j].remove();
    }
    var formData = new FormData();


    if (i == -1) {
        setText('selector1', '모두 보기');

        formData.append("category_seq", "-1");

    } else {
        setText('selector1', data[i]['name']);
        seq = data[i]['category_seq'];
        sessionStorage.setItem("category_seq", seq);
        formData.append("category_seq", seq);
    }
    $.ajax({
        type: "POST",
        url: api_server + "getcategoryinfo",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            if (data.status == 200) {
                categoryinfo = data.data;
                for (let i = 0; i < categoryinfo.length; i++) {
                    let dataItem = categoryinfo[i];
                    //      <th>순번</th>
                    // <th>세부 카테고리</th>
                    // <th>아이콘 등록</th>
                    // <th>수정</th>
                    // <th>사용/중지</th>
                    // <th>삭제</th>
                    let item = document.createElement("tr");
                    let seq = document.createElement('td');
                    let category_detail = document.createElement('td');
                    let icon = document.createElement('td');
                    let edit = document.createElement('td');
                    let use = document.createElement('td');
                    let delete1 = document.createElement('td');
                    seq.innerHTML = dataItem['info_seq'];
                    category_detail.innerHTML = dataItem['name'];
                    icon.innerHTML = '등록';
                    edit.innerHTML = '수정';
                    use.innerHTML = '중지';
                    delete1.innerHTML = "삭제";
                    item.appendChild(seq);
                    item.appendChild(category_detail);
                    item.appendChild(icon);
                    item.appendChild(edit);
                    item.appendChild(use);
                    item.appendChild(delete1);
                    delete1.onclick = function () {

                        deletecategoryinfo(dataItem['info_seq']);

                    };
                    log_table.appendChild(item);


                }


            } else {


            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
}

function deletecategoryinfo(info_seq) {

    var formData = new FormData();
    formData.append("info_seq", info_seq);

    $.ajax({
        type: "POST",
        url: api_server + "deletecategoryinfo",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            if (data.status == 200) {
                alert("카테고리가 삭제되었습니다.");
                location.href = '/category';
            } else {
                alert("카테고리 삭제에 실패했습니다.");
            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });

}

function addcategoryInfo() {

    if (sessionStorage.getItem("nowCategory") == -1) {

        return;
    }
    let name = getid('ci_name').value;
    let seq = sessionStorage.getItem('category_seq');

    var formData = new FormData();
    formData.append("category_seq", seq);
    formData.append("name", name);
    if (name == "" || name == NaN || name == null) {

        return;
    }
    $.ajax({
        type: "POST",
        url: api_server + "addcategoryinfo",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            if (data.status == 200) {

                categoryClick(category, sessionStorage.getItem("nowCategory"));

            } else {

                alert(data.err);

            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });


}

function setCategory_add(data) {

    let con = document.getElementsByClassName('category0')[0];
    for (let i = 0; i < data.length; i++) {
        let item = document.createElement('div');
        item.classList.add('dropdown-item');
        item.onclick = function () {

            categoryClick_add(data, i);
        };
        item.innerHTML = data[i]['name'];
        con.appendChild(item);
    }
}

function setCategory_question(data) {

    let con = document.getElementsByClassName('category0')[0];
    for (let i = 0; i < data.length; i++) {
        let item = document.createElement('div');
        item.classList.add('dropdown-item');
        item.onclick = function () {

            categoryClick_question(data, i);
        };
        item.innerHTML = data[i]['name'];
        con.appendChild(item);
    }
}

function categoryClick_add(data, i) {

    sessionStorage.setItem("addcatede", 0);
    var category_info = "";
    sessionStorage.setItem("nowCategory", i);
    setText('selector2', "선택");
    setText('selector3', "선택");
    let seq = "";
    let log_table = document.getElementsByClassName('category0')[1];
    let prechildren = log_table.getElementsByTagName("div");
    for (let j = prechildren.length - 1; j > 0; j--) {

        prechildren[j].remove();
    }
    var formData = new FormData();


    if (i == -1) {
        setText('selector1', '모두 보기');

        formData.append("category_seq", "-1");

    } else {
        setText('selector1', data[i]['name']);
        seq = data[i]['category_seq'];
        sessionStorage.setItem("category_seq", seq);
        formData.append("category_seq", seq);
    }
    $.ajax({
        type: "POST",
        url: api_server + "getcategoryinfo",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            if (data.status == 200) {
                categoryinfo = data.data;
                for (let i = 0; i < categoryinfo.length; i++) {
                    let dataItem = categoryinfo[i];
                    //      <th>순번</th>
                    // <th>세부 카테고리</th>
                    // <th>아이콘 등록</th>
                    // <th>수정</th>
                    // <th>사용/중지</th>
                    // <th>삭제</th>
                    let item = document.createElement("div");
                    let category_detail = document.createElement('div');
                    // seq.innerHTML = dataItem['info_seq'];
                    category_detail.innerHTML = dataItem['name'];

                    item.onclick = function () {
                        sessionStorage.setItem("addcatede", 0);
                        sessionStorage.setItem("category_info", dataItem['info_seq']);
                        category_info = dataItem['info_seq'];
                        setText('selector2', dataItem['name']);
                        categoryInfoClick_add();
                    };
                    item.appendChild(category_detail);
                    log_table.appendChild(item);

                }


            } else {


            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
}

function categoryClick_question(data, i) {

    sessionStorage.setItem("addcatede", 0);
    var category_info = "";
    sessionStorage.setItem("nowCategory", i);
    let seq = "";
    let log_table = document.getElementsByClassName('category0')[1];
    let prechildren = log_table.getElementsByTagName("div");
    for (let j = prechildren.length - 1; j > 0; j--) {

        prechildren[j].remove();
    }
    var formData = new FormData();


    if (i == -1) {
        setText('selector1', '모두 보기');

        formData.append("category_seq", "-1");

    } else {
        setText('selector1', data[i]['name']);
        seq = data[i]['category_seq'];
        sessionStorage.setItem("category_seq", seq);
        formData.append("category_seq", seq);
    }
    $.ajax({
        type: "POST",
        url: api_server + "getcategoryinfo",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            if (data.status == 200) {
                categoryinfo = data.data;
                for (let i = 0; i < categoryinfo.length; i++) {
                    let dataItem = categoryinfo[i];
                    let item = document.createElement("div");
                    let category_detail = document.createElement('div');
                    // seq.innerHTML = dataItem['info_seq'];
                    category_detail.innerHTML = dataItem['name'];

                    item.onclick = function () {
                        sessionStorage.setItem("addcatede", 0);
                        sessionStorage.setItem("category_info", dataItem['info_seq']);
                        category_info = dataItem['info_seq'];
                        setText('selector2', dataItem['name']);
                        categoryInfoClick_question();
                    };
                    item.appendChild(category_detail);
                    log_table.appendChild(item);

                }


            } else {


            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
}

function addcategoryDetail() {

    if (sessionStorage.getItem("addcatede") == 1) {
        let inputs = document.getElementsByClassName('category_detail_input');
        let name = inputs[0].value;
        let price = inputs[1].value;
        let store_price = inputs[2].value;
        let stock = inputs[3].value;
        let content = document.getElementsByClassName("summernote-simple")[0].value;
        // let file = document.getElementById("input-image").files[0].name;
        let file = document.getElementById("input-image").files[0];
        let extension = file.name.split('.')[1];
        let img_url = generate_token(28) + "." + extension;
        let category_seq = sessionStorage.getItem("category_seq");
        let info_seq = sessionStorage.getItem("category_info");
        let detail_seq = sessionStorage.getItem("category_detail");

        let datas = [category_seq, info_seq, detail_seq, name, price, store_price
            , stock, img_url, content];

        for (let i = 0; i < datas.length; i++) {
            if (isEmpty(datas[i])) {
                alert('정보를 모두 입력해주세요.');
                return;
            }
        }
        let formData = new FormData();
        formData.append('category_seq', category_seq);
        formData.append('info_seq', info_seq);
        formData.append('detail_seq', detail_seq);
        formData.append('name', name);
        formData.append('price', price);
        formData.append('store_price', store_price);
        formData.append('stock', stock);
        formData.append('img_url', img_url);
        formData.append('content', content);
        formData.append('file', file, img_url);
        $.ajax({
            type: "POST",
            url: api_server + "addproduct",
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                if (data.status == 200) {
                    location.href = "/stock";

                } else {


                    alert(data.err);
                }
            }
            ,
            err: function (err) {
                alert(err.status);
            }
        });

        return;
    }

}

function categoryInfoClick_add() {
    setText('selector3', "선택");
    let log_table = document.getElementsByClassName('category0')[2];
    let prechildren = log_table.getElementsByTagName("div");
    for (let j = prechildren.length - 1; j > 0; j--) {

        prechildren[j].remove();
    }
    let category_info = sessionStorage.getItem("category_info");

    let formData = new FormData();
    formData.append("info_seq", category_info);

    $.ajax({
        type: "POST",
        url: api_server + "getcategorydetail",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            if (data.status == 200) {
                let categoryinfo = data.data;
                for (let i = 0; i < categoryinfo.length; i++) {
                    let dataItem = categoryinfo[i];

                    let item = document.createElement("div");
                    let category_detail = document.createElement('div');
                    // seq.innerHTML = dataItem['info_seq'];
                    category_detail.innerHTML = dataItem['name'];

                    item.onclick = function () {
                        category_info = dataItem['detail_seq'];
                        sessionStorage.setItem("addcatede", 1);
                        sessionStorage.setItem("category_detail", category_info);
                        setText('selector3', dataItem['name']);
                    };
                    item.appendChild(category_detail);
                    log_table.appendChild(item);
                }

            } else {


            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });

}

function categoryInfoClick_question() {


    let log_table = document.getElementById('log_table');
    let prechildren = log_table.getElementsByTagName("tr");
    for (let j = prechildren.length - 1; j > 0; j--) {

        prechildren[j].remove();
    }
    let category_info = sessionStorage.getItem("category_info");
    let formData = new FormData();
    formData.append("info_seq", category_info);
    $.ajax({
        type: "POST",
        url: api_server + "getquestion",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            if (data.status == 200) {
                let categoryinfo = data.data;
                for (let i = 0; i < categoryinfo.length; i++) {
                    let dataItem = categoryinfo[i];
                    let item = document.createElement("tr");
                    let question_seq = document.createElement("td");
                    let title = document.createElement("td");
                    let place_text = document.createElement("td");
                    let ext = document.createElement("td");
                    let summary_seq = document.createElement("td");
                    let codi_seq = document.createElement("td");
                    let img_url = document.createElement("td");
                    let member_show_yn = document.createElement("td");
                    let partner_show_yn = document.createElement("td");
                    let simple_estimate_show_yn = document.createElement("td");
                    let delete1 = document.createElement("td");


                    let formData = new FormData();
                    formData.append("question_seq", dataItem['question_seq']);

                    delete1.onclick = function () {
                        $.ajax({
                            type: "POST",
                            url: api_server + "deletequestion",
                            data: formData,
                            processData: false,
                            contentType: false,
                            success: function (data) {
                                if (data.status == 200) {
                                    alert("질문이 삭제되었습니다.");
                                    location.href = "/question";

                                } else {


                                    alert(data.err);
                                }
                            }
                            ,
                            err: function (err) {
                                alert(err.status);
                            }
                        });

                    };


                    //img
                    let img_content = document.createElement('div');
                    let img_value = document.createElement('button');
                    let img_drop = document.createElement('div');


                    img_content.classList.add('dropdown');
                    img_value.classList.add('dropdown-toggle');
                    img_drop.classList.add('dropdown-menu');
                    img_value.setAttribute('data-toggle', 'dropdown');
                    img_value.setAttribute('aria-haspopup', 'true');
                    img_value.setAttribute('aria-expanded', 'false');
                    img_value.style.background = '#ffffff';
                    img_value.type = 'button';
                    if (dataItem['img_url'] == null || dataItem['img_url'] == '') {

                        img_value.innerHTML = '등록';
                    } else {

                        img_value.innerHTML = '수정/삭제';

                    }


                    $.ajax({
                        url: "/img_upload",
                        async: false,
                        success: function (data) {
                            // 옵션 form 글로벌 저장
                            img_drop.innerHTML = data;
                            img_drop.style.width = '0px';
                            img_drop.style.height = '0px';
                            img_drop.style.padding = '0px';
                            img_value.onclick = function () {
                                img_drop.style.display = 'block';
                            };
                            let imgbtns = img_drop.getElementsByClassName('img_upload_btns');
                            imgbtns[2].onclick = function () {

                                img_drop.style.display = 'none';
                            }


                            let img_upload_img = img_drop.getElementsByClassName('img_upload_img')[0];
                            let img_upload_find = img_drop.getElementsByClassName('img_upload_find')[0];
                            let img_url = img_drop.getElementsByClassName('img_url')[0];

                            if (dataItem['img_url'] == null || dataItem['img_url'] == '') {
                                imgbtns[1].style.display = 'none';
                                imgbtns[0].innerHTML = '등록';


                            } else {
                                imgbtns[0].innerHTML = '수정';
                                imgbtns[1].onclick = function () {
                                    //todo

                                    changeQuestion(dataItem['question_seq'], 'img_url', '');
                                    alert('이미지를 삭제하였습니다.');
                                    location.href = '/question';
                                };
                            }
                            imgbtns[0].onclick = function () {
                                //todo

                                if (img_url.value == '' || img_url.value == null) {
                                    alert('이미지를 등록해주세요.');
                                } else {
                                    let file = img_upload_img.files[0];
                                    if (file == null || file.name == '' || file.name == null) {

                                        alert('이미지를 등록해주세요.');
                                        return;
                                    }
                                    let extension = file.name.split('.')[1];

                                    let filename = generate_token(28) + "." + extension;
                                    changeQuestion(dataItem['question_seq'], 'img_url', filename);
                                    savefile(file, filename);
                                    alert('이미지를 등록하였습니다.');
                                    img_drop.style.display = 'none';
                                    location.href = '/question';
                                }
                            };


                            img_upload_find.onclick = function () {
                                img_upload_img.click();

                            };
                            img_upload_img.addEventListener("change", e => {
                                let file = img_upload_img.files[0];
                                let name = file.name;
                                img_url.value = name;

                            });
                            img_url.value = dataItem['img_url'];
                        }, err: function (err) {

                        },

                        dataType: 'html'
                    });


                    img_content.append(img_value);
                    img_content.append(img_drop);
                    img_url.append(img_content);
                    //codi

                    let codi_content = document.createElement('div');
                    let codi_value = document.createElement('button');
                    let codi_drop = document.createElement('div');


                    codi_content.classList.add('dropdown');
                    codi_value.classList.add('dropdown-toggle');
                    codi_drop.classList.add('dropdown-menu');
                    codi_value.setAttribute('data-toggle', 'dropdown');
                    codi_value.setAttribute('aria-haspopup', 'true');
                    codi_value.setAttribute('aria-expanded', 'false');
                    codi_value.style.background = '#ffffff';
                    codi_value.type = 'button';
                    for (let j = 0; j < codi.length; j++) {

                        if (codi[j]['codi_seq'] == dataItem['codi_seq']) {
                            codi_value.innerHTML = codi[j]['name'];
                        }
                        let item = document.createElement('div');
                        item.innerHTML = codi[j]['name'];
                        item.onclick = function () {
                            codi_value.innerHTML = codi[j]['name'];
                            changeQuestion(dataItem['question_seq'], 'codi_seq', codi[j]['codi_seq']);
                        };
                        codi_drop.append(item);
                    }

                    codi_content.append(codi_value);
                    codi_content.append(codi_drop);
                    codi_seq.append(codi_content);


                    ///////////////////
                    question_seq.innerHTML = dataItem['question_seq'];
                    title.innerHTML = dataItem['title'];
                    place_text.innerHTML = dataItem['place_text'];
                    ext.innerHTML = dataItem['ext'];

                    for (let j = 0; j < summary.length; j++) {
                        if (dataItem['summary_seq'] == summary[j]['summary_seq']) {
                            summary_seq.innerHTML = summary[j]['name'];
                        }
                    }
                    // <input class="form-check-input" type="checkbox">


                    let check1 = document.createElement('input');
                    check1.type = "checkbox";
                    check1.checked = dataItem['member_show_yn'] == "Y";
                    member_show_yn.append(check1);


                    let check2 = document.createElement('input');
                    check2.type = "checkbox";
                    check2.checked = dataItem['partner_show_yn'] == "Y";
                    partner_show_yn.append(check2);


                    let check3 = document.createElement('input');
                    check3.type = "checkbox";
                    check3.checked = dataItem['simple_estimate_show_yn'] == "Y";
                    simple_estimate_show_yn.append(check3);

                    changeCheckQuestion(check1, dataItem['question_seq'], 'member_show_yn');
                    changeCheckQuestion(check2, dataItem['question_seq'], 'partner_show_yn');
                    changeCheckQuestion(check3, dataItem['question_seq'], 'simple_estimate_show_yn');
                    delete1.innerHTML = '삭제';
                    item.append(question_seq);
                    item.append(title);
                    item.append(place_text);
                    item.append(ext);
                    item.append(summary_seq);
                    item.append(codi_seq);
                    item.append(img_url);
                    item.append(member_show_yn);
                    item.append(partner_show_yn);
                    item.append(simple_estimate_show_yn);
                    item.append(delete1);
                    log_table.appendChild(item);
                }

            } else {


            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });

}

function startQuestion() {


    let questionadd = document.getElementsByClassName('questionadd')[0];
    let inputs = questionadd.getElementsByTagName('th');

    let codi_seq = inputs[5];

    let codi_content = document.createElement('div');
    let codi_value = document.createElement('button');
    let codi_drop = document.createElement('div');


    codi_content.classList.add('dropdown');
    codi_value.classList.add('dropdown-toggle');
    codi_drop.classList.add('dropdown-menu');
    codi_value.setAttribute('data-toggle', 'dropdown');
    codi_value.setAttribute('aria-haspopup', 'true');
    codi_value.setAttribute('aria-expanded', 'false');
    codi_value.style.background = '#ffffff';
    codi_value.type = 'button';
    codi_value.innerHTML = '선택해주세요';
    for (let j = 0; j < codi.length; j++) {


        let item = document.createElement('div');
        item.innerHTML = codi[j]['name'];
        item.onclick = function () {
            codi_value.innerHTML = codi[j]['name'];
            // changeQuestion(dataItem['question_seq'], 'codi_seq', codi[j]['codi_seq']);
        };
        codi_drop.append(item);
    }

    codi_content.append(codi_value);
    codi_content.append(codi_drop);
    codi_seq.append(codi_content);

    let check1 = document.createElement('input');
    check1.type = "checkbox";
    inputs[7].append(check1);


    let check2 = document.createElement('input');
    check2.type = "checkbox";
    inputs[8].append(check2);


    let check3 = document.createElement('input');
    check3.type = "checkbox";
    inputs[9].append(check3);
}

function changeCheckQuestion(checkbox, question_seq, column) {
    checkbox.addEventListener('change', (event) => {

        let value = "Y";
        if (event.currentTarget.checked) {
            value = "Y";
        } else {
            value = "N";

        }
        changeQuestion(question_seq, column, value);
    })
}

function changeQuestion(question_seq, column, value) {
    let formData = new FormData();
    formData.append("question_seq", question_seq);
    formData.append("column", column);
    formData.append("value", value);
    $.ajax({
        type: "POST",
        url: api_server + "changeCheckQuestion",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            if (data.status == 200) {

            } else {
                alert(data.err);
            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });

}

function savefile(file, name) {

    // filename = request.form['filename']
    // file = request.files['file']
    let formData = new FormData();
    formData.append('filename', name);
    formData.append('file', file, name);
    $.ajax({
        type: "POST",
        url: api_server + "savefile",
        data: formData,
        processData: false,
        contentType: false,
        async: false,
        success: function (data) {
            if (data.status == 200) {

            } else {
                alert(data.err);
            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
}

function getcodi() {

    codi = "";


    $.ajax({
        type: "POST",
        url: api_server + "getcodi",
        data: null,
        processData: false,
        contentType: false,
        async: false,
        success: function (data) {
            if (data.status == 200) {
                codi = data.data;
            } else {


            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
    return codi

}

function getsummary() {

    summary = "";


    $.ajax({
        type: "POST",
        url: api_server + "getsummary",
        data: null,
        processData: false,
        contentType: false,
        async: false,
        success: function (data) {
            if (data.status == 200) {
                summary = data.data;
            } else {


            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
    return summary

}

function getproduct() {
    product = "";
    $.ajax({
        type: "POST",
        url: api_server + "getproduct",
        data: null,
        processData: false,
        contentType: false,
        async: false,
        success: function (data) {
            if (data.status == 200) {
                product = data.data;
            } else {


            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
    return product

}

function setproduct(data) {


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
        let product_seq = document.createElement('td');
        let category_seq = document.createElement('td');
        category_seq.innerHTML = dataItem['category_seq'];
        for (let j = 0; j < category.length; j++) {
            if (category[j]['category_seq'] == dataItem['category_seq']) {
                category_seq.innerHTML = category[j]['name'];
            }
        }
        let name = document.createElement('td');
        let price = document.createElement('td');
        let stock = document.createElement('td');
        let status = document.createElement('td');
        let copy = document.createElement('td');
        create_dt.innerHTML = dataItem['create_dt'];
        product_seq.innerHTML = dataItem['product_seq'];

        name.innerHTML = dataItem['name'];
        price.innerHTML = dataItem['price'] + '원';
        stock.innerHTML = dataItem['stock'] + '개';
        status.innerHTML = "판매 상태 변경";
        copy.innerHTML = "복사";
        item.appendChild(create_dt);
        item.appendChild(product_seq);
        item.appendChild(category_seq);
        item.appendChild(name);
        item.appendChild(price);
        item.appendChild(stock);
        item.appendChild(status);
        item.appendChild(copy);
        log_table.appendChild(item);

    }

}

function getPage(pagename) {

    let page = "";

    let formData = new FormData();
    formData.append('pagename', pagename);
    $.ajax({
        type: "POST",
        url: api_server + "getPage",
        data: formData,
        processData: false,
        contentType: false,
        async: false,
        success: function (data) {
            page = data;
            return page;
        }
        ,
        err: function (err) {
            alert(err);
        }
    });
    return page

}

function getproduct() {
    product = "";
    $.ajax({
        type: "POST",
        url: api_server + "getproduct",
        data: null,
        processData: false,
        contentType: false,
        async: false,
        success: function (data) {
            if (data.status == 200) {
                product = data.data;
            } else {


            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
    return product

}

function getcategorylist() {

    let categoryinfo = "";


    $.ajax({
        type: "POST",
        url: api_server + "getcategorylist",
        data: null,
        processData: false,
        contentType: false,
        async: false,
        success: function (data) {
            categoryinfo = data.data;
            return categoryinfo;
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
    return categoryinfo;

}

function getjob() {

    let jobs = "";


    $.ajax({
        type: "POST",
        url: api_server + "getjob",
        data: null,
        processData: false,
        contentType: false,
        async: false,
        success: function (data) {
            jobs = data.data;
            return jobs;
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
    return jobs;

}

function getonejob(consulting_seq) {

    let jobs = "";


    let formdata = new FormData();
    formdata.append('consulting_seq', consulting_seq);

    $.ajax({
        type: "POST",
        url: api_server + "getonejob",
        data: formdata,
        processData: false,
        contentType: false,
        async: false,
        success: function (data) {
            jobs = data.data;
            return jobs;
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
    return jobs;

}

function startIntWrite() {
    categoryinfo = getcategorylist();
    let optionlist = document.getElementById('optionlist');
    let optionCon = document.getElementsByClassName('optionCon')[0];

    let page1 = getPage('/item/optioncon.html');
    let option = getPage('/item/option.html');
    let optionone = getPage('/item/optionone.html');
    let q_input = getPage('/question/q_input.html');
    let q_multiple = getPage('/question/q_multiple.html');
    let q_stock = getPage('/question/q_stock.html');
    let q_table = getPage('/question/q_table.html');
    for (let i = 0; i < categoryinfo.length; i++) {
        let item = document.createElement('label');
        item.classList.add('selectgroup-item');

        item.innerHTML = page;
        item.getElementsByClassName('selectgroup-button')[0].innerHTML = categoryinfo[i]['name'];
        let check = item.getElementsByTagName('input')[0];
        check.onclick = function () {

            if (check.checked) {
                let item1 = document.createElement('div');
                item1.innerHTML = page1;
                item1.classList.add('option');
                item1.classList.add('option' + i);


                let header = item1.getElementsByClassName('header')[0];
                let opt_con = item1.getElementsByClassName('opt_con')[0];
                header.innerHTML = categoryinfo[i]['name'] + ' 상세 정보 입력';
                let count = 1;
                for (let j = 0; j < questions.length; j++) {
                    let question = questions[j];
                    let codi = document.createElement('div');
                    codi.classList.add('codi');
                    codi.classList.add('codi' + question['question_seq']);

                    if (question['info_seq'] == categoryinfo[i]['info_seq']) {
                        //다중 선택
                        if (question['codi_seq'] == 1) {

                            codi.innerHTML = q_multiple;
                            codi.getElementsByClassName('header')[0].innerHTML = count + ". " + question['title'];

                            //이미지 처리
                            let inputImage = codi.getElementsByTagName("input")[0];
                            let img = codi.getElementsByTagName("img")[0];
                            inputImage.addEventListener("change", e => {
                                readImage(e.target, img)
                            })
                            img.onclick = function () {
                                inputImage.click();
                            };

                            count++;
                            let answers = question['place_text'].split(',');
                            for (let k = 0; k < answers.length; k++) {
                                let answer = document.createElement('label');
                                answer.classList.add('selectgroup-item');
                                answer.innerHTML = option;
                                answer.getElementsByClassName('selectgroup-button')[0].innerHTML = answers[k];
                                codi.getElementsByClassName('selectgroup-pills')[0].appendChild(answer);
                            }

                            opt_con.appendChild(codi);
                        }

                        //단일선택
                        if (question['codi_seq'] == 2) {

                            codi.innerHTML = q_multiple;
                            codi.getElementsByClassName('header')[0].innerHTML = count + ". " + question['title'];

                            //이미지 처리
                            let inputImage = codi.getElementsByTagName("input")[0];
                            let img = codi.getElementsByTagName("img")[0];
                            inputImage.addEventListener("change", e => {
                                readImage(e.target, img)
                            })
                            img.onclick = function () {
                                inputImage.click();
                            };

                            count++;
                            let answers = question['place_text'].split(',');
                            for (let k = 0; k < answers.length; k++) {
                                let answer = document.createElement('label');
                                answer.classList.add('selectgroup-item');
                                answer.innerHTML = optionone;
                                answer.getElementsByClassName('selectgroup-input')[0].name = question['question_seq'];
                                answer.getElementsByClassName('selectgroup-button')[0].innerHTML = answers[k];
                                codi.getElementsByClassName('selectgroup-pills')[0].appendChild(answer);
                            }

                            opt_con.appendChild(codi);
                        }
                        //숫자
                        if (question['codi_seq'] == 3) {

                            codi.innerHTML = q_input;
                            codi.getElementsByTagName('input')[0].placeholder = question['ext'];
                            codi.getElementsByTagName('input')[0].type = 'number';
                            codi.getElementsByClassName('header')[0].innerHTML = count + ". " + question['title'];
                            opt_con.appendChild(codi);
                            count++
                        }
                        //이미지
                        if (question['codi_seq'] == 4) {

                            codi.innerHTML = q_multiple;
                            codi.getElementsByClassName('header')[0].innerHTML = count + ". " + question['title'];

                            //이미지 처리
                            let inputImage = codi.getElementsByTagName("input")[0];
                            let img = codi.getElementsByTagName("img")[0];
                            inputImage.addEventListener("change", e => {
                                readImage(e.target, img)
                            })
                            img.onclick = function () {
                                inputImage.click();
                            };
                            count++;


                            opt_con.appendChild(codi);
                        }
                        // 자재 구매 / 물품 구매
                        if (question['codi_seq'] > 4 && question['codi_seq'] < 9) {

                            codi.innerHTML = q_stock;
                            codi.getElementsByClassName('header')[0].innerHTML = count + ". " + question['title'];

                            //이미지 처리
                            let inputImage = codi.getElementsByTagName("input")[0];
                            let img = codi.getElementsByTagName("img")[0];
                            inputImage.addEventListener("change", e => {
                                readImage(e.target, img)
                            })
                            img.onclick = function () {
                                inputImage.click();
                            };
                            let datas = "";
                            // 자재일 때
                            if (question['codi_seq'] < 7) {
                                datas = products;
                            }
                            //테이블
                            let content = codi.getElementsByClassName('dropdown-menu')[0];
                            content.innerHTML = q_table;
                            let table = content.getElementsByClassName('table')[0];


                            for (let j = 0; j < datas.length; j++) {
                                let data = datas[j];
                                if (data['info_seq'] == question['info_seq']) {

                                    let item = document.createElement("tr");
                                    let product_seq = document.createElement("td");
                                    let name = document.createElement("td");
                                    let stock = document.createElement("td");
                                    let check = document.createElement("td");
                                    product_seq.innerHTML = data['product_seq'];
                                    name.innerHTML = data['name'];
                                    stock.innerHTML = data['stock'];

                                    let check2 = document.createElement('input');
                                    check2.type = "checkbox";
                                    check.append(check2);


                                    item.append(product_seq);
                                    item.append(name);
                                    item.append(stock);
                                    item.append(check);

                                    table.appendChild(item);

                                }
                            }


                            count++;
                            opt_con.appendChild(codi);
                        }

                        //텍스트
                        if (question['codi_seq'] == 9) {

                            codi.innerHTML = q_input;
                            codi.getElementsByTagName('input')[0].placeholder = question['ext'];
                            codi.getElementsByTagName('input')[0].type = 'text';
                            codi.getElementsByClassName('header')[0].innerHTML = count + ". " + question['title'];
                            opt_con.appendChild(codi);
                            count++
                        }
                        let codi_seq = document.createElement('div');
                        codi_seq.style.display = 'none';
                        codi_seq.innerHTML = question['codi_seq'];
                        codi_seq.classList.add("codi_seq");
                        codi.appendChild(codi_seq);
                    }

                }


                optionCon.append(item1);
            } else {
                optionCon.getElementsByClassName('option' + i)[0].remove();

            }

        };

        optionlist.append(item);
    }

}

function readImage(input) {
    // 인풋 태그에 파일이 있는 경우
    if (input.files && input.files[0]) {
        // 이미지 파일인지 검사 (생략)
        // FileReader 인스턴스 생성
        const reader = new FileReader()
        // 이미지가 로드가 된 경우
        reader.onload = e => {
            const previewImage = document.getElementById("preview-image")
            previewImage.src = e.target.result
        }
        // reader가 이미지 읽도록 하기
        reader.readAsDataURL(input.files[0])
    }
}

function readImage(input, img) {
    // 인풋 태그에 파일이 있는 경우
    if (input.files && input.files[0]) {
        // 이미지 파일인지 검사 (생략)
        // FileReader 인스턴스 생성
        const reader = new FileReader()
        // 이미지가 로드가 된 경우
        reader.onload = e => {
            const previewImage = img;
            previewImage.src = e.target.result;
        }
        // reader가 이미지 읽도록 하기
        reader.readAsDataURL(input.files[0])
    }
}

function startinterior() {

    let seeconsulting = document.getElementsByClassName('seeconsulting')[0];
    seeconsulting.onclick = function () {
        // intAnswering();
        // return;
        let name = document.getElementsByClassName('name')[0].value;
        let tel = document.getElementsByClassName('tel')[0].value;
        let addr1 = document.getElementsByClassName('addr1')[0].value;
        let addr2 = document.getElementsByClassName('addr2')[0].value;
        let ct_memo = document.getElementsByClassName('ct_memo')[0].value;
        let memo = document.getElementsByClassName('memo')[0].value;

        let exp_pay = document.getElementsByClassName('exp_pay')[0].value;
        let off_pay = document.getElementsByClassName('off_pay')[0].value;
        let down_pay = document.getElementsByClassName('down_pay')[0].value;
        let start_pay = document.getElementsByClassName('start_pay')[0].value;
        let end_pay = document.getElementsByClassName('end_pay')[0].value;
        let start_dt = document.getElementsByClassName('start_dt')[0].value;
        let end_dt = document.getElementsByClassName('end_dt')[0].value;
        let exp_dt = document.getElementsByClassName('exp_dt')[0].value;
        let member_seq = sessionStorage.getItem("member_seq");

        let par = [name, tel, addr1, addr2, ct_memo, memo, exp_pay, off_pay, down_pay, start_pay, end_pay, start_dt, end_dt, exp_dt];
        let strPar = ['name', 'tel', 'addr1', 'addr2', 'ct_memo', 'memo', 'exp_pay', 'off_pay', 'down_pay', 'start_pay', 'end_pay', 'start_dt', 'end_dt', 'exp_dt'];
        let parName = ['이름', '전화번호', '주소', '상세 주소', '고객 메모', '상담사 메모', '예상 총 금액',
            '출장비', '계약금', '선금', '잔금', '고객 시작 예상일', '고객 종료 예상일', '전체 예상 작업일'];
        for (let i = 0; i < par.length; i++) {
            if (isEmpty(par[i])) {
                alert(parName[i] + "이(가) 비어있습니다.");
                return;
            }
        }
        let selectOptions = document.getElementsByClassName('option');
        if (isEmpty(selectOptions)) {
            alert('작업을 선택해주세요.');
            return;
        }

        var formData = new FormData();
        for (let i = 0; i < par.length; i++) {
            formData.append(strPar[i], par[i]);
        }
        formData.append('member_seq', member_seq);
        $.ajax({
            type: "POST",
            url: api_server + "addconsult",
            data: formData,
            processData: false,
            contentType: false,
            async: false,
            success: function (data) {
                if (data.status == 200) {
                    addjob(data.consult_seq);
                } else {

                    alert(data.err);
                }
            }
            ,
            err: function (err) {
                alert(err.status);
            }
        });


    }


}

function startinteriorEdit() {

    let jobs = getonejob(consulting_seq);

    let options = document.getElementsByClassName('option');
    let optionlist = getid('optionlist');

    for (let i = 0; i < jobs.length; i++) {
        for (let j = 0; j < categoryinfo.length; j++) {
            if (jobs[i]['info_seq'] == categoryinfo[j]['info_seq']) {
                optionlist.getElementsByTagName('label')[j].click();
                let option = document.getElementsByClassName('option' + categoryinfo[j]['info_seq'])[0];
                alert(option.innerHTML);
            }

        }


    }


    let seeconsulting = document.getElementsByClassName('seeconsulting')[0];
    seeconsulting.onclick = function () {
        // intAnswering();
        // return;
        let name = document.getElementsByClassName('name')[0].value;
        let tel = document.getElementsByClassName('tel')[0].value;
        let addr1 = document.getElementsByClassName('addr1')[0].value;
        let addr2 = document.getElementsByClassName('addr2')[0].value;
        let ct_memo = document.getElementsByClassName('ct_memo')[0].value;
        let memo = document.getElementsByClassName('memo')[0].value;

        let exp_pay = document.getElementsByClassName('exp_pay')[0].value;
        let off_pay = document.getElementsByClassName('off_pay')[0].value;
        let down_pay = document.getElementsByClassName('down_pay')[0].value;
        let start_pay = document.getElementsByClassName('start_pay')[0].value;
        let end_pay = document.getElementsByClassName('end_pay')[0].value;
        let start_dt = document.getElementsByClassName('start_dt')[0].value;
        let end_dt = document.getElementsByClassName('end_dt')[0].value;
        let exp_dt = document.getElementsByClassName('exp_dt')[0].value;
        let member_seq = sessionStorage.getItem("member_seq");

        let par = [name, tel, addr1, addr2, ct_memo, memo, exp_pay, off_pay, down_pay, start_pay, end_pay, start_dt, end_dt, exp_dt];
        let strPar = ['name', 'tel', 'addr1', 'addr2', 'ct_memo', 'memo', 'exp_pay', 'off_pay', 'down_pay', 'start_pay', 'end_pay', 'start_dt', 'end_dt', 'exp_dt'];
        let parName = ['이름', '전화번호', '주소', '상세 주소', '고객 메모', '상담사 메모', '예상 총 금액',
            '출장비', '계약금', '선금', '잔금', '고객 시작 예상일', '고객 종료 예상일', '전체 예상 작업일'];
        for (let i = 0; i < par.length; i++) {
            if (isEmpty(par[i])) {
                alert(parName[i] + "이(가) 비어있습니다.");
                return;
            }
        }
        let selectOptions = document.getElementsByClassName('option');
        if (isEmpty(selectOptions)) {
            alert('작업을 선택해주세요.');
            return;
        }

        var formData = new FormData();
        for (let i = 0; i < par.length; i++) {
            formData.append(strPar[i], par[i]);
        }
        formData.append('consulting_seq', consulting_seq);
        formData.append('member_seq', member_seq);
        $.ajax({
            type: "POST",
            url: api_server + "updateconsult",
            data: formData,
            processData: false,
            contentType: false,
            async: false,
            success: function (data) {
                if (data.status == 200) {
                    alert('견적이 수정되었습니다.')
                    location.href = '/itr_trans_est_check';
                } else {

                    alert(data.err);
                }
            }
            ,
            err: function (err) {
                alert(err.status);
            }
        });


    }


}

function addjob(consult_seq) {
    let selectOptions = document.getElementsByClassName('option');
    let selectCateInfo = [];
    if (isEmpty(selectOptions)) {
        alert('작업을 선택해주세요.');
        return;
    }
    for (let i = 0; i < categoryinfo.length; i++) {
        for (let j = 0; j < selectOptions.length; j++) {
            if (selectOptions[j].classList.contains('option' + i)) {
                selectCateInfo.push(categoryinfo[i]);
            }
        }
    }

    let body = {};
    body['consult_seq'] = consult_seq;
    body['info_seq'] = selectCateInfo;

    $.ajax({
        type: "POST",
        url: api_server + "addjob",
        contentType: "application/json",
        dataType: "JSON",
        data: JSON.stringify(body),
        processData: false,
        async: false,
        success: function (data) {
            if (data.status == 200) {
                intAnswering(data.job_seq);
            } else {

                alert(data.err);
            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
}

function intAnswering(job_seq) {
    let selectOptions = document.getElementsByClassName('option');
    let selectCateInfo = [];
    let selectCateDiv = [];
    let selectCodi = [];
    let selectAnswer = [];
    if (isEmpty(selectOptions)) {
        alert('작업을 선택해주세요.');
        return;
    }
    for (let i = 0; i < categoryinfo.length; i++) {
        for (let j = 0; j < selectOptions.length; j++) {

            if (selectOptions[j].classList.contains('option' + i)) {
                selectCateInfo.push(categoryinfo[i]);
                selectCateDiv.push(selectOptions[j]);
            }
        }
    }
    for (let i = 0; i < selectCateDiv.length; i++) {
        // 질문 데이터 하나하나
        let codi = [];
        // 답변 하나하나
        let answer = [];
        let imgSrc = [];
        let codiDiv = selectCateDiv[i].getElementsByClassName('codi');
        for (let j = 0; j < questions.length; j++) {
            for (let k = 0; k < codiDiv.length; k++) {

                // 질문 / 답변 div 하나하나
                let answerDiv = codiDiv[k];
                if (answerDiv.classList.contains('codi' + questions[j]['question_seq'])) {
                    codi.push(questions[j]['question_seq']);

                    // 질문 종류 ex 다중선택
                    let codi_seq = codiDiv[k].getElementsByClassName('codi_seq')[0].innerHTML;


                    //질문 종류에 따라서 answerDiv 에서 값 추출 , 이를 저장하면 됨

                    //다중 선택
                    if (codi_seq == 1) {
                        let datacon = answerDiv.getElementsByClassName('selectgroup-pills')[0];
                        let data = datacon.getElementsByTagName('input');
                        let datavalue = datacon.getElementsByTagName('span');
                        for (let l = 0; l < data.length; l++) {
                            if (data[l].checked) {
                                answer.push(datavalue[l].innerHTML);
                            }
                        }
                    }
                    //단일 선택
                    else if (codi_seq == 2) {
                        let datacon = answerDiv.getElementsByClassName('selectgroup-pills')[0];
                        let data = datacon.getElementsByTagName('input');
                        let datavalue = datacon.getElementsByTagName('span');
                        for (let l = 0; l < data.length; l++) {
                            if (data[l].checked) {
                                answer.push(datavalue[l].innerHTML);

                                break;
                            }
                        }
                    }
                    //숫자
                    else if (codi_seq == 3) {
                        let input = answerDiv.getElementsByTagName('input')[0];
                        if (isEmpty(input.value)) {
                            alert(answerDiv.getElementsByClassName('header')[0].innerHTML);
                            return;
                        } else {
                            answer.push(input.value);
                        }
                    }

                    // else
                    else {

                        answer.push("");

                    }
                    //이미지
                    let img = answerDiv.getElementsByTagName('img')[0];
                    // alert(img.src);
                    // imgSrc.push(img.src);

                }
            }

        }
        selectCodi.push(codi);
        selectAnswer.push(answer);
    }
    addconsultingdetail(job_seq, selectCodi, selectAnswer)
}

function addconsultingdetail(job_seq, selectCodi, selectAnswer) {
    let body = {};
    body['job_seq'] = job_seq;
    body['question_seq'] = selectCodi;
    body['answer_value'] = selectAnswer;

    $.ajax({
        type: "POST",
        url: api_server + "addconsultingdetail",
        contentType: "application/json",
        dataType: "JSON",
        data: JSON.stringify(body),
        processData: false,
        async: false,
        success: function (data) {
            if (data.status == 200) {
                globallog('방문 견적 등록');
                location.href = "/itr_est_list";
            } else {

                alert(data.err);
            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });

}

function getconsult(type, sendtype) {

    consult = "";
    let formData = new FormData();
    formData.append("consulting_type", type)
    formData.append("consulting_send_type", sendtype)

    $.ajax({
        type: "POST",
        url: api_server + "getconsult",
        data: formData,
        processData: false,
        contentType: false,
        async: false,
        success: function (data) {
            if (data.status == 200) {
                consult = data.data;
            } else {


            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
    return consult

}

function getmember() {

    members = "";


    $.ajax({
        type: "POST",
        url: api_server + "getmember",
        data: null,
        processData: false,
        contentType: false,
        async: false,
        success: function (data) {
            if (data.status == 200) {
                members = data.data;
            } else {


            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
    return members

}

function setDetailData(seq) {
    let formData = new FormData();
    formData.append("consulting_seq", seq)

    $.ajax({
        type: "POST",
        url: api_server + "getconsultdetail",
        data: formData,
        processData: false,
        contentType: false,
        async: false,
        success: function (data1) {

            if (data1.status == 200) {
                let data = data1.data;
                let consultingdetail = getid('consultingdetail');
                let row = consultingdetail.getElementsByTagName('td');
                row[0].innerHTML = data['consulting_seq'];
                row[1].innerHTML = data['create_dt'];
                row[2].innerHTML = data['consulting_send_type'] == 'OFF' ? '쇼룸' : '온라인';
                row[3].innerHTML = data['consulting_num'];
                row[4].innerHTML = data['name'];
                row[5].innerHTML = data['phone'];
                row[6].innerHTML = data['addr'] + ' / ' + data['addr_info'];
                //작업

                row[7].innerHTML = findJob(seq);
                //담당자
                let member = findmember(data['member_seq']);
                row[8].innerHTML = member['name'];
                row[9].innerHTML = data['consulting_status'] == 0 ? '진행' : '완료';
                row[10].innerHTML = '작성';
                row[10].onclick = function () {
                    location.href = '/message';
                };
                let detailinput = document.getElementsByClassName('detailinput');
                detailinput[0].value = data['t_expected_cost'];
                detailinput[1].value = data['t_working_day'];
                detailinput[2].value = data['down_payment'];
                detailinput[3].value = data['start_payment'];
                detailinput[4].value = data['end_payment'];
            } else {


            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
    document.getElementsByClassName('confirm')[0].onclick = function () {
        location.href = '/itr_est_list';
    };
    document.getElementsByClassName('edit')[0].onclick = function () {
        location.href = 'itr_visit_est_write_example';
    };
    document.getElementsByClassName('edit')[1].onclick = function () {
        location.href = 'itr_visit_est_write_example';
    };


}

function findmember(seq) {
    for (let i = 0; i < members.length; i++) {
        if (members[i]['member_seq'] == seq) {
            return members[i];
        }

    }

}

function findJob(seq) {
    info = [];
    job = "";
    for (let i = 0; i < jobs.length; i++) {
        if (jobs[i]['consulting_seq'] == seq) {
            info.push(jobs[i]['info_seq']);
        }
    }

    for (let i = 0; i < categoryinfos.length; i++) {
        for (let j = 0; j < info.length; j++) {
            if (categoryinfos[i]['info_seq'] == info[j]) {
                job += "," + categoryinfos[i]['name'];
            }
        }
    }

    if (isEmpty(job)) {
        return job;
    } else {
        return job.substring(1, job.length);
    }


}


function startEditWrite() {
    let name = document.getElementsByClassName('name')[0];
    let tel = document.getElementsByClassName('tel')[0];
    let addr1 = document.getElementsByClassName('addr1')[0];
    let addr2 = document.getElementsByClassName('addr2')[0];
    let ct_memo = document.getElementsByClassName('ct_memo')[0];
    let memo = document.getElementsByClassName('memo')[0];

    let exp_pay = document.getElementsByClassName('exp_pay')[0];
    let off_pay = document.getElementsByClassName('off_pay')[0];
    let down_pay = document.getElementsByClassName('down_pay')[0];
    let start_pay = document.getElementsByClassName('start_pay')[0];
    let end_pay = document.getElementsByClassName('end_pay')[0];
    let start_dt = document.getElementsByClassName('start_dt')[0];
    let end_dt = document.getElementsByClassName('end_dt')[0];
    let exp_dt = document.getElementsByClassName('exp_dt')[0];
    let member_seq = sessionStorage.getItem("member_seq");


    let par = [name, tel, addr1, addr2, ct_memo, memo, exp_pay, off_pay, down_pay, start_pay, end_pay, start_dt, end_dt, exp_dt];
    let strPar = ['name', 'phone', 'addr', 'addr_info', 'other_text', 'memo', 't_expected_cost'
        , 'offline_payment', 'down_payment', 'start_payment', 'end_payment', 'start_dt', 'end_dt', 't_working_day'];
    for (let i = 0; i < par.length; i++) {
        par[i].value = consultdetail[strPar[i]];
    }
    start_dt.value = consultdetail['start_dt'].substring(0, 10);
    end_dt.value = consultdetail['end_dt'].substring(0, 10);

    let optionlist = document.getElementById('optionlist');


}
