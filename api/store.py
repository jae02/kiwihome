from flask import Flask, render_template, request
from flask_cors import CORS, cross_origin
import util
from api import app
import secrets

@app.route('/store', methods=['GET', 'POST'])
@cross_origin()
def store():
    return render_template("store.html", v=util.maketoken())


@app.route('/edditfile', methods=['GET', 'POST'])
@cross_origin()
def edditfile():
    return render_template("edditfile.html", v=util.maketoken())


@app.route('/storeconfirm', methods=['GET', 'POST'])
@cross_origin()
def storeconfirm():
    return render_template("storeconfirm.html", v=util.maketoken())


@app.route('/storeDetail', methods=['GET', 'POST'])
@cross_origin()
def storeDetail():
    return render_template("storeDetail.html", v=util.maketoken())


@app.route('/storecostlog', methods=['GET', 'POST'])
@cross_origin()
def storecostlog():
    return render_template("store_cost_log.html", v=util.maketoken())



@app.route('/storeeddit', methods=['GET', 'POST'])
@cross_origin()
def storeeddit():
    return render_template("store_eddit.html", v=util.maketoken())


@app.route('/getstoredata', methods=['GET', 'POST'])
def getstoredata():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        sql = "SELECT member.id, member.name, store.name , store.tel, member.addr, store.store_seq," \
              "store.create_dt, store.file_url ,store.category_seq FROM store " \
              "INNER JOIN member ON member.member_seq=store.member_seq where use_yn = \'N\'; "
        cursor.execute(sql)
        conn.commit()
        data = cursor.fetchall()

        for i in range(len(data)):
            data[i]['create_dt'] = str(data[i]['create_dt'])
            sql2 = f"""select name from category where category_seq ={data[i]['category_seq']}"""
            cursor.execute(sql2)
            conn.commit()
            data2 = cursor.fetchall()
            data[i]['category'] = data2[0]['name']
            data[i]['newname'] = data[i]['store.name'] + "("+data2[0]['name']+")"""
        result = {}
        result['status'] = 200
        result['data'] = data
        conn.close()
        return result
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/getstoremaindata', methods=['GET', 'POST'])
def getstoremaindata():
    conn = util.getConn()
    cursor = conn.cursor()
    result = {}
    # try:
    sql = "SELECT member.id,member.member_seq, member.name, store.name , store.tel, member.addr, store.store_seq," \
          "store.create_dt, store.file_url , store.category_seq FROM store " \
          "INNER JOIN member ON member.member_seq=store.member_seq where use_yn = \'Y\' and store.show_yn = \'Y\' and store.delete_yn = \'N\';"
    cursor.execute(sql)
    conn.commit()
    data = cursor.fetchall()
    star = 0
    workcount = 0
    for i in range(len(data)):
        selectsubCost = f"""select sub_cost , create_dt from calculate where store_seq = {data[i]['store_seq']} order by create_dt desc"""
        cursor.execute(selectsubCost)
        conn.commit()
        subCost = cursor.fetchall()
        data[i]['create_dt'] = str(data[i]['create_dt'])
        sql2 = f"""select name from category where category_seq ={data[i]['category_seq']}"""
        cursor.execute(sql2)
        conn.commit()
        data2 = cursor.fetchall()
        data[i]['category'] = data2[0]['name']
        selectjob = f"""select job_seq from consulting_job where store_seq = {data[i]['store_seq']} and job_use_yn = \'Y\' and job_use_user_yn = \'Y\'"""
        cursor.execute(selectjob)
        conn.commit()
        data3 = cursor.fetchall()
        sql555 = f"""select info_seq from store_job where store_seq ={data[i]['store_seq']}"""
        cursor.execute(sql555)
        conn.commit()
        data6 = cursor.fetchall()
        try:
            sql56 = f"""select name from category_info where info_seq = {data6[0]['info_seq']}"""
            cursor.execute(sql56)
            conn.commit()
            data7 = cursor.fetchall()
            data[i]['subcate'] = data7[0]['name']
        except:
            data[i]['subcate'] = ""
        for k in range(len(data3)):
            selectstar = f"""select star from consulting_comment where job_seq = {data3[k]['job_seq']}"""
            cursor.execute(selectstar)
            conn.commit()
            data4 = cursor.fetchall()
            if len(data4) == 0:
                pass
            else:
                workcount += 1
                star += int(data4[0]['star'])
        data[i]['star'] = star
        data[i]['workcount'] = workcount
        try:
            data[i]['elsecost'] = subCost[0]['sub_cost']
        except:
            data[i]['elsecost'] = 0
        star = 0
        workcount = 0
    result['status'] = 200
    result['data'] = data
    conn.close()
    return result
    # except:
    #     result['status'] = 500
    #     conn.close()
    #     return result


