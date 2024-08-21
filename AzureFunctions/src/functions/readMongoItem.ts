import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
var MongoClient = require('mongodb').MongoClient;

async function readMongoItem(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const queryGet = (field: any, defaultValue = {}) => {
        context.log(field, defaultValue)
        if (field === undefined) return defaultValue
        if (field === null) return defaultValue
        if (field === '') return defaultValue
        return JSON.parse(field)
    }
    try {
        context.log('params', request.query.get('find'), request.query.get('sort'), request.query.get('limit'))
        const client = new MongoClient(process.env.ATLAS_URI)
        await client.connect()
        return {
            status: 200,
            body: JSON.stringify(
                await client.db(request.query.get('db'))
                    .collection(request.query.get('collection'))
                    .find(queryGet(request.query.get('find')))
                    .limit(queryGet(request.query.get('limit'), 10000))
                    .sort(queryGet(request.query.get('sort')))
                    .toArray()
            )
        }
    } catch (error) {
        context.error(error)
        return { body: JSON.stringify({ err: true, error: error }), status: 501 }
    }
};

app.http('readMongoItem', {
    methods: ['GET'], authLevel: 'anonymous', handler: readMongoItem
});