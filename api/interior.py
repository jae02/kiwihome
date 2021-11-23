from api import app
from flask import Flask, render_template, request
import util
from time import gmtime, strftime


@app.route('/putInterior', methods=['GET', 'POST'])
def putInterior():
    # summary : insert item to interior
    # get : ctm_name , ctm_phone , ctm_addr , ctm_addr_detail ,ctm_memo
    # c_memo , c_seq , c_name , options ,
    # wholepay , perdiempay , downpay , advancepay , balancepay
    # ctm_start_dt , ctm_end_dt , whole_period, materials_key
    # acting : insert interior
    # return : nothing
    # server error(500)
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        ctm_name = request.form['ctm_name']
        ctm_phone = request.form['ctm_phone']
        ctm_addr = request.form['ctm_addr']
        ctm_addr_detail = request.form['ctm_addr_detail']
        ctm_memo = request.form['ctm_memo']

        c_memo = request.form['c_memo']
        c_seq = request.form['c_seq']
        c_name = request.form['c_name']
        options = request.form['options']
        options_key = util.tokenmake()

        wholepay = request.form['wholepay']
        perdiempay = request.form['perdiempay']
        downpay = request.form['downpay']
        advancepay = request.form['advancepay']
        balancepay = request.form['balancepay']

        ctm_start_dt = request.form['ctm_start_dt']
        ctm_end_dt = request.form['ctm_end_dt']
        whole_period = request.form['whole_period']
        materials_key = request.form['materials_key']

        create_dt = strftime("%Y-%m-%d %H:%M:%S")

        par = (member_seq, ip, content, device_type, create_dt, name)
        sql = "INSERT INTO interior ( ) VALUES( )"
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
