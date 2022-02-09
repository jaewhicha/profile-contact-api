const Firestore = require('@google-cloud/firestore')
var uuid = require('node-uuid')

const db = new Firestore();

const sumbmitContact = (contactInfo) => {
    const docRef = db.doc('contacts/' + uuid.v4());
    try {
        return docRef.set(contactInfo);
    } catch (e) {
        return new Promise((resolve, reject) => { reject(e) });
    }
}

const getContacts = () => {
    const docRef = db;
    try {
        return docRef.collection('contacts').get()
            .then((querySnapshot) => {
                const tempDoc = querySnapshot.docs.map((doc) => {
                    return { id: doc.id, ...doc.data()};
                })
                return tempDoc;
            })
    } catch (e) {
        return new Promise((resolve, reject) => { reject(e) });
    }
}

module.exports = {
    sumbmitContact,
    getContacts
}
