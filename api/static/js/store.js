

var detailPageUrl = "http://teambox.kr:5222/storeDetail";
function getstoredata() {
    product = "";
    $.ajax({
        type: "POST",
        url: api_server + "getstoredata",
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

function getstoremaindata() {
    product = "";
    $.ajax({
        type: "POST",
        url: api_server + "getstoremaindata",
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

function getstoredetaildata(seq) {
    product = "";
    $.ajax({
        type: "POST",
        url: api_server + "getstoredetaildata3",
        data: JSON.stringify({
                "store_seq": seq
            }),
        processData: false,
        contentType: "application/json",
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

function setstoredata(data) {


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
        let id = document.createElement("td");
        let name = document.createElement('td');
        let storename = document.createElement('td');
        let tel = document.createElement('td');
        let addr = document.createElement('td');
        let create_dt = document.createElement("td");
        let storefile = document.createElement("td");
        let confirm = document.createElement("BUTTON");
        confirm.onclick = function () {
        $.ajax({
        type: "POST",
        url: api_server + "storeconfirmapi",
        data: JSON.stringify({
                "store_seq": dataItem['store_seq']+""
            }),
        processData: false,
           contentType: "application/json",
       dataType: "JSON",
        success: function (data) {
            if (data.status == 200) {
                window.location.reload();
            } else {
            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
        }
        id.innerHTML = dataItem['id'];
        name.innerHTML = dataItem['name'];
        storename.innerHTML = dataItem['store.name'] + "(" + dataItem['category']+")";
        tel.innerHTML = dataItem['tel'];
        addr.innerHTML = dataItem['addr'];
        create_dt.innerHTML = dataItem['create_dt'];
        storefile.innerHTML = dataItem['file_url'];
        confirm.innerHTML = '승인';

        item.appendChild(id);
        item.appendChild(name);
        item.appendChild(storename);
        item.appendChild(tel);
        item.appendChild(addr);
        item.appendChild(create_dt);
        item.appendChild(storefile);
        item.appendChild(confirm);
        log_table.appendChild(item);

    }

}





function setstoremaindata(data) {


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
        let id = document.createElement("td");
        let name = document.createElement('td');
        let storename = document.createElement('td');
        let tel = document.createElement('td');
        let addr = document.createElement('td');
        let create_dt = document.createElement("td");
        let star_point = document.createElement("td");
        let work_count = document.createElement("td");
        let unsettledConstructionCost = document.createElement("td");
        let message = document.createElement("td");
        let deletebox = document.createElement("td");
        let deleteEver = document.createElement("td");
        let message1 = document.createElement("BUTTON");
        let deletebox1 = document.createElement("BUTTON");
        let deleteEver1 = document.createElement("BUTTON");
        deletebox1.onclick = function () {
        $.ajax({
        type: "POST",
        url: api_server + "deletestore",
        data: JSON.stringify({
                "store_seq": dataItem['store_seq']+""
            }),
        processData: false,
           contentType: "application/json",
       dataType: "JSON",
        success: function (data) {
            if (data.status == 200) {
                window.location.reload();
            } else {
            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
        }
        deleteEver1.onclick = function () {
        $.ajax({
        type: "POST",
        url: api_server + "deleteever",
        data: JSON.stringify({
                "store_seq": dataItem['store_seq']+""
            }),
        processData: false,
           contentType: "application/json",
       dataType: "JSON",
        success: function (data) {
            if (data.status == 200) {
                window.location.reload();
            } else {
            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
        }
        message.append(message1);
        deletebox.append(deletebox1);
        deleteEver.append(deleteEver1);
        id.innerHTML = dataItem['id'];
        name.innerHTML = dataItem['name'];
        storename.innerHTML = dataItem['store.name'] + "(" + dataItem['category']+")";
        tel.innerHTML = dataItem['tel'];
        addr.innerHTML = dataItem['addr'];
        create_dt.innerHTML = dataItem['create_dt'];
        star_point.innerHTML = Number(dataItem['star'])/Number(dataItem['workcount']);
        work_count.innerHTML = dataItem['workcount'];
        unsettledConstructionCost.innerHTML = dataItem['elsecost'] +"원";
        message1.innerHTML = '보내기';
        deletebox1.innerHTML = '삭제';
        deleteEver1.innerHTML = '재가입 불가';

        item.appendChild(id);
        item.appendChild(name);
        item.appendChild(storename);
        item.appendChild(tel);
        item.appendChild(addr);
        item.appendChild(create_dt);
        item.appendChild(star_point);
        item.appendChild(work_count);
        item.appendChild(unsettledConstructionCost);
        item.appendChild(message);
        item.appendChild(deletebox);
        item.appendChild(deleteEver);
        id.onclick = function () {
        location.href=detailPageUrl+"?seq=" +dataItem['store_seq']+"&storename=" + dataItem['store.name'];
        }
        name.onclick = function () {
        location.href=detailPageUrl+"?seq=" +dataItem['store_seq']+"&storename=" + dataItem['store.name'];
        }
        storename.onclick = function () {
        location.href=detailPageUrl+"?seq=" +dataItem['store_seq']+"&storename=" + dataItem['store.name'];
        }
        tel.onclick = function () {
        location.href=detailPageUrl+"?seq=" +dataItem['store_seq']+"&storename=" + dataItem['store.name'];
        }
        addr.onclick = function () {
        location.href=detailPageUrl+"?seq=" +dataItem['store_seq']+"&storename=" + dataItem['store.name'];
        }
        create_dt.onclick = function () {
        location.href=detailPageUrl+"?seq=" +dataItem['store_seq']+"&storename=" + dataItem['store.name'];
        }
        star_point.onclick = function () {
        location.href=detailPageUrl+"?seq=" +dataItem['store_seq']+"&storename=" + dataItem['store.name'];
        }
        work_count.onclick = function () {
        location.href=detailPageUrl+"?seq=" +dataItem['store_seq']+"&storename=" + dataItem['store.name'];
        }
        unsettledConstructionCost.onclick = function () {
        location.href=detailPageUrl+"?seq=" +dataItem['store_seq']+"&storename=" + dataItem['store.name'];
        }
        log_table.appendChild(item);

    }

}

function getstoredetaildata2(seq) {
    product = "";
    $.ajax({
        type: "POST",
        url: api_server + "getstoredetaildata",
        data: JSON.stringify({
                "store_seq": seq
            }),
        processData: false,
        contentType: "application/json",
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

function setstoredetaildata(data) {


    var wholeLog = data;
    var log_table = getid("log_table2").getElementsByTagName("tbody")[0];
    var prechildren = log_table.getElementsByTagName("tr");
    for (let j = prechildren.length - 1; j > 0; j--) {
        prechildren[j].remove();
    }

    let category = getCategory();
    for (let i = 0; i < wholeLog.length; i++) {
        let dataItem = wholeLog[i];
        let item = document.createElement("tr");
        let choose = document.createElement("INPUT");
        let worklog = document.createElement('td');
        let worksince = document.createElement('td');
        let worknumber = document.createElement('td');
        let workmemo = document.createElement('td');
        let workmoney = document.createElement("td");
        let workstar = document.createElement("td");
        let workaddr = document.createElement("td");
        let workendYN = document.createElement("td");

        choose.setAttribute("type", "checkbox");
        worklog.innerHTML = i+1;
        worksince.innerHTML = dataItem['start_dt'] + "  ~  " + dataItem['end_dt'];
        worknumber.innerHTML = dataItem['consultingnum'];
        workmemo.innerHTML = dataItem['place'] + " , " + dataItem['goods'];
        workmoney.innerHTML = dataItem['value'] + "원";
        workstar.innerHTML = dataItem['star'];
        workaddr.innerHTML = dataItem['addr'];
        workendYN.innerHTML = dataItem['status'];

        item.appendChild(choose);
        item.appendChild(worklog);
        item.appendChild(worksince);
        item.appendChild(worknumber);
        item.appendChild(workmemo);
        item.appendChild(workmoney);
        item.appendChild(workstar);
        item.appendChild(workaddr);
        item.appendChild(workendYN);
        log_table.appendChild(item);

    }

}



function getstoredetaildata3(seq) {
    product = "";
    $.ajax({
        type: "POST",
        url: api_server + "getstoredetaildata4",
        data: JSON.stringify({
                "store_seq": seq
            }),
        processData: false,
        contentType: "application/json",
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

function getParameter222(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function setstoredetaildata2(data) {


    var wholeLog = data;
    var log_table = getid("log_table3").getElementsByTagName("tbody")[0];
    var prechildren = log_table.getElementsByTagName("tr");
    for (let j = prechildren.length - 1; j > 0; j--) {
        prechildren[j].remove();
    }

    let category = getCategory();
    for (let i = 0; i < wholeLog.length; i++) {
        let dataItem = wholeLog[i];
        let item = document.createElement("tr");
        let file_url= document.createElement("td");
        let ncount = document.createElement('td');
        let subcost = document.createElement('td');
        let nwork = document.createElement('td');
        let lastdate = document.createElement('td');
        let cost = document.createElement("td");
        let wholeworklog = document.createElement("td");
        let accumulate_cost = document.createElement("td");
        let wholeworkcount = document.createElement("td");
        let cost1 = document.createElement("BUTTON")
        let wholeworklog1 = document.createElement("BUTTON");

        cost.append(cost1);
        wholeworklog.append(wholeworklog1);

        file_url.innerHTML = dataItem['file_url'];
        ncount.innerHTML = dataItem['ncount'] +'회';
        subcost.innerHTML = dataItem['subcost'] +"원";
        nwork.innerHTML = dataItem['nwork']+'회';
        lastdate.innerHTML = dataItem['lastdate'];
        cost1.innerHTML = '선택 정산';
        wholeworklog1.innerHTML = '보기';
        accumulate_cost.innerHTML = dataItem['accumulate_cost']+'원';
        wholeworkcount.innerHTML = dataItem['wholeworkcount']+'회';

        item.appendChild(file_url);
        item.appendChild(ncount);
        item.appendChild(subcost);
        item.appendChild(nwork);
        item.appendChild(lastdate);
        item.appendChild(cost);
        item.appendChild(wholeworklog);
        item.appendChild(accumulate_cost);
        item.appendChild(wholeworkcount);
        log_table.appendChild(item);
        wholeworklog1.onclick = function () {
        location.href= 'http://teambox.kr:5222/storecostlog?seq=' +dataItem['store_seq'] +"&storename=" + getParameter("storename");
        }

    }

}


function getstorecostdata(seq) {
    product = "";
    $.ajax({
        type: "POST",
        url: api_server + "storecostlogapi",
        data: JSON.stringify({
                "store_seq": seq
            }),
        processData: false,
        contentType: "application/json",
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



function setstorecostdata(data) {


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
        let date= document.createElement("td");
        let accost = document.createElement('td');
        let calcost = document.createElement('td');
        let sbcost = document.createElement('td');
        let checkfile = document.createElement('td');
        let proof = document.createElement("td");
        let calId = document.createElement("td");

        let checkfile1 = document.createElement("BUTTON");
        checkfile.append(checkfile1);

        date.innerHTML = dataItem['create_dt'];
        accost.innerHTML = dataItem['accumulate_cost'] +'원';
        calcost.innerHTML = dataItem['calculate_cost']+'원';
        sbcost.innerHTML = dataItem['sub_cost']+'원';
        checkfile1.innerHTML = '보기';
        proof.innerHTML = '';
        calId.innerHTML = '';

        item.appendChild(date);
        item.appendChild(accost);
        item.appendChild(calcost);
        item.appendChild(sbcost);
        item.appendChild(checkfile);
        item.appendChild(proof);
        item.appendChild(calId);
        log_table.appendChild(item);

    }

}