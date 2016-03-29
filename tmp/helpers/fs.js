import using from 'using-stubs';

//get a reference to require('fs')
let fs = using().require('fs');

export default {
    setup: (data) => {
        using()(fs)('readFile').stub((path, encoding, callback) => {
            //mock original behaviour
            callback(null, JSON.stringify(data));
        });
    }
}
