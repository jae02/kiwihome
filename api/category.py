from api import app
from flask import Flask, render_template, request
import util
from time import gmtime, strftime


@app.route('/getcategory', methods=['GET', 'POST'])
def getcategory():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        sql = "select * from category "
        cursor.execute(sql)
        conn.commit()
        data = cursor.fetchall()

        result = {}
        realdata = []
        for i in range(len(data)):
            data[i]['create_dt'] = str(data[i]['create_dt'])
            if data[i]['delete_yn'] == 'N':
                realdata.append(data[i])
        result['status'] = 200
        result['data'] = realdata
        conn.close()
        return result
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/getcategoryinfo', methods=['GET', 'POST'])
def getcategoryinfo():
    conn = util.getConn()
    cursor = conn.cursor()
    try:

        seq = request.form['category_seq']

        sql = "select * from category_info where category_seq = %s "
        par = (seq)
        if (seq == '-1'):
            sql = "select * from category_info"
            cursor.execute(sql)
        else:
            cursor.execute(sql, par)

        conn.commit()
        data = cursor.fetchall()

        result = {}
        realdata = []
        for i in range(len(data)):
            data[i]['create_dt'] = str(data[i]['create_dt'])
            if data[i]['delete_yn'] == 'N':
                realdata.append(data[i])
        result['status'] = 200
        result['data'] = realdata
        conn.close()
        return result
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/getallcategoryinfo', methods=['GET', 'POST'])
def getallcategoryinfo():
    conn = util.getConn()
    cursor = conn.cursor()
    try:

        sql = "select * from category_info"

        cursor.execute(sql)
        conn.commit()
        data = cursor.fetchall()

        result = {}
        realdata = []
        for i in range(len(data)):
            data[i]['create_dt'] = str(data[i]['create_dt'])
            if data[i]['delete_yn'] == 'N':
                realdata.append(data[i])
        result['status'] = 200
        result['data'] = realdata
        conn.close()
        return result
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/getcategorylist', methods=['GET', 'POST'])
def getcategorylist():
    conn = util.getConn()
    cursor = conn.cursor()
    try:

        sql = "select * from category_info where category_seq = %s"
        cursor.execute(sql, '1')

        conn.commit()
        data = cursor.fetchall()

        result = {}
        realdata = []
        for i in range(len(data)):
            data[i]['create_dt'] = str(data[i]['create_dt'])
            if data[i]['delete_yn'] == 'N':
                realdata.append(data[i])
        result['status'] = 200
        result['data'] = realdata
        conn.close()
        return result
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/addcategoryinfo', methods=['GET', 'POST'])
def addcategoryinfo():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        seq = request.form['category_seq']
        name = request.form['name']
        create_dt = strftime("%Y-%m-%d %H:%M:%S")
        sql = "INSERT INTO category_info ( category_seq ,name , create_dt ) VALUES( %s, %s , %s)"
        par = (seq, name, create_dt)
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


