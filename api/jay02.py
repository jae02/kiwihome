from api import app
from flask import Flask, render_template, request
import util
from time import gmtime, strftime
import re


@app.route('/Estimate', methods=['GET', 'POST'])
def Estimate():
    return render_template("Estimate.html", v=util.maketoken())


@app.route('/scheduler', methods=['GET', 'POST'])
def scheduler():
    return render_template("scheduler.html", v=util.maketoken())


@app.route('/getconsult1', methods=['GET', 'POST'])
def getconsult1():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        result = {}
        seq = request.form['seq']
        sql = "SELECT * FROM kiwihome.consulting where consulting_seq = %s"
        par = (seq)
        cursor.execute(sql, par)
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


@app.route('/getmember1', methods=['GET', 'POST'])
def getmember1():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        result = {}
        seq = request.form['seq']
        sql = "SELECT * FROM kiwihome.member where member_seq = %s"
        par = (seq)
        cursor.execute(sql, par)
        conn.commit()
        data = cursor.fetchall()
        realdata = []
        for i in range(len(data)):
            data[i]['create_dt'] = str(data[i]['create_dt'])
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


@app.route('/getstore1', methods=['GET', 'POST'])
def getstore1():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        result = {}
        seq = request.form['category_seq']
        sql = "SELECT * FROM kiwihome.store where category_seq = %s"
        par = (seq)
        cursor.execute(sql, par)
        conn.commit()
        data = cursor.fetchall()
        realdata = []
        for i in range(len(data)):
            data[i]['create_dt'] = str(data[i]['create_dt'])
            if data[i]['use_yn'] == 'Y':
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


@app.route('/getschedule', methods=['GET', 'POST'])
def getschedule():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        result = {}
        seq = request.form['seq']
        sql = "SELECT * FROM kiwihome.store_schedule where store_seq = %s"
        par = (seq)
        cursor.execute(sql, par)
        conn.commit()
        data = cursor.fetchall()
        realdata = []
        for i in range(len(data)):
            data[i]['start_dt'] = str(data[i]['start_dt'])
            data[i]['end_dt'] = str(data[i]['end_dt'])
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


@app.route('/getjob1', methods=['GET', 'POST'])
def getjob1():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        result = {}
        seq = request.form['seq']
        sql = "SELECT * FROM kiwihome.consulting_job where consulting_seq = %s"
        par = (seq)
        cursor.execute(sql, par)
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


@app.route('/getdetail', methods=['GET', 'POST'])
def getdetail():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        result = {}
        seq = request.form['seq']
        sql = "SELECT * FROM kiwihome.consulting_detail where job_seq = %s"
        par = (seq)
        cursor.execute(sql, par)
        conn.commit()
        data = cursor.fetchall()
        realdata = []
        for i in range(len(data)):
            data[i]['create_dt'] = str(data[i]['create_dt'])
            str1 = str(data[i]['answer_value'])
            if bool(re.search(r'\d', str1)):
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


@app.route('/getquestion1', methods=['GET', 'POST'])
def getquestion1():
    conn = util.getConn()
    cursor = conn.cursor()
    info_seq = request.form['seq']
    try:

        result = {}
        sql = "SELECT * from input_question where question_seq = %s"
        cursor.execute(sql, info_seq)
        conn.commit()
        data = cursor.fetchall()
        realdata = []
        for i in range(len(data)):
            data[i]['create_dt'] = str(data[i]['create_dt'])
            if data[i]['delete_yn'] != 'Y':
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
