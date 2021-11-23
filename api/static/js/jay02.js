var logs;

var members;
var members1;
var consult_job;
var previous_store;

function moveLocation1(location1) {
    let para = document.location.href.split("=");
    let seq = para[1].split("&")[0];
    location.href = "/" + location1 + seq;
}


function getEstimate() {
    let para = document.location.href.split("=");
    let seq = para[1].split("&")[0];
    logs = "";

    let formData = new FormData();
    formData.append("seq", seq);

    $.ajax({
        type: "POST",
        url: api_server + "getconsult1",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            if (data.status == 200) {
                logs = data.data[0];
                // alert(logs ['addr']);
                let user_im = document.getElementsByClassName("user_im");
                if (logs['consulting_send_type'] == 'ON') {
                    getmember1(logs['member_seq']);
                } else {
                    user_im[0].innerHTML = logs['name'];//성함
                    user_im[1].innerHTML = logs ['addr'] + '<br>' + logs ['addr_info'];//주소
                    user_im[2].innerHTML = logs ['phone'];//전화번호

                }
                user_im[3].innerHTML = logs ['start_dt'].substring(0, 16);//견적일자

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

function getEstimate1() {
    let para = document.location.href.split("=");
    let seq = para[1].split("&")[0];
    logs = "";

    let formData = new FormData();
    formData.append("seq", seq);

    $.ajax({
        type: "POST",
        url: api_server + "getconsult1",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            if (data.status == 200) {
                logs = data.data[0];
                let start_date = document.getElementById("start_date");
                let end_date = document.getElementById("end_date");
                start_date.value = convert_date(logs['start_dt']);
                end_date.value = convert_date(logs['end_dt']);
                return logs;


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


function getmember1(seq1) {
    let formData1 = new FormData();
    formData1.append("seq", seq1);

    $.ajax({
        type: "POST",
        url: api_server + "getmember1",
        data: formData1,
        processData: false,
        contentType: false,
        success: function (data) {
            if (data.status == 200) {
                members = data.data[0];
                let user_im1 = document.getElementsByClassName("user_im");
                user_im1[0].innerHTML = members['name'];//성함
                user_im1[1].innerHTML = members ['addr'] + '<br>' + members ['addr_info'];//주소
                user_im1[2].innerHTML = members ['phone'];//전화번호
            } else {


            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
}

function getstorejobfrominfo(info_seq) {

    let categoryinfo = "";

    let body = {};
    body['info_seq'] = info_seq;
    $.ajax({
        type: "POST",
        url: api_server + "getstorejobfrominfo",
        data: JSON.stringify(body),
        processData: false,
        contentType: "application/json",
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

function getstorejob() {

    let categoryinfo = "";

    $.ajax({
        type: "POST",
        url: api_server + "getstorejob",
        data: null,
        processData: false,
        contentType: "application/json",
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


function getjob1(job_info) {
    let para = document.location.href.split("=");
    let seq = para[1].split("&")[0];
    let formData1 = new FormData();
    formData1.append("seq", seq);
    consult_job = "";
    $.ajax({
        type: "POST",
        url: api_server + "getjob1",
        data: formData1,
        processData: false,
        contentType: false,
        success: function (data) {
            if (data.status == 200) {
                consult_job = data.data;
                let log_table = document.getElementById('table_job').getElementsByTagName("tbody")[0];
                for (let i = 0; i < consult_job.length; i++) {

                    let item = document.createElement("tr");
                    item.className = "tb1";
                    let nm = document.createElement('td');
                    let nm2 = document.createElement('td');

                    let num = parseInt(consult_job[i]['info_seq']);


                    nm.innerHTML = job_info[num - 1]['name'];//작업내용
                    nm2.innerHTML = "금액";//
                    item.appendChild(nm);
                    item.appendChild(nm2);
                    log_table.appendChild(item);

                    let job_detail = getdetail(consult_job[i]['job_seq']);// job_seq에 해당하는 질문의 키 값을 받음
                    for (let j = 0; j < job_detail.length; j++) {
                        let que_name = getquestion1(job_detail[j]["question_seq"]);

                        let item = document.createElement("tr");
                        item.className = "tb2";
                        let nm = document.createElement('td');
                        let nm2 = document.createElement('td');

                        nm.innerHTML = que_name['title'];//작업내용
                        nm2.innerHTML = job_detail[j]["answer_value"];//
                        item.appendChild(nm);
                        item.appendChild(nm2);
                        log_table.appendChild(item);

                    }


                }


                let item = document.createElement("tr");
                item.className = "tb1";
                let nm = document.createElement('td');
                let nm2 = document.createElement('td');


                nm.innerHTML = "합계";//작업내용
                nm2.innerHTML = "금액";//
                item.appendChild(nm);
                item.appendChild(nm2);


                log_table.appendChild(item);
            } else {


            }
        }
        ,
        err: function (err) {
            alert(err.status);
        }
    });
}

function getcategoryinfo1() {
    members1 = "";
    let formData1 = new FormData();
    formData1.append("category_seq", '-1');
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


// job_seq에 해당하는 질문 반환
function getdetail(seq) {
    members1 = "";

    let formData1 = new FormData();
    formData1.append("seq", seq);
    $.ajax({
        type: "POST",
        url: api_server + "getdetail",
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

function getquestion1(seq) {
    members1 = "";

    let formData1 = new FormData();
    formData1.append("seq", seq);
    $.ajax({
        type: "POST",
        url: api_server + "getquestion1",
        data: formData1,
        processData: false,
        contentType: false,
        async: false,
        success: function (data) {
            if (data.status == 200) {
                members1 = data.data[0];
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

function convert_date(date) {
    const input = date;

    const format = (d) => (d < 10 ? '0' : '') + d;

    let utc = Date.parse(input);
    let localOffset = new Date().getTimezoneOffset() * 60000;
    let inputOffset = input.substr(29, 4) * 60000;
    let operator = input.substr(28, 1);
    if (operator === '-') {
        inputOffset *= -1;
    }
    let wrongDate = new Date(utc + localOffset + inputOffset);
    let y = wrongDate.getFullYear();
    let m = format(wrongDate.getMonth() + 1);
    let d = format(wrongDate.getDate());
    let output = y + '-' + m + '-' + d;
    return (output)
}


function print_schedule(job_info, trans) {
    let para = document.location.href.split("=");
    let seq = para[1].split("&")[0];
    //let seq = job_info;
    let formData1 = new FormData();
    formData1.append("seq", seq);
    consult_job = "";
    $.ajax({
        type: "POST",
        url: api_server + "getjob1",
        data: formData1,
        processData: false,
        contentType: false,
        success: function (data) {
            if (data.status == 200) {
                consult_job = data.data;
                let container11 = document.getElementById('continer');
                let start_date = document.getElementById("start_date").value;
                let end_date = document.getElementById("end_date").value;


                let dateStart = new Date(start_date);
                let dateEnd = new Date(end_date);
                let days = [];
                let diffTime = Math.abs(dateEnd - dateStart);
                let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                for (let i = 0; i < diffDays + 1; i++) {
                    let date = new Date(start_date);
                    date.setDate(dateStart.getDate() + i);
                    days.push(date.toISOString().substring(0, 10));
                }

                let remaintime = end_date.replace(/\-/g, '') - start_date.replace(/\-/g, '');
                for (let i = 0; i < consult_job.length; i++) {

                    let contain = document.createElement('div');
                    contain.className = "111";
                    let input1 = document.createElement('input');
                    input1.type = "radio";
                    input1.name = "1";
                    input1.classList.add('job');
                    input1.classList.add('job' + consult_job[i]['job_seq']);
                    let label1 = document.createElement('div');
                    label1.className = "label1";
                    let input2 = document.createElement('input');
                    let label2 = document.createElement('label');
                    label2.innerHTML = "원";
                    let input3 = document.createElement('input');
                    let label3 = document.createElement('label');
                    label3.innerHTML = "원";
                    let input4 = document.createElement('input');
                    let label4 = document.createElement('label');
                    label4.innerHTML = "일";

                    input2.readOnly = 'true';
                    input3.readOnly = 'true';
                    input4.readOnly = 'true';
                    let working_time = 0;
                    let answers = answerfromjob(consult_job[i]['job_seq']);
                    for (let j = 0; j < answers.length; j++) {

                        if (answers[j]['summary_seq'] == 7) {
                            input2.value = answers[j]['answer_value'];
                            continue;
                        }
                        if (answers[j]['summary_seq'] == 11) {
                            input3.value = answers[j]['answer_value'];
                            continue;
                        }
                        if (answers[j]['summary_seq'] == 10) {
                            input4.value = answers[j]['answer_value'];
                            working_time = answers[j]['answer_value'];
                            continue;
                        }
                    }
                    let num = parseInt(consult_job[i]['info_seq']);
                    let categoryinfonum = 0;

                    for (let j = 0; j < categoryinfo.length; j++) {
                        if (categoryinfo[j]['info_seq'] == consult_job[i]['info_seq']) {
                            categoryinfonum = j;
                        }
                    }
                    label1.innerHTML = categoryinfo[categoryinfonum]['name'];//작업내용

                    let combo = document.createElement('select');
                    combo.id = "sel" + i;

                    let noselect = document.createElement('option');
                    noselect.innerHTML = "선택없음";
                    combo.appendChild(noselect);


                    // let stores = getstore1(categoryinfo[categoryinfonum]['category_seq']); //해당의 협력업체를 찾기 위한

                    let stores = [];
                    let storeseqs = []; //해당의 협력업체를 찾기 위한
                    for (let j = 0; j < storejob.length; j++) {
                        if (storejob[j]['info_seq'] == categoryinfo[categoryinfonum]['info_seq']) {
                            storeseqs.push(storejob[j]['store_seq']);
                        }
                    }
                    for (let j = 0; j < store.length; j++) {
                        for (let k = 0; k < storeseqs.length; k++) {
                            if (store[j]['store_seq'] == storeseqs[k]) {
                                stores.push(store[j]);
                            }
                        }
                    }
                    let selectStore = '-1';
                    let possiblestores = [];
                    for (let j = 0; j < stores.length; j++) {

                        let store_sch = getschedule(stores[j]['store_seq']);
                        let matchday = 0;
                        for (let k = 0; k < days.length; k++) {
                            for (let o = 0; o < store_sch.length; o++) {
                                let date = new Date(days[k]);
                                let schstart = new Date(store_sch[o]['start_dt']);
                                let schend = new Date(store_sch[o]['end_dt']);
                                if (schstart <= date && date <= schend) {
                                    matchday++;
                                    break;
                                }
                            }
                        }
                        // for (let k = 0; k < store_sch.length; k++) {
                        //     remaintime = remaintime - remaining_time(start_date, end_date, store_sch[k]['start_dt'], store_sch[k]['end_dt']);
                        // }
                        if (working_time <= matchday) {
                            possiblestores.push(stores[j]);
                            let option = document.createElement('option');
                            option.innerHTML = stores[j]['name'];
                            option.value = stores[j]['store_seq'];
                            combo.appendChild(option);
                        }
                    }
                    combo.addEventListener("change", e => {
                        let aa = document.getElementById("sel" + i);
                        aa.removeAttribute('selectedstore');
                        aa.classList.remove('selectedstore');
                        if (aa.selectedIndex == 0) {
                            return;
                        }
                        selectStore = possiblestores[aa.selectedIndex - 1];
                        aa.setAttribute('selectedstore', selectStore['member_seq']);
                        aa.classList.add('selectedstore');
                        if (input1.checked) {


                            selectStore = possiblestores[aa.selectedIndex - 1];
                            let store_sch = getschedule(selectStore['store_seq']);

                            if (isEmpty(previous_store)) {
                                previous_store = [];
                            } else {
                                for (let o = 0; o < previous_store.length; o++) {
                                    removeevent(previous_store[o]);
                                }
                            }
                            for (let o = 0; o < store_sch.length; o++) {
                                let schstart = new Date(store_sch[o]['start_dt'].substring(0, 10));
                                let schend = new Date(store_sch[o]['end_dt'].substring(0, 10));

                                let dateStart = new Date(schstart);
                                let dateEnd = new Date(schend);
                                let diffTime = Math.abs(dateEnd - dateStart);
                                let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;


                                setTag("store_sch" + store_sch[o]['schedule_seq'], selectStore['name'], dateStart, diffDays);
                                previous_store.push("store_sch" + store_sch[o]['schedule_seq']);

                            }
                        }
                        // combo_change(aa, job_info[num]['name']);
                    });

                    let d_date = document.createElement('input');
                    d_date.id = "d_da" + i;
                    d_date.type = "date";
                    d_date.addEventListener("change", e => {

                        setTag("selecteddate" + categoryinfo[categoryinfonum]['info_seq'], categoryinfo[categoryinfonum]['name'], new Date(d_date.value), working_time);

                    });
                    input1.addEventListener("change", e => {
                        console.log(selectStore);

                        if (input1.checked) {

                            let store_sch = getschedule(selectStore['store_seq']);
                            if (isEmpty(previous_store)) {
                                previous_store = [];
                            } else {
                                for (let o = 0; o < previous_store.length; o++) {
                                    removeevent(previous_store[o]);
                                }
                            }
                            for (let o = 0; o < store_sch.length; o++) {
                                let schstart = new Date(store_sch[o]['start_dt'].substring(0, 10));
                                let schend = new Date(store_sch[o]['end_dt'].substring(0, 10));

                                let dateStart = new Date(schstart);
                                let dateEnd = new Date(schend);
                                let diffTime = Math.abs(dateEnd - dateStart);
                                let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

                                setTag("store_sch" + store_sch[o]['schedule_seq'], selectStore['name'], dateStart, diffDays);
                                previous_store.push("store_sch" + store_sch[o]['schedule_seq']);
                            }
                        }

                    });

                    let send_btn = document.createElement("button");
                    send_btn.innerHTML = "전송"
                    send_btn.onclick = function () {
                        let member_seq = sessionStorage.getItem('member_seq');
                        if (isEmpty(selectStore) || selectStore == -1 || isEmpty(d_date.value)) {
                            alert('정보를 모두 입력해주세요.');
                        } else {
                            let startdate = new Date(d_date.value);
                            let enddate = new Date(startdate.toISOString().substring(0, 10));
                            enddate.setDate(startdate.getDate() + (10 * 1));

                            updatecolumn('consulting_job', 'job_seq', consult_job[i]['job_seq'], 'working_day', input4.value);
                            updatecolumn('consulting_job', 'job_seq', consult_job[i]['job_seq'], 'expected_cost', input2.value);
                            updatecolumn('consulting_job', 'job_seq', consult_job[i]['job_seq'], 'store_seq', selectStore['store_seq']);
                            updatecolumn('consulting_job', 'job_seq', consult_job[i]['job_seq'], 'start_dt', d_date.value.substring(0, 10));
                            updatecolumn('consulting_job', 'job_seq', consult_job[i]['job_seq'], 'end_dt', enddate.toISOString().substring(0, 10));
                            sendnoti('작업일정', '작업일정이 도착하였습니다.', 'M', selectStore['member_seq'], member_seq);
                            alert('알림을 전송하였습니다');
                        }
                    }


                    contain.appendChild(input1);
                    contain.appendChild(label1);
                    contain.appendChild(input2);
                    contain.appendChild(label2);
                    contain.appendChild(input3);
                    contain.appendChild(label3);
                    contain.appendChild(input4);
                    contain.appendChild(label4);
                    contain.appendChild(combo);
                    contain.appendChild(d_date);
                    contain.appendChild(send_btn);

                    container11.appendChild(contain);


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

function getstore1(category_seq) {
    members1 = "";

    let formData1 = new FormData();
    formData1.append("category_seq", category_seq);
    $.ajax({
        type: "POST",
        url: api_server + "getstore1",
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

function getschedule(seq) {
    members1 = "";

    let formData1 = new FormData();
    formData1.append("seq", seq);
    $.ajax({
        type: "POST",
        url: api_server + "getschedule",
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

function remaining_time(a, b, c, d) {
    let aa = a.replace(/\-/g, '');
    let bb = b.replace(/\-/g, '');
    let cc = c.replace(/\-/g, '');
    let dd = d.replace(/\-/g, '');

    if (cc < aa && dd > bb) {
        return 10000;
    } else if (cc > bb || dd < aa) {
        return 0;
    } else if (cc > aa && dd < bb) {
        let a1 = (bb - aa);
        let a2 = (dd - cc);
        return a1 - a2;
    } else if (cc < aa) {
        return dd - aa
    } else if (dd > bb) {
        let a1 = bb - aa;
        let a2 = bb - cc;
        return a1 - a2;
    }
}

function combo_change(seq, title) {
    let data = getschedule();
    for (let i = 0; i < data.length; i++) {
        bb(title, convert_date(data[i]['start_dt']), convert_date(data[i]['end_dt']));
    }
}


function bb(title, seq1, seq2) {
    let dateStr1 = seq1;
    let dateStr2 = seq2;
    let date = new Date(dateStr1 + 'T00:00:00'); // will be in local time
    let date2 = new Date(dateStr2 + 'T00:00:00'); // will be in local time
    if (!isNaN(date.valueOf())) { // valid?
        calendar.addEvent({
            id: title,
            title: title,
            start: date,
            end: date2,
            allDay: true
        });
    }
}

function combo_change1(seq, title, add) {
    aa(title, seq.replace(/\-/g, ''), add);
}

function isEmpty(value) {
    if (value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)) {
        return true
    } else {
        return false
    }

}

function aa(title, seq1, add) {
    let dateStr1 = seq1.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
    let dateStr2 = parseInt(seq1) + parseInt(add);

    dateStr2 = String(dateStr2);
    dateStr2 = dateStr2.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
    let date = new Date(dateStr1 + 'T00:00:00'); // will be in local timetime
    let date2 = new Date(String(dateStr2) + 'T00:00:00'); // will be in local time

    if (!isNaN(date.valueOf())) { // valid?
        calendar.addEvent({
            id: "My" + title,
            title: title,
            start: date,
            end: date2,
            allDay: true
        });
    }
}

function setTag(id, title, startdate, wholeday) {

    if (wholeday == 0) {
        return;
    }
    // let date = new Date(start_date);
    //                date.setDate(dateStart.getDate() + i);

    let exist = calendar.getEventById(id);
    if (!isEmpty(exist)) {
        exist.remove();
    }

    let enddate = new Date(startdate.toISOString().substring(0, 10));
    enddate.setDate(startdate.getDate() + (wholeday * 1));
    console.log(enddate.toISOString().substring(0, 10));
    // valid?
    calendar.addEvent({
        id: id,
        title: title,
        start: startdate,
        end: enddate,
        allDay: true
    });

}

function removeevent(id) {

    let exist = calendar.getEventById(id);
    if (!isEmpty(exist)) {
        exist.remove();
    }

}

function loadstoreschedule() {


}

function sendnoti(title, content, noti_type, member_seq, smember_seq) {

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

function sendnotiall() {
    let items = document.getElementsByClassName('selectedstore');
    if (isEmpty(items)) {
        alert('협력업체를 선택해주세요.');
        return;
    }
    let member_seq = sessionStorage.getItem('member_seq');
    for (let i = 0; i < items.length; i++) {
        sendnoti('작업일정', '작업일정이 도착하였습니다.', 'M', items[i].getAttribute('selectedstore'), member_seq);
    }
    alert("알림을 일괄전송하였습니다.");
}
