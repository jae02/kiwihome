from api import app
from flask import Flask, render_template, request
import util
from time import gmtime, strftime


@app.route('/getquestion', methods=['GET', 'POST'])
def getquestion():
    conn = util.getConn()
    cursor = conn.cursor()
    info_seq = request.form['info_seq']
    try:

        result = {}
        sql = "SELECT * from input_question where info_seq = %s"
        cursor.execute(sql, info_seq)
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


@app.route('/addquestion', methods=['GET', 'POST'])
def addquestion():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        body = request.get_json()
        info_seq = body['info_seq']
        title = body['title']
        place_txt = body['place_txt']
        ext = body['ext']
        summary_seq = body['summary_seq']
        codi_seq = body['codi_seq']
        member_show_yn = body['member_show_yn']
        partner_show_yn = body['partner_show_yn']
        simple_estimate_show_yn = body['simple_estimate_show_yn']
        create_dt = strftime("%Y-%m-%d %H:%M:%S")
        sql = "INSERT INTO input_question " \
              "( info_seq ,title , place_text,ext ,summary_seq , codi_seq,member_show_yn ,partner_show_yn , simple_estimate_show_yn ,create_dt) " \
              "VALUES( %s, %s , %s,%s, %s , %s,%s, %s , %s,%s)"
        par = (info_seq, title, place_txt, ext, summary_seq, codi_seq, member_show_yn, partner_show_yn,
               simple_estimate_show_yn, create_dt)
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


@app.route('/getallquestion', methods=['GET', 'POST'])
def getallquestion():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        result = {}
        sql = "SELECT * from input_question"
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


@app.route('/deletequestion', methods=['GET', 'POST'])
def deletequestion():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        question_seq = request.form['question_seq']
        result = {}
        sql = f"""DELETE FROM input_question WHERE question_seq = {question_seq}"""
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


@app.route('/changeCheckQuestion', methods=['GET', 'POST'])
def changeCheckQuestion():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        question_seq = request.form['question_seq']
        column = request.form['column']
        value = request.form['value']
        result = {}
        sql = f"""UPDATE  input_question  SET {column} = '{value}' WHERE  question_seq = {question_seq}"""
        # sql = f"""UPDATE global_log SET show_yn = 'N'  WHERE log_seq = {log_seq}"""
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


@app.route('/getcodi', methods=['GET', 'POST'])
def getcodi():
    conn = util.getConn()
    cursor = conn.cursor()
    try:

        result = {}
        sql = "SELECT * from answer_codi "
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


@app.route('/getsummary', methods=['GET', 'POST'])
def getsummary():
    conn = util.getConn()
    cursor = conn.cursor()
    try:

        result = {}
        sql = "SELECT * from answer_summary "
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
