
class SuperCallback {
    translate = (text, language = 'en', callback) => {
        let err, data;
        if (!text) {
            err = 'no text'
            return callback(err, '')
        }
        callback('', 'hello world')
    }
}

const sc = new SuperCallback()
sc.translate('', 'en', (err, data) => {
    if (err) {
        console.log('err>>>', err);
        return
    }

    console.log(data);
})