import requests
import json
auth = ('mobileraj', 'p4ssw0rd')
headers = {'Content-type': 'application/json'}
db='places'
get_url = "http://{0}.cloudant.com/places/9c0e6ff111643ce2b4f2c909c2ed85d1".format(auth[0])
r = requests.get(get_url, auth=auth)
#update the document
doc = r.json()
doc['curloc'] = {'lat':36.112,'lon':-115.3007}
post_url = "http://{0}.cloudant.com/places".format(auth[0])
r = requests.post(  post_url,  auth=auth,  headers=headers,  data=json.dumps(doc))
print json.dumps(r.json(), indent=1)