@app.route('/getcategorydetail', methods=['GET', 'POST'])
def getcategorydetail():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        seq = request.form['info_seq']
        sql = "select * from category_info_detail where info_seq = %s "
        par = (seq)
        if (seq == '-1'):
            sql = "select * from category_info_detail"
            cursor.execute(sql)
        else:
            cursor.execute(sql, par)

        conn.commit()
        data = cursor.fetchall()

        result = {}
        realdata = []
        for i in range(len(data)):
            data[i]['create_dt'] = str(data[i]['create_dt'])
            if data[i]['delete_yn'] == 'N':
                realdata.append(data[i])
        result['status'] = 200
        result['data'] = realdata
        conn.close()
        return result
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/answerfromjob', methods=['GET', 'POST'])
def answerfromjob():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        job_seq = request.form['job_seq']
        sql = "select * from consulting_detail  JOIN input_question ON input_question.question_seq=consulting_detail.question_seq where job_seq = %s"

        par = (job_seq)
        cursor.execute(sql, par)

        conn.commit()
        data = cursor.fetchall()

        result = {}
        realdata = []
        for i in range(len(data)):
            data[i]['create_dt'] = str(data[i]['create_dt'])
            if data[i]['delete_yn'] == 'N':
                realdata.append(data[i])
        result['status'] = 200
        result['data'] = realdata
        conn.close()
        return result
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/addproduct', methods=['GET', 'POST'])
def addproduct():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        # formData.append('category_seq', category_seq);
        # formData.append('info_seq', info_seq);
        # formData.append('detail_seq', detail_seq);
        # formData.append('name', name);
        # formData.append('price', price);
        # formData.append('store_price', store_price);
        # formData.append('stock', stock);
        # formData.append('img_url', img_url);
        # formData.append('content', content);
        # formData.append('file', file);

        category_seq = request.form['category_seq']
        info_seq = request.form['info_seq']
        detail_seq = request.form['detail_seq']
        name = request.form['name']
        price = request.form['price']
        store_price = request.form['store_price']
        stock = request.form['stock']
        content = request.form['content']
        img_url = request.form['img_url']
        file = request.files['file']
        create_dt = strftime("%Y-%m-%d %H:%M:%S")
        sql = "INSERT INTO product ( category_seq,info_seq,detail_seq,name,price,store_price,stock,img_url,content,create_dt) " \
              "VALUES( %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        par = (category_seq, info_seq, detail_seq, name, price, store_price, stock, img_url, content, create_dt)
        cursor.execute(sql, par)
        conn.commit()
        file.save('./api/static/data/' + img_url)
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


@app.route('/getproduct', methods=['GET', 'POST'])
def getproduct():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        sql = "select * from product "
        cursor.execute(sql)
        conn.commit()
        data = cursor.fetchall()
        result = {}
        realdata = []
        for i in range(len(data)):
            data[i]['create_dt'] = str(data[i]['create_dt'])
            if data[i]['delete_yn'] == 'N':
                realdata.append(data[i])
        result['status'] = 200
        result['data'] = realdata
        conn.close()
        return result
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/getoneproduct', methods=['GET', 'POST'])
def getoneproduct():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        body = request.get_json()
        product_seq = body['product_seq']
        sql = "select * from product " \
              " JOIN category ON category.category_seq=product.category_seq  " \
              " JOIN category_info ON category_info.info_seq=product.info_seq  " \
              " JOIN category_info_detail ON category_info_detail.detail_seq=product.detail_seq  " \
              "where product_seq = %s;"

        cursor.execute(sql, product_seq)
        conn.commit()
        data = cursor.fetchall()
        result = {}
        realdata = []
        for i in range(len(data)):
            data[i]['create_dt'] = str(data[i]['create_dt'])
            if data[i]['delete_yn'] == 'N':
                realdata.append(data[i])
        result['status'] = 200
        result['data'] = realdata
        conn.close()
        return result
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/getproductfromdetail', methods=['GET', 'POST'])
def getproductfromdetail():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        body = request.get_json()
        detail_seq = body['detail_seq']

        sql = "select * from product where detail_seq = %s"
        cursor.execute(sql, detail_seq)
        conn.commit()
        data = cursor.fetchall()
        result = {}
        realdata = []
        for i in range(len(data)):
            data[i]['create_dt'] = str(data[i]['create_dt'])
            if data[i]['delete_yn'] == 'N':
                realdata.append(data[i])
        result['status'] = 200
        result['data'] = realdata
        conn.close()
        return result
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/getcateproduct', methods=['GET', 'POST'])
def getcateproduct():
    conn = util.getConn()
    cursor = conn.cursor()

    try:
        body = request.get_json()
        product_category = body['product_category']
        sql = "select * from product where product_category = %s"
        cursor.execute(sql, product_category)
        conn.commit()
        data = cursor.fetchall()
        result = {}
        realdata = []
        for i in range(len(data)):
            data[i]['create_dt'] = str(data[i]['create_dt'])
            if data[i]['delete_yn'] == 'N':
                realdata.append(data[i])
        result['status'] = 200
        result['data'] = realdata
        conn.close()
        return result
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/deletecategoryinfo', methods=['GET', 'POST'])
def deletecategoryinfo():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        info_seq = request.form['info_seq']
        result = {}
        sql = f"""DELETE FROM category_info WHERE info_seq = {info_seq}"""
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


