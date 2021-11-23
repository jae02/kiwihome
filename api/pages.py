from flask import Flask, render_template, request
from flask_cors import CORS, cross_origin

import util
from api import app


@app.route('/', methods=['GET', 'POST'])
@cross_origin()
def itr_visit_est_write():
    return render_template("itr_visit_est_write.html", v=util.maketoken())


@app.route('/itr_visit_est_write_example', methods=['GET', 'POST'])
@cross_origin()
def itr_visit_est_write_example():
    return render_template("itr_visit_est_write_example.html", v=util.maketoken())


@app.route('/preparing', methods=['GET', 'POST'])
@cross_origin()
def preparing():
    return render_template("preparing.html", v=util.maketoken())


@app.route('/login', methods=['GET', 'POST'])
@cross_origin()
def login():
    return render_template("login.html", v=util.maketoken())


@app.route('/itr_trans_est_check', methods=['GET', 'POST'])
@cross_origin()
def itr_trans_est_check():
    return render_template("itr_trans_est_check.html", v=util.maketoken())


@app.route('/itr_est_list', methods=['GET', 'POST'])
@cross_origin()
def itr_est_list():
    return render_template("itr_est_list.html", v=util.maketoken())


@app.route('/itr_est_list_detail', methods=['GET', 'POST'])
@cross_origin()
def itr_est_list_detail():
    return render_template("itr_est_list_detail.html", v=util.maketoken())


@app.route('/log', methods=['GET', 'POST'])
@cross_origin()
def log():
    return render_template("log.html", v=util.maketoken())


@app.route('/statis_1', methods=['GET', 'POST'])
@cross_origin()
def statis_1():
    return render_template("statis_1.html", v=util.maketoken())


@app.route('/statis_2', methods=['GET', 'POST'])
@cross_origin()
def statis_2():
    return render_template("statis_2.html", v=util.maketoken())


@app.route('/statis_3', methods=['GET', 'POST'])
@cross_origin()
def statis_3():
    return render_template("statis_3.html", v=util.maketoken())


@app.route('/statis_4', methods=['GET', 'POST'])
@cross_origin()
def statis_4():
    return render_template("statis_4.html", v=util.maketoken())


@app.route('/statis_5', methods=['GET', 'POST'])
@cross_origin()
def statis_5():
    return render_template("statis_5.html", v=util.maketoken())


@app.route('/statis_6', methods=['GET', 'POST'])
@cross_origin()
def statis_6():
    return render_template("statis_6.html", v=util.maketoken())


@app.route('/statis_7', methods=['GET', 'POST'])
@cross_origin()
def statis_7():
    return render_template("statis_7.html", v=util.maketoken())


@app.route('/message', methods=['GET', 'POST'])
@cross_origin()
def message():
    return render_template("message.html", v=util.maketoken())


@app.route('/terms', methods=['GET', 'POST'])
@cross_origin()
def terms():
    return render_template("terms.html", v=util.maketoken())


@app.route('/termsdetail', methods=['GET', 'POST'])
@cross_origin()
def termsdetail():
    return render_template("termsdetail.html", v=util.maketoken())


@app.route('/deletebox', methods=['GET', 'POST'])
@cross_origin()
def deletebox():
    return render_template("deletebox.html", v=util.maketoken())


@app.route('/options', methods=['GET', 'POST'])
@cross_origin()
def options():
    return render_template("options.html", v=util.maketoken())


@app.route('/stock', methods=['GET', 'POST'])
@cross_origin()
def stock():
    return render_template("stock_list.html", v=util.maketoken())


@app.route('/stock_add', methods=['GET', 'POST'])
@cross_origin()
def stock_add():
    return render_template("stock_add.html", v=util.maketoken())


@app.route('/category', methods=['GET', 'POST'])
@cross_origin()
def category():
    return render_template("category.html", v=util.maketoken())


@app.route('/categoryinfo', methods=['GET', 'POST'])
@cross_origin()
def categoryinfo():
    return render_template("categoryinfo.html", v=util.maketoken())


@app.route('/user', methods=['GET', 'POST'])
@cross_origin()
def user():
    return render_template("user.html", v=util.maketoken())


@app.route('/question', methods=['GET', 'POST'])
@cross_origin()
def question():
    return render_template("question.html", v=util.maketoken())


@app.route('/img_upload', methods=['GET', 'POST'])
@cross_origin()
def img_upload():
    return render_template("item/img_upload.html", v=util.maketoken())


@app.route('/getPage', methods=['GET', 'POST'])
@cross_origin()
def getPage():
    name = request.form['pagename']
    return render_template(name, v=util.maketoken())


