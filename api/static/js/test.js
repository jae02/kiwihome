
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