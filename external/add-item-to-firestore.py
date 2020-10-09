import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
 
# Use the application default credentials
cred = credentials.Certificate("service-token.json")
firebase_admin.initialize_app(cred, {
  'projectId': 'amica-project1'
})
 
db = firestore.client()
 
arr = open("output.txt").read().splitlines()

for (index, item) in enumerate(arr):

    unicode_item = item.encode('latin1').decode('utf8')

    db.collection(u'Maträtter').document(str(index)).set({
        u'maträtter': unicode_item,
        u'rating': 0
    })