@app.route('/storeconfirmapi', methods=['GET', 'POST'])
def storeconfirmapi():
    result = {}
    id = request.get_json()
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        sql = f"""update store set use_yn = \'Y\' where store_seq = {id['store_seq']}"""
        cursor.execute(sql)
        conn.commit()

        result['status'] = 200
        conn.close()
        return result
    except Exception as e:
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/deletestore', methods=['GET', 'POST'])
def deletestore():
    result = {}
    id = request.get_json()
    conn = util.getConn()
    cursor = conn.cursor()

    try:
        sql = f"""update store set delete_yn = \'Y\' where store_seq = {id['store_seq']}"""
        cursor.execute(sql)
        conn.commit()

        result['status'] = 200
        conn.close()
        return result
    except Exception as e:
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/deleteever', methods=['GET', 'POST'])
def deleteever():
    result = {}
    id = request.get_json()
    conn = util.getConn()
    cursor = conn.cursor()

    try:
        sql = f"""delete from store where store_seq = {id['store_seq']}"""
        cursor.execute(sql)
        conn.commit()

        result['status'] = 200
        conn.close()
        return result
    except Exception as e:
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/getstoredetaildata', methods=['GET', 'POST'])
def getstoredetaildata():
    id = request.get_json()
    conn = util.getConn()
    cursor = conn.cursor()
    star = 0
    # try:
    selectjob = f"""select job_seq from consulting_job where store_seq = {id['store_seq']} and job_use_yn = \'Y\' and job_use_user_yn = \'Y\'"""
    cursor.execute(selectjob)
    conn.commit()
    data = cursor.fetchall()
    for k in range(len(data)):
        selectstar = f"""select star from consulting_comment where job_seq = {data[k]['job_seq']}"""
        cursor.execute(selectstar)
        conn.commit()
        data2 = cursor.fetchall()
        selectjobseq = f"""select * from consulting_job where job_seq = {data[k]['job_seq']}"""
        cursor.execute(selectjobseq)
        conn.commit()
        data3 = cursor.fetchall()
        try:
            selectaddr = f"""select addr,consulting_num,consulting_status from consulting where consulting_seq = {data3[0]['consulting_seq']}"""
            cursor.execute(selectaddr)
            conn.commit()
            addrdata = cursor.fetchall()
        except:
            addrdata = ()
        selectquestionsql = f"""select question_seq from  consulting_detail where job_seq = {data[k]['job_seq']}"""
        cursor.execute(selectquestionsql)
        conn.commit()
        questiondata = cursor.fetchall()
        selectvalue = f"""select answer_value from consulting_detail where job_seq = {data[k]['job_seq']}"""
        cursor.execute(selectvalue)
        conn.commit()
        valuedata = cursor.fetchall()
        for j in range(len(questiondata)):
            selectpalce = f"""select place_text from input_question where question_seq = {questiondata[j]['question_seq']} and summary_seq = 3"""
            cursor.execute(selectpalce)
            conn.commit()
            placedata = cursor.fetchall()
            if len(placedata) == 0:
                data[k]['place'] = 'nodata'
            else:
                data[k]['place'] = placedata[0]['place_text']
            selectgoods = f"""select place_text from input_question where question_seq = {questiondata[j]['question_seq']} and
             summary_seq = 4"""
            cursor.execute(selectgoods)
            conn.commit()
            goodsdata = cursor.fetchall()
            if len(goodsdata) == 0:
                data[k]['goods'] = 'nodata'
            else:
                data[k]['goods'] = goodsdata[0]['place_text']
        try:
            selectconsulting = f"""select * from consulting where consulting_seq = {data3[0]['consulting_seq']}"""
            cursor.execute(selectconsulting)
            conn.commit()
            data4 = cursor.fetchall()
        except:
            pass

        if len(data2) == 0:
            pass
        else:
            star += int(data2[0]['star'])

        try:
            data[k]['start_dt'] = str(data3[0]['start_dt'])
        except:
            data[k]['start_dt'] = 'nodata'
        try:
            data[k]['end_dt'] = str(data3[0]['end_dt'])
        except:
            data[k]['end_dt'] = 'nodata'
        try:
            data[k]['consultingnum'] = addrdata[0]['consulting_num']
        except:
            data[k]['consultingnum'] = 'nodata'
        try:
            if addrdata[0]['consulting_status'] == 11 or addrdata[0]['consulting_status'] ==  12:
                data[k]['status'] = '정산'
            else:
                data[k]['status'] = '미정산'

        except:
            data[k]['status'] = 'nodata'
        try:
            data[k]['value'] = valuedata[0]['answer_value']
        except:
            data[k]['value'] = 'nodata'
        try:
            data[k]['addr'] = addrdata[0]['addr']
        except:
            data[k]['addr'] = 'nodata'
        data[k]['star'] = star
        star = 0
    result = {}
    result['status'] = 200
    result['data'] = data
    conn.close()
    return result
    # except Exception as e:
    #     result = {}
    #     result['status'] = 500
    #     result['err'] = str(e)
    #     conn.close()
    #     return result


