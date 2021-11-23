var img_uri = "static/data/"//오혜성
var optionForm = "";
var categoryinfo = "";
var codi = "";
var q_categoryinfo = "";
var lackact = '';
var countmap = '';

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

function setTextCus(id, text, val) {
    document.getElementById(id).innerHTML = text;
    document.getElementById(id).setAttribute('data-val', val);
}

function setTextCus2(id, text, val) {
    document.getElementById(id).innerHTML = text;
    document.getElementById(id).setAttribute('data-val', val);
    $('#' + id).trigger('change');
}


function pageNumber(array) {
    let page = 1;
    if (array.length % 10 == 0) {
        page = array.length / 10;

    } else {
        page = array.length / 10 + 1;
    }
    page = parseInt(page);
    if (page == 0) {
        return 1;
    }
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
    pagediv.innerHTML = '';
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

function productstart(data) {

    // <li class="page-item">
    //     <a class="page-link">1
    //     </a>
    // </li>
    //

    var wholeLog = data;
    var pageNm = pageNumber(wholeLog)

    var pagediv = getid("page");
    pagediv.innerText = '';
    for (let i = 0; i < pageNm; i++) {
        let item = document.createElement("li");
        item.classList.add("page-item")
        let item1 = document.createElement("a");
        item1.classList.add("page-link");
        item1.innerHTML = i + 1;
        item.appendChild(item1);
        pagediv.appendChild(item);

        item.onclick = function () {
            setproduct(wholeLog, i + 1);
        };
    }
}

function membermanagestart(data) {

    // <li class="page-item">
    //     <a class="page-link">1
    //     </a>
    // </li>
    //

    var wholeLog = data;
    var pageNm = pageNumber(wholeLog)

    var pagediv = getid("page");
    pagediv.innerHTML = '';
    for (let i = 0; i < pageNm; i++) {
        let item = document.createElement("li");
        item.classList.add("page-item")
        let item1 = document.createElement("a");
        item1.classList.add("page-link");
        item1.innerHTML = i + 1;
        item.appendChild(item1);
        pagediv.appendChild(item);

        item.onclick = function () {
            setmember_list(wholeLog, i + 1);
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
    pagediv.innerHTML = '';
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
    pagediv.innerHTML = '';
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
    pagediv.innerHTML = '';
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
        name.innerHTML = dataItem['member.name'];
        addr.innerHTML = dataItem['member.addr'];

        let strwork = '';

        for (let j = 0; j < job.length; j++) {
            if (job[j]['consulting_seq'] == dataItem['consulting_seq']) {
                for (let k = 0; k < categorylist.length; k++) {
                    if (job[j]['info_seq'] == categorylist[k]['info_seq']) {
                        strwork += ',' + categorylist[k]['name'];
                    }
                }

            }

        }
        work.innerHTML = strwork.substring(1, strwork.length);
        delete1.innerHTML = '삭제';
        delete1.onclick = function () {
            if (!confirm("견적서를 삭제하시겠습니까?")) {
                alert("취소(아니오)를 누르셨습니다.");
            } else {
                deleterow('consulting', 'consulting_seq', dataItem['consulting_seq'], 'consulting');
                location.reload();
            }
            event.stopPropagation();
        }
        item.appendChild(consulting_seq);
        item.appendChild(consulting_send_type);
        item.appendChild(consulting_num);
        item.appendChild(name);
        item.appendChild(addr);
        item.appendChild(work);
        item.appendChild(delete1);

        item.onclick = function () {
            if (cate == '1') {

                moveLocation('itr_visit_est_write_example?seq=' + dataItem['consulting_seq'] + "&redirect_url=/itr_trans_est_check");
            }
            if (cate == '2') {

                moveLocation('mc_visit_est_write_example?seq=' + dataItem['consulting_seq'] + "&redirect_url=/mc_trans_est_check");
            }
        };
        log_table.appendChild(item);

    }

}

function sorttrans() {

    //consult  < -- whole data
    let sorteddata = consult;
    let transdrops = document.getElementsByClassName('transdrop');


    let transdrop0 = transdrops[0];
    let transdropchildren = transdrop0.getElementsByTagName('a');
    let value0 = transdrop0.getAttribute('sorttext');
    let matchvalue0 = '';
    for (let i = 0; i < transdropchildren.length; i++) {
        if (value0 == transdropchildren[i].innerHTML) {
            matchvalue0 = transdropchildren[i].getAttribute('selectvalue');
        }
    }
    let sorteddata0 = [];
    for (let i = 0; i < job.length; i++) {
        for (let j = 0; j < consult.length; j++) {
            if (job[i]['consulting_seq'] == consult[j]['consulting_seq']) {
                if (job[i]['info_seq'] == matchvalue0) {
                    sorteddata0.push(consult[j]);
                    break;
                }
            }
        }
    }
    sorteddata0.reverse();

    consultstarttrans(sorteddata0);
    setconsultrans(sorteddata0, 1);

}

function sortoff() {

    //consult  < -- whole data
    let transdrops = document.getElementsByClassName('transdrop');


    let transdrop0 = transdrops[0];
    let transdropchildren = transdrop0.getElementsByTagName('a');
    let value0 = transdrop0.getAttribute('sorttext');
    let matchvalue0 = '';
    for (let i = 0; i < transdropchildren.length; i++) {
        if (value0 == transdropchildren[i].innerHTML) {
            matchvalue0 = transdropchildren[i].getAttribute('selectvalue');
        }
    }
    let sorteddata0 = [];

    if (value0 == '모두 보기') {
        sorteddata0 = consult;
    } else {
        for (let i = 0; i < job.length; i++) {
            for (let j = 0; j < consult.length; j++) {
                if (job[i]['consulting_seq'] == consult[j]['consulting_seq']) {
                    if (job[i]['info_seq'] == matchvalue0) {
                        sorteddata0.push(consult[j]);
                        break;
                    }
                }
            }
        }
    }


    let sorteddata1 = [];
    let channeltxt = document.getElementById('selector3').innerHTML;

    if (channeltxt == '모두 보기') {
        sorteddata1 = sorteddata0;
    } else if (channeltxt == '쇼룸') {
        for (let i = 0; i < sorteddata0.length; i++) {

            if (sorteddata0[i]['consulting_send_type'] == 'OFF') {
                sorteddata1.push(sorteddata0[i]);
            }
        }
    } else {
        for (let i = 0; i < sorteddata0.length; i++) {

            if (sorteddata0[i]['consulting_send_type'] == 'ON') {
                sorteddata1.push(sorteddata0[i]);
            }
        }

    }


    sorteddata1.reverse();

    consultstart(sorteddata1);
    setconsult(sorteddata1, 1);

}

function sortproduct() {

    //consult  < -- whole data
    let transdrops = document.getElementsByClassName('transdrop');


    let transdrop0 = transdrops[0];
    let transdropchildren = transdrop0.getElementsByTagName('a');
    let value0 = transdrop0.getAttribute('sorttext');
    let matchvalue0 = '';
    for (let i = 0; i < transdropchildren.length; i++) {
        if (value0 == transdropchildren[i].innerHTML) {
            matchvalue0 = transdropchildren[i].getAttribute('selectvalue');
        }
    }
    let sorteddata0 = [];

    if (value0 == '모두 보기') {
        sorteddata0 = product;
    } else {
        for (let i = 0; i < product.length; i++) {

            if (product[i]['info_seq'] == matchvalue0) {
                sorteddata0.push(product[i]);
            }

        }
    }
    let sorteddata1 = [];
    let channeltxt = document.getElementById('selector3').innerHTML;

    if (channeltxt == '모두 보기') {
        sorteddata1 = sorteddata0;
    } else if (channeltxt == '판매 보기') {
        for (let i = 0; i < sorteddata0.length; i++) {

            if (sorteddata0[i]['show_yn'] == 'Y') {
                sorteddata1.push(sorteddata0[i]);
            }
        }
    } else {
        for (let i = 0; i < sorteddata0.length; i++) {

            if (sorteddata0[i]['show_yn'] == 'N') {
                sorteddata1.push(sorteddata0[i]);
            }
        }

    }

    sorteddata1.reverse();

    productstart(sorteddata1);
    setproduct(sorteddata1, 1);

}

function sortoffsendtype(id, text) {

    setText(id, text);
    sortoff();

}

function sortproductisactive(id, text) {

    setText(id, text);
    sortproduct();

}

function starttranslist() {
// <a class="dropdown-item" onclick="setText('selector1','모두 보기'); ">모두 보기</a>
//                             <a class="dropdown-item" onclick="setText('selector1','욕실'); ">욕실</a>
//                             <a class="dropdown-item" onclick="setText('selector1','벽지'); ">벽지</a>
//                             <a class="dropdown-item" onclick="setText('selector1','부엌'); ">부엌</a>

    let transdrop = document.getElementsByClassName('transdrop')[0];
    transdrop.setAttribute("sorttext", '모두 보기');

    let dropdownitem = document.createElement('a');
    dropdownitem.classList.add('dropdown-item');
    dropdownitem.setAttribute('selectvalue', '-1');
    dropdownitem.onclick = function () {
        setText('selector1', '모두 보기');
        transdrop.setAttribute("sorttext", '-1');

        consultstarttrans(consult);
        setconsultrans(consult, 1);
    }

    dropdownitem.innerHTML = '모두 보기';
    transdrop.append(dropdownitem);

    for (let i = 0; i < categorylist.length; i++) {
        let dropdownitem = document.createElement('a');
        dropdownitem.classList.add('dropdown-item');
        dropdownitem.setAttribute('selectvalue', categorylist[i]['info_seq']);
        dropdownitem.onclick = function () {
            setText('selector1', categorylist[i]['name']);
            transdrop.setAttribute("sorttext", categorylist[i]['name']);
            sorttrans();
        }

        dropdownitem.innerHTML = categorylist[i]['name'];
        transdrop.append(dropdownitem);


    }

    document.getElementsByClassName('transSearch')[0].onclick = function () {

        ontransSearch();
    }

}

function startofflist() {
// <a class="dropdown-item" onclick="setText('selector1','모두 보기'); ">모두 보기</a>
//                             <a class="dropdown-item" onclick="setText('selector1','욕실'); ">욕실</a>
//                             <a class="dropdown-item" onclick="setText('selector1','벽지'); ">벽지</a>
//                             <a class="dropdown-item" onclick="setText('selector1','부엌'); ">부엌</a>

    let transdrop = document.getElementsByClassName('transdrop')[0];
    transdrop.setAttribute("sorttext", '모두 보기');
    let dropdownitem = document.createElement('a');
    dropdownitem.classList.add('dropdown-item');
    dropdownitem.setAttribute('selectvalue', '-1');
    dropdownitem.onclick = function () {
        setText('selector1', '모두 보기');
        transdrop.setAttribute("sorttext", '모두 보기');
        sortoff();
    }

    dropdownitem.innerHTML = '모두 보기';
    transdrop.append(dropdownitem);

    for (let i = 0; i < categorylist.length; i++) {
        let dropdownitem = document.createElement('a');
        dropdownitem.classList.add('dropdown-item');
        dropdownitem.setAttribute('selectvalue', categorylist[i]['info_seq']);
        dropdownitem.onclick = function () {
            setText('selector1', categorylist[i]['name']);
            transdrop.setAttribute("sorttext", categorylist[i]['name']);
            sortoff();
        }

        dropdownitem.innerHTML = categorylist[i]['name'];
        transdrop.append(dropdownitem);


    }

    document.getElementsByClassName('transSearch')[0].onclick = function () {

        onoffSearch();
    }

}

function startproductlist() {
// <a class="dropdown-item" onclick="setText('selector1','모두 보기'); ">모두 보기</a>
//                             <a class="dropdown-item" onclick="setText('selector1','욕실'); ">욕실</a>
//                             <a class="dropdown-item" onclick="setText('selector1','벽지'); ">벽지</a>
//                             <a class="dropdown-item" onclick="setText('selector1','부엌'); ">부엌</a>

    let transdrop = document.getElementsByClassName('transdrop')[0];
    transdrop.setAttribute("sorttext", '모두 보기');
    let dropdownitem = document.createElement('a');
    dropdownitem.classList.add('dropdown-item');
    dropdownitem.setAttribute('selectvalue', '-1');
    dropdownitem.onclick = function () {
        setText('selector1', '모두 보기');
        transdrop.setAttribute("sorttext", '모두 보기');
        sortproduct();
    }

    dropdownitem.innerHTML = '모두 보기';
    transdrop.append(dropdownitem);

    for (let i = 0; i < categorylist.length; i++) {
        let dropdownitem = document.createElement('a');
        dropdownitem.classList.add('dropdown-item');
        dropdownitem.setAttribute('selectvalue', categorylist[i]['info_seq']);
        dropdownitem.onclick = function () {
            setText('selector1', categorylist[i]['name']);
            transdrop.setAttribute("sorttext", categorylist[i]['name']);
            sortproduct();
        }

        dropdownitem.innerHTML = categorylist[i]['name'];
        transdrop.append(dropdownitem);


    }

    document.getElementsByClassName('productSearch')[0].onclick = function () {

        productsearch();
    }

    // document.get
}

function productsearch() {
    let searchproduct = document.getElementsByClassName('searchproduct')[0];
    let searchword = searchproduct.value;
    let data = product;
    let realdata = [];

    for (let i = 0; i < data.length; i++) {

        if (!isEmpty(data[i]['name'])) {
            if (data[i]['name'].includes(searchword)) {
                realdata.push(data[i]);
                continue;
            }
        }
        if (!isEmpty(data[i]['content'])) {
            if (data[i]['content'].includes(searchword)) {
                realdata.push(data[i]);
                continue;
            }
        }
        if (!isEmpty(data[i]['create_dt'])) {
            if (data[i]['create_dt'].includes(searchword)) {
                realdata.push(data[i]);
                continue;
            }
        }
        if (!isEmpty(data[i]['stock'])) {
            if ((data[i]['stock'] + "").includes(searchword)) {
                realdata.push(data[i]);
                continue;
            }
        }

    }
    productstart(realdata);
    setproduct(realdata, 1);

}

function ontransSearch() {
    let searchtrans = document.getElementsByClassName('searchtrans')[0];
    let searchword = searchtrans.value;
    let data = consult;
    let realdata = [];


    for (let i = 0; i < data.length; i++) {

        if (!isEmpty(data[i]['name'])) {
            if (data[i]['name'].includes(searchword)) {
                realdata.push(data[i]);
                continue;
            }
        }
        if (!isEmpty(data[i]['addr'])) {
            if (data[i]['addr'].includes(searchword)) {
                realdata.push(data[i]);
                continue;
            }
        }
        if (!isEmpty(data[i]['addr_info'])) {
            if (data[i]['addr_info'].includes(searchword)) {
                realdata.push(data[i]);
                continue;
            }
        }
        if (!isEmpty(data[i]['consulting_num'])) {
            if (data[i]['consulting_num'].includes(searchword)) {
                realdata.push(data[i]);
                continue;
            }
        }

    }

    consultstarttrans(realdata);
    setconsultrans(realdata, '1');

}

function onoffSearch() {
    let searchtrans = document.getElementsByClassName('searchtrans')[0];
    let searchword = searchtrans.value;
    let data = consult;
    let realdata = [];

    for (let i = 0; i < data.length; i++) {

        if (!isEmpty(data[i]['name'])) {
            if (data[i]['name'].includes(searchword)) {
                realdata.push(data[i]);
                continue;
            }
        }
        if (!isEmpty(data[i]['addr'])) {
            if (data[i]['addr'].includes(searchword)) {
                realdata.push(data[i]);
                continue;
            }
        }
        if (!isEmpty(data[i]['addr_info'])) {
            if (data[i]['addr_info'].includes(searchword)) {
                realdata.push(data[i]);
                continue;
            }
        }
        if (!isEmpty(data[i]['consulting_num'])) {
            if (data[i]['consulting_num'].includes(searchword)) {
                realdata.push(data[i]);
                continue;
            }
        }

    }

    consultstart(realdata);
    setconsult(realdata, 1);

}

function getwheredata(data, where, value) {
    realdata = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i][where] == value) {
            realdata.push(data[i]);
        }
    }
    return realdata;
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
        let strwork = '';

        for (let j = 0; j < job.length; j++) {
            if (job[j]['consulting_seq'] == dataItem['consulting_seq']) {
                for (let k = 0; k < categorylist.length; k++) {
                    if (job[j]['info_seq'] == categorylist[k]['info_seq']) {
                        strwork += ',' + categorylist[k]['name'];
                    }
                }

            }

        }
        work.innerHTML = strwork.substring(1, strwork.length);
        delete1.innerHTML = '삭제';
        delete1.onclick = function () {
            if (!confirm("견적서를 삭제하시겠습니까?")) {
                alert("취소(아니오)를 누르셨습니다.");
            } else {
                deleterow('consulting', 'consulting_seq', dataItem['consulting_seq'], 'consulting');
                location.reload();
            }
            event.stopPropagation();
        }
        item.appendChild(consulting_seq);
        item.appendChild(consulting_send_type);
        item.appendChild(consulting_num);
        item.appendChild(name);
        item.appendChild(addr);
        item.appendChild(work);
        item.appendChild(delete1);
        item.onclick = function () {
            if (cate == '1') {
                moveLocation('itr_est_list_detail?seq=' + dataItem['consulting_seq']);
            } else {
                moveLocation('mc_est_list_detail?seq=' + dataItem['consulting_seq']);
            }

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
        message.onclick = function () {
            location.href = '/message?re_msg_seq=' + member_seq
        }
        delete1.innerHTML = "삭제";
        delete2.innerHTML = "삭제";
        delete1.onclick = function () {
            deleterow('member', 'member_seq', dataItem['member_seq'], 'member');

            alert('사용자가 삭제되었습니다.');
            location.reload();
        };
        delete2.onclick = function () {
            deletecompleterow('member', 'member_seq', dataItem['member_seq']);
            alert('사용자가 삭제되었습니다.');
            location.reload();
        };


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

//오혜성
    for (let i = 0; i < logdata.length; i++) {
        let dataItem = logdata[i];
        let item = document.createElement("tr");
        let nm = document.createElement('td');
        //let name = document.createElement('td');
        let parent_seq = document.createElement('td');
        let ip = document.createElement('td');
        let content = document.createElement('td');
        //let dt = document.createElement('td');
        let delete1 = document.createElement('td');


        nm.innerHTML = dataItem['box_seq'];
        //name.innerHTML = dataItem['category'];
        parent_seq.innerHTML = dataItem['parent_seq'] + "(" + dataItem['parent_table_name'] + ")";
        ip.innerHTML = dataItem['create_dt'];
        content.innerHTML = dataItem['name'] ? dataItem['name'] : '';
        //dt.innerHTML = dataItem['reason'];

        delete1.innerHTML = "<span class=\"replace-data-btn\" data-box_seq=\"" + dataItem.box_seq + "\">복원</span>";
        item.appendChild(nm);
        //item.appendChild(name);
        item.appendChild(parent_seq);
        item.appendChild(ip);
        item.appendChild(content);
        //item.appendChild(dt);
        item.appendChild(delete1);
        log_table.appendChild(item);

    }
//오혜성
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

function searchUser(keyword) {
    let result = [];
    for (let i = 0; i < member.length; i++) {


        if (!isEmpty(member[i]['id'])) {

            if (member[i]['id'].includes(keyword)) {
                result.push(member[i]);
                continue;
            }
        }
        if (!isEmpty(member[i]['name'])) {
            if (member[i]['name'].includes(keyword)) {
                result.push(member[i]);
                continue;
            }

        }
        if (!isEmpty(member[i]['phone'])) {
            if (member[i]['phone'].includes(keyword)) {
                result.push(member[i]);
                continue;
            }

        }
        if (!isEmpty(member[i]['addr\''])) {
            if (member[i]['addr'].includes(keyword)) {
                result.push(member[i]);
                continue;
            }

        }
        if (!isEmpty(member[i]['addr1'])) {
            if (member[i]['addr1'].includes(keyword)) {
                result.push(member[i]);
                continue;
            }

        }
        if (!isEmpty(member[i]['create_dt'])) {
            if (member[i]['create_dt'].includes(keyword)) {
                result.push(member[i]);
                continue;
            }
        }
    }
    return result;
}

function searchLogDelete(keyword) {
    let result = [];


    for (let i = 0; i < deletebox.length; i++) {


        if (!isEmpty(deletebox[i]['name'])) {
            if (deletebox[i]['name'].includes(keyword)) {
                result.push(deletebox[i]);
                continue;
            }
        }
        if (!isEmpty(deletebox[i]['category'])) {
            if (deletebox[i]['category'].includes(keyword)) {
                result.push(deletebox[i]);
                continue;
            }
        }
        if (!isEmpty(deletebox[i]['create_dt'])) {
            if (deletebox[i]['create_dt'].includes(keyword)) {
                result.push(deletebox[i]);
                continue;
            }
        }

    }
    return result;
}

function onSearchClick() {
    let keyword = getid('keyword').value;
    let localdata = searchLog(keyword);
    logstart(localdata);
    setLog(localdata, 1);

}

function onUserSearchClick() {
    let keyword = getid('keyword').value;
    let localdata = searchUser(keyword);
    memberstart(localdata);
    setmember(localdata, 1);

}

function onMemberSearchClick() {
    let keyword = getid('keyword').value;
    let localdata = searchUser(keyword);
    membermanagestart(localdata);
    setmember_list(localdata, 1);


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

function onDateChangeUser() {
    let result = [];
    let date = new Date(getid('date').value);
    for (let i = 0; i < member.length; i++) {
        let date2 = new Date(member[i]['create_dt']);

        if (date.getFullYear() == date2.getFullYear() && date.getMonth() == date2.getMonth() && date.getDate() == date2.getDate()) {
            result.push(member[i]);
        }
    }
    setmember(result, 1);
}

function onDateChangeMember() {
    let result = [];
    let date = new Date(getid('date').value);
    for (let i = 0; i < member.length; i++) {
        let date2 = new Date(member[i]['create_dt']);

        if (date.getFullYear() == date2.getFullYear() && date.getMonth() == date2.getMonth() && date.getDate() == date2.getDate()) {
            result.push(member[i]);
        }
    }
    setmember(result, 1);
}

function onDateChangeTrans() {
    let result = [];
    let date = new Date(getid('date').value);
    for (let i = 0; i < consult.length; i++) {
        let date2 = new Date(consult[i]['create_dt']);

        if (date.getFullYear() == date2.getFullYear() && date.getMonth() == date2.getMonth() && date.getDate() == date2.getDate()) {
            result.push(consult[i]);
        }
    }

    consultstarttrans(result);
    setconsultrans(result, '1');
}

function onDateChangeoff() {
    let result = [];
    let date = new Date(getid('date').value);
    for (let i = 0; i < consult.length; i++) {
        let date2 = new Date(consult[i]['create_dt']);

        if (date.getFullYear() == date2.getFullYear() && date.getMonth() == date2.getMonth() && date.getDate() == date2.getDate()) {
            result.push(consult[i]);
        }
    }

    consultstart(result);
    setconsult(result, 1);
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
                return category;
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

function getjobproduct(job_seq) {
    let body = {};
    body['job_seq'] = job_seq;
    category = "";
    $.ajax({
        type: "POST",
        url: api_server + "getjobproduct",
        data: JSON.stringify(body),
        processData: false,
        contentType: "application/json",
        async: false,
        success: function (data) {
            if (data.status == 200) {
                category = data.data;
                return category;
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
                console.log(JSON.stringify(consultdetail));
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

function getconsultdetail1(seq) {

    consultdetail = "";

    let formData = new FormData();
    formData.append("consulting_seq", seq);
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

                    edit.innerHTML = '수정';
                    let struse = dataItem['show_yn'] == 'Y' ? '사용' : '중지';
                    use.innerHTML = struse;
                    delete1.innerHTML = "삭제";

                    use.onclick = function () {
                        let useyn = dataItem['show_yn'] == 'Y' ? 'N' : 'Y';
                        updatecolumn('category_info', 'info_seq', dataItem['info_seq'], 'show_yn', useyn);
                        location.reload();
                    }


                    setimagedrop(dataItem, icon);
                    item.appendChild(seq);
                    item.appendChild(category_detail);
                    item.appendChild(icon);
                    item.appendChild(edit);
                    item.appendChild(use);
                    item.appendChild(delete1);

                    edit.onclick = function () {
                        location.href = '/categoryinfo?info_seq=' + dataItem['info_seq'];
                    };
                    delete1.onclick = function () {
                        if (!confirm("카테고리를 삭제하시겠습니까?")) {
                            alert("취소했습니다.");
                        } else {
                            deletecategoryinfo(dataItem['info_seq']);
                            location.reload();
                        }
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

function setimagedrop(dataItem, down_pay) {
    let img_content = document.createElement('div');
    let img_value = document.createElement('button');
    let img_drop = document.createElement('div');

    img_value.innerHTML = '등록';
    img_content.classList.add('dropdown');
    img_value.classList.add('dropdown-toggle');
    img_drop.classList.add('dropdown-menu');
    img_value.setAttribute('data-toggle', 'dropdown');
    img_value.setAttribute('aria-haspopup', 'true');
    img_value.setAttribute('aria-expanded', 'false');
    img_value.style.background = '#ffffff';
    img_value.type = 'button';
    img_drop.innerHTML = imgupload;
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

            updatecolumn('category_info', 'info_seq', dataItem['info_seq'], 'img_url', '');
            alert('이미지를 삭제하였습니다.');
            location.reload();
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
            savefile(file, filename);
            updatecolumn('category_info', 'info_seq', dataItem['info_seq'], 'img_url', filename);

            alert('이미지를 등록하였습니다.');
            img_drop.style.display = 'none';
            location.reload();
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

    img_content.append(img_value);
    img_content.append(img_drop);
    down_pay.append(img_content);

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

function addcategoryDetail1() {

    let name = getid('ci_name').value;
    var body = {};
    body['info_seq'] = info_seq;
    body['name'] = name;
    if (isEmpty(name)) {
        alert('내용을 입력해주세요.');
        return;
    }
    $.ajax({
        type: "POST",
        url: api_server + "addcategorydetail",
        data: JSON.stringify(body),
        processData: false,
        contentType: "application/json",
        dataType: "JSON",
        success: function (data) {
            if (data.status == 200) {
                location.reload();

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

function addjobproduct(job_seq, product_seq, order_cnt, kiwihome_stock, kiwihome_out_stock, store_stock, construction_type) {

    let body = {};
    body['job_seq'] = job_seq;
    body['product_seq'] = product_seq;
    body['order_cnt'] = order_cnt;
    body['kiwihome_stock'] = kiwihome_stock;
    body['kiwihome_out_stock'] = kiwihome_out_stock;
    body['store_stock'] = store_stock;
    body['construction_type'] = construction_type;
    $.ajax({
        type: "POST",
        url: api_server + "addjobproduct",
        data: JSON.stringify(body),
        processData: false,
        contentType: "application/json",
        dataType: "JSON",
        async: false,
        success: function (data) {
            if (data.status == 200) {
                return '200';
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
                    title.onclick = function () {
                        let value = title.innerHTML;
                        window.open('/updatequestion?question_seq=' + dataItem['question_seq'] + "&column=" + 'title' + "&value=" + value, 'sendmsg', 'width=500px,height=500px,toolbars=no,scrollbars=no');

                    }
                    place_text.onclick = function () {
                        let value = place_text.innerHTML;
                        window.open('/updatequestion?question_seq=' + dataItem['question_seq'] + "&column=" + 'place_text' + "&value=" + value, 'sendmsg', 'width=500px,height=500px,toolbars=no,scrollbars=no');

                    }
                    ext.onclick = function () {
                        let value = ext.innerHTML;
                        window.open('/updatequestion?question_seq=' + dataItem['question_seq'] + "&column=" + 'ext' + "&value=" + value, 'sendmsg', 'width=500px,height=500px,toolbars=no,scrollbars=no');

                    }


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
                    check1.checked = dataItem['member_show_yn'] == "N";
                    member_show_yn.append(check1);


                    let check2 = document.createElement('input');
                    check2.type = "checkbox";
                    check2.checked = dataItem['partner_show_yn'] == "N";
                    partner_show_yn.append(check2);


                    let check3 = document.createElement('input');
                    check3.type = "checkbox";
                    check3.checked = dataItem['simple_estimate_show_yn'] == "Y";
                    simple_estimate_show_yn.append(check3);

                    changeCheckQuestion(check1, dataItem['question_seq'], 'member_show_yn', true);
                    changeCheckQuestion(check2, dataItem['question_seq'], 'partner_show_yn', true);
                    changeCheckQuestion(check3, dataItem['question_seq'], 'simple_estimate_show_yn', false);
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

    let summary_seq = inputs[3];

    let summary_content = document.createElement('div');
    let summary_value = document.createElement('button');
    let summary_drop = document.createElement('div');


    summary_content.classList.add('dropdown');
    summary_value.classList.add('dropdown-toggle');
    summary_drop.classList.add('dropdown-menu');
    summary_value.setAttribute('data-toggle', 'dropdown');
    summary_value.setAttribute('aria-haspopup', 'true');
    summary_value.setAttribute('aria-expanded', 'false');
    summary_value.style.background = '#ffffff';
    summary_value.type = 'button';
    summary_value.innerHTML = '선택해주세요';
    for (let j = 0; j < summary.length; j++) {


        let item = document.createElement('div');
        item.innerHTML = summary[j]['name'];
        item.onclick = function () {
            selectedsummary = summary[j]['summary_seq'];
            summary_value.innerHTML = summary[j]['name'];
            // changeQuestion(dataItem['question_seq'], 'summary_seq', summary[j]['summary_seq']);
        };
        summary_drop.append(item);
    }
    summary_content.append(summary_value);
    summary_content.append(summary_drop);
    summary_seq.append(summary_content);

    let codi_seq = inputs[4];

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
            selectedcodi = codi[j]['codi_seq'];
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
    inputs[5].append(check1);


    let check2 = document.createElement('input');
    check2.type = "checkbox";
    inputs[6].append(check2);


    let check3 = document.createElement('input');
    check3.type = "checkbox";
    inputs[7].append(check3);
}

function addquestionclick() {
    let questionadd = document.getElementsByClassName('questionadd')[0];
    let inputs = questionadd.getElementsByTagName('th');

    let title = inputs[0].getElementsByTagName('input')[0].value;
    let place_txt = inputs[1].getElementsByTagName('input')[0].value;
    let ext = inputs[2].getElementsByTagName('input')[0].value;
    let codi_seq = selectedcodi;
    let summary_seq = selectedsummary;
    let member_show_yn = inputs[5].getElementsByTagName('input')[0].checked ? "N" : "Y";
    let partner_show_yn = inputs[6].getElementsByTagName('input')[0].checked ? "N" : "Y";
    let simple_estimate_show_yn = inputs[7].getElementsByTagName('input')[0].checked ? "Y" : "N";

    let par = [title, place_txt, ext, codi_seq, summary_seq, member_show_yn, partner_show_yn, simple_estimate_show_yn];

    let strpar = ['title', 'place_txt', 'ext', 'codi_seq', 'summary_seq', 'member_show_yn', 'partner_show_yn', 'simple_estimate_show_yn'];

    let info_seq = sessionStorage.getItem("category_info");

    if (info_seq == -1) {
        alert('세부 카테고리를 선택해주세요.');
        return;
    }
    let body = {};
    body['info_seq'] = info_seq;
    for (let i = 0; i < par.length; i++) {
        if (isEmpty(par[i]) || par[i] == -1) {
            alert(strpar[i] + "이(가) 비어있습니다.");
            return;
        }
        body[strpar[i]] = par[i];
    }

    $.ajax({
        type: "POST",
        url: api_server + "addquestion",
        data: JSON.stringify(body),
        processData: false,
        contentType: "application/json",
        dataType: "JSON",
        success: function (data) {
            if (data.status == 200) {

                alert('입력 정보를 추가하였습니다.');
                location.reload();

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

function changeCheckQuestion(checkbox, question_seq, column, reverse) {
    checkbox.addEventListener('change', (event) => {

        let value = "Y";
        if (event.currentTarget.checked ^ reverse) {
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

function setproduct(data, page) {

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


    let category = getCategory();
    for (let i = 0; i < logdata.length; i++) {
        let dataItem = logdata[i];
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
        let detail = document.createElement('td');


        create_dt.innerHTML = dataItem['create_dt'];
        product_seq.innerHTML = dataItem['product_seq'];

        name.innerHTML = dataItem['name'];
        price.innerHTML = dataItem['price'] + '원';
        stock.innerHTML = dataItem['stock'] + '개';
        status.innerHTML = "판매 상태 변경";
        copy.innerHTML = "복사";
        detail.innerHTML = "자세히 보기";
        item.appendChild(create_dt);
        item.appendChild(product_seq);
        item.appendChild(category_seq);
        item.appendChild(name);
        item.appendChild(price);
        item.appendChild(stock);
        item.appendChild(status);
        item.appendChild(copy);
        item.appendChild(detail);
        log_table.appendChild(item);
        detail.onclick = function () {
            location.href = "/stock_read?seq=" + dataItem['product_seq'];
        };

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

function getcategoryinfo2(seq) {
    members1 = "";
    let formData1 = new FormData();
    formData1.append("category_seq", seq);
    $.ajax({
        type: "POST",
        url: api_server + "getcategoryinfo",
        data: formData1,
        processData: false,
        contentType: false,
        async: false,
        success: function (data) {
            if (data.status == 200) {
                members1 = data.data;
                return members1;

            } else {


            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });

    return members1;
}

function getallcategoryinfo() {

    let categoryinfo = "";


    $.ajax({
        type: "POST",
        url: api_server + "getallcategoryinfo",
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

function getconsultingdetail() {

    let categoryinfo = "";


    $.ajax({
        type: "POST",
        url: api_server + "getconsulting_detail",
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
    categoryinfo = '';
    if (cate == '1') {
        categoryinfo = getcategorylist();

    } else {

        categoryinfo = getcategoryinfo2('2');

    }
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
                item1.setAttribute('info_seq', categoryinfo[i]['info_seq']);


                let header = item1.getElementsByClassName('header')[0];
                let opt_con = item1.getElementsByClassName('opt_con')[0];
                header.innerHTML = categoryinfo[i]['name'] + ' 상세 정보 입력';
                let count = 1;
                for (let j = 0; j < questions.length; j++) {
                    let question = questions[j];
                    let codi = document.createElement('div');
                    codi.classList.add('codi');
                    codi.classList.add('codi' + question['question_seq']);
                    codi.setAttribute('codi_seq', questions[j]['codi_seq']);
                    codi.setAttribute('question_seq', question['question_seq']);
                    codi.setAttribute('codi_sort', question['codi_seq']);
                    codi.setAttribute('summary_seq', question['summary_seq']);

                    if (question['info_seq'] == categoryinfo[i]['info_seq']) {
                        //다중 선택
                        if (question['codi_seq'] == 1) {

                            codi.innerHTML = q_multiple;
                            codi.getElementsByClassName('header')[0].innerHTML = count + ". " + question['title'];

                            //이미지 처리
                            let img = codi.getElementsByTagName("img")[0];
                            img.src = api_server + "static/data/" + question['img_url'];
                            //

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
                            let img = codi.getElementsByTagName("img")[0];
                            //

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

                            codi.getElementsByTagName('input')[0].addEventListener("change", e => {

                                oninputchange();
                            });
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
                                readImage1(e.target, img)
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
                            let img = codi.getElementsByTagName("img")[0];


                            datas = products;

                            //테이블
                            let content = codi.getElementsByClassName('selectedproducts')[0];
                            content.innerHTML = q_table;

                            let table = content.getElementsByTagName('table')[0];
                            table.classList.add('table' + categoryinfo[i]['info_seq'])
                            let choosestock = codi.getElementsByClassName('choosestock')[0];
                            choosestock.onclick = function () {
                                sessionStorage.setItem('nowcodi', 'codi' + question['question_seq']);
                                sessionStorage.setItem('nowinfo', categoryinfo[i]['info_seq']);
                                window.open('/stock_page', 'stock_page?seq=1', 'width=1200px,height=1000px,toolbars=no,scrollbars=no');
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
                        if (question['codi_seq'] == 10) {
                            codi.innerHTML = q_input;
                            let pluslist = question['place_text'].replaceAll(' ', '').replaceAll('A', '');
                            codi.setAttribute('pluslist', pluslist);
                            codi.getElementsByTagName('input')[0].placeholder = question['ext'];
                            codi.getElementsByTagName('input')[0].readOnly = 'true';
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
            let checkedcount = 0;


            let checkbuttons = document.getElementsByClassName('optioncheck');
            for (let j = 0; j < checkbuttons.length; j++) {
                if (checkbuttons[j].checked) {
                    checkedcount += 1;
                }
            }
            let imagetag = document.getElementsByClassName('imagetag');
            let display = checkedcount > 4 ? 'none' : 'block';
            for (let j = 0; j < imagetag.length; j++) {

                imagetag[j].style.display = display;
            }
            let codies = document.getElementsByClassName('codi');
            for (let j = 0; j < codies.length; j++) {

                codies[j].style.display = display;

                let question_seq = codies[j].getAttribute('question_seq');
                for (let k = 0; k < questions.length; k++) {
                    if (question_seq == questions[k]['question_seq']) {
                        if (questions[k]['simple_estimate_show_yn'] == 'Y') {


                            codies[j].style.display = 'block';

                        }
                    }
                }
            }

        };


        optionlist.append(item);
    }

}

function startMvWrite() {
    categoryinfo = getcategoryinfo2('2');
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
                item1.setAttribute('info_seq', categoryinfo[i]['info_seq']);


                let header = item1.getElementsByClassName('header')[0];
                let opt_con = item1.getElementsByClassName('opt_con')[0];
                header.innerHTML = categoryinfo[i]['name'] + ' 상세 정보 입력';
                let count = 1;
                for (let j = 0; j < questions.length; j++) {
                    let question = questions[j];
                    let codi = document.createElement('div');
                    codi.classList.add('codi');
                    codi.classList.add('codi' + question['question_seq']);
                    codi.setAttribute('codi_seq', questions[j]['codi_seq']);
                    codi.setAttribute('question_seq', question['question_seq']);
                    codi.setAttribute('codi_sort', question['codi_seq']);
                    codi.setAttribute('summary_seq', question['summary_seq']);

                    if (question['info_seq'] == categoryinfo[i]['info_seq']) {
                        //다중 선택
                        if (question['codi_seq'] == 1) {

                            codi.innerHTML = q_multiple;
                            codi.getElementsByClassName('header')[0].innerHTML = count + ". " + question['title'];

                            //이미지 처리
                            let img = codi.getElementsByTagName("img")[0];
                            img.src = api_server + "static/data/" + question['img_url'];
                            //

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
                            let img = codi.getElementsByTagName("img")[0];
                            //

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

                            codi.getElementsByTagName('input')[0].addEventListener("change", e => {

                                oninputchange();
                            });
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
                                readImage1(e.target, img)
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
                            let img = codi.getElementsByTagName("img")[0];


                            datas = products;

                            //테이블
                            let content = codi.getElementsByClassName('selectedproducts')[0];
                            content.innerHTML = q_table;

                            let table = content.getElementsByTagName('table')[0];
                            table.classList.add('table' + categoryinfo[i]['info_seq'])
                            let choosestock = codi.getElementsByClassName('choosestock')[0];
                            choosestock.onclick = function () {
                                sessionStorage.setItem('nowcodi', 'codi' + question['question_seq']);
                                sessionStorage.setItem('nowinfo', categoryinfo[i]['info_seq']);
                                window.open('/stock_page', 'stock_page?seq=1', 'width=1200px,height=1000px,toolbars=no,scrollbars=no');
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
                        if (question['codi_seq'] == 10) {
                            codi.innerHTML = q_input;
                            let pluslist = question['place_text'].replaceAll(' ', '').replaceAll('A', '');
                            codi.setAttribute('pluslist', pluslist);
                            codi.getElementsByTagName('input')[0].placeholder = question['ext'];
                            codi.getElementsByTagName('input')[0].readOnly = 'true';
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
            let checkedcount = 0;


            let checkbuttons = document.getElementsByClassName('optioncheck');
            for (let j = 0; j < checkbuttons.length; j++) {
                if (checkbuttons[j].checked) {
                    checkedcount += 1;
                }
            }
            let imagetag = document.getElementsByClassName('imagetag');
            let display = checkedcount > 4 ? 'none' : 'block';
            for (let j = 0; j < imagetag.length; j++) {

                imagetag[j].style.display = display;
            }
            let codies = document.getElementsByClassName('codi');
            for (let j = 0; j < codies.length; j++) {

                codies[j].style.display = display;

                let question_seq = codies[j].getAttribute('question_seq');
                for (let k = 0; k < questions.length; k++) {
                    if (question_seq == questions[k]['question_seq']) {
                        if (questions[k]['simple_estimate_show_yn'] == 'Y') {


                            codies[j].style.display = 'block';

                        }
                    }
                }
            }

        };


        optionlist.append(item);
    }

}

function oninputchange() {
    let codies = document.getElementsByClassName('codi');

    let wholevalue = 0;
    let wholedate = 0;
    for (let i = 0; i < codies.length; i++) {
        let equalresult = 0;

        let question_seq = codies[i].getAttribute('question_seq');
        let codi_seq = codies[i].getAttribute('codi_sort');
        let summary_seq = codies[i].getAttribute('summary_seq');
        let equalquestion = '';

        if (summary_seq == 10) {
            let value = codies[i].getElementsByTagName('input')[0].value;
            wholedate += value * 1;
        }
        if (codi_seq != 10) {
            continue;
        }
        for (let j = 0; j < questions.length; j++) {
            if (question_seq == questions[j]['question_seq']) {
                equalquestion = questions[j];
            }
        }
        let equal = equalquestion['place_text'];
        let answerelement = equal.replaceAll('A', '').replaceAll(' ', '').split('+');
        for (let j = 0; j < answerelement.length; j++) {
            for (let k = 0; k < codies.length; k++) {
                if (codies[k].getAttribute('question_seq') == answerelement[j]) {
                    let value = codies[k].getElementsByTagName('input')[0].value;
                    if (!isEmpty(value)) {
                        equalresult += value * 1;
                    }
                }
            }
        }
        codies[i].getElementsByTagName('input')[0].value = equalresult;

        if (summary_seq == 9) {
            wholevalue += equalresult;
        }
    }
    document.getElementsByClassName('exp_pay')[0].value = wholevalue;
    document.getElementsByClassName('down_pay')[0].value = wholevalue * 0.1;
    if (cate == '1') {

        document.getElementsByClassName('start_pay')[0].value = wholevalue * 0.45;

    }
    document.getElementsByClassName('end_pay')[0].value = wholevalue * 0.45;
    document.getElementsByClassName('exp_dt')[0].value = wholedate;

}

function sendpreestimate(seq, sort, value) {

    window.open('/sendmsg?seq=' + seq + "&sort=" + sort + "&value=" + value, 'sendmsg', 'width=500px,height=500px,toolbars=no,scrollbars=no');
}

function sendestimate(seq, sort, value) {

    window.open('/sendmsg?seq=' + seq + "&sort=" + sort + "&value=" + value, 'sendmsg', 'width=500px,height=500px,toolbars=no,scrollbars=no');
}

function readImage(input) {
    // 인풋 태그에 파일이 있는 경우
    if (input.files && input.files[0]) {
        // 이미지 파일인지 검사 (생략)
        // FileReader 인스턴스 생성
        const reader = new FileReader()
        // 이미지가 로드가 된 경우
        reader.onload = e => {
            const previewImage = document.getElementById("preview-image");
            previewImage.src = e.target.result
        }
        // reader가 이미지 읽도록 하기
        reader.readAsDataURL(input.files[0])
    }
}

function readImage1(input, img) {
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

function sendmessage(sort) {

    let strsort = sort;
    if (strsort == 'down') {
        strsort = '계약금';
    }
    if (strsort == 'start') {
        strsort = '계약금';
    }
    if (strsort == 'end') {
        strsort = '계약금';
    }
    let message = consultingdetail['consulting_num'] + "번 견적서의 전송 메세지 입니다. \n\nhttp://kiwihome.co.kr/ \n\n 위 링크에서 결제를 진행해 주세요. \n\n" + strsort + " : " + value + "원";
    let receiverlist = document.getElementsByClassName('receiverlist');
    if (isEmpty(receiverlist)) {
        alert('수신자를 추가해주세요.');
        return;
    }
    let receiverstr = '';
    for (let i = 0; i < receiverlist.length; i++) {
        receiverstr += "," + receiverlist[i].innerHTML;
    }
    receiverstr = receiverstr.substring(1, receiverstr.length);
    sendmessage1(receiverstr, message)

    let status = 3;
    if (sort == 'down') {
        status = 3;
    }
    if (sort == 'start') {
        status = 7;
    }
    if (sort == 'end') {
        status = 10;
    }
    if (consultingdetail['consulting_status'] < status) {
        updatecolumn('consulting', 'consulting_seq', consultingdetail['consulting_seq'], 'consulting_status', status);
    }
    alert('전송되었습니다.');
    window.close();
}

function addreceiver() {
    let ci_name = getid('ci_name');
    let receiver = document.getElementsByClassName('receiver')[0];
    let item = document.createElement('h5');
    item.innerHTML = ci_name.value;
    item.style.marginLeft = "30px";
    item.classList.add("receiverlist");
    receiver.append(item);
    ci_name.value = "";

}

function startinterior() {

    let seeconsulting = document.getElementsByClassName('seeconsulting')[0];
    seeconsulting.onclick = function () {
        // intAnswering();
        // return;
        checkproductstock();

    }


}

function startmove() {

    let seeconsulting = document.getElementsByClassName('seeconsulting')[0];
    seeconsulting.onclick = function () {
        // intAnswering();
        // return;
        checkproductstock();

    }


}

function afterstockcheck(lackact1, countmap1) {
    if (cate == '2') {
        afterstockcheckmove(lackact1, countmap1);
        return;
    }
    console.log(lackact);
    lackact = '';
    if (!isEmpty(lackact1)) {
        lackact = JSON.parse(lackact1);
    }
    countmap = '';
    if (!isEmpty(countmap1)) {
        countmap = JSON.parse(countmap1);
    }
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

    let par = [name, tel, addr1, addr2, ct_memo, memo, exp_pay, off_pay, down_pay, start_pay, end_pay, start_dt, end_dt, exp_dt, member_seq];
    let strPar = ['name', 'tel', 'addr1', 'addr2', 'ct_memo', 'memo', 'exp_pay', 'off_pay', 'down_pay', 'start_pay', 'end_pay', 'start_dt', 'end_dt', 'exp_dt', 'consultant_seq'];
    let parName = ['이름', '전화번호', '주소', '상세 주소', '고객 메모', '상담사 메모', '예상 총 금액',
        '출장비', '계약금', '선금', '잔금', '고객 시작 예상일', '고객 종료 예상일', '전체 예상 작업일'];
    for (let i = 0; i < par.length; i++) {
        if (isEmpty(par[i])) {
            if (parName[i] != '고객 메모' && parName[i] != '상담사 메모') {
                alert(parName[i] + "이(가) 비어있습니다.");
                return;
            }

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
    consulting_type = ''
    if (cate == '1') {
        consulting_type = 'I';
    }
    if (cate == '2') {
        consulting_type = 'M';
    }
    formData.append('consulting_type', consulting_type);


    // checkproductstock();

    $.ajax({
        type: "POST",
        url: api_server + "addconsult",
        data: formData,
        processData: false,
        contentType: false,
        async: false,
        success: function (data) {
            if (data.status == 200) {
                updateconsultcolumn(data.consult_seq, 'use_yn', 'Y');
                if (cate == '2') {
                    updateconsultcolumn(data.consult_seq, 'consulting_type', 'M');
                }
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

function afterstockcheckmove(lackact1, countmap1) {
    console.log(lackact);
    lackact = '';
    if (!isEmpty(lackact1)) {
        lackact = JSON.parse(lackact1);
    }
    countmap = '';
    if (!isEmpty(countmap1)) {
        countmap = JSON.parse(countmap1);
    }
    let name = document.getElementsByClassName('name')[0].value;
    let tel = document.getElementsByClassName('tel')[0].value;
    let addr1 = document.getElementsByClassName('addr1')[0].value;
    let addr2 = document.getElementsByClassName('addr2')[0].value;
    let ct_memo = document.getElementsByClassName('ct_memo')[0].value;
    let memo = document.getElementsByClassName('memo')[0].value;

    let exp_pay = document.getElementsByClassName('exp_pay')[0].value;
    let off_pay = document.getElementsByClassName('off_pay')[0].value;
    let down_pay = document.getElementsByClassName('down_pay')[0].value;
    let end_pay = document.getElementsByClassName('end_pay')[0].value;
    let start_dt = document.getElementsByClassName('start_dt')[0].value;
    let end_dt = document.getElementsByClassName('end_dt')[0].value;
    let exp_dt = document.getElementsByClassName('exp_dt')[0].value;
    let member_seq = sessionStorage.getItem("member_seq");

    let par = [name, tel, addr1, addr2, ct_memo, memo, exp_pay, off_pay, down_pay, end_pay, start_dt, end_dt, exp_dt, member_seq];
    let strPar = ['name', 'tel', 'addr1', 'addr2', 'ct_memo', 'memo', 'exp_pay', 'off_pay', 'down_pay', 'end_pay', 'start_dt', 'end_dt', 'exp_dt', 'consultant_seq'];
    let parName = ['이름', '전화번호', '주소', '상세 주소', '고객 메모', '상담사 메모', '예상 총 금액',
        '출장비', '계약금', '선금', '잔금', '고객 시작 예상일', '고객 종료 예상일', '전체 예상 작업일'];
    for (let i = 0; i < par.length; i++) {
        if (isEmpty(par[i])) {
            if (parName[i] != '고객 메모' && parName[i] != '상담사 메모') {
                alert(parName[i] + "이(가) 비어있습니다.");
                return;
            }

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
    formData.append('start_pay', '0');
    consulting_type = ''
    if (cate == '1') {
        consulting_type = 'I';
    }
    if (cate == '2') {
        consulting_type = 'M';
    }
    formData.append('consulting_type', consulting_type);
    // checkproductstock();

    $.ajax({
        type: "POST",
        url: api_server + "addconsult",
        data: formData,
        processData: false,
        contentType: false,
        async: false,
        success: function (data) {
            if (data.status == 200) {
                updateconsultcolumn(data.consult_seq, 'use_yn', 'Y');
                if (cate == '2') {

                    updateconsultcolumn(data.consult_seq, 'consulting_type', 'M');

                }
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

function checkproductstock() {


    let item = document.getElementsByClassName('product');
    let itemmap = new Map();
    for (let i = 0; i < item.length; i++) {
        let count = item[i].getElementsByTagName('td')[3].innerHTML * 1;
        let product_seq = item[i].getAttribute('product_seq');
        if (itemmap.has(product_seq)) {
            itemmap.set(product_seq, itemmap.get(product_seq) + count);
        } else {
            itemmap.set(product_seq, count);
        }

    }
    let keys = [...itemmap.keys()];
    let islack = false;
    let lackmap = new Map();
    for (let i = 0; i < keys.length; i++) {
        let lack = checkproductstockitem(keys[i], itemmap.get(keys[i]));

        if (lack != 0) {
            islack = true;
            let countmap = new Map();
            countmap.set('count', itemmap.get(keys[i]));
            countmap.set('lack', lack);
            lackmap.set(keys[i], countmap);
        }
    }

    if (!islack) {
        afterstockcheck();
        return;
    }
    let sendmap = new Map();
    let options = document.getElementsByClassName('option');
    for (let i = 0; i < options.length; i++) {
        let info_seq = options[i].getAttribute('info_seq');
        let codies = options[i].getElementsByClassName('codi');
        for (let j = 0; j < codies.length; j++) {
            let items = codies[j].getElementsByClassName('product');
            if (!isEmpty(items)) {
                for (let k = 0; k < items.length; k++) {
                    let product_seq = items[k].getAttribute('product_seq');
                    if (!lackmap.has(product_seq)) {
                        continue;
                    }
                    if (sendmap.hasOwnProperty(info_seq)) {
                        let infomap = sendmap[info_seq];
                        if (infomap.hasOwnProperty(product_seq)) {
                            let productmap = infomap[product_seq];
                            productmap.count = productmap.count + lackmap.get(product_seq).get('count');
                            productmap.lack = productmap.lack + lackmap.get(product_seq).get('lack');
                            infomap[product_seq] = productmap;

                        } else {
                            let productmap = new Map();
                            productmap.count = lackmap.get(product_seq).get('count');
                            productmap.lack = lackmap.get(product_seq).get('lack');
                            infomap[product_seq] = productmap;
                        }
                        sendmap[info_seq] = infomap;

                    } else {
                        let infomap = new Map();
                        let productmap = new Object();
                        productmap.count = lackmap.get(product_seq).get('count');
                        productmap.lack = lackmap.get(product_seq).get('lack');
                        infomap[product_seq] = productmap;
                        sendmap[info_seq] = infomap;
                    }
                }
            }
        }
    }

    console.log(sendmap);
    if (islack) {
        sessionStorage.setItem('productmap', JSON.stringify(sendmap));
        window.open('/checkproduct?sort=write', 'checkproduct', 'width=800px,height=600px,toolbars=no,scrollbars=no');
    }
}


function mapToObj(inputMap) {
    let obj = {};

    inputMap.forEach(function (value, key) {
        obj[key] = value
    });

    return obj;
}

function sendmessage1(receiver, msg) {

    result = '';
    let body = {};
    body['receiver'] = receiver;
    body['msg'] = msg;

    $.ajax({
        type: "POST",
        url: api_server + "sendmessage",
        contentType: "application/json",
        data: JSON.stringify(body),
        processData: false,
        async: false,
        success: function (data) {

            if (data.status == 200) {
                result = 0;

            } else if (data.status == 401) {


            }
        }
        ,
        err: function (err) {

        }
    });

    return result;
}

function checkproductstockitem(product_seq, count) {
    result = '';
    let body = {};
    body['product_seq'] = product_seq;
    body['count'] = count;

    $.ajax({
        type: "POST",
        url: api_server + "checkproductstockitem",
        contentType: "application/json",
        data: JSON.stringify(body),
        processData: false,
        async: false,
        success: function (data) {
            console.log(data);
            if (data.status == 200) {
                result = 0;

            } else if (data.status == 401) {
                result = data.lack;

            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });

    return result;
}

function addnoti(title, content, noti_type, member_seq, smember_seq) {
    result = '';
    let body = {};
    body['title'] = title;
    body['content'] = content;
    body['noti_type'] = noti_type;
    body['member_seq'] = member_seq;
    body['smember_seq'] = smember_seq;
    $.ajax({
        type: "POST",
        url: api_server + "addnoti",
        contentType: "application/json",
        data: JSON.stringify(body),
        processData: false,
        async: false,
        success: function (data) {
            console.log(data);
            if (data.status == 200) {
                result = 0;

            } else if (data.status == 401) {
                result = data.lack;

            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });

    return result;
}

function intAnswering(job_seq) {

    let selectOptions = document.getElementsByClassName('option');
    let selectCateInfo = [];
    let selectCateDiv = [];
    let selectCodi = [];
    let selectAnswer = [];
    let selectimg = [];
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
        let codiDiv = selectCateDiv[i].getElementsByClassName('codi');
        let answer = [];
        let imgSrc = [];
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
                        answer1 = "";
                        for (let l = 0; l < data.length; l++) {
                            if (data[l].checked) {
                                answer1 += "," + datavalue[l].innerHTML;
                            }
                        }
                        answer.push(answer1.substring(1, answer1.length));
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
                    //자재
                    else if (codi_seq > 4 && codi_seq < 9) {
                        answer.push('0');
                        let products = answerDiv.getElementsByClassName('product');
                        for (let o = 0; o < products.length; o++) {
                            let count = products[o].getElementsByTagName('td')[3].innerHTML;
                            let info_seq = products[o].getAttribute('info_seq');
                            let product_seq = products[o].getAttribute('product_seq');
                            let checked = products[o].getElementsByTagName('input')[0].checked;
                            let type = checked ? "T" : "C";
                            let lacksort = 'trans';
                            if (!isEmpty(lackact)) {
                                if (lackact.hasOwnProperty(product_seq)) {

                                }

                            }

                            let lackcount = 0;
                            if (!isEmpty(countmap)) {
                                if (countmap.hasOwnProperty(product_seq)) {
                                    lackcount = countmap[product_seq];
                                }
                            }
                            let istrans = lacksort == 'trans';

                            let test = [job_seq[i], product_seq, 0, count - lackcount, lackcount, type];
                            console.log(test);
                            if (istrans) {
                                addjobproduct(job_seq[i], product_seq, count, count - lackcount, lackcount, '0', type);
                            } else {
                                addjobproduct(job_seq[i], product_seq, count, count - lackcount, '0', lackcount, type);
                            }

                        }

                    } else if (codi_seq == 9) {
                        let input = answerDiv.getElementsByTagName('input')[0];
                        if (isEmpty(input.value)) {
                            alert(answerDiv.getElementsByClassName('header')[0].innerHTML);
                            return;
                        } else {
                            answer.push(input.value);
                        }
                    } else if (codi_seq == 10) {

                        let value = 0;
                        let pluslist = answerDiv.getAttribute('pluslist').split("+");
                        for (let w = 0; w < pluslist.length; w++) {
                            for (let q = 0; q < codiDiv.length; q++) {
                                if (codiDiv[q].getAttribute('question_seq') == pluslist[w]) {
                                    let input = codiDiv[q].getElementsByTagName('input')[0];
                                    if (input.placeholder == '원') {
                                        value += input.value * 1;
                                    }
                                }
                            }

                        }

                        answer.push(value);

                    }

                    // else
                    else {

                        answer.push("");

                    }
                    //이미지


                    if (answerDiv.querySelectorAll(".imagefile").length > 0) {
                        let img = answerDiv.getElementsByClassName('imagefile')[0];
                        let file = img.files[0];
                        if (file == "" || file == null || file == undefined) {
                            imgSrc.push('');
                        } else {
                            let extention = file.name.split('.')[1];
                            let filename = generate_token(28);
                            let fullname = filename + "." + extention;
                            savefile(file, fullname);
                            imgSrc.push(api_server + "/static/data/" + fullname);
                        }


                    } else {
                        imgSrc.push('');
                    }

                }
            }

        }
        selectCodi.push(codi);
        selectAnswer.push(answer);
        selectimg.push(imgSrc);
    }
    addconsultingdetail(job_seq, selectCodi, selectAnswer, selectimg);
}

function intOneAnswering(job_seq, index) {

    let option = document.getElementsByClassName('option' + index)[0];
    //
    // 질문 데이터 하나하나
    let codi = [];
    // 답변 하나하나
    let codiDiv = option.getElementsByClassName('codi');
    let answer = [];
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
                    answer1 = "";
                    for (let l = 0; l < data.length; l++) {
                        if (data[l].checked) {
                            answer1 += "," + datavalue[l].innerHTML;
                        }
                    }
                    answer.push(answer1.substring(1, answer1.length));
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
                //자재
                else if (codi_seq > 4 && codi_seq < 9) {
                    answer.push('0');
                    let products = answerDiv.getElementsByClassName('product');
                    for (let o = 0; o < products.length; o++) {
                        let count = products[o].getElementsByTagName('td')[3].innerHTML;
                        let info_seq = products[o].getAttribute('info_seq');
                        let product_seq = products[o].getAttribute('product_seq');
                        let checked = products[o].getElementsByTagName('input')[0].checked;
                        let type = checked ? "T" : "C";
                        let lacksort = 'trans';
                        if (!isEmpty(lackact)) {
                            if (lackact.hasOwnProperty(product_seq)) {

                            }

                        }

                        let lackcount = 0;
                        if (!isEmpty(countmap)) {
                            if (countmap.hasOwnProperty(product_seq)) {

                                lackcount = countmap[product_seq];
                            }
                        }
                        let istrans = lacksort == 'trans';

                        let test = [job_seq, product_seq, 0, count - lackcount, lackcount, type];
                        console.log(test);
                        if (istrans) {
                            addjobproduct(job_seq, product_seq, count, count - lackcount, lackcount, '0', type);
                        } else {
                            addjobproduct(job_seq, product_seq, count, count - lackcount, '0', lackcount, type);
                        }

                    }

                }
                //숫자
                else if (codi_seq == 9) {
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
                // alert(img.src);
                // imgSrc.push(img.src);

            }
        }

    }


    addonejobdetail(job_seq, codi, answer)
}


function deletejobseq(job_seq) {

    let result = '';
    let body = {};
    body['job_seq'] = job_seq;


    $.ajax({
        type: "POST",
        url: api_server + "deletejobseq",
        contentType: "application/json",
        dataType: "JSON",
        data: JSON.stringify(body),
        processData: false,
        async: false,
        success: function (data) {
            if (data.status == 200) {
                result = data;
                return result;
            } else {

                alert(data.err);
            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
    return result;


}

function intonejobupdate(job_seq, index) {


    deletejobseq(job_seq);
    let option = document.getElementsByClassName('option' + index)[0];
    //
    // 질문 데이터 하나하나
    let codi = [];
    // 답변 하나하나
    let codiDiv = option.getElementsByClassName('codi');
    let answer = [];

    let imgSrc = [];
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
                    answer1 = "";
                    for (let l = 0; l < data.length; l++) {
                        if (data[l].checked) {
                            answer1 += "," + datavalue[l].innerHTML;
                        }
                    }
                    answer.push(answer1.substring(1, answer1.length));
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
                } else if (codi_seq > 4 && codi_seq < 9) {
                    answer.push('0');
                    let products = answerDiv.getElementsByClassName('product');
                    for (let o = 0; o < products.length; o++) {
                        let count = products[o].getElementsByTagName('td')[3].innerHTML;
                        let info_seq = products[o].getAttribute('info_seq');
                        let product_seq = products[o].getAttribute('product_seq');
                        let checked = products[o].getElementsByTagName('input')[0].checked;
                        let type = checked ? "T" : "C";
                        let lacksort = 'trans';
                        if (!isEmpty(lackact)) {
                            if (lackact.hasOwnProperty(product_seq)) {

                            }

                        }

                        let lackcount = 0;
                        if (!isEmpty(countmap)) {
                            if (countmap.hasOwnProperty(product_seq)) {

                                lackcount = countmap[product_seq];
                            }
                        }
                        let istrans = lacksort == 'trans';

                        let test = [job_seq, product_seq, 0, count - lackcount, lackcount, type];
                        console.log(test);
                        if (istrans) {
                            addjobproduct(job_seq, product_seq, count, count - lackcount, lackcount, '0', type);
                        } else {
                            addjobproduct(job_seq, product_seq, count, count - lackcount, '0', lackcount, type);
                        }

                    }

                }
                //텍스트
                else if (codi_seq == 9) {
                    let input = answerDiv.getElementsByTagName('input')[0];
                    if (isEmpty(input.value)) {
                        alert(answerDiv.getElementsByClassName('header')[0].innerHTML);
                        return;
                    } else {
                        answer.push(input.value);
                    }
                } else if (codi_seq == 10) {

                    let value = 0;
                    let pluslist = answerDiv.getAttribute('pluslist').split("+");
                    for (let w = 0; w < pluslist.length; w++) {
                        for (let q = 0; q < codiDiv.length; q++) {
                            if (codiDiv[q].getAttribute('question_seq') == pluslist[w]) {
                                let input = codiDiv[q].getElementsByTagName('input')[0];
                                if (input.placeholder == '원') {
                                    value += input.value * 1;
                                }
                            }
                        }

                    }

                    answer.push(value);

                }

                // else
                else {

                    answer.push("");

                }
                //이미지
                let img = answerDiv.getElementsByTagName('img')[0];
                if (answerDiv.querySelectorAll(".imagefile").length > 0) {
                    let img = answerDiv.getElementsByClassName('imagefile')[0];
                    let file = img.files[0];
                    if (file == "" || file == null || file == undefined) {
                        imgSrc.push('');
                    } else {
                        let extention = file.name.split('.')[1];
                        let filename = generate_token(28);
                        let fullname = filename + "." + extention;
                        savefile(file, fullname);
                        imgSrc.push(api_server + "/static/data/" + fullname);
                    }


                } else {
                    imgSrc.push('');
                }
                // alert(img.src);
                // imgSrc.push(img.src);

            }
        }

    }


    updateonejobdetail(job_seq, codi, answer, imgSrc)

}

function startinteriorEdit() {


    let options = document.getElementsByClassName('option');
    let optionlist = getid('optionlist');

    for (let i = 0; i < jobs.length; i++) {
        for (let j = 0; j < categoryinfo.length; j++) {
            if (jobs[i]['info_seq'] == categoryinfo[j]['info_seq']) {
                optionlist.getElementsByTagName('label')[j].click();
                let option = document.getElementsByClassName('option' + j)[0];


            }
        }
    }

    job1 = [];
    for (let i = 0; i < jobs.length; i++) {
        for (let j = 0; j < categoryinfo.length; j++) {
            if (jobs[i]['info_seq'] == categoryinfo[j]['info_seq']) {
                job1.push(jobs[i]);
            }
        }

    }
    for (let i = 0; i < job1.length; i++) {

        let job2 = job1[i];
        let job_products = getjobproduct(job2['job_seq']);
        for (let j = 0; j < questions.length; j++) {
            if (jobs[i]['info_seq'] == questions[j]['info_seq']) {
                for (let l = 0; l < answers.length; l++) {
                    if (jobs[i]['job_seq'] == answers[l]['job_seq'] && questions[j]['question_seq'] == answers[l]['question_seq']) {
                        let codi = document.getElementsByClassName('codi' + questions[j]['question_seq'])[0];
                        let answer_value = answers[l]['answer_value'];
                        let img_url = answers[l]['img_url'];
                        if (isEmpty(answer_value)) {
                            continue;
                        }
                        // 다중선택
                        if (questions[j]['codi_seq'] == 1) {
                            console.log(answer_value);
                            let selectcon = codi.getElementsByClassName('selectgroup-pills')[0];
                            let selects = selectcon.getElementsByTagName('label');
                            let answer_value_list = answer_value.split(",");
                            for (let k = 0; k < selects.length; k++) {
                                let selectsinput = selects[k].getElementsByTagName('input')[0];
                                let selectsspan = selects[k].getElementsByTagName('span')[0];
                                let select_value = selectsspan.innerHTML;
                                for (let o = 0; o < answer_value_list.length; o++) {
                                    if (select_value == answer_value_list[o]) {
                                        selectsinput.checked = true;
                                    }
                                }
                                // if(selectsspan.innerHTML == answers[l])
                            }
                        }

                        //단일 선택
                        if (questions[j]['codi_seq'] == 2) {
                            let selectcon = codi.getElementsByClassName('selectgroup-pills')[0];
                            let selects = selectcon.getElementsByTagName('label');
                            for (let k = 0; k < selects.length; k++) {
                                let selectsinput = selects[k].getElementsByTagName('input')[0];
                                let selectsspan = selects[k].getElementsByTagName('span')[0];
                                let select_value = selectsspan.innerHTML;
                                if (select_value == answer_value) {
                                    selectsinput.checked = true;
                                }


                                // if(selectsspan.innerHTML == answers[l])
                            }
                        }
                        // 숫자
                        if (questions[j]['codi_seq'] == 3) {
                            let input = codi.getElementsByTagName('input')[0];
                            input.value = answer_value;
                        }

                        if (questions[j]['codi_seq'] > 4 && questions[j]['codi_seq'] < 9) {
                            console.log(job_products);

                            let table = codi.getElementsByClassName('table')[0];
                            for (let o = 0; o < job_products.length; o++) {
                                let jp = job_products[o];
                                let item = document.createElement("tr");
                                item.classList.add("product");
                                item.setAttribute("product_seq", jp['product.product_seq']);
                                item.setAttribute("job_seq", jp['job_seq']);
                                let product_seq = document.createElement("td");
                                let name = document.createElement("td");
                                let price = document.createElement("td");
                                let stock = document.createElement("td");
                                let check = document.createElement("td");

                                product_seq.innerHTML = jp['product.product_seq'];
                                price.innerHTML = jp['price'];
                                name.innerHTML = jp['name'];
                                stock.innerHTML = jp['order_cnt'];

                                let check2 = document.createElement('input');
                                check2.type = "checkbox";
                                check.append(check2);


                                item.append(product_seq);
                                item.append(name);
                                item.append(price);
                                item.append(stock);
                                item.append(check);
                                table.appendChild(item);
                            }
                        }

                        // 텍스트
                        if (questions[j]['codi_seq'] == 9) {
                            let input = codi.getElementsByTagName('input')[0];
                            input.value = answer_value;
                        }// 텍스트
                        if (questions[j]['codi_seq'] == 10) {
                            let input = codi.getElementsByTagName('input')[0];
                            input.value = answer_value;
                        }


                        if (codi.querySelectorAll(".imagefile").length > 0) {
                            let img = codi.getElementsByClassName('imagetag')[0];
                            if (!isEmpty(img_url)) {
                                img.src = img_url;
                            }

                        }


                    }
                }
            }
        }
    }


    let seeconsulting = document.getElementsByClassName('seeconsulting')[0];
    seeconsulting.onclick = function () {
        checkproductstockedit();

    }


}

function checkproductstockedit() {


    let item = document.getElementsByClassName('product');
    let itemmap = new Map();
    for (let i = 0; i < item.length; i++) {
        let count = item[i].getElementsByTagName('td')[3].innerHTML * 1;
        let product_seq = item[i].getAttribute('product_seq');
        if (itemmap.has(product_seq)) {
            itemmap.set(product_seq, itemmap.get(product_seq) + count);
        } else {
            itemmap.set(product_seq, count);
        }

    }
    let keys = [...itemmap.keys()];
    let islack = false;
    let lackmap = new Map();
    for (let i = 0; i < keys.length; i++) {
        let lack = checkproductstockitem(keys[i], itemmap.get(keys[i]));

        if (lack != 0) {
            islack = true;
            let countmap = new Map();
            countmap.set('count', itemmap.get(keys[i]));
            countmap.set('lack', lack);
            lackmap.set(keys[i], countmap);
        }
    }

    if (!islack) {
        afterstockcheckedit();
        return;
    }
    let sendmap = new Map();
    let options = document.getElementsByClassName('option');
    for (let i = 0; i < options.length; i++) {
        let info_seq = options[i].getAttribute('info_seq');
        let codies = options[i].getElementsByClassName('codi');
        for (let j = 0; j < codies.length; j++) {
            let items = codies[j].getElementsByClassName('product');
            if (!isEmpty(items)) {
                for (let k = 0; k < items.length; k++) {
                    let product_seq = items[k].getAttribute('product_seq');
                    if (!lackmap.has(product_seq)) {
                        continue;
                    }
                    if (sendmap.hasOwnProperty(info_seq)) {
                        let infomap = sendmap[info_seq];
                        if (infomap.hasOwnProperty(product_seq)) {
                            let productmap = infomap[product_seq];
                            productmap.count = productmap.count + lackmap.get(product_seq).get('count');
                            productmap.lack = productmap.lack + lackmap.get(product_seq).get('lack');
                            infomap[product_seq] = productmap;

                        } else {
                            let productmap = new Map();
                            productmap.count = lackmap.get(product_seq).get('count');
                            productmap.lack = lackmap.get(product_seq).get('lack');
                            infomap[product_seq] = productmap;
                        }
                        sendmap[info_seq] = infomap;

                    } else {
                        let infomap = new Map();
                        let productmap = new Object();
                        productmap.count = lackmap.get(product_seq).get('count');
                        productmap.lack = lackmap.get(product_seq).get('lack');
                        infomap[product_seq] = productmap;
                        sendmap[info_seq] = infomap;
                    }
                }
            }
        }
    }

    console.log(sendmap);
    if (islack) {
        sessionStorage.setItem('productmap', JSON.stringify(sendmap));
        window.open('/checkproduct?sort=edit', 'checkproduct', 'width=800px,height=600px,toolbars=no,scrollbars=no');
    }


}

function afterstockcheckedit(lackact1, countmap1) {

    if (!isEmpty(lackact1)) {
        lackact = JSON.parse(lackact1);
    }
    countmap = '';
    if (!isEmpty(countmap1)) {
        countmap = JSON.parse(countmap1);
    }


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

    start_dt = start_dt.substring(0, 10);
    end_dt = end_dt.substring(0, 10);
    let par = [name, tel, addr1, addr2, ct_memo, memo, exp_pay, off_pay, down_pay, start_pay, end_pay, start_dt, end_dt, exp_dt];
    let strPar = ['name', 'tel', 'addr1', 'addr2', 'ct_memo', 'memo', 'exp_pay', 'off_pay', 'down_pay', 'start_pay', 'end_pay', 'start_dt', 'end_dt', 'exp_dt'];
    let parName = ['이름', '전화번호', '주소', '상세 주소', '고객 메모', '상담사 메모', '예상 총 금액',
        '출장비', '계약금', '선금', '잔금', '고객 시작 예상일', '고객 종료 예상일', '전체 예상 작업일'];
    for (let i = 0; i < par.length; i++) {
        if (isEmpty(par[i])) {

            if (parName[i] != '고객 메모' && parName[i] != '상담사 메모') {
                alert(parName[i] + "이(가) 비어있습니다.");
                return;
            }
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
                updateconsultcolumn(consulting_seq, 'use_yn', 'Y');
                updateConsulting();
            } else {
                alert(data.err);

            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });

    if (consultdetail['consulting_status'] < 2) {

        updatecolumn('consulting', 'consulting_seq', consulting_seq, 'consulting_status', 2)
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
            alert('asdfa');
            alert(err.status);
        }
    });
}

function addonejob(consult_seq, info, index) {
    let selectCateInfo = [];
    selectCateInfo.push(info);

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
        success: function (data) {
            if (data.status == 200) {
                intOneAnswering(data.job_seq, index);
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

function addconsultingdetail(job_seq, selectCodi, selectAnswer, img_url) {
    let body = {};
    body['job_seq'] = job_seq;
    body['question_seq'] = selectCodi;
    body['answer_value'] = selectAnswer;

    body['img_url'] = img_url;

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
                if (cate == '2') {
                    location.href = "/mc_est_list";
                } else {

                    location.href = "/itr_est_list";
                }
            } else {

                alert('asdf');
                alert(data.err);
            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });

}

function addonejobdetail(job_seq, selectCodi, selectAnswer) {
    let body = {};
    body['job_seq'] = job_seq;
    body['question_seq'] = selectCodi;
    body['answer_value'] = selectAnswer;

    $.ajax({
        type: "POST",
        url: api_server + "addonejobdetail",
        contentType: "application/json",
        dataType: "JSON",
        data: JSON.stringify(body),
        processData: false,
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

function addconsulting_history(consulting_seq, working_content) {
    let body = {};
    body['member_seq'] = sessionStorage.getItem("member_seq");
    body['consulting_seq'] = consulting_seq;
    body['working_content'] = working_content;

    $.ajax({
        type: "POST",
        url: api_server + "addconsulting_history",
        contentType: "application/json",
        dataType: "JSON",
        data: JSON.stringify(body),
        processData: false,
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


function updateonejobdetail(job_seq, selectCodi, selectAnswer, imgSrc) {
    let body = {};
    body['job_seq'] = job_seq;
    body['question_seq'] = selectCodi;
    body['answer_value'] = selectAnswer;
    body['img_url'] = imgSrc;

    $.ajax({
        type: "POST",
        url: api_server + "addonejobdetail",
        contentType: "application/json",
        dataType: "JSON",
        data: JSON.stringify(body),
        processData: false,
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

function getallconsult() {

    consult = "";

    let body = {};
    if (cate == '2') {
        body['consulting_type'] = 'M';
    } else {
        body['consulting_type'] = 'I';
    }
    $.ajax({
        type: "POST",
        url: api_server + "getallconsult",
        data: JSON.stringify(body),
        processData: false,
        contentType: 'application/json',
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
                for (let i = 0; i < members.length; i++) {
                    if (members[i]['member_seq'] == data['consultant_seq']) {

                        row[8].innerHTML = members[i]['name'];
                    }
                }
                row[9].classList.add('consultingstatus');
                row[9].innerHTML = data['consulting_status'] == 12 ? '완료' : '진행';
                row[10].innerHTML = '작성';
                row[10].onclick = function () {
                    // let store = getonestore(data['store_seq'])
                    location.href = '/message?re_msg_seq=' + data['member_seq'];
                };
                let detailinput = document.getElementsByClassName('detailinput');
                detailinput[0].value = data['t_expected_cost'];
                detailinput[1].value = data['offline_payment'];
                detailinput[2].value = data['down_payment'];
                detailinput[3].value = data['start_payment'];
                detailinput[4].value = data['end_payment'];

                let sendpreestimate1 = document.getElementsByClassName('sendpreestimate1')[0];

                sendpreestimate1.onclick = function () {

                    sendpreestimate(data['consulting_seq'], 'down', data['down_payment']);

                };
                //담당자
                let member = findmember(data['member_seq']);

                let isdownpayment = document.getElementsByClassName('isdownpayment')[0];
                let isdownpayed = data['down_payment_status'] == 1;
                isdownpayment.innerHTML = isdownpayed ? '입금 완료' : '입금 대기';
                if (!isdownpayed) {
                    isdownpayment.onclick = function () {


                        if (!confirm("입금확인을 하시겠습니까?")) {
                        } else {
                            updateconsultcolumn(data['consulting_seq'], 'down_payment_status', "1");

                            addconsulting_history(data['consulting_seq'], '계약금 입금 완료');
                            if (data['consulting_status'] < 4) {
                                updateconsultcolumn(data['consulting_seq'], 'consulting_status', 4);
                                if (!checkishaverealconsult(data['consulting_seq'])) {
                                    FunLoadingBarStart();
                                    copyrealconsulting(data['consulting_seq']);
                                }

                            }

                            setTimeout(function () {
                                location.reload();
                            }, 300);
                        }


                    }
                }
                document.getElementsByClassName('confirm')[0].onclick = function () {
                    location.href = '/itr_est_list';
                };
                document.getElementsByClassName('edit')[0].onclick = function () {
                    if (data['consulting_status'] < 4) {

                        location.href = '/itr_visit_est_write_example?seq=' + seq;

                    } else {
                        alert('현재 가견적서 수정이 불가능합니다.');
                    }
                };
                document.getElementsByClassName('seeestimate')[0].onclick = function () {
                    moveLocation('Estimate?seq=' + category_seq);
                }
                setDetailData1(data);


            } else {


            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });


}

function setDetailDataMove(seq) {
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
                for (let i = 0; i < members.length; i++) {
                    if (members[i]['member_seq'] == data['consultant_seq']) {

                        row[8].innerHTML = members[i]['name'];
                    }
                }
                row[9].classList.add('consultingstatus');
                row[9].innerHTML = data['consulting_status'] == 12 ? '완료' : '진행';
                row[10].innerHTML = '작성';
                row[10].onclick = function () {
                    // let store = getonestore(data['store_seq'])
                    location.href = '/message?re_msg_seq=' + data['member_seq'];
                };
                let detailinput = document.getElementsByClassName('detailinput');
                detailinput[0].value = data['t_expected_cost'];
                detailinput[1].value = data['offline_payment'];
                detailinput[2].value = data['down_payment'];
                detailinput[3].value = data['end_payment'];

                //담당자
                let member = findmember(data['member_seq']);
                document.getElementsByClassName('confirm')[0].onclick = function () {
                    location.href = '/mc_est_list';
                };
                document.getElementsByClassName('edit')[0].onclick = function () {
                    if (data['consulting_status'] < 4) {

                        location.href = '/mc_visit_est_write_example?seq=' + seq;

                    } else {
                        alert('현재 가견적서 수정이 불가능합니다.');
                    }
                };
                document.getElementsByClassName('seeestimate')[0].onclick = function () {
                    moveLocation('Estimate?seq=' + category_seq);
                }
                setDetailDataMove1(data);


            } else {


            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });


}

function setDetailData1(consulting) {


    $.ajax({
        url: "/img_upload",
        async: false,
        success: function (data) {
            // 옵션 form 글로벌 저장
            setpayproof('down', data, consulting);
            setpayproof('start', data, consulting);
            setpayproof('end', data, consulting);


        }, err: function (err) {

        },

        dataType: 'html'
    });


}

function setDetailDataMove1(consulting) {


    $.ajax({
        url: "/img_upload",
        async: false,
        success: function (data) {
            // 옵션 form 글로벌 저장
            setpayproof('start', data, consulting);
            setpayproof('end', data, consulting);


        }, err: function (err) {

        },

        dataType: 'html'
    });


}

function setpayproof(sort, data, consulting) {
    let down_pay = document.getElementById(sort + '_pay');
    let img_content = document.createElement('div');
    let img_value = document.createElement('button');
    let img_drop = document.createElement('div');

    img_value.innerHTML = '현장 결제';
    img_content.classList.add('dropdown');
    img_value.classList.add('dropdown-toggle');
    img_drop.classList.add('dropdown-menu');
    img_value.setAttribute('data-toggle', 'dropdown');
    img_value.setAttribute('aria-haspopup', 'true');
    img_value.setAttribute('aria-expanded', 'false');
    img_value.style.background = '#ffffff';
    img_value.type = 'button';
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

    if (consulting[sort + '_payment_payment_text'] == null || consulting[sort + '_payment_payment_text'] == '') {
        imgbtns[1].style.display = 'none';
        imgbtns[0].innerHTML = '등록';


    } else {
        imgbtns[0].innerHTML = '수정';
        imgbtns[1].onclick = function () {
            //todo

            updateconsultcolumn(consulting['consulting_seq'], sort + '_payment_payment_text', '');
            alert('이미지를 삭제하였습니다.');
            location.reload();
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
            savefile(file, filename);
            updateconsultcolumn(consulting['consulting_seq'], sort + '_payment_payment_text', filename);
            alert('이미지를 등록하였습니다.');
            img_drop.style.display = 'none';
            location.reload();
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
    img_url.value = consulting[sort + '_payment_payment_text'];

    img_content.append(img_value);
    img_content.append(img_drop);
    down_pay.append(img_content);
}

function copyrealconsulting(seq) {

    logs = "";

    let body = {};
    body['consulting_seq'] = seq;

    $.ajax({
        type: "POST",
        url: api_server + "copyrealconsulting",
        data: JSON.stringify(body),
        processData: false,
        contentType: 'application/json',
        async: false,
        success: function (data) {
            if (data.status == 200) {

                logs = data.data;
                return logs;
            } else {
                alert(data.err);

            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
    return logs

}

function selectpaymethod(sort, value) {
    let text = '';

    if (value == 'N') {
        text = '미발급';
    }
    if (value == 'C') {
        text = '현금영수증';
    }
    if (value == 'T') {
        text = '세금계산서';
    }
    if (value == 'R') {
        text = '카드-미발급';
    }

    if (sort == 'down_payment_proof') {
        setText('downtext', text);
    } else if (sort == 'start_payment_proof') {

        setText('starttext', text);
    } else {
        setText('endtext', text);
    }
    let realseq = sessionStorage.getItem('realseq');
    updatecolumn('consulting', 'consulting_seq', realseq, sort, value);
    location.reload();


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

function FunLoadingBarStart() {
    var backHeight = $(document).height(); //뒷 배경의 상하 폭
    var backWidth = window.document.body.clientWidth; //뒷 배경의 좌우 폭
    var backGroundCover = "<div id='back'></div>"; //뒷 배경을 감쌀 커버
    var loadingBarImage = ''; //가운데 띄워 줄 이미지
    loadingBarImage += "<div id='loadingBar'>";
    loadingBarImage += " <img src='./static/image/loading.gif'/>"; //로딩 바 이미지
    loadingBarImage += "</div>";
    $('body').append(backGroundCover).append(loadingBarImage);
    $('#back').css({'width': backWidth, 'height': backHeight, 'opacity': '0.3'});
    $('#back').show();
    $('#loadingBar').show();
}

function FunLoadingBarEnd() {
    $('#back, #loadingBar').hide();
    $('#back, #loadingBar').remove();
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


    let par = [name, tel, addr1, addr2, memo, ct_memo, exp_pay, off_pay, down_pay, start_pay, end_pay, exp_dt];
    let strPar = ['name', 'phone', 'addr', 'addr_info', 'other_text', 'memo', 't_expected_cost'
        , 'offline_payment', 'down_payment', 'start_payment', 'end_payment', 't_working_day'];
    start_dt.value = consultdetail['start_dt'].substring(0, 10);
    end_dt.value = consultdetail['end_dt'].substring(0, 10);

    for (let i = 0; i < par.length; i++) {
        par[i].value = consultdetail[strPar[i]];
    }

    let optionlist = document.getElementById('optionlist');


}

function updateConsulting() {

    let options = document.getElementsByClassName('option');
    console.log(options.length);

    let categoryinfos = [];
    for (let i = 0; i < options.length; i++) {
        for (let j = 0; j < categoryinfo.length; j++) {
            if (options[i].classList.contains('option' + j)) {
                categoryinfos.push(categoryinfo[j]);
            }
        }
    }
    for (let i = 0; i < categoryinfo.length; i++) {
        oldcontain = false;
        newcontain = false;

        job_seq = "";
        for (let j = 0; j < jobs.length; j++) {
            if (categoryinfo[i]['info_seq'] == jobs[j]['info_seq']) {
                oldcontain = true;
                job_seq = jobs[j]['job_seq'];
            }
        }
        for (let j = 0; j < categoryinfos.length; j++) {

            if (categoryinfo[i]['info_seq'] == categoryinfos[j]['info_seq']) {
                newcontain = true;
            }
        }

        if (oldcontain) {
            if (newcontain) {
                //수정
                updateJob(i, job_seq);
            } else {
                //삭제
                deleterow('consulting_job', 'job_seq', job_seq, 'consulting_job');

            }
        } else {
            if (newcontain) {
                //추가
                insertJob(i);

            } else {
                //가만히 두기


            }
        }
    }


    FunLoadingBarStart();
    if (consultdetail['type'] == 1) {
        addconsulting_history(consultdetail['consulting_seq'], '실견적 수정');
    } else {

        addconsulting_history(consultdetail['consulting_seq'], '가견적 수정');

    }

    setTimeout(function () {
        FunLoadingBarEnd();
        window.history.go(-1);
    }, 3000);
}


function addjobtorealconsulting(seq) {
    let realconsulting = getrealconsult(seq);
    console.log(realconsulting);
    let realconsult_seq = realconsulting['consulting_seq'];
    addjob(realconsult_seq);

}

function updateJob(index, job_seq) {
    intonejobupdate(job_seq, index);
}

function insertJob(index) {
    let info = categoryinfo[index];
    addonejob(consulting_seq, info, index);
}

function deleterow(tablename, wherecolumn, wherevalue, category) {

    let body = {};
    body['tablename'] = tablename;
    body['wherecolumn'] = wherecolumn;
    body['wherevalue'] = wherevalue;
    body['category'] = category;

    body['delete_by'] = sessionStorage.getItem("member_seq");

    $.ajax({
        type: "POST",
        url: api_server + "deleterow",
        contentType: "application/json",
        dataType: "JSON",
        data: JSON.stringify(body),
        processData: false,
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

function checkishaverealconsult(seq) {

    let body = {};
    body['consulting_seq'] = seq;

    result = false;
    $.ajax({
        type: "POST",
        url: api_server + "checkishaverealconsult",
        contentType: "application/json",
        dataType: "JSON",
        data: JSON.stringify(body),
        processData: false,
        async: false,
        success: function (data) {
            if (data.status == 200) {
                result = true;
                return result;

            } else {
                result = false;
                return result;
            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });

    return result;
}

function deletecompleterow(tablename, wherecolumn, wherevalue) {

    let body = {};
    body['tablename'] = tablename;
    body['wherecolumn'] = wherecolumn;
    body['wherevalue'] = wherevalue;

    $.ajax({
        type: "POST",
        url: api_server + "deletecompleterow",
        contentType: "application/json",
        dataType: "JSON",
        data: JSON.stringify(body),
        processData: false,
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

function updateconsultcolumn(consulting_seq, column, value) {

    let body = {};
    body['consulting_seq'] = consulting_seq;
    body['column'] = column;
    body['value'] = value;


    $.ajax({
        type: "POST",
        url: api_server + "updateconsultcolumn",
        contentType: "application/json",
        dataType: "JSON",
        data: JSON.stringify(body),
        processData: false,
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

function updatecolumn(table, wherecolumn, wherevalue, column, value) {

    let body = {};
    body['table'] = table;
    body['wherecolumn'] = wherecolumn;
    body['wherevalue'] = wherevalue;
    body['column'] = column;
    body['value'] = value;


    $.ajax({
        type: "POST",
        url: api_server + "updatecolumn",
        contentType: "application/json",
        dataType: "JSON",
        data: JSON.stringify(body),
        processData: false,
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

function getconsulting_history(seq) {


    let result = '';
    let body = {};
    body['consulting_seq'] = seq;

    $.ajax({
        type: "POST",
        url: api_server + "getconsulting_history",
        contentType: "application/json",
        dataType: "JSON",
        data: JSON.stringify(body),
        processData: false,
        async: false,
        success: function (data) {
            if (data.status == 200) {
                result = data.data;
                return data.data;
            } else {

                alert(data.err);
            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
    return result;
}

function loadhistory(category_seq) {
    let history = getconsulting_history(category_seq);

    let historytable = document.getElementsByClassName('historytable')[0];
    for (let i = 0; i < history.length; i++) {
        let dataItem = history[i];
        let item = document.createElement("tr");
        let create_dt = document.createElement('td');
        let name = document.createElement('td');
        let working_content = document.createElement('td');
        create_dt.innerHTML = dataItem['create_dt'];
        name.innerHTML = dataItem['name'];
        working_content.innerHTML = dataItem['working_content'];
        item.appendChild(create_dt);
        item.appendChild(name);
        item.appendChild(working_content);
        historytable.appendChild(item);


    }

}

function loadrealconsulting() {


    real = "";

    var body = {};
    body["consulting_seq"] = category_seq;

    $.ajax({
        type: "POST",
        url: api_server + '/getrealconsulting',
        data: JSON.stringify(body),
        processData: false,
        contentType: "application/json",
        async: false,
        success: function (data) {
            if (data.status == 200) {
                real = data.data;
                if (real['consulting_status'] < 4) {
                    return;
                }
                setrealconsulting(real);
            } else if (data.status == 401) {
            } else {
                alert(data.err);
            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
    return real;

}

function loadrealconsultingmove() {

    let real = getconsultdetail1(category_seq);
    setrealconsultingmove(real);

}

function getrealconsult(category_seq) {

    real = "";

    var body = {};
    body["consulting_seq"] = category_seq;

    $.ajax({
        type: "POST",
        url: api_server + '/getrealconsulting',
        data: JSON.stringify(body),
        processData: false,
        contentType: "application/json",
        async: false,
        success: function (data) {
            if (data.status == 200) {
                real = data.data;
            } else if (data.status == 401) {

            } else {
                alert(data.err);
            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
    return real;
}

function makerealconsulting() {


    real = "";

    var body = {};
    body["consulting_seq"] = consulting_seq;

    $.ajax({
        type: "POST",
        url: api_server + '/makerealconsulting',
        data: JSON.stringify(body),
        processData: false,
        contentType: "application/json",
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
    return real;

}

function changepw() {

    location.href = '/member_pw_update?seq=' + sessionStorage.getItem("member_seq");
}

function setrealconsulting(real) {
    loadhistory(real['consulting_seq']);


    document.getElementsByClassName('edit')[1].onclick = function () {
        location.href = '/itr_visit_est_write_example?seq=' + real['consulting_seq'];
    };

    sessionStorage.setItem('realseq', real['consulting_seq']);
    let downtext = getid('downtext');
    let starttext = getid('starttext');
    let endtext = getid('endtext');
    if (real['down_payment_proof'] == 'N') {
        downtext.innerHTML = '미발급';
    }
    if (real['down_payment_proof'] == 'C') {
        downtext.innerHTML = '현금영수증';
    }
    if (real['down_payment_proof'] == 'T') {
        downtext.innerHTML = '세금계산서';
    }
    if (real['down_payment_proof'] == 'R') {
        downtext.innerHTML = '카드-미발급';
    }


    if (real['start_payment_proof'] == 'N') {
        starttext.innerHTML = '미발급';
    }
    if (real['start_payment_proof'] == 'C') {
        starttext.innerHTML = '현금영수증';
    }
    if (real['start_payment_proof'] == 'T') {
        starttext.innerHTML = '세금계산서';
    }
    if (real['start_payment_proof'] == 'R') {
        starttext.innerHTML = '카드-미발급';
    }


    if (real['end_payment_proof'] == 'N') {
        endtext.innerHTML = '미발급';
    }
    if (real['end_payment_proof'] == 'C') {
        endtext.innerHTML = '현금영수증';
    }
    if (real['end_payment_proof'] == 'T') {
        endtext.innerHTML = '세금계산서';
    }
    if (real['end_payment_proof'] == 'R') {
        endtext.innerHTML = '카드-미발급';
    }
    let consultingstatus = document.getElementsByClassName('consultingstatus')[0];

    consultingstatus.innerHTML = real['consulting_status'] == 12 ? '완료' : '진행';
    let detailinput = document.getElementsByClassName('detailinput');
    detailinput[5].value = real['t_expected_cost'];
    detailinput[6].value = real['down_payment'];
    detailinput[7].value = real['start_payment'];
    detailinput[8].value = real['end_payment'];
    let sendestimate1 = document.getElementsByClassName('sendestimate')[0];
    sendestimate1.onclick = function () {
        sendestimate(real['consulting_seq'], 'start', real['start_payment']);
    }
    let sendestimate2 = document.getElementsByClassName('sendestimate')[1];
    sendestimate2.onclick = function () {
        sendestimate(real['consulting_seq'], 'end', real['end_payment']);
    }
    let jobs = getonejob(real['consulting_seq']);
    let jobtable = document.getElementsByClassName('jobtable')[0];
    let isallstoreaccept = true;
    let isalluseraccept = true;
    let isrefuse = false;
    let isconfirm = true;
    for (let i = 0; i < jobs.length; i++) {

        let item = document.createElement('tr');
        let name = document.createElement('td');
        let jobpay = document.createElement('td');
        let productpay = document.createElement('td');
        let findproduct = document.createElement('td');
        let jobperiod = document.createElement('td');
        let findstore = document.createElement('td');
        let storename = document.createElement('td');
        let schedulestatus = document.createElement('td');
        let scheduleconfirm = document.createElement('td');
        let message = document.createElement('td');

        let products = getjobproduct(jobs[i]['job_seq']);
        let pay = 0;
        for (let j = 0; j < products.length; j++) {
            pay += products[j]['price'] * products[j]['order_cnt'];
        }
        findproduct.onclick = function () {
            window.open('/checkconsultproduct?seq=' + real['consulting_seq'], 'checkconsultproduct', 'width=1000px,height=500px,toolbars=no,scrollbars=no');

        }
        productpay.innerHTML = pay + '원';
        for (let j = 0; j < categoryinfos.length; j++) {
            if (categoryinfos[j]['info_seq'] == jobs[i]['info_seq']) {
                name.innerHTML = categoryinfos[j]['name'];
                message.onclick = function () {
                    let store = getonestore(jobs[i]['store_seq'])
                    location.href = '/message?re_msg_seq=' + store['member_seq'];
                };
                break;
            }
        }
        for (let j = 0; j < consultingdetail.length; j++) {
            if (jobs[i]['job_seq'] == consultingdetail[j]['job_seq']) {
                for (let k = 0; k < questions.length; k++) {
                    if (consultingdetail[j]['question_seq'] == questions[k]['question_seq']) {
                        if (questions[k]['summary_seq'] == 7) {
                            jobpay.innerHTML = consultingdetail[j]['answer_value'] + '원';
                        }
                    }
                }

            }
        }

        for (j = 0; j < store.length; j++) {
            if (jobs[i]['store_seq'] == store[j]['store_seq']) {
                storename.innerHTML = store[j]['name'];
            }
        }
        if (!isEmpty(jobs[i]['working_day'])) {


            jobperiod.innerHTML = jobs[i]['working_day'] + '일';
        }

        findproduct.innerHTML = '보기';
        findstore.innerHTML = '검색';
        findstore.onclick = function () {
            moveLocation('scheduler?seq=' + real['consulting_seq']);
        };
        // cancelconfirm.innerHTML = '확정 취소';
        message.innerHTML = '작성';

        let value = jobs[i]['is_confirm'] == 'Y' ? '취소' : '확정';
        scheduleconfirm.innerHTML = value;
        scheduleconfirm.onclick = function () {
            let value = jobs[i]['is_confirm'] == 'Y' ? 'N' : 'Y';


            updatecolumn('consulting_job', 'job_seq', jobs[i]['job_seq'], 'is_confirm', value);
            location.reload();
        }
        if (jobs[i]['is_confirm'] == 'N') {
            isconfirm = false;
        }
        let job_use_yn = jobs[i]['job_use_yn'] == 'Y';
        let job_use_user_yn = jobs[i]['job_use_user_yn'] == 'Y';
        let refuse_yn = jobs[i]['refuse_yn'] == 'Y';
        let refuse_user_yn = jobs[i]['refuse_user_yn'] == 'Y';
        let is_confirm = jobs[i]['is_confirm'] == 'Y';
        if (refuse_user_yn) {
            schedulestatus.innerHTML = '고객-거부';
            isallstoreaccept = false;
            isalluseraccept = false;
            isrefuse = true;
        } else if (refuse_yn) {
            schedulestatus.innerHTML = '협력-거부';
            isallstoreaccept = false;
            isalluseraccept = false;
        } else if (job_use_user_yn) {
            schedulestatus.innerHTML = '고객-수락';
        } else if (job_use_yn) {
            schedulestatus.innerHTML = '협력-수락';
            isalluseraccept = false;
        } else if (is_confirm) {
            isallstoreaccept = false;
            schedulestatus.innerHTML = '협력-미응답';
            isalluseraccept = false;
        } else {
            isallstoreaccept = false;
            schedulestatus.innerHTML = '미확정';
            isalluseraccept = false;
        }

        item.append(name);
        item.append(jobpay);
        item.append(productpay);
        item.append(findproduct);
        item.append(jobperiod);
        item.append(findstore);
        item.append(storename);
        item.append(schedulestatus);
        item.append(scheduleconfirm);
        // item.append(cancelconfirm);
        item.append(message);
        jobtable.appendChild(item);
    }

    if (isrefuse) {
        if (real['consulting_status'] >= 5) {
            updateconsultcolumn(real['consulting_seq'], 'consulting_status', 4);
        }
    } else {
        if (isallstoreaccept) {
            if (real['consulting_status'] < 5) {
                updateconsultcolumn(real['consulting_seq'], 'consulting_status', 5);
            }
        }
        if (isalluseraccept) {
            if (real['consulting_status'] < 6) {
                updateconsultcolumn(real['consulting_seq'], 'consulting_status', 6);
            }
        }


    }
    if (isconfirm) {
        if (real['consulting_status'] < 9) {
            updateconsultcolumn(real['consulting_seq'], 'consulting_status', 9);
        }
    }

    document.getElementsByClassName('confirmall')[0].onclick = function () {
        if (real['consulting_status'] < 12) {
            updateconsultcolumn(real['consulting_seq'], 'consulting_status', 12);
            history.back();
        }
    }
    document.getElementsByClassName('seeestimate')[1].onclick = function () {

        moveLocation('Estimate?seq=' + real['consulting_seq']);

    }
    let isstartpayment = document.getElementsByClassName('isstartpayment')[0];
    let isstartpayed = real['start_payment_status'] == 1;
    isstartpayment.innerHTML = isstartpayed ? '입금 완료' : '입금 대기';
    if (!isstartpayed) {
        isstartpayment.onclick = function () {


            if (!confirm("입금확인을 하시겠습니까?")) {
            } else {

                updateconsultcolumn(real['consulting_seq'], 'start_payment_status', "1");
                addconsulting_history(real['consulting_seq'], '선금 입금 완료');

                if (real['consulting_status'] < 8) {
                    updateconsultcolumn(real['consulting_seq'], 'consulting_status', 8);
                }
                setTimeout(function () {
                    location.reload();
                }, 300);

            }

        }
    }
    let isendpayment = document.getElementsByClassName('isendpayment')[0];
    let isendpayed = real['end_payment_status'] == 1;
    isendpayment.innerHTML = isendpayed ? '입금 완료' : '입금 대기';
    if (!isendpayed) {
        isendpayment.onclick = function () {


            if (!confirm("입금확인을 하시겠습니까?")) {
            } else {
                updateconsultcolumn(real['consulting_seq'], 'end_payment_status', "1");
                addconsulting_history(real['consulting_seq'], '잔금 입금 완료');

                if (real['consulting_status'] < 11) {
                    updateconsultcolumn(real['consulting_seq'], 'consulting_status', 11);
                }
                setTimeout(function () {
                    location.reload();
                }, 300);
            }


        }
    }
}

function setrealconsultingmove(real) {
    loadhistory(real['consulting_seq']);


    document.getElementsByClassName('edit')[0].onclick = function () {
        location.href = '/mc_visit_est_write_example?seq=' + real['consulting_seq'];
    };

    sessionStorage.setItem('realseq', real['consulting_seq']);
    let downtext = getid('downtext');
    let starttext = getid('starttext');
    let endtext = getid('endtext');
    if (real['down_payment_proof'] == 'N') {
        downtext.innerHTML = '미발급';
    }
    if (real['down_payment_proof'] == 'C') {
        downtext.innerHTML = '현금영수증';
    }
    if (real['down_payment_proof'] == 'T') {
        downtext.innerHTML = '세금계산서';
    }
    if (real['down_payment_proof'] == 'R') {
        downtext.innerHTML = '카드-미발급';
    }


    if (real['start_payment_proof'] == 'N') {
        starttext.innerHTML = '미발급';
    }
    if (real['start_payment_proof'] == 'C') {
        starttext.innerHTML = '현금영수증';
    }
    if (real['start_payment_proof'] == 'T') {
        starttext.innerHTML = '세금계산서';
    }
    if (real['start_payment_proof'] == 'R') {
        starttext.innerHTML = '카드-미발급';
    }


    if (real['end_payment_proof'] == 'N') {
        endtext.innerHTML = '미발급';
    }
    if (real['end_payment_proof'] == 'C') {
        endtext.innerHTML = '현금영수증';
    }
    if (real['end_payment_proof'] == 'T') {
        endtext.innerHTML = '세금계산서';
    }
    if (real['end_payment_proof'] == 'R') {
        endtext.innerHTML = '카드-미발급';
    }
    let consultingstatus = document.getElementsByClassName('consultingstatus')[0];

    consultingstatus.innerHTML = real['consulting_status'] == 12 ? '완료' : '진행';
    let detailinput = document.getElementsByClassName('detailinput');
    detailinput[0].value = real['t_expected_cost'];
    detailinput[1].value = real['down_payment'];
    detailinput[2].value = real['start_payment'];
    detailinput[3].value = real['end_payment'];
    let sendestimate1 = document.getElementsByClassName('sendestimate')[0];
    sendestimate1.onclick = function () {
        sendestimate(real['consulting_seq'], 'start', real['start_payment']);
    }
    let sendestimate2 = document.getElementsByClassName('sendestimate')[1];
    sendestimate2.onclick = function () {
        sendestimate(real['consulting_seq'], 'end', real['end_payment']);
    }
    let jobs = getonejob(real['consulting_seq']);
    let jobtable = document.getElementsByClassName('jobtable')[0];
    let isallstoreaccept = true;
    let isalluseraccept = true;
    let isrefuse = false;
    let isconfirm = true;
    for (let i = 0; i < jobs.length; i++) {

        let item = document.createElement('tr');
        let name = document.createElement('td');
        let jobpay = document.createElement('td');
        let productpay = document.createElement('td');
        let findproduct = document.createElement('td');
        let jobperiod = document.createElement('td');
        let findstore = document.createElement('td');
        let storename = document.createElement('td');
        let schedulestatus = document.createElement('td');
        let scheduleconfirm = document.createElement('td');
        let message = document.createElement('td');

        let products = getjobproduct(jobs[i]['job_seq']);
        let pay = 0;
        for (let j = 0; j < products.length; j++) {
            pay += products[j]['price'] * products[j]['order_cnt'];
        }
        findproduct.onclick = function () {
            window.open('/checkconsultproduct?seq=' + real['consulting_seq'], 'checkconsultproduct', 'width=1000px,height=500px,toolbars=no,scrollbars=no');

        }
        productpay.innerHTML = pay + '원';
        for (let j = 0; j < categoryinfos.length; j++) {
            if (categoryinfos[j]['info_seq'] == jobs[i]['info_seq']) {
                name.innerHTML = categoryinfos[j]['name'];
                message.onclick = function () {
                    let store = getonestore(jobs[i]['store_seq'])
                    location.href = '/message?re_msg_seq=' + store['member_seq'];
                };
                break;
            }
        }
        for (let j = 0; j < consultingdetail.length; j++) {
            if (jobs[i]['job_seq'] == consultingdetail[j]['job_seq']) {
                for (let k = 0; k < questions.length; k++) {
                    if (consultingdetail[j]['question_seq'] == questions[k]['question_seq']) {
                        if (questions[k]['summary_seq'] == 7) {
                            jobpay.innerHTML = consultingdetail[j]['answer_value'] + '원';
                        }
                    }
                }

            }
        }

        for (j = 0; j < store.length; j++) {
            if (jobs[i]['store_seq'] == store[j]['store_seq']) {
                storename.innerHTML = store[j]['name'];
            }
        }
        if (!isEmpty(jobs[i]['working_day'])) {


            jobperiod.innerHTML = jobs[i]['working_day'] + '일';
        }

        findproduct.innerHTML = '보기';
        findstore.innerHTML = '검색';
        findstore.onclick = function () {
            moveLocation('scheduler?seq=' + real['consulting_seq']);
        };
        // cancelconfirm.innerHTML = '확정 취소';
        message.innerHTML = '작성';

        let value = jobs[i]['is_confirm'] == 'Y' ? '취소' : '확정';
        scheduleconfirm.innerHTML = value;
        scheduleconfirm.onclick = function () {
            let value = jobs[i]['is_confirm'] == 'Y' ? 'N' : 'Y';


            updatecolumn('consulting_job', 'job_seq', jobs[i]['job_seq'], 'is_confirm', value);
            location.reload();
        }
        if (jobs[i]['is_confirm'] == 'N') {
            isconfirm = false;
        }
        let job_use_yn = jobs[i]['job_use_yn'] == 'Y';
        let job_use_user_yn = jobs[i]['job_use_user_yn'] == 'Y';
        let refuse_yn = jobs[i]['refuse_yn'] == 'Y';
        let refuse_user_yn = jobs[i]['refuse_user_yn'] == 'Y';
        let is_confirm = jobs[i]['is_confirm'] == 'Y';
        if (refuse_user_yn) {
            schedulestatus.innerHTML = '고객-거부';
            isallstoreaccept = false;
            isalluseraccept = false;
            isrefuse = true;
        } else if (refuse_yn) {
            schedulestatus.innerHTML = '협력-거부';
            isallstoreaccept = false;
            isalluseraccept = false;
        } else if (job_use_user_yn) {
            schedulestatus.innerHTML = '고객-수락';
        } else if (job_use_yn) {
            schedulestatus.innerHTML = '협력-수락';
            isalluseraccept = false;
        } else if (is_confirm) {
            isallstoreaccept = false;
            schedulestatus.innerHTML = '협력-미응답';
            isalluseraccept = false;
        } else {
            isallstoreaccept = false;
            schedulestatus.innerHTML = '미확정';
            isalluseraccept = false;
        }

        item.append(name);
        item.append(jobpay);
        item.append(productpay);
        item.append(findproduct);
        item.append(jobperiod);
        item.append(findstore);
        item.append(storename);
        item.append(schedulestatus);
        item.append(scheduleconfirm);
        // item.append(cancelconfirm);
        item.append(message);
        jobtable.appendChild(item);
    }

    if (isrefuse) {
        if (real['consulting_status'] >= 5) {
            updateconsultcolumn(real['consulting_seq'], 'consulting_status', 4);
        }
    } else {
        if (isallstoreaccept) {
            if (real['consulting_status'] < 5) {
                updateconsultcolumn(real['consulting_seq'], 'consulting_status', 5);
            }
        }
        if (isalluseraccept) {
            if (real['consulting_status'] < 6) {
                updateconsultcolumn(real['consulting_seq'], 'consulting_status', 6);
            }
        }


    }
    if (isconfirm) {
        if (real['consulting_status'] < 9) {
            updateconsultcolumn(real['consulting_seq'], 'consulting_status', 9);
        }
    }

    document.getElementsByClassName('confirmall')[0].onclick = function () {
        if (real['consulting_status'] < 12) {
            updateconsultcolumn(real['consulting_seq'], 'consulting_status', 12);
            history.back();
        }
    }
    document.getElementsByClassName('seeestimate')[0].onclick = function () {

        moveLocation('Estimate?seq=' + real['consulting_seq']);

    }
    let isstartpayment = document.getElementsByClassName('isstartpayment')[0];
    let isstartpayed = real['start_payment_status'] == 1;
    isstartpayment.innerHTML = isstartpayed ? '입금 완료' : '입금 대기';
    if (!isstartpayed) {
        isstartpayment.onclick = function () {


            if (!confirm("입금확인을 하시겠습니까?")) {
            } else {

                updateconsultcolumn(real['consulting_seq'], 'start_payment_status', "1");
                addconsulting_history(real['consulting_seq'], '선금 입금 완료');

                if (real['consulting_status'] < 8) {
                    updateconsultcolumn(real['consulting_seq'], 'consulting_status', 8);
                }
                setTimeout(function () {
                    location.reload();
                }, 300);

            }

        }
    }
    let isendpayment = document.getElementsByClassName('isendpayment')[0];
    let isendpayed = real['end_payment_status'] == 1;
    isendpayment.innerHTML = isendpayed ? '입금 완료' : '입금 대기';
    if (!isendpayed) {
        isendpayment.onclick = function () {


            if (!confirm("입금확인을 하시겠습니까?")) {
            } else {
                updateconsultcolumn(real['consulting_seq'], 'end_payment_status', "1");
                addconsulting_history(real['consulting_seq'], '잔금 입금 완료');

                if (real['consulting_status'] < 11) {
                    updateconsultcolumn(real['consulting_seq'], 'consulting_status', 11);
                }
                setTimeout(function () {
                    location.reload();
                }, 300);
            }


        }
    }
}

function getstore() {

    store = "";


    $.ajax({
        type: "POST",
        url: api_server + "getstore",
        data: null,
        processData: false,
        contentType: false,
        async: false,
        success: function (data) {
            if (data.status == 200) {
                store = data.data;
            } else {


            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
    return store

}

function getonestore(board_seq) {
    notice = "";

    let body = {};
    body['store_seq'] = board_seq
    $.ajax({
        type: "POST",
        url: api_server + "/getonestore",
        data: JSON.stringify(body),
        processData: false,
        contentType: "application/json",
        async: false,
        success: function (data) {
            if (data.status == 200) {
                notice = data.data;
                return notice;
            } else {

            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
    return notice;
}

// < -- 임은지 님
function getnotice(board_seq) {
    notice = "";

    $.ajax({
        type: "POST",
        url: api_server + "/getboard",
        data: JSON.stringify({}),
        processData: false,
        contentType: "application/json",
        async: false,
        success: function (data) {
            if (data.status == 200) {
                notice = data.data;
            } else {

            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
    return notice;
}

function getnoticeOne(board_seq) {
    notice = "";

    obj = {
        'board_seq': board_seq
    }

    $.ajax({
        type: "POST",
        url: api_server + "/getoneboard",
        data: JSON.stringify(obj),
        processData: false,
        contentType: "application/json",
        async: false,
        success: function (data) {
            if (data.status == 200) {
                notice = data.data;
                console.log(notice.title)
                var type_seq = '';
                if (notice.type_seq == 'N') {
                    type_seq = '공지사항';
                } else if (notice.type_seq == 'E') {
                    type_seq = '이벤트';
                } else if (notice.type_seq == 'SN') {
                    type_seq = '협력업체공지';
                } else if (notice.type_seq == 'F') {
                    type_seq = '자주 묻는 질문';
                }

                $("#selector1").text(type_seq);

                if (notice.faq_type != null) {
                    //faq_name 바꾸기
                    $("#selector2").text(notice.faq_type);
                    $("#faq_seq").val(notice.faq_type);
                }

                $("#img_url").val(notice.img_url);
                $("#start_dt").val(notice.start_dt);
                $("#end_dt").val(notice.end_dt);
                $("#title").val(notice.title);
                $(".summernote-simple").text(notice.content);

                if (notice.is_push != null && notice.is_push == 'Y') {
                    $("input:checkbox[id='push']").prop("checked", true);
                }
            } else {

            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
    return notice;
}

function setnotice(data) {


    var wholeLog = data;

    var log_table = getid("log_table").getElementsByTagName("tbody")[0];
    var prechildren = log_table.getElementsByTagName("tr");
    for (let j = prechildren.length - 1; j > 0; j--) {
        prechildren[j].remove();
    }

    for (let i = 0; i < wholeLog.length; i++) {
        let dataItem = wholeLog[i];
        let item = document.createElement("tr");
        let create_dt = document.createElement("td");
        let typetd = document.createElement('td');
        let title = document.createElement('td');
        let price = document.createElement('td');
        let stock = document.createElement('td');
        let status = document.createElement('td');
        let info = document.createElement('td');

        var type = '';
        var priceData = '';
        if (dataItem['type_seq'] == 'N') {
            type = '공지사항';
        } else if (dataItem['type_seq'] == 'E') {
            type = '이벤트';
        } else if (dataItem['type_seq'] == 'SN') {
            type = '협력업체공지';
        } else if (dataItem['type_seq'] == 'F') {
            type = 'FAQ';
        }

        if (dataItem['start_dt'] != null && dataItem['end_dt'] != null && dataItem['start_dt'] != 'None' && dataItem['end_dt'] != 'None') {
            priceData = dataItem['start_dt'] + '~' + dataItem['end_dt'];
        }

        var date1 = new Date();
        var eventShow = '진행중';

        console.log(dataItem['start_dt']);
        console.log(moment(date1).diff(moment(dataItem['start_dt'])));
        console.log(dataItem['end_dt']);
        console.log(moment(date1).diff(moment(dataItem['end_dt'])));
        if ((dataItem['start_dt'] != null && moment(date1).diff(moment(dataItem['start_dt'])) < 0) || (dataItem['end_dt'] != null && moment(date1).diff(moment(dataItem['end_dt'])) > 0)) {
            console.log('eventShow');
            eventShow = '종료';
        }

        var baner = '';
        if (eventShow == '진행중' && dataItem['type_seq'] == 'E') {
            baner = '노출';
        } else if (eventShow == '종료' && dataItem['type_seq'] == 'E') {
            baner = '중지';
        }

        var board_seq = dataItem['board_seq'];
        console.log(board_seq);

        create_dt.innerHTML = dataItem['create_dt'];
        typetd.innerHTML = type;
        title.innerHTML = dataItem['title'];
        price.innerHTML = priceData;
        stock.innerHTML = eventShow;
        status.innerHTML = baner;
        info.innerHTML = '<button onclick="location.href=\'/notice_info?seq=' + board_seq + '\'">자세히 보기</button>'

        item.appendChild(create_dt);
        item.appendChild(typetd);
        item.appendChild(title);
        item.appendChild(price);
        item.appendChild(stock);
        item.appendChild(status);
        item.appendChild(info);
        log_table.appendChild(item);

    }
}

function addnoticeDetail() {

    let type_seq = '';
    if ($("#selector1").text() == '공지') {
        type_seq = 'N';
    } else if ($("#selector1").text() == '이벤트') {
        type_seq = 'E';
    } else if ($("#selector1").text() == '협력업체공지') {
        type_seq = 'SN';
    } else if ($("#selector1").text() == '자주 묻는 질문') {
        type_seq = 'F';
    }

    let faq_type = $("#faq_seq").val();

    let start_dt = $('#start_dt').val();
    let end_dt = $('#end_dt').val();
    let title = $('#title').val();
    let content = $('#summernote').summernote('code');

    let is_push = 'N';
    if ($('#push').is(":checked")) {
        is_push = 'Y';
    }

    let img_url = $('#img_url').val();

    let datas = [type_seq, title, content, is_push];

    if (type_seq == 'E') {
        datas.push(start_dt);
        datas.push(end_dt);
    }

    for (let i = 0; i < datas.length; i++) {
        if (isEmpty(datas[i])) {
            alert('정보를 모두 입력해주세요.');
            return;
        }
    }
    let obj = {
        'type_seq': type_seq,
        'title': title,
        'content': content,
        'is_push': is_push,
    };

    if (type_seq == 'E') {
        obj.img_url = img_url;
        obj.start_dt = start_dt;
        obj.end_dt = end_dt;
    }

    if (type_seq == 'F') {
        obj.faq_type = faq_type;
    }

    console.log(obj);

    $.ajax({
        type: "POST",
        url: api_server + "/addboard",
        data: JSON.stringify(obj),
        processData: false,
        contentType: "application/json",
        async: false,
        success: function (data) {
            if (data.status == 200) {
                location.href = "/notice";

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

function updatenoticeDetail(seq) {

    let type_seq = '';
    if ($("#selector1").text() == '공지') {
        type_seq = 'N';
    } else if ($("#selector1").text() == '이벤트') {
        type_seq = 'E';
    } else if ($("#selector1").text() == '협력업체공지') {
        type_seq = 'SN';
    } else if ($("#selector1").text() == '자주 묻는 질문') {
        type_seq = 'F';
    }

    let faq_type = $("#faq_seq").val();

    let start_dt = $('#start_dt').val();
    let end_dt = $('#end_dt').val();
    let title = $('#title').val();
    let content = $('#summernote').summernote('code');

    let is_push = 'N';
    if ($('#push').is(":checked")) {
        is_push = 'Y';
    }

    let img_url = $('#img_url').val();

    let datas = [type_seq, title, content, is_push];

    if (type_seq == 'E') {
        datas.push(start_dt);
        datas.push(end_dt);
    }

    for (let i = 0; i < datas.length; i++) {
        if (isEmpty(datas[i])) {
            alert('정보를 모두 입력해주세요.');
            return;
        }
    }
    let obj = {
        'board_seq': seq,
        'type_seq': type_seq,
        'title': title,
        'content': content,
        'is_push': is_push,
    };

    if (type_seq == 'E') {
        obj.img_url = img_url;
        obj.start_dt = start_dt;
        obj.end_dt = end_dt;
    }

    if (type_seq == 'F') {
        obj.faq_type = faq_type;
    }

    console.log(obj);

    $.ajax({
        type: "POST",
        url: api_server + "/updateboard",
        data: JSON.stringify(obj),
        processData: false,
        contentType: "application/json",
        async: false,
        success: function (data) {
            if (data.status == 200) {
                alert('수정되었습니다.');
                location.href = "/notice";
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

function deleteNotice(seq) {
    var obj = {
        "tablename": "board",
        "wherecolumn": "board_seq",
        "wherevalue": seq
    }

    $.ajax({
        type: "POST",
        url: api_server + "/deleterow",
        data: JSON.stringify(obj),
        processData: false,
        contentType: "application/json",
        async: false,
        success: function (data) {
            if (data.status == 200) {
                console.log(data);
                alert('삭제되었습니다.')
                location.href = "/notice";
            } else {

            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
}

function getfaqCList() {
    faqCList = "";
    $.ajax({
        type: "POST",
        url: api_server + "/getfaqcode",
        data: JSON.stringify({}),
        processData: false,
        contentType: "application/json",
        async: false,
        success: function (data) {
            if (data.status == 200) {
                faqCList = data.data;
                console.log(faqCList);
                for (let i = 0; i < faqCList.length; i++) {
                    $('#faqCList').append('<a class="dropdown-item" onclick="setText(\'selector2\',\'' + faqCList[i].name + '\'); $(\'#faq_seq\').val(' + faqCList[i].common_seq + ');">' + faqCList[i].name + '</a>');
                }
            } else {

            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
    return faqCList;
}

function startstockindex() {

    // <li><a class="nav-link" href="/">방문 견적 작성</a></li>
    //                        <li><a class="nav-link" href="/itr_trans_est_check">전송 견적 확인</a></li>
    //                        <li><a class="nav-link" href="/itr_est_list">견적 목록</a></li>
    let categorydetaillist = document.getElementsByClassName('categorydetaillist')[0];
    let detaildata = getcategorydetail(-1);
    for (let i = 0; i < detaildata.length; i++) {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.innerHTML = detaildata[i]['name'];
        a.classList.add('nav-link');
        a.href = '/stock_page?seq=' + detaildata[i]['detail_seq'];
        li.append(a);
        categorydetaillist.appendChild(li);

    }
}

function startstockdetail(seq) {
    let category_detail_input = document.getElementsByClassName('category_detail_input');
    let name = category_detail_input[0];
    let price = category_detail_input[1];
    let stock = category_detail_input[2];
    let number = category_detail_input[3];


    let explain = document.getElementById('explain');
    let image = document.getElementById('preview-image');

    console.log(product[0]['name']);
    name.value = product[0]['name'];
    price.value = product[0]['price'] + '원';
    stock.value = product[0]['stock'] + '개';
    explain.value = product[0]['content'];
    image.src = product[0]['img_url'];

    let confirm = document.getElementsByClassName('selectproduct')[0];
    confirm.onclick = function () {

        if (isEmpty(number.value)) {
            alert('구매 개수를 입력해주세요.');
            return;
        }

        if (number.value == '0') {
            alert('구매 개수를 입력해주세요.');
            return;
        }

        let parent = window.opener;
        parent.productselect(product[0], number.value)
        window.close();
    }
}

function productselect(product, number) {
    let data = product;

    let codiclass = sessionStorage.getItem('nowcodi');
    let info_seq = sessionStorage.getItem('nowinfo');

    let codi = document.getElementsByClassName(codiclass)[0];
    let content = codi.getElementsByClassName('selectedproducts')[0];
    let table = content.getElementsByClassName('table' + info_seq)[0];

    let exist = table.getElementsByClassName('product');
    for (let i = 0; i < exist.length; i++) {
        let existitem = exist[i];
        if (existitem.getAttribute('product_seq') == data['product_seq']) {
            let count = existitem.getElementsByTagName('td')[3].innerHTML * 1;
            existitem.getElementsByTagName('td')[3].innerHTML = count + (number * 1);
            return;
        }
    }

    let item = document.createElement("tr");
    item.classList.add("product");
    item.setAttribute("product_seq", data['product_seq']);
    item.setAttribute("job_seq", info_seq);
    let product_seq = document.createElement("td");
    let name = document.createElement("td");
    let price = document.createElement("td");
    let stock = document.createElement("td");
    let check = document.createElement("td");

    product_seq.innerHTML = data['product_seq'];
    price.innerHTML = data['price'];
    name.innerHTML = data['name'];
    stock.innerHTML = number;

    let check2 = document.createElement('input');
    check2.type = "checkbox";
    check.append(check2);


    item.append(product_seq);
    item.append(name);
    item.append(price);
    item.append(stock);
    item.append(check);
    table.appendChild(item);


}

function startstockpage(seq) {
    console.log(products);
    let chat_list = document.getElementsByClassName('chat_list')[0];
    for (let i = 0; i < products.length; i++) {
        let item = document.createElement('div');
        item.innerHTML = product_item;

        let image = item.getElementsByTagName('img')[0];
        image.src = products[i]['img_url'];
        let texts = item.getElementsByClassName('chat_ib')[0];
        let name = texts.getElementsByTagName('h5')[0];
        let price = texts.getElementsByTagName('p')[0];
        name.innerHTML = products[i]['name'];
        price.innerHTML = products[i]['price'] + "원";
        item.onclick = function () {
            location.href = '/stock_detail?seq=' + products[i]['product_seq'];
        }
        chat_list.append(item);
    }
}

function setmembertype(id, text, type) {
    setText(id, text);
    templist = [];

    if (type == "all") {
        membermanagestart(member);
        setmember_list(member, 1);
        return;
    }
    for (let i = 0; i < member.length; i++) {
        if (member[i]['member_type'] === type) {
            templist.push(member[i]);
        }
    }

    membermanagestart(templist);
    setmember_list(templist, 1);
}

function getmember() {
    member = "";
    $.ajax({
        type: "POST",
        url: api_server + "/getmember",
        data: JSON.stringify({}),
        processData: false,
        contentType: "application/json",
        async: false,
        success: function (data) {
            if (data.status == 200) {
                member = data.data;
            } else {

            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
    return member;
}

function setmember_list(data, page) {


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
        let typetd = document.createElement("td");
        let id = document.createElement('td');
        let name = document.createElement('td');
        let phone = document.createElement('td');
        let create_dt = document.createElement('td');
        let phone_alert = document.createElement('td');
        let sum_alert = document.createElement('td');
        let status = document.createElement('td');
        let password = document.createElement('td');

        var member_type = '';
        if (dataItem['member_type'] == 'M') {
            member_type = '사용자';
        } else if (dataItem['member_type'] == 'C') {
            member_type = '상담사';
        } else if (dataItem['member_type'] == 'A') {
            member_type = '관리자';
        } else if (dataItem['member_type'] == 'S') {
            member_type = '협력업체';
        } else if (dataItem['member_type'] == 'U') {
            member_type = '최고 관리자';
        }

        var delete_yn = '사용중';
        if (dataItem['delete_yn'] == 'Y') {
            delete_yn = '중지';
        }

        var member_seq = dataItem['member_seq'];

        var phone_alert_check = '<label><input type="checkbox"> 인테리어</label><label><input type="checkbox"> 수리</label>'
        var sum_alert_check = '<input type="checkbox">'
        var password_button = '<button onclick="location.href=\'/member_pw_update?seq=' + member_seq + '\'">비밀번호 변경</button>'

        typetd.innerHTML = member_type;
        id.innerHTML = dataItem['id'];
        name.innerHTML = dataItem['name'];
        phone.innerHTML = dataItem['phone'];
        create_dt.innerHTML = dataItem['create_dt'];
        phone_alert.innerHTML = phone_alert_check;
        sum_alert.innerHTML = sum_alert_check;
        status.innerHTML = delete_yn;
        password.innerHTML = password_button;

        item.appendChild(typetd);
        item.appendChild(id);
        item.appendChild(name);
        item.appendChild(phone);
        item.appendChild(create_dt);
        item.appendChild(phone_alert);
        item.appendChild(sum_alert);
        item.appendChild(status);
        item.appendChild(password);
        log_table.appendChild(item);

    }
}

function addmemberDetail() {
    let member_type = $(":input:radio[name=member_type]:checked").val();
    let id = $("#id").val();
    let pw = $("#pw").val();
    let pw_check = $("#pw_check").val();
    let name = $("#name").val();
    let phone = $("#phone").val();

    let is_push = '';
    if ($('#sendI').is(":checked") && $('#sendR').is(":checked")) {
        is_push = 'IR';
    } else if ($('#sendI').is(":checked") && $('#sendR').is(":checked") == false) {
        is_push = 'I';
    } else if ($('#sendI').is(":checked") == false && $('#sendR').is(":checked")) {
        is_push = 'R';
    }

    let calculate_push = 'N';
    if ($('#send').is(":checked")) {
        calculate_push = 'Y';
    }

    let show_yn = $(":input:radio[name=show_yn]:checked").val();

    let datas = [member_type, id, pw, pw_check, name, phone, is_push, calculate_push, show_yn];
    for (let i = 0; i < datas.length; i++) {
        if (isEmpty(datas[i])) {
            alert('정보를 모두 입력해주세요.');
            return;
        }
    }
    let obj = {
        'member_type': member_type,
        'id': id,
        'pw': sha256(pw),
        'name': name,
        'phone': phone,
        'is_push': is_push,
        'calculate_push': calculate_push,
        'show_yn': show_yn,
    };

    console.log(obj);

    $.ajax({
        type: "POST",
        url: api_server + "/addmember",
        data: JSON.stringify(obj),
        processData: false,
        contentType: "application/json",
        async: false,
        success: function (data) {
            if (data.status == 200) {
                location.href = "/member";
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

function updatememberDetail(seq) {

    var pw = $("#pw").val();
    var newPw = $("#pw_check").val();

    if (pw != newPw) {
        alert('비밀번호를 확인해주세요.');
        return;
    }

    var obj = {
        "member_seq": seq,
        "pw": pw
    }

    console.log(obj);

    $.ajax({
        type: "POST",
        url: api_server + "/updatepw",
        data: JSON.stringify(obj),
        processData: false,
        contentType: "application/json",
        async: false,
        success: function (data) {
            console.log(data.status);
            if (data.status == 200) {
                console.log(data);
                alert('변경되었습니다.')
                location.href = "/member";
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

function getcategorydetail(seq) {
    members1 = "";
    var formData1 = new FormData();
    formData1.append("info_seq", seq);
    $.ajax({
        type: "POST",
        url: api_server + "getcategorydetail",
        data: formData1,
        processData: false,
        contentType: false,
        async: false,
        success: function (data) {
            if (data.status == 200) {
                members1 = data.data;
                return members1;

            } else {


            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });

    return members1;
}

function getproductfromdetail(seq) {
    members1 = "";
    let body = {};
    body['detail_seq'] = seq
    $.ajax({
        type: "POST",
        url: api_server + "getproductfromdetail",
        data: JSON.stringify(body),
        processData: false,
        contentType: "application/json",
        async: false,
        success: function (data) {
            if (data.status == 200) {
                members1 = data.data;
                return members1;

            } else {


            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });

    return members1;
}

function getoneproduct(seq) {
    members1 = "";
    let body = {};
    body['product_seq'] = seq
    $.ajax({
        type: "POST",
        url: api_server + "getoneproduct",
        data: JSON.stringify(body),
        processData: false,
        contentType: "application/json",
        async: false,
        success: function (data) {
            if (data.status == 200) {
                members1 = data.data;
                return members1;

            } else {


            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });

    return members1;
}

function answerfromjob(seq) {
    members1 = "";
    var formData1 = new FormData();
    formData1.append("job_seq", seq);
    $.ajax({
        type: "POST",
        url: api_server + "answerfromjob",
        data: formData1,
        processData: false,
        contentType: false,
        async: false,
        success: function (data) {
            if (data.status == 200) {
                members1 = data.data;
                return members1;

            } else {


            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });

    return members1;
}

function startcategoryinfo(data) {

    var wholeLog = data;
    var log_table = getid("log_table").getElementsByTagName("tbody")[0];
    var prechildren = log_table.getElementsByTagName("tr");
    for (let j = prechildren.length - 1; j > 0; j--) {
        prechildren[j].remove();
    }
    for (let i = 0; i < wholeLog.length; i++) {
        let dataItem = wholeLog[i];
        let item = document.createElement("tr");
        let detail_seq = document.createElement("td");
        let name = document.createElement('td');
        let delete1 = document.createElement('td');
        let create_dt = document.createElement('td');

        detail_seq.innerHTML = dataItem['detail_seq'];
        name.innerHTML = dataItem['name'];
        create_dt.innerHTML = dataItem['create_dt'];
        delete1.innerHTML = '삭제';
        delete1.onclick = function () {
            deleterow('category_info_detail', 'detail_seq', dataItem['detail_seq'], 'category_info_detail');
            alert('삭제되었습니다.');
            location.reload();
        }

        item.appendChild(detail_seq);
        item.appendChild(name);
        item.appendChild(create_dt);
        item.appendChild(delete1);
        log_table.appendChild(item);

    }

}

// 임은지님 -- >

// <-- 신지원님

function ajaxCallPost(url, param, callbackSuccess, callbackFail) {
    console.log("=========================================================")
    console.log("endPoint : " + url);
    console.log(param);
    $.ajax({
        type: "POST",
        url: api_server + url,
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
        url: api_server + url,
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

// 신지원님 -->