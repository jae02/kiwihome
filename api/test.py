import re
print('(%s) %s-%s' % tuple(re.findall(r'\d{4}$|\d{3}', '0123456789')))