@app.route('/getstoredetaildata3', methods=['GET', 'POST'])
def getstoredetaildata3():
    id = request.get_json()
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        sql = "SELECT member.id, member.name,member.member_seq, store.name , store.tel, member.addr, store.store_seq," \
              "store.create_dt, store.file_url ,store.category_seq FROM store " \
              f"INNER JOIN member ON member.member_seq=store.member_seq where use_yn = \'Y\' and store.show_yn = \'Y\' and store.delete_yn = \'N\' and store.store_seq = {id['store_seq']}; "
        cursor.execute(sql)
        conn.commit()
        data = cursor.fetchall()
        star = 0
        workcount = 0
        for i in range(len(data)):
            data[i]['create_dt'] = str(data[i]['create_dt'])
            sql2 = f"""select name from category where category_seq ={data[i]['category_seq']}"""
            cursor.execute(sql2)
            conn.commit()
            data2 = cursor.fetchall()
            data[i]['category'] = data2[0]['name']
            selectjob = f"""select job_seq from consulting_job where store_seq = {data[i]['store_seq']} and job_use_yn = \'Y\' and job_use_user_yn = \'Y\'"""
            cursor.execute(selectjob)
            conn.commit()
            data3 = cursor.fetchall()
            sql3 = f"""select info_seq from store_job where store_seq = {data[i]['store_seq']}"""
            cursor.execute(sql3)
            conn.commit()
            data5 = cursor.fetchall()
            try:
                sql4 = f"""select name from category_info where info_seq = {data5[0]['info_seq']}"""
                cursor.execute(sql4)
                conn.commit()
                data6 = cursor.fetchall()
                data[i]['subcate'] = data6[0]['name']
            except:
                data[i]['subcate'] = ""
            for k in range(len(data3)):
                selectstar = f"""select star from consulting_comment where job_seq = {data3[k]['job_seq']}"""
                cursor.execute(selectstar)
                conn.commit()
                data4 = cursor.fetchall()
                if len(data4) == 0:
                    pass
                else:
                    workcount += 1
                    star += int(data4[0]['star'])
            data[i]['star'] = star
            data[i]['workcount'] = workcount
            data[i]['elsecost'] = 0
            star = 0
            workcount = 0
        result = {}
        result['status'] = 200
        result['data'] = data
        conn.close()
        return result
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/getstoredetaildata4', methods=['GET', 'POST'])
def getstoredetaildata4():
    result = {}
    id = request.get_json()
    conn = util.getConn()
    cursor = conn.cursor()
    accumulate_cost = 0
    # try:
    sql = f"""select file_url from store where store_seq = {id['store_seq']}"""
    cursor.execute(sql)
    conn.commit()
    filedata = cursor.fetchall()
    consultingsql = f"""select store_yn,consulting_status from consulting where store_seq = {id['store_seq']}"""
    cursor.execute(consultingsql)
    conn.commit()
    consultingdata = cursor.fetchall()
    nList = []
    workCount = []
    nWorkCount = 0
    for i in range(len(consultingdata)):
        if consultingdata[i]['consulting_status'] == 11 or consultingdata[i]['consulting_status'] == 12:
            pass
        else:
            nWorkCount += 1

        if consultingdata[i]['store_yn'] == 'N':
            nList.append(consultingdata[i]['store_yn'])
        elif consultingdata[i]['store_yn'] == 'Y':
            workCount.append(consultingdata[i]['store_yn'])
    selectLastDate = f"""select MAX(create_dt) from calculate where store_seq = {id['store_seq']}"""
    cursor.execute(selectLastDate)
    conn.commit()
    lastDate = cursor.fetchall()
    selectAccumulateCost = f"""select accumulate_cost from calculate where store_seq = {id['store_seq']}"""
    cursor.execute(selectAccumulateCost)
    conn.commit()
    accumulateCost = cursor.fetchall()

    selectsubCost = f"""select sub_cost,create_dt from calculate where store_seq = {id['store_seq']} order by create_dt desc"""
    cursor.execute(selectsubCost)
    conn.commit()
    subCost = cursor.fetchall()

    for i in range(len(accumulateCost)) :
        accumulate_cost += accumulateCost[i]['accumulate_cost']
    filedata[0]['store_seq'] = int(id['store_seq'])
    filedata[0]['ncount'] = len(nList)
    filedata[0]['wholeworkcount'] = len(workCount)
    for i in range(len(lastDate)):
        lastDate[i]['MAX(create_dt)'] = str(lastDate[i]['MAX(create_dt)'])
    filedata[0]['lastdate'] = lastDate[0]['MAX(create_dt)']
    filedata[0]['accumulate_cost'] = accumulate_cost
    try:
        filedata[0]['subcost'] = subCost[0]['sub_cost']
    except :
        filedata[0]['subcost'] = 0
    filedata[0]['nwork'] = nWorkCount
    result['status'] = 200
    result['data'] = filedata
    conn.close()
    return result
    # except Exception as e:
    #     result['status'] = 500
    #     result['err'] = str(e)
    #     conn.close()
    #     return result



