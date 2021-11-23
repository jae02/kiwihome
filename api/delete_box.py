from api import app
from flask import Flask, render_template, request
import util
from time import gmtime, strftime


@app.route('/adddelete_box', methods=['GET', 'POST'])
def adddelete_box():
    # summary : insert item to delete_box
    # get : category : 어떤 테이블인지 , name : 상담사 이름 , reason : 사유( ex , 취소)  , id : 영향받은 row id
    # acting : insert delete_box
    # return : nothing
    # server error(500)
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        body = request.get_json()
        category = body['category']
        member_seq = body['member_seq']
        parent_seq = body['parent_seq']
        parent_table_name = body['parent_table_name']
        parent_column_name = body['parent_column_name']

        create_dt = strftime("%Y-%m-%d %H:%M:%S")
        par = (category, member_seq, parent_seq, parent_table_name, parent_column_name, create_dt)
        sql = "INSERT INTO delete_box ( category ,delete_by, parent_seq, parent_table_name ,parent_column_name,create_dt ) VALUES( %s, %s, %s, %s, %s, %s)"
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


@app.route('/getdeletebox', methods=['GET', 'POST'])
def getdeletebox():
    # summary : get eletebox list
    # get : nothing
    # acting : select eletebox
    # return : log list
    # server error(500)
    conn = util.getConn()
    cursor = conn.cursor()
    try:

        result = {}
        sql = "SELECT * from delete_box JOIN member ON member.member_seq=delete_box.delete_by;"
        cursor.execute(sql)
        conn.commit()
        data = cursor.fetchall()
        realdata = []
        for i in range(len(data)):
            data[i]['create_dt'] = str(data[i]['create_dt'])
            data[i]['update_dt'] = str(data[i]['update_dt'])
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


@app.route('/restoredeleted', methods=['GET', 'POST'])
def restoredeleted():
    # summary : get eletebox list
    # get : nothing
    # acting : select eletebox
    # return : log list
    # server error(500)
    conn = util.getConn()
    cursor = conn.cursor()
    try:

        body = request.get_json()
        box_seq = body['box_seq']
        result = {}
        sql = "SELECT * from delete_box where box_seq = %s"
        cursor.execute(sql, box_seq)
        conn.commit()
        box = cursor.fetchall()[0]
        # category = box['category']
        # name = box['name']
        parent_seq = box['parent_seq']
        parent_table_name = box['parent_table_name']
        parent_column_name = box['parent_column_name']
        sql = f"""UPDATE {parent_table_name} SET delete_yn ='N' WHERE {parent_column_name} = {parent_seq}"""
        cursor.execute(sql)
        conn.commit()

        sql = f"""UPDATE delete_box SET delete_yn ='Y' WHERE box_seq = {box_seq}"""
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
