const parseAndValidateContact = (contact) => {
    let date = new Date().toISOString();
    let result = {
        name: contact.name ? contact.name : 'None',
        email: contact.email ? contact.email : 'None',
        comments: contact.comments ? contact.comments : 'None',
        company: contact.company ? contact.company : 'None',
        date: date
    };

    return result;
};

module.exports = {
    parseAndValidateContact
};