@app.route('/storecostlogapi', methods=['POST','GET'])
def storecostlogapi():
    result = {}
    id = request.get_json()
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        sql = f"""select store_seq,create_dt, accumulate_cost, calculate_cost, sub_cost from calculate where store_seq = {id['store_seq']} order by create_dt desc"""
        cursor.execute(sql)
        conn.commit()
        calculatedata = cursor.fetchall()
        for i in range(len(calculatedata)):
            calculatedata[i]['create_dt'] = str(calculatedata[i]['create_dt'])

        result['status'] = 200
        result['data'] = calculatedata
        conn.close()
        return result
    except:
        result['status'] = 500
        conn.close()
        return result




@app.route('/selectedditstore', methods=['POST','GET'])
def selectedditstore() :
    result = {}
    id = request.get_json()
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        sql = f"""select name,tel,business_number,category_seq from store where store_seq = {id['store_seq']}"""
        cursor.execute(sql)
        conn.commit()
        data1 = cursor.fetchall()
        sql1 = f"""select name from category where category_seq = {data1[0]['category_seq']}"""
        cursor.execute(sql1)
        conn.commit()
        data2 = cursor.fetchall()
        data1[0]['mainwork'] = data2[0]['name']
        sql2 = f"""select info_seq from store_job where store_seq = {id['store_seq']}"""
        cursor.execute(sql2)
        conn.commit()
        data3 = cursor.fetchall()
        sql3 = f"""select name from category_info where info_seq = {data3[0]['info_seq']}"""
        cursor.execute(sql3)
        conn.commit()
        data4 = cursor.fetchall()
        data1[0]['subwork'] = data4[0]['name']
        result['status'] = 200
        result['data'] = data1
        conn.close()
        return result
    except:
        result['status'] = 500
        conn.close()
        return result


@app.route('/updateeddit' , methods=['POST','GET'])
def updateeddit() :
    result = {}
    id = request.args
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        sql = f"""UPDATE store SET name = \'{id['store_name']}\' WHERE store_seq = {id['store_seq']}"""
        cursor.execute(sql)
        conn.commit()

        sql = f"""UPDATE store SET tel = \'{id['tel']}\' WHERE store_seq = {id['store_seq']}"""
        cursor.execute(sql)
        conn.commit()

        sql = f"""UPDATE store SET business_number = \'{id['business_number']}\' WHERE store_seq = {id['store_seq']}"""
        cursor.execute(sql)
        conn.commit()

        sql = f"""UPDATE store SET category_seq = {id['category_seq']} WHERE store_seq = {id['store_seq']}"""
        cursor.execute(sql)
        conn.commit()

        sql = f"""UPDATE store_job SET info_seq = {id['subwork']} WHERE store_seq = {id['store_seq']}"""
        cursor.execute(sql)
        conn.commit()
        result['status'] = 200
        conn.close()
        return result
    except:
        result['status'] = 500
        conn.close()
        return result



@app.route('/edditfile1', methods=['GET', 'POST'])
def edditfile1():
    result = {}
    conn = util.getConn()
    cursor = conn.cursor()
    id = request.get_json()
    try:
        file = request.files['filename']
        folder_seq = request.form['store_seq']
        # file_save_name = request.form['file_save_name']
        fileName = file.filename
        fileName1 = file.filename.split('.')
        fileSaveName = secrets.token_hex(16) + "." + fileName1[len(fileName1)-1]
        file.save('./api/static/data/' + fileSaveName)
        sql = f"""update store set file_url = \'{fileSaveName}\' where store_seq = {folder_seq}"""
        print(sql)
        cursor.execute(sql)
        conn.commit()
        result['status'] = 200
        return result
    except Exception as e:
        print(e)
        result['status'] = 400
        return result