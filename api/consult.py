from api import app
from flask import Flask, render_template, request
import util
from time import gmtime, strftime


@app.route('/addconsult', methods=['GET', 'POST'])
def addconsult():
    result = {}
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        name = request.form['name']
        tel = request.form['tel']
        addr1 = request.form['addr1']
        addr2 = request.form['addr2']
        ct_memo = request.form['ct_memo']
        memo = request.form['memo']

        exp_pay = request.form['exp_pay']
        off_pay = request.form['off_pay']
        down_pay = request.form['down_pay']
        start_pay = request.form['start_pay']
        end_pay = request.form['end_pay']

        start_dt = request.form['start_dt']
        end_dt = request.form['end_dt']
        exp_dt = request.form['exp_dt']
        consultant_seq = request.form['consultant_seq']

        consulting_type = request.form['consulting_type']

        consulting_status = 2

        if len(start_dt) > 10:
            start_dt = start_dt[:10]
        if len(end_dt) > 10:
            end_dt = end_dt[:10]
        member_seq = request.form['member_seq']
        create_dt = strftime("%Y-%m-%d %H:%M:%S")

        timenow = strftime("%Y%m%d")
        sql = f"""SELECT * from consulting where consulting_num LIKE '%{timenow}%'"""
        cursor.execute(sql)
        conn.commit()
        length = len(cursor.fetchall()) + 1
        consulting_num = consulting_type + timenow + "%05d" % length

        consulting_send_type = "OFF"
        sql = "INSERT INTO consulting (name, phone, addr, addr_info, other_text, memo, t_expected_cost, " \
              "offline_payment, down_payment, start_payment," \
              " end_payment, start_dt, end_dt, t_working_day, consulting_type, consulting_num," \
              "member_seq , create_dt , consulting_send_type , consultant_seq,consulting_status) " \
              "VALUES( %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s ,%s,%s)"
        par = (name, tel, addr1, addr2, memo, ct_memo, exp_pay, off_pay, down_pay, start_pay
               , end_pay, start_dt, end_dt, exp_dt, consulting_type, consulting_num, member_seq, create_dt,
               consulting_send_type, consultant_seq, consulting_status)

        cursor.execute(sql, par)
        conn.commit()
        result['status'] = 200
        consult_seq = cursor.lastrowid
        result['consult_seq'] = consult_seq
        return result
    except Exception as e:

        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/getconsult', methods=['GET', 'POST'])
def getconsult():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        result = {}
        consulting_type = request.form['consulting_type']
        consulting_send_type = request.form['consulting_send_type']
        sql = "SELECT * from consulting  JOIN member ON member.member_seq=consulting.member_seq where consulting_type = %s AND consulting_send_type = %s"
        par = (consulting_type, consulting_send_type)
        cursor.execute(sql, par)
        conn.commit()
        data = cursor.fetchall()
        realdata = []
        for i in range(len(data)):
            data[i]['create_dt'] = str(data[i]['create_dt'])
            if data[i]['delete_yn'] == 'N' and data[i]['type'] != '1':
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


@app.route('/getallconsult', methods=['GET', 'POST'])
def getallconsult():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        body = request.get_json()
        result = {}
        consulting_type = body['consulting_type']
        sql = "SELECT * from consulting where consulting_type = %s AND consulting_status >=2 "
        cursor.execute(sql, consulting_type)
        conn.commit()
        data = cursor.fetchall()
        realdata = []
        for i in range(len(data)):
            data[i]['create_dt'] = str(data[i]['create_dt'])
            if data[i]['delete_yn'] == 'N' and data[i]['type'] != '1':
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


@app.route('/getconsultdetail', methods=['GET', 'POST'])
def getconsultdetail():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        result = {}
        consulting_seq = request.form['consulting_seq']
        sql = "SELECT * from consulting where consulting_seq = %s "
        cursor.execute(sql, consulting_seq)
        conn.commit()
        data = cursor.fetchall()[0]
        data['create_dt'] = str(data['create_dt'])
        data['start_dt'] = str(data['start_dt'])
        data['end_dt'] = str(data['end_dt'])
        result['data'] = data
        result['status'] = 200
        conn.close()
        return result
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/getjob', methods=['GET', 'POST'])
def getjob():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        result = {}
        sql = "SELECT * from consulting_job"
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


@app.route('/getonejob', methods=['GET', 'POST'])
def getonejob():
    conn = util.getConn()
    cursor = conn.cursor()
    try:

        consulting_seq = request.form['consulting_seq']
        result = {}
        sql = "SELECT * from consulting_job where consulting_seq = %s"
        cursor.execute(sql, consulting_seq)
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


