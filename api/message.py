from api import app
from flask import Flask, render_template, request
import util
from time import gmtime, strftime


@app.route('/getmessage', methods=['GET', 'POST'])
def getmessage():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        body = request.get_json()
        member_seq = body['member_seq']
        re_msg_seq = body['re_msg_seq']
        sql = "select * from msg where (member_seq = %s and re_msg_seq = %s) or (member_seq = %s and re_msg_seq = %s)"
        par = (member_seq, re_msg_seq, re_msg_seq, member_seq)
        cursor.execute(sql, par)
        conn.commit()
        data = cursor.fetchall()
        for i in range(len(data)):
            data[i]['create_dt'] = str(data[i]['create_dt'])
        if len(data) != 0:
            result = {}
            result['status'] = 200
            result['data'] = data

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


@app.route('/addmessage', methods=['GET', 'POST'])
def addmessage():
    conn = util.getConn()
    cursor = conn.cursor()
    try:

        body = request.get_json()

        member_seq = body['member_seq']
        re_msg_seq = body['re_msg_seq']
        content = ''
        content_url = ''
        if 'content' in body:
            content = body['content']
        if 'content_url' in body:
            content_url = body['content_url']

        content_type = body['content_type']
        create_dt = strftime("%Y-%m-%d %H:%M:%S")
        sql = "INSERT INTO msg ( member_seq , re_msg_seq ,content,content_url , content_type, create_dt) VALUES( %s, %s, %s, %s, %s, %s)"
        par = (member_seq, re_msg_seq, content, content_url, content_type, create_dt)
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


@app.route('/getrecentmsg', methods=['GET', 'POST'])
def getrecentmsg():
    conn = util.getConn()
    cursor = conn.cursor()
    result = {}
    try:
        data = []
        body = request.get_json()
        member_seq = body['member_seq']

        sql = "select * from msg INNER JOIN member ON member.member_seq=msg.re_msg_seq;"

        cursor.execute(sql)
        conn.commit()
        data0 = cursor.fetchall()

        sql = "select  MAX(create_dt) as create_dt from msg where member_seq = %s group by re_msg_seq"
        par = (member_seq)
        cursor.execute(sql, par)
        conn.commit()
        data1 = cursor.fetchall()
        for i in range(len(data1)):
            for j in range(len(data0)):
                if (data0[j]['create_dt'] == None):
                    continue
                if (data0[j]['create_dt'] == data1[i]['create_dt']):
                    data.append(data0[j])
        sql = "select  MAX(create_dt) as create_dt from msg where re_msg_seq = %s group by member_seq"
        par = (member_seq)
        cursor.execute(sql, par)
        conn.commit()
        data2 = cursor.fetchall()
        for i in range(len(data2)):
            for j in range(len(data0)):
                if (data0[j]['create_dt'] == None):
                    continue
                if (data0[j]['create_dt'] == data2[i]['create_dt']):
                    data.append(data0[j])

        realdata = []

        for i in range(len(data)):
            isreal = True
            for j in range(len(data)):
                if (i == j):
                    continue
                else:
                    if (data[i]['member_seq'] == data[j]['re_msg_seq'] and data[i]['re_msg_seq'] == data[j][
                        'member_seq']):
                        if (data[i]['create_dt'] < data[j]['create_dt']):
                            isreal = False
            if isreal:
                realdata.append(data[i])

        realdata1 = []
        gradearray = []
        for i in range(len(realdata)):
            grade = 0
            for j in range(len(realdata)):
                if (realdata[i]['create_dt'] > realdata[j]['create_dt']):
                    grade += 1

            gradearray.append(grade)

        # i는 내림차순 순서 , j 는 본데이터가 어디 있는지
        for i in range(len(gradearray)):
            for j in range(len(gradearray)):
                if (i == gradearray[j]):
                    realdata1.append(realdata[j])
        realdata1.reverse()
        realdata2 = []
        for i in range(len(realdata1)):
            realdata1[i]['create_dt'] = str(realdata1[i]['create_dt'])
            realdata1[i]['phone'] = util.format_phone(str(realdata1[i]['phone']))
        for i in range(len(realdata1)):
            if not realdata1[i]['member.member_seq'] == realdata1[i]['member_seq']:
                realdata2.append(realdata1[i])
        for i in range(len(realdata2)):
            member_seq1 = realdata2[i]['member_seq']
            member_seq2 = realdata2[i]['re_msg_seq']
            sql = f"""select * from member where member_seq = {member_seq}"""
            if (member_seq == member_seq1):
                sql = f"""select * from member where member_seq = {member_seq2}"""
            if (member_seq == member_seq2):
                sql = f"""select * from member where member_seq = {member_seq1}"""

            cursor.execute(sql)
            conn.commit()
            member = cursor.fetchall()[0]
            print(member['name'])
            print(member['phone'])
            realdata2[i]['name'] = member['name']
            realdata2[i]['phone'] = member['phone']
        conn.close()
        result['status'] = 200
        result['data'] = realdata2
        return result
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result
