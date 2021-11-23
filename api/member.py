from api import app
from flask import Flask, render_template, request
import util
from time import gmtime, strftime


# member_type :  M = 멤버  , A = 관리자 , C = 상담사

@app.route('/adlogin', methods=['GET', 'POST'])
def adlogin():
    # summary : admin login
    # get : id , password
    # acting : select is member matched
    # return : member.id , memeber.member_seq , member.member_type
    # error check : par error(400) , server error(500) , non matched(401)
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        id = request.form['id']
        password = request.form['password']
        sql = "select * from member where id = %s and pw = %s"
        par = (id, password)
        cursor.execute(sql, par)
        conn.commit()
        data = cursor.fetchall()

        if len(data) != 0:
            result = {}
            result['status'] = 200
            result['id'] = data[0]["id"]
            result['member_seq'] = data[0]["member_seq"]
            result['member_type'] = data[0]["member_type"]
            result['name'] = data[0]["name"]
            conn.close()
            return result
        else:
            result = {}
            result['status'] = 401
            conn.close()
            return result
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/getmember', methods=['GET', 'POST'])
def getmember():
    conn = util.getConn()
    cursor = conn.cursor()
    try:

        result = {}
        sql = "SELECT * from member"
        cursor.execute(sql)
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


@app.route('/addmember', methods=['GET', 'POST'])
def addmember():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        body = request.get_json()

        id = body['id']
        pw = body['pw']
        name = body['name']
        phone = body['phone']
        is_push = body['is_push']
        member_type = body['member_type']
        calculate_push = body['calculate_push']

        create_dt = strftime("%Y-%m-%d %H:%M:%S")

        sql = "INSERT INTO member ( id ,pw , name,  phone ,is_push , calculate_push , create_dt , member_type ) VALUES( %s, %s , %s,%s, %s , %s, %s, %s)"
        par = (id, pw, name, phone, is_push, calculate_push, create_dt, member_type)
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


@app.route('/updatepw', methods=['GET', 'POST'])
def updatepw():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        body = request.get_json()

        member_seq = body['member_seq']
        pw = body['pw']
        update_dt = strftime("%Y-%m-%d %H:%M:%S")
        sql = f"""UPDATE member  SET pw ='{pw}' ,  update_dt = '{update_dt}' WHERE member_seq= {member_seq}"""

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
