import random
import string
import json
import token
import pymysql
import hashlib
import re

import random
# import test
import secrets
from datetime import datetime, timedelta
import datetime


def dictToJson(dict):
    return json.dumps(dict, ensure_ascii=False)


def tokenmake():
    return secrets.token_urlsafe(20)


def couponmake():
    return secrets.token_urlsafe(5)


def maketoken():
    char_set = string.ascii_lowercase + string.digits
    userId = ''.join(random.sample(char_set * 6, 6))
    return userId


def getConn():
    conn = pymysql.connect(host='matfood.co.kr', port=3306, user='admin', password='Fix0202!',
                           cursorclass=pymysql.cursors.DictCursor,
                           db='kiwihome', charset='utf8')
    return conn


def getDftConn():
    conn = pymysql.connect(host='matfood.co.kr', port=3306, user='root', password='Fix0202!',
                           db='kiwihome', charset='utf8')
    return conn


def objToJson(object):
    return json.dumps(object, ensure_ascii=False)


def isNull(string):
    if (string == None or string == "" or string == 'None'):
        return True
    else:
        return False


def format_phone(str):
    # strip non-numeric characters
    phone = re.sub(r'\D', '', str)
    # remove leading 1 (area codes never start with 1)
    phone = phone.lstrip('1')
    return '{}-{}-{}'.format(phone[0:3], phone[3:7], phone[7:])
