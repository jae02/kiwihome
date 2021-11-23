from api import app
from flask import Flask, render_template, request
import util
from time import gmtime, strftime


@app.route('/addterms', methods=['GET', 'POST'])
def addterms():
    # summary : insert item to terms
    # get : title,content
    # acting : insert terms
    # return : nothing
    # server error(500)
    conn = util.getConn()
    cursor = conn.cursor()
    try:

        title = request.form['title']
        content = request.form['content']

        create_dt = strftime("%Y-%m-%d %H:%M:%S")
        par = (title, content, create_dt)
        sql = "INSERT INTO agree ( title ,content, create_dt) VALUES( %s, %s, %s)"
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


@app.route('/getterms', methods=['GET', 'POST'])
def getterms():
    # summary : get item from terms
    # get : nothing
    # acting : selerct terms
    # return : terms
    # server error(500)
    conn = util.getConn()
    cursor = conn.cursor()
    try:

        sql = "SELECT * from agree "
        cursor.execute(sql)
        data = cursor.fetchall()

        result = {}
        for i in range(len(data)):
            data[i]['create_dt'] = str(data[i]['create_dt'])
            data[i]['update_dt'] = str(data[i]['update_dt'])
        result['data'] = data
        result['status'] = 200

        conn.commit()
        conn.close()
        return result
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result


@app.route('/updateterms', methods=['GET', 'POST'])
def updateterms():
    # summary : update  terms
    # get : id , title,content
    # acting : update terms
    # return : nothing
    # server error(500)
    conn = util.getConn()
    cursor = conn.cursor()
    try:

        title = request.form['title']
        content = request.form['content']
        id = request.form['id']
        update_dt = strftime("%Y-%m-%d %H:%M:%S")
        print(title)
        print(content)
        print(id)
        sql = "UPDATE agree SET title = %s , content = %s , update_dt = %s  WHERE agree_seq = %s "

        par = (title, content, update_dt, str(id))
        cursor.execute(sql, par)
        conn.commit()
        conn.close()
        result = {}
        result['status'] = 200
        result['title'] = title
        result['content'] = content
        result['id'] = id

        return result
    except Exception as e:
        result = {}
        result['status'] = 500
        result['err'] = str(e)
        conn.close()
        return result
