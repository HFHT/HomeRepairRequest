import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
var MongoClient = require('mongodb').MongoClient;

export async function putMongoItem(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const client = new MongoClient(process.env.ATLAS_URI)
    await client.connect()

    try {
        const req: any = await request.json()
        const retVal = await client.db(req.db).collection(req.collection).updateOne({ _id: req._id }, { $set: { ...req.data } }, { upsert: true })
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

app.http('putMongoItem', {
    methods: ['PUT', 'POST'],
    authLevel: 'anonymous',
    handler: putMongoItem
});
