const elasticsearch = require('elasticsearch');
const log = console.log.bind(console);
const client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

const createIndex = async () => {
    try {
        let indicesCreateResponse = await client.indices.create({index: 'my_index'});
        console.log(indicesCreateResponse);
    } catch (e) {
        console.log(e);
    }
};

const index = async () => {
    try {
        let search = await client.index({
            index: 'my_index',
            type: 'my_type',
            id: '1',
            body: {
                title: 'Test 1',
                tags: ['y', 'z'],
                published: true,
                published_at: '2013-01-01',
                counter: 1
            }
        });
        console.log(search)
    } catch (e) {
        console.log(e);
    }
};

const search = async () => {
    try {
        let search = await client.search({
            index: 'my_index',
            body: {
                query: {
                    match: {
                        title: 'Test 1'
                    }
                }
            }
        });
        console.log(search)
    } catch (e) {
        console.log(e);
    }
}


function closeConnection() {
    client.close();
}

const waitForIndexing = () => {
    log('Wait for indexing ....');
    return new Promise(function (resolve) {
        setTimeout(resolve, 2000);
    });
};

return Promise.resolve()
    .then(createIndex)
    .then(index)
    .then(search)
