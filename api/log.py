from api import app
from flask import Flask, render_template, request
import util
from time import gmtime, strftime


@app.route('/globallog', methods=['GET', 'POST'])
def globallog():
    # summary : insert item to global_log
    # get : member_seq , ip , content , device_type
    # acting : insert global_log
    # return : nothing
    # server error(500)
    conn = util.getConn()
    cursor = conn.cursor()
    try:

        member_seq = request.form['member_seq']
        name = request.form['name']
        if util.isNull(member_seq):
            member_seq = -1
        if util.isNull(name):
            name = ""
        ip = request.form['ip']
        content = request.form['content']
        device_type = request.form['device_type']

        create_dt = strftime("%Y-%m-%d %H:%M:%S")
        par = (member_seq, ip, content, device_type, create_dt, name)
        sql = "INSERT INTO global_log ( member_seq ,ip, content ,device_type,create_dt , member_name) VALUES( %s, %s, %s, %s, %s, %s)"
        cursor.execute(sql, par)
        conn.commit()
        conn.close()
        return {'status': 200}
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/getlog', methods=['GET', 'POST'])
def getlog():
    # summary : get log list
    # get : nothing
    # acting : select globallog
    # return : log list
    # server error(500)
    conn = util.getConn()
    cursor = conn.cursor()
    try:

        result = {}
        sql = "SELECT * from global_log"
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


@app.route('/deletelog', methods=['GET', 'POST'])
def deletelog():
    # summary : delete log
    # get : log_seq
    # acting : delete global_log
    # return : nothing
    # server error(500)
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        log_seq = request.form['log_seq']
        result = {}
        sql = f"""DELETE FROM global_log WHERE log_seq = {log_seq}"""
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


@app.route('/disablelog', methods=['GET', 'POST'])
def disablelog():
    # summary : delete log
    # get : log_seq
    # acting : delete global_log
    # return : nothing
    # server error(500)
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        log_seq = request.form['log_seq']
        result = {}
        sql = f"""UPDATE global_log SET delete_yn = 'N'  WHERE log_seq = {log_seq}"""
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
