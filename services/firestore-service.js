const Firestore = require('@google-cloud/firestore')
const env = require('../config/app.config')
var uuid = require('node-uuid')

const db = new Firestore();

if (env.DEPLOY_ENV !== 'prod') {
    db.settings({
        projectId: 'dummy-contact-api',
        host: '127.0.0.1',
        port: 5050,
        ssl: false,
        keyFilename: '',
        credentials: {}
    });
}

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