@app.route('/addcategorydetail', methods=['GET', 'POST'])
def addcategorydetail():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        body = request.get_json()
        info_seq = body['info_seq']
        name = body['name']
        create_dt = strftime("%Y-%m-%d %H:%M:%S")
        sql = "INSERT INTO category_info_detail ( info_seq,name,create_dt) VALUES( %s, %s, %s)"
        par = (info_seq, name, create_dt)
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


@app.route('/updateproduct', methods=['GET', 'POST'])
def updateproduct():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        product_seq = request.form['product_seq']
        category_seq = request.form['category_seq']
        info_seq = request.form['info_seq']
        detail_seq = request.form['detail_seq']
        name = request.form['name']
        price = request.form['price']
        store_price = request.form['store_price']
        stock = request.form['stock']
        content = request.form['content']
        img_url = request.form['img_url']
        file = request.files['file']

        sql = f"""UPDATE  product  SET category_seq = '{category_seq}',info_seq = '{info_seq}'
,detail_seq = '{detail_seq}',name = '{name}',
price = '{price}',store_price = '{store_price}',
stock = '{stock}',img_url = '{img_url}',
content = '{content}' WHERE  product_seq = {product_seq}"""

        cursor.execute(sql)
        conn.commit()
        file.save('./api/static/data/' + img_url)
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


@app.route('/checkproductstockitem', methods=['GET', 'POST'])
def checkproductstockitem():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        body = request.get_json()
        product_seq = body['product_seq']
        count = int(body['count'])
        sql = f"""select * from product where product_seq = {product_seq}"""
        cursor.execute(sql)
        conn.commit()
        result = {}
        data = cursor.fetchall()[0]
        if (int(data['stock']) >= count):

            result['status'] = 200
        else:
            result['status'] = 401
            result['lack'] = count - int(data['stock'])

        conn.close()
        return result
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/addjobproduct', methods=['GET', 'POST'])
def addjobproduct():
    conn = util.getConn()
    cursor = conn.cursor()
    try:
        body = request.get_json()
        job_seq = body['job_seq']
        product_seq = body['product_seq']
        order_cnt = body['order_cnt']
        kiwihome_stock = body['kiwihome_stock']
        kiwihome_out_stock = body['kiwihome_out_stock']
        store_stock = body['store_stock']
        construction_type = body['construction_type']

        create_dt = strftime("%Y-%m-%d %H:%M:%S")
        sql = "INSERT INTO consulting_job_product ( job_seq,product_seq,order_cnt,kiwihome_stock,kiwihome_out_stock,store_stock,construction_type,create_dt) " \
              "VALUES( %s, %s, %s,%s, %s, %s, %s, %s)"
        par = (
        job_seq, product_seq, order_cnt, kiwihome_stock, kiwihome_out_stock, store_stock, construction_type, create_dt)
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


@app.route('/getjobproduct', methods=['GET', 'POST'])
def getjobproduct():
    conn = util.getConn()
    cursor = conn.cursor()

    try:
        body = request.get_json()
        job_seq = body['job_seq']
        sql = "select * from consulting_job_product " \
              " JOIN product ON product.product_seq=consulting_job_product.product_seq where job_seq = %s"
        cursor.execute(sql, job_seq)
        conn.commit()
        data = cursor.fetchall()
        result = {}
        realdata = []
        for i in range(len(data)):
            data[i]['create_dt'] = str(data[i]['create_dt'])
            if data[i]['delete_yn'] == 'N':
                realdata.append(data[i])
        result['status'] = 200
        result['data'] = realdata
        conn.close()
        return result
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result