@app.route('/addjob', methods=['GET', 'POST'])
def addjob():
    result = {}
    conn = util.getConn()
    cursor = conn.cursor()
    job_seq = []
    try:
        body = request.get_json()
        consult_seq = body['consult_seq']
        info_seq = body['info_seq']

        create_dt = strftime("%Y-%m-%d %H:%M:%S")
        for i in range(len(info_seq)):
            sql = "INSERT INTO consulting_job (consulting_seq, info_seq,create_dt) VALUES( %s, %s, %s)"
            par = (consult_seq, info_seq[i]['info_seq'], create_dt)

            cursor.execute(sql, par)
            conn.commit()
            job_seq.append(cursor.lastrowid)
        result['status'] = 200
        result['job_seq'] = job_seq

        return result
    except Exception as e:

        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/addconsultingdetail', methods=['GET', 'POST'])
def addconsultingdetail():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        result = {}

        body = request.get_json()
        question_seq = body['question_seq']
        answer_value = body['answer_value']
        job_seq = body['job_seq']
        img_url = body['img_url']

        create_dt = strftime("%Y-%m-%d %H:%M:%S")

        for i in range(len(job_seq)):
            job_seq1 = job_seq[i]
            for j in range(len(question_seq[i])):
                question_seq1 = question_seq[i][j]
                answer_value1 = answer_value[i][j]
                img_url1 = img_url[i][j]

                sql = "INSERT INTO consulting_detail (job_seq, question_seq,answer_value,create_dt, img_url) VALUES( %s, %s, %s, %s , %s)"
                par = (job_seq1, question_seq1, answer_value1, create_dt, img_url1)

                cursor.execute(sql, par)

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


@app.route('/addonejobdetail', methods=['GET', 'POST'])
def addonejobdetail():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        result = {}

        body = request.get_json()
        question_seq = body['question_seq']
        answer_value = body['answer_value']
        job_seq = body['job_seq']
        create_dt = strftime("%Y-%m-%d %H:%M:%S")

        for j in range(len(question_seq)):
            question_seq1 = question_seq[j]
            answer_value1 = answer_value[j]
            sql = "INSERT INTO consulting_detail (job_seq, question_seq,answer_value,create_dt) VALUES( %s, %s, %s, %s)"
            par = (job_seq, question_seq1, answer_value1, create_dt)

            cursor.execute(sql, par)

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


@app.route('/updateonejobdetail', methods=['GET', 'POST'])
def updateonejobdetail():
    conn = util.getConn()
    cursor = conn.cursor()
    # try:
    result = {}
    body = request.get_json()
    question_seq = body['question_seq']
    answer_value = body['answer_value']
    job_seq = body['job_seq']
    create_dt = strftime("%Y-%m-%d %H:%M:%S")
    # sql = "INSERT INTO consulting_detail (job_seq, question_seq,answer_value,create_dt) VALUES( %s, %s, %s, %s)"
    # sql = f"""UPDATE {tablename} SET delete_yn = 'Y'  WHERE {wherecolumn} = {wherevalue}"""
    for i in range(question_seq):
        sql = f"""UPDATE consulting_detail SET answer_value = {answer_value[i]} WHERE question_seq = {question_seq[i]} AND job_seq={job_seq}"""
        cursor.execute(sql)
        conn.commit()
    result['status'] = 200
    conn.close()
    return result
    # except Exception as e:
    #     result = {}
    #     result['status'] = 500
    #     result['err'] = str(e)
    #     conn.close()
    #     return result


@app.route('/updateconsult', methods=['GET', 'POST'])
def updateconsult():
    result = {}
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        consulting_seq = request.form['consulting_seq']
        name = request.form['name']
        tel = request.form['tel']
        addr1 = request.form['addr1']
        addr2 = request.form['addr2']
        ct_memo = request.form['ct_memo']
        memo = request.form['memo']

        exp_pay = request.form['exp_pay']
        off_pay = request.form['off_pay']
        down_pay = request.form['down_pay']
        start_pay = request.form['start_pay']
        end_pay = request.form['end_pay']

        start_dt = request.form['start_dt']
        end_dt = request.form['end_dt']
        exp_dt = request.form['exp_dt']
        print(start_dt)
        if len(start_dt) > 10:
            start_dt = start_dt[:10]
        if len(end_dt) > 10:
            end_dt = end_dt[:10]
        print(start_dt)
        print(end_dt)
        print('sdgd')
        update_dt = strftime("%Y-%m-%d %H:%M:%S")

        sql = "UPDATE consulting SET name = %s ,phone = %s ,addr = %s ,addr_info = %s ,other_text = %s ,memo = %s ,t_expected_cost = %s ," \
              "offline_payment = %s ,down_payment = %s ,start_payment = %s , " \
              "end_payment = %s ,start_dt = %s ,end_dt = %s ,t_working_day = %s, " \
              "update_dt = %s  WHERE consulting_seq = %s "
        par = (name, tel, addr1, addr2, memo, ct_memo, exp_pay, off_pay, down_pay, start_pay
               , end_pay, start_dt, end_dt, exp_dt, update_dt, consulting_seq)

        # sql = "UPDATE terms SET title = %s , content = %s , update_dt = %s  WHERE id = %s "

        cursor.execute(sql, par)
        conn.commit()
        result['status'] = 200
        consult_seq = cursor.lastrowid
        result['consult_seq'] = consult_seq
        return result
    except Exception as e:

        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/updateconsultcolumn', methods=['GET', 'POST'])
