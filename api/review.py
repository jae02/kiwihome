from api import app
from flask import Flask, render_template, request
import util
from time import gmtime, strftime


@app.route('/getreview', methods=['GET', 'POST'])
def getreview():
    # summary : get log list
    # get : nothing
    # acting : select globallog
    # return : log list
    # server error(500)
    conn = util.getConn()
    cursor = conn.cursor()
    try:

        result = {}
        sql = "SELECT * from review"
        cursor.execute(sql)
        conn.commit()
        data = cursor.fetchall()
        realdata = []
        for i in range(len(data)):
            data[i]['create_dt'] = str(data[i]['create_dt'])
            if data[i]['show_yn'] == 'Y':
                realdata.append(data[i])
        result['data'] = realdata
        result['status'] = 200
        conn.close()
        return result
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/getonereview', methods=['GET', 'POST'])
def getonereview():
    # summary : get log list
    # get : nothing
    # acting : select globallog
    # return : log list
    # server error(500)
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        body = request.get_json()
        result = {}
        sql = f"""SELECT * from review where review_seq = {body['review_seq']}"""
        cursor.execute(sql)
        conn.commit()
        data = cursor.fetchall()
        realdata = []
        for i in range(len(data)):
            data[i]['create_dt'] = str(data[i]['create_dt'])
            if data[i]['show_yn'] == 'Y':
                realdata.append(data[i])
        result['data'] = realdata
        result['status'] = 200
        conn.close()
        return result
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/addreview', methods=['GET', 'POST'])
def addreview():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        timenow = strftime("%Y%m%d")
        sql = f"""SELECT * from review where gallery_num LIKE '%{timenow}%'"""
        cursor.execute(sql)
        conn.commit()
        length = len(cursor.fetchall()) + 1
        gallery_num = "G" + timenow + "%02d" % length
        body = request.get_json()
        addr = body['addr']
        img_url = body['img_url']
        summary = body['summary']
        content = body['content']
        tag = body['tag']
        info_code = body['info_code']
        create_dt = strftime("%Y-%m-%d %H:%M:%S")
        sql = "INSERT INTO review ( addr ,img_url , summary,  content ,tag  , create_dt , gallery_num , info_code ) VALUES( %s, %s , %s,%s , %s , %s , %s , %s)"
        par = (addr, img_url, summary, content, tag, create_dt, gallery_num, info_code)
        cursor.execute(sql, par)
        conn.commit()
        result = {}
        result['status'] = 200
        conn.close()
        return result
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/updatereview', methods=['GET', 'POST'])
def updatereview():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        body = request.get_json()

        review_seq = body['review_seq']
        addr = body['addr']
        img_url = body['img_url']
        summary = body['summary']
        content = body['content']
        tag = body['tag']
        gallery_num = body['gallery_num']
        # summary = summary.replace('>', '\>')
        # summary = summary.replace('<', '\<')
        sql = f"""UPDATE review SET addr ='{addr}',img_url ='{img_url}',summary ='{summary}',content ='{content}', tag ='{tag}',gallery_num ='{gallery_num}' WHERE review_seq = {review_seq}"""

        cursor.execute(sql)
        conn.commit()
        result = {}
        result['status'] = 200
        conn.close()
        return result
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/copyreview', methods=['GET', 'POST'])
def copyreview():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        body = request.get_json()
        review_seq = body['review_seq']
        timenow = strftime("%Y%m%d")
        sql = f"""SELECT * from review where gallery_num LIKE '%{timenow}%'"""

        cursor.execute(sql)
        conn.commit()
        length = len(cursor.fetchall()) + 1
        gallery_num = "G" + timenow + "%02d" % length

        sql = f"""SELECT * from review  where review_seq = {review_seq}"""
        cursor.execute(sql)
        conn.commit()
        object = cursor.fetchall()[0]

        create_dt = strftime("%Y-%m-%d %H:%M:%S")
        sql = "INSERT INTO review ( addr ,img_url , summary,  content ,tag  , create_dt , gallery_num ) VALUES( %s, %s , %s,%s, %s , %s , %s)"
        # par = (addr, img_url, summary, content, tag, create_dt ,gallery_num)
        par = (
        object['addr'], object['img_url'], object['summary'], object['content'], object['tag'], create_dt, gallery_num)
        cursor.execute(sql, par)
        conn.commit()
        result = {}
        result['status'] = 200
        conn.close()
        return result
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result
