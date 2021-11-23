from api import app
from flask import Flask, render_template, request
import util
import requests
from time import gmtime, strftime
import json


@app.route('/savefile', methods=['GET', 'POST'])
def savefile():
    try:
        filename = request.form['filename']
        file = request.files['file']
        file.save('./api/static/data/' + filename)
        result = {}
        result['status'] = 200
        return result
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = e
        return result


@app.route('/deleterow', methods=['GET', 'POST'])
def deleterow():
    # summary : delete log
    # get : log_seq
    # acting : delete global_log
    # return : nothing
    # server error(500)
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        create_dt = strftime("%Y-%m-%d %H:%M:%S")
        body = request.get_json()
        tablename = body['tablename']
        wherecolumn = body['wherecolumn']
        wherevalue = body['wherevalue']
        category = body['category']
        delete_by = body['delete_by']
        result = {}
        sql = f"""UPDATE {tablename} SET delete_yn = 'Y'  WHERE {wherecolumn} = {wherevalue}"""
        cursor.execute(sql)
        conn.commit()

        sql = f"""INSERT INTO delete_box ( parent_seq,parent_table_name , parent_column_name,create_dt,category,delete_by  ) 
VALUES('{wherevalue}' , '{tablename}' , '{wherecolumn}'  , '{create_dt}' , '{category}'  , '{delete_by}')"""
        cursor.execute(sql)
        conn.commit()

        result['status'] = 200

        conn.close()
        return result
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/deletecompleterow', methods=['GET', 'POST'])
def deletecompleterow():
    # summary : delete log
    # get : log_seq
    # acting : delete global_log
    # return : nothing
    # server error(500)
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        body = request.get_json()
        tablename = body['tablename']
        wherecolumn = body['wherecolumn']
        wherevalue = body['wherevalue']
        result = {}

        sql = f"""DELETE FROM {tablename}  WHERE {wherecolumn} = {wherevalue}"""
        cursor.execute(sql)
        conn.commit()
        result['status'] = 200

        conn.close()
        return result
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/changeshowyn', methods=['GET', 'POST'])
def changeshowyn():
    # summary : delete log
    # get : log_seq
    # acting : delete global_log
    # return : nothing
    # server error(500)
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        body = request.get_json()
        tablename = body['tablename']
        wherecolumn = body['wherecolumn']
        wherevalue = body['wherevalue']
        yn = body['yn']
        result = {}
        sql = f"""UPDATE {tablename} SET show_yn = '{yn}'  WHERE {wherecolumn} = {wherevalue}"""
        cursor.execute(sql)
        conn.commit()

        result['status'] = 200
        conn.close()
        return result
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/getsearchdata', methods=['GET', 'POST'])
def getsearchdata():
    # 1endPageNo: 2(현재블록의
    # 종료페이지번호)
    # 1finalPageNo: 2(마지막페이지
    # 번호)
    # 1firstPageNo: 1(첫페이지번호)
    # 1nextPageNo: 2(다음페이지번호)
    # 1page: 2(현재페이지)
    # 1prevPageNo: 1(이전페이지
    # 번호)
    # 1startPageNo: 1(현재블록의
    # 시작페이지번호)

    conn = util.getConn()
    cursor = conn.cursor()
    try:
        body = request.get_json()
        page = body['page']
        page_block = body['page_block']
        searchs = body['searchs']
        table = body['table']
        sort = ''
        if 'sort' in body:
            sort = body['sort']

        startindex = int(int(page) - 1) * int(page_block)
        result = {}
        searchsql = ''
        sql = ''
        sql1 = ''
        strsort = ''
        if not util.isNull(sort):
            strsort = f""" ORDER BY {sort}"""
        if (len(searchs) != 0):
            for i in range(len(searchs)):
                if searchs[i]['name'] == 'create_dt':
                    str1 = f""" AND {searchs[i]['name']} LIKE '{searchs[i]['value']}%'"""
                    searchsql += str1
                elif searchs[i]['name'] == 'type_seq':
                    str1 = f""" AND {searchs[i]['name']} = '{searchs[i]['value']}'"""
                    searchsql += str1
                else:
                    str1 = f""" AND {searchs[i]['name']} LIKE '%{searchs[i]['value']}%'"""
                    searchsql += str1

            searchsql = searchsql[4:]
            sql = f"""SELECT * FROM {table} where delete_yn = 'N' and {searchsql} {strsort} limit {startindex} , {page_block}"""
            sql1 = f"""SELECT count(*) FROM {table} where delete_yn = 'N' and {searchsql} {strsort}  """
        else:
            sql = f"""SELECT * FROM {table} where delete_yn = 'N' {strsort} limit {startindex} , {page_block}"""
            sql1 = f"""SELECT count(*) FROM {table} where delete_yn = 'N' """

        cursor.execute(sql)
        conn.commit()
        data = cursor.fetchall()
        realdata = []
        for i in range(len(data)):
            if 'create_dt' in data[i]:
                data[i]['create_dt'] = str(data[i]['create_dt'])
            if 'start_dt' in data[i]:
                data[i]['start_dt'] = str(data[i]['start_dt'])[:10]
            if 'end_dt' in data[i]:
                data[i]['end_dt'] = str(data[i]['end_dt'])[:10]
            if 'start_dt' in data[i] and 'end_dt' in data[i]:
                data[i]['progress'] = 'N'

                if (not util.isNull(data[i]['start_dt'])) and (not util.isNull(data[i]['end_dt'])):
                    print(data[i]['start_dt'])
                    start = int(data[i]['start_dt'].replace("-", ""))
                    end = int(data[i]['end_dt'].replace("-", ""))
                    now = int(strftime("%Y%m%d"))
                    if (start <= now and end >= now):
                        data[i]['progress'] = 'Y'
                    else:
                        data[i]['progress'] = 'N'

            if data[i]['delete_yn'] == 'N':
                realdata.append(data[i])

        cursor.execute(sql1)
        conn.commit()
        page = int(page)
        page_block = int(page_block)
        print(sql1)
        count = int(cursor.fetchall()[0]['count(*)'])
        pagenm = 1
        if (count % page_block == 0):
            pagenm = count // page_block
        else:
            pagenm = count // page_block + 1
        if (pagenm == 0):
            pagenm = 1

        firstPageNo = 1
        finalPageNo = pagenm

        endPageNo = page + 2
        if endPageNo > finalPageNo:
            endPageNo = finalPageNo
        startPageNo = page - 2
        if startPageNo < 1:
            startPageNo = 1

        nextPageNo = page + 1
        if nextPageNo > finalPageNo:
            nextPageNo = finalPageNo
        prevPageNo = page - 1
        if prevPageNo < 1:
            prevPageNo = 1
        if (page - startPageNo) < 2:
            endPageNo = min(firstPageNo + 4, finalPageNo)

        if (finalPageNo - endPageNo) < 2:
            startPageNo = max(finalPageNo - 4, firstPageNo)
        paging = {}
        paging['firstPageNo'] = firstPageNo
        paging['finalPageNo'] = finalPageNo
        paging['endPageNo'] = endPageNo
        paging['startPageNo'] = startPageNo
        paging['nextPageNo'] = nextPageNo
        paging['prevPageNo'] = prevPageNo
        paging['page'] = page

        result['status'] = 200
        result['data'] = realdata
        result['paging'] = paging
        conn.close()
        return result
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/addnoti', methods=['GET', 'POST'])
def addnoti():
    # summary : delete log
    # get : log_seq
    # acting : delete global_log
    # return : nothing
    # server error(500)
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        body = request.get_json()
        title = body['title']
        content = body['content']
        noti_type = body['noti_type']
        member_seq = body['member_seq']
        smember_seq = body['smember_seq']
        result = {}
        create_dt = strftime("%Y-%m-%d %H:%M:%S")
        sql = f"""insert into noti (title , content , noti_type ,member_seq , smember_seq , create_dt) 
VALUES( '{title}', '{content}' , '{noti_type}', {member_seq} , {smember_seq} , '{create_dt}') """
        print(sql)
        cursor.execute(sql)
        conn.commit()

        result['status'] = 200
        conn.close()
        return result
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/sendmessage', methods=['GET', 'POST'])
def sendmessage():
    try:
        body = request.get_json()
        key = 'apupz76ne0svhvy022wq40uj6h8t6s0u'
        user_id = 'digitalhug'
        sender = '1522-8601'
        receiver = body['receiver']
        msg = body['msg']

        # url = 'http://apis.aligo.in/send'
        # # headers = {'Content-Type': 'application/json; charset=utf-8'}
        # data = {}
        # data['key'] = key
        # data['user_id'] = user_id
        # data['sender'] = sender
        # data['receiver'] = receiver
        # data['msg'] = msg
        # res = requests.post(url, data=data).json()

        url = "http://apis.aligo.in/send"

        params = {
            "key": key,
            "user_id": user_id,
            "sender": sender,
            "receiver": receiver,
            "msg": msg,
            "testmode_yn": "N"
        }

        r = requests.post(url, params=params).json()

        result = {}
        result['status'] = 200
        result['r'] = str(r)

        return result
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        return result


@app.route('/updatecolumn', methods=['GET', 'POST'])
def updatecolumn():
    result = {}
    conn = util.getConn()
    cursor = conn.cursor()
    # wherename, wherecolumn, column, value
    try:
        body = request.get_json()
        table = body['table']
        wherecolumn = body['wherecolumn']
        wherevalue = body['wherevalue']
        column = body['column']
        value = body['value']
        sql = f"""UPDATE {table} SET {column} = %s WHERE {wherecolumn} = {wherevalue}"""

        print(sql)
        par = (value)

        # sql = "UPDATE terms SET title = %s , content = %s , update_dt = %s  WHERE id = %s "

        cursor.execute(sql, par)
        conn.commit()
        conn.close()
        result['status'] = 200
        return result
    except Exception as e:
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result