def updateconsultcolumn():
    result = {}
    conn = util.getConn()
    cursor = conn.cursor()

    try:
        body = request.get_json()
        consulting_seq = body['consulting_seq']
        column = body['column']
        value = body['value']
        sql = f"""UPDATE consulting SET {column} = %s WHERE consulting_seq = %s """
        par = (value, consulting_seq)

        # sql = "UPDATE terms SET title = %s , content = %s , update_dt = %s  WHERE id = %s "

        cursor.execute(sql, par)
        conn.commit()
        result['status'] = 200
        consult_seq = cursor.lastrowid
        result['consult_seq'] = consult_seq
        return result
    except Exception as e:

        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/getconsulting_detail', methods=['GET', 'POST'])
def getconsulting_detail():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        result = {}
        sql = "SELECT * from consulting_detail "
        cursor.execute(sql)
        conn.commit()
        data = cursor.fetchall()
        realdata = []
        for i in range(len(data)):
            data[i]['create_dt'] = str(data[i]['create_dt'])
            if (data[i]['delete_yn'] == "N"):
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


@app.route('/checkishaverealconsult', methods=['GET', 'POST'])
def checkishaverealconsult():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        body = request.get_json()
        consulting_seq = body['consulting_seq']
        result = {}
        sql = "SELECT * from consulting where parent_consulting = %s"
        cursor.execute(sql, consulting_seq)
        conn.commit()
        data = cursor.fetchall()
        if len(data) > 0:
            result['status'] = 200
        else:
            result['status'] = 401
        conn.close()
        return result
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/getconsulting_history', methods=['GET', 'POST'])
def getconsulting_history():
    conn = util.getConn()
    cursor = conn.cursor()
    try:

        body = request.get_json()
        consulting_seq = body['consulting_seq']
        result = {}
        sql = "SELECT * from consulting_history   JOIN member ON member.member_seq=consulting_history.member_seq where consulting_seq = %s"
        # sql = "SELECT * from delete_box JOIN member ON member.member_seq=delete_box.delete_by;"
        cursor.execute(sql, consulting_seq)
        conn.commit()
        data = cursor.fetchall()
        realdata = []
        for i in range(len(data)):
            data[i]['create_dt'] = str(data[i]['create_dt'])
            if (data[i]['delete_yn'] == "N"):
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


@app.route('/addconsulting_history', methods=['GET', 'POST'])
def addconsulting_history():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        result = {}

        body = request.get_json()
        member_seq = body['member_seq']
        consulting_seq = body['consulting_seq']
        working_content = body['working_content']
        create_dt = strftime("%Y-%m-%d %H:%M:%S")

        sql = "INSERT INTO consulting_history (member_seq, consulting_seq, working_content,create_dt) VALUES( %s, %s, %s, %s)"
        par = (member_seq, consulting_seq, working_content, create_dt)
        cursor.execute(sql, par)
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


@app.route('/makerealconsulting', methods=['GET', 'POST'])
def makerealconsulting():
    conn = util.getConn()
    cursor = conn.cursor()
    result = {}
    try:
        body = request.get_json()
        consulting_seq = body['consulting_seq']
        sql = f"""SELECT * from consulting where consulting_seq = {consulting_seq}"""
        cursor.execute(sql)
        conn.commit()
        consulting = cursor.fetchall()[0]

        print(str(consulting))
        sql = f"""SELECT * from consulting  where parent_consulting = {consulting_seq}"""
        cursor.execute(sql)
        conn.commit()

        object = cursor.fetchall()

        if len(object) != 0:
            result['status'] = 401
            conn.close()
            return result
        create_dt = strftime("%Y-%m-%d %H:%M:%S")

        sql = "INSERT INTO consulting (name, phone, addr, addr_info, other_text," \
              " memo, t_expected_cost,offline_payment, down_payment, start_payment," \
              " end_payment, start_dt, end_dt, t_working_day, consulting_type, " \
              "consulting_num,member_seq , create_dt , consulting_send_type , parent_consulting, type) " \
              "VALUES( %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        # par = (addr, img_url, summary, content, tag, create_dt ,gallery_num)

        par = (
            consulting['name'], consulting['phone'], consulting['addr'], consulting['addr_info'],
            consulting['other_text']
            , consulting['memo'], consulting['t_expected_cost'], consulting['offline_payment'],
            consulting['down_payment'],
            consulting['start_payment']
            , consulting['end_payment'], consulting['start_dt'], consulting['end_dt'], consulting['t_working_day'],
            consulting['consulting_type']
            , consulting['consulting_num'], consulting['member_seq'], create_dt, consulting['consulting_send_type'],
            consulting_seq, '1')

        cursor.execute(sql, par)
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


