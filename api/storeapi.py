from api import app
from flask import Flask, render_template, request
import util
from time import gmtime, strftime


@app.route('/getstore', methods=['GET', 'POST'])
def getstore():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        result = {}
        sql = "SELECT * from store JOIN member ON member.member_seq=store.member_seq "
        cursor.execute(sql)
        conn.commit()
        data = cursor.fetchall()
        realdata = []
        for i in range(len(data)):
            data[i]['create_dt'] = str(data[i]['create_dt'])
            if data[i]['delete_yn'] == 'N':
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


@app.route('/getonestore', methods=['GET', 'POST'])
def getonestore():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        body = request.get_json()
        store_seq = body['store_seq']
        result = {}
        sql = "SELECT * from store where store_seq = %s"
        cursor.execute(sql, store_seq)
        conn.commit()
        data = cursor.fetchall()
        realdata = []
        for i in range(len(data)):
            data[i]['create_dt'] = str(data[i]['create_dt'])
            if data[i]['delete_yn'] == 'N':
                realdata.append(data[i])
        result['data'] = realdata[0]
        result['status'] = 200
        conn.close()
        return result
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/getonestore', methods=['GET', 'POST'])
def getstorejobfrominfo():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        body = request.get_json()
        info_seq = body['info_seq']
        result = {}
        sql = "SELECT * from store where info_seq = %s"
        cursor.execute(sql, info_seq)
        conn.commit()
        data = cursor.fetchall()
        realdata = []
        for i in range(len(data)):
            data[i]['create_dt'] = str(data[i]['create_dt'])
            if data[i]['delete_yn'] == 'N':
                realdata.append(data[i])
        result['data'] = realdata[0]
        result['status'] = 200
        conn.close()
        return result
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/getstorejob', methods=['GET', 'POST'])
def getstorejob():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        result = {}
        sql = "SELECT * from store_job "
        cursor.execute(sql)
        conn.commit()
        data = cursor.fetchall()
        realdata = []
        for i in range(len(data)):
            data[i]['create_dt'] = str(data[i]['create_dt'])
            if data[i]['delete_yn'] == 'N':
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
