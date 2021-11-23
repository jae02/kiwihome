from api import app
from flask import Flask, render_template, request
import util
from time import gmtime, strftime


@app.route('/getboard', methods=['GET', 'POST'])
def getboard():
    # summary : get log list
    # get : nothing
    # acting : select globallog
    # return : log list
    # server error(500)
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        body = request.get_json()
        if 'type_seq' in body:
            type_seq = body['type_seq']
            sql = "SELECT * from board where type_seq = %s"
            cursor.execute(sql, type_seq)
        else:
            sql = "SELECT * from board "
            cursor.execute(sql)
        result = {}
        conn.commit()
        data = cursor.fetchall()
        realdata = []
        for i in range(len(data)):
            data[i]['create_dt'] = str(data[i]['create_dt'])
            data[i]['start_dt'] = str(data[i]['start_dt'])
            data[i]['end_dt'] = str(data[i]['end_dt'])
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


@app.route('/getoneboard', methods=['GET', 'POST'])
def getoneboard():
    # summary : get log list
    # get : nothing
    # acting : select globallog
    # return : log list
    # server error(500)
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        body = request.get_json()

        board_seq = body['board_seq']
        sql = "SELECT * from board where board_seq = %s"
        cursor.execute(sql, board_seq)

        result = {}
        conn.commit()
        data = cursor.fetchall()
        realdata = []
        for i in range(len(data)):
            data[i]['create_dt'] = str(data[i]['create_dt'])
            data[i]['start_dt'] = str(data[i]['start_dt'])
            data[i]['end_dt'] = str(data[i]['end_dt'])
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


@app.route('/addboard', methods=['GET', 'POST'])
def addboard():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        body = request.get_json()
        c = ['type_seq', 'faq_type', 'is_push', 'title', 'content', 'answer', 'start_dt', 'end_dt', 'img_url']
        par = []
        column = []
        for i in range(len(c)):
            if c[i] in body:
                par.append(body[c[i]])
                column.append(c[i])
        create_dt = strftime("%Y-%m-%d %H:%M:%S")
        par.append(create_dt)
        column.append('create_dt')

        strColumn = ''
        strPar = ''
        for i in range(len(par)):
            strColumn += "," + column[i]
            strPar += "\',\'" + str(par[i])
        strColumn = strColumn[1:]
        strPar = strPar[2:] + "\'"
        sql = f"""INSERT INTO board ({strColumn} ) VALUES({strPar})"""
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


@app.route('/updateboard', methods=['GET', 'POST'])
def updateboard():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        body = request.get_json()
        c = ['type_seq', 'faq_type', 'title', 'content', 'answer', 'img_url']
        set = ''
        for i in range(len(c)):
            if c[i] in body:
                localset = "," + c[i]  + f"""='{body[c[i]]}' """
                set += localset

        set = set[1:]

        sql = f"""UPDATE board SET {set} WHERE board_seq = {body['board_seq']}"""

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


@app.route('/getfaqcode', methods=['GET', 'POST'])
def getfaqcode():
    conn = util.getConn()
    cursor = conn.cursor()
    try:

        sql = "SELECT * from common where up_code = %s"
        cursor.execute(sql, 'faq')

        result = {}
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
@app.route('/changeBoard', methods=['GET', 'POST'])
def changeBoard():
    # summary : delete log
    # get : log_seq
    # acting : delete global_log
    # return : nothing
    # server error(500)
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        body = request.get_json()
        board_seq = body['board_seq']
        column = body['column']
        value = body['value']
        result = {}
        sql = f"""UPDATE  board  SET {column} = '{value}' WHERE  board_seq = {board_seq}"""
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

