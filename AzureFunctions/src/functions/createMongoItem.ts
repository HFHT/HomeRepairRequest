import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
var MongoClient = require('mongodb').MongoClient;

async function createMongoItem(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const client = new MongoClient(process.env.ATLAS_URI)
    await client.connect()

    try {
        const req: any = await request.json()
        const retVal = await client.db(req.db).collection(req.collection).insertOne(req.data)
        await client.close()
        return {
            status: 200,
            body: JSON.stringify(retVal)
        }
    } catch (error) {
        context.error(error)
        await client.close()
        return { body: JSON.stringify({ err: true, error: error }), status: 501 }
    }
};

app.http('createMongoItem', {
    methods: ['POST'], authLevel: 'anonymous', handler: createMongoItem
});