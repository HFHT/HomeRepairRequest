import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
var MongoClient = require('mongodb').MongoClient;
//{db: string, collection: string, index: string, searchTerm: string, fuzzy: boolean}
export async function search(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const client = new MongoClient(process.env.ATLAS_URI)
    await client.connect()

    try {
        const req: any = await request.json()
        const retVal = await client.db(req.db).collection(req.collection).aggregate([
            {
                $search: {
                    index: req.index,
                    text: {
                        query: req.searchTerm,
                        path: { wildcard: '*' },
                        fuzzy: req.fuzzy ? { maxEdits: 2, prefixLength: 3 } : {}
                    }
                }
            },
            { $addFields: { textScore: { $meta: 'searchScore' } } },
            { $limit: req.limit ? req.limit : 25 }
        ]).toArray()
        context.log(retVal)
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

app.http('search', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: search
});