@app.route('/getrealconsulting', methods=['GET', 'POST'])
def getrealconsulting():
    conn = util.getConn()
    cursor = conn.cursor()
    result = {}
    try:
        body = request.get_json()
        consulting_seq = body['consulting_seq']
        sql = f"""SELECT * from consulting where parent_consulting = {consulting_seq}"""
        cursor.execute(sql)
        conn.commit()
        data = cursor.fetchall()
        if len(data) == 0:
            result['status'] = 401
            conn.close()
            return result
        else:
            result['status'] = 200
            result['data'] = data[0]
            conn.close()
            return result



    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/deletejobseq', methods=['GET', 'POST'])
def deletejobseq():
    conn = util.getConn()
    cursor = conn.cursor()
    result = {}
    try:
        body = request.get_json()
        job_seq = body['job_seq']
        sql = f"""DELETE FROM consulting_detail WHERE job_seq = {job_seq}"""
        cursor.execute(sql)
        conn.commit()

        sql = f"""DELETE FROM consulting_job_product WHERE job_seq = {job_seq}"""
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


@app.route('/copyrealconsulting', methods=['GET', 'POST'])
def copyrealconsulting():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        result = {}

        body = request.get_json()
        consulting_seq = body['consulting_seq']

        sql = f"""SELECT * from consulting where consulting_seq = {consulting_seq}"""
        cursor.execute(sql)
        conn.commit()

        consulting = cursor.fetchall()[0]

        create_dt = strftime("%Y-%m-%d %H:%M:%S")
        sql = "INSERT INTO consulting (name, phone, addr, addr_info, other_text," \
              " memo, t_expected_cost,offline_payment, down_payment, start_payment," \
              " end_payment, start_dt, end_dt, t_working_day, consulting_type, " \
              "consulting_num,member_seq , create_dt , consulting_send_type , parent_consulting, type, consulting_status) " \
              "VALUES( %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        par = (
            consulting['name'], consulting['phone'], consulting['addr'], consulting['addr_info'],
            consulting['other_text']
            , consulting['memo'], consulting['t_expected_cost'], consulting['offline_payment'],
            consulting['down_payment'],
            consulting['start_payment']
            , consulting['end_payment'], consulting['start_dt'], consulting['end_dt'], consulting['t_working_day'],
            consulting['consulting_type']
            , consulting['consulting_num'], consulting['member_seq'], create_dt, consulting['consulting_send_type'],
            consulting_seq, '1', consulting['consulting_status'])
        cursor.execute(sql, par)
        conn.commit()

        sql = f"""SELECT * from consulting where parent_consulting = {consulting_seq}"""
        cursor.execute(sql)
        conn.commit()

        # 실견적서
        realconsulting = cursor.fetchall()[0]

        sql = f"""SELECT * from consulting_job where consulting_seq = {consulting_seq}"""
        cursor.execute(sql)
        conn.commit()

        # 기존 견적서 작업
        jobs = cursor.fetchall()

        for i in range(len(jobs)):
            sql = "INSERT INTO consulting_job (consulting_seq , info_seq , create_dt) " \
                  "VALUES(%s,%s,%s)"
            par = (realconsulting['consulting_seq'], jobs[i]['info_seq'], jobs[i]['create_dt'])
            cursor.execute(sql, par)
            conn.commit()

            # 실견적서 작업
            newjob = cursor.lastrowid

            sql = f"""SELECT * from consulting_detail where job_seq = {jobs[i]['job_seq']}"""
            cursor.execute(sql)
            conn.commit()

            # 기존 견적서 질문
            questions = cursor.fetchall()

            for j in range(len(questions)):
                sql = "INSERT INTO consulting_detail (job_seq , question_seq , answer_seq , answer_value, create_dt) " \
                      "VALUES(%s,%s,%s,%s,%s)"
                par = (newjob, questions[j]['question_seq'], questions[j]['answer_seq'], questions[j]['answer_value'],
                       questions[j]['create_dt'])
                cursor.execute(sql, par)
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