@app.route('/stock_read', methods=['GET', 'POST'])
@cross_origin()
def stock_read():
    return render_template("stock_read.html", v=util.maketoken())


@app.route('/stock_update', methods=['GET', 'POST'])
@cross_origin()
def stock_update():
    return render_template("stock_update.html", v=util.maketoken())


# 임은지님
@app.route('/notice', methods=['GET', 'POST'])
@cross_origin()
def notice():
    return render_template("notice_list.html", v=util.maketoken())


@app.route('/notice_add', methods=['GET', 'POST'])
@cross_origin()
def notice_add():
    return render_template("notice_add.html", v=util.maketoken())


@app.route('/notice_info', methods=['GET', 'POST'])
@cross_origin()
def notice_one():
    return render_template("notice_info.html", v=util.maketoken())


@app.route('/member', methods=['GET', 'POST'])
@cross_origin()
def member_list():
    return render_template("member_list.html", v=util.maketoken())


@app.route('/member_add', methods=['GET', 'POST'])
@cross_origin()
def member_add():
    return render_template("member_add.html", v=util.maketoken())


@app.route('/member_pw_update', methods=['GET', 'POST'])
@cross_origin()
def member_pw_update():
    return render_template("member_pw_change.html", v=util.maketoken())


# 신지원님

@app.route('/review_list', methods=['GET', 'POST'])
@cross_origin()
def review_list():
    return render_template("review_list.html", v=util.maketoken())


@app.route('/review_detail', methods=['GET', 'POST'])
@cross_origin()
def review_detail():
    return render_template("review_detail.html", v=util.maketoken())


@app.route('/review_update', methods=['GET', 'POST'])
@cross_origin()
def review_update():
    return render_template("review_update.html", v=util.maketoken())


@app.route('/review_create', methods=['GET', 'POST'])
@cross_origin()
def review_create():
    return render_template("review_create.html", v=util.maketoken())


@app.route('/review_page', methods=['GET', 'POST'])
@cross_origin()
def review_page():
    return render_template("review_page.html", v=util.maketoken())


@app.route('/package_create', methods=['GET', 'POST'])
@cross_origin()
def package_create():
    return render_template("package_create.html", v=util.maketoken())


@app.route('/package_upate', methods=['GET', 'POST'])
@cross_origin()
def package_upate():
    return render_template("package_upate.html", v=util.maketoken())


@app.route('/stock_page', methods=['GET', 'POST'])
@cross_origin()
def stock_page():
    return render_template("stock_page.html", v=util.maketoken())


@app.route('/stock_detail', methods=['GET', 'POST'])
@cross_origin()
def stock_detail():
    return render_template("stock_detail.html", v=util.maketoken())


@app.route('/checkproduct', methods=['GET', 'POST'])
@cross_origin()
def checkproduct():
    return render_template("checkproduct.html", v=util.maketoken())


@app.route('/checkconsultproduct', methods=['GET', 'POST'])
@cross_origin()
def checkconsultproduct():
    return render_template("checkconsultproduct.html", v=util.maketoken())


@app.route('/sendmsg', methods=['GET', 'POST'])
@cross_origin()
def sendmsg():
    return render_template("sendmessage.html", v=util.maketoken())


@app.route('/checkpay', methods=['GET', 'POST'])
@cross_origin()
def checkpay():
    return render_template("checkpay.html", v=util.maketoken())


@app.route('/updatequestion', methods=['GET', 'POST'])
@cross_origin()
def updatequestion():
    return render_template("updatequestion.html", v=util.maketoken())


@app.route('/mc_visit_est_write', methods=['GET', 'POST'])
@cross_origin()
def mc_visit_est_write():
    return render_template("mc_visit_est_write.html", v=util.maketoken())


@app.route('/mc_visit_est_write_example', methods=['GET', 'POST'])
@cross_origin()
def mc_visit_est_write_example():
    return render_template("mc_visit_est_write_example.html", v=util.maketoken())


@app.route('/mc_est_list', methods=['GET', 'POST'])
@cross_origin()
def mc_est_list():
    return render_template("mc_est_list.html", v=util.maketoken())


@app.route('/mc_est_list_detail', methods=['GET', 'POST'])
@cross_origin()
def mc_est_list_detail():
    return render_template("mc_est_list_detail.html", v=util.maketoken())


@app.route('/mc_trans_est_check', methods=['GET', 'POST'])
@cross_origin()
def mc_trans_est_check():
    return render_template("mc_trans_est_check.html", v=util.maketoken())
