// starting code
const list = [ false, 1, '2', [ 3, 4 ], { ot: '5' } ];
const bucket = { bool: [], string: [], number: [], list: [], object: [] };


// my code
list.forEach(value => {
    switch (typeof value) {
        case 'boolean':
            bucket.bool.push(value);
            break;
        case 'string':
            bucket.string.push(value);
            break;
        case 'number':
            bucket.number.push(value);
            break;
        case 'object':
            // arrays are objects too - this is a way to recognize them
            // in my solution I distinguish between them
            // if the task's description is strict for JS types, only the else branch should be used
            if (Array.isArray(value)) {
                bucket.list.push(value);
            }
            else {
                bucket.object.push(value);
            }
            break;
    }
});
// to write out full object
console.log(JSON.stringify(bucket));
