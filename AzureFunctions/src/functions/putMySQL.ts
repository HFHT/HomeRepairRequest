import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
const mysql = require('mysql');
export async function putMySQL(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD
    })
    // connection.on('error', function (err: any) {
    //     context.log(`Error while creating a MySQL connection: ${err.toString()}`);
    // });
    context.log('Host=', process.env.DB_HOST)
    context.log('DB=', process.env.DB_NAME)
    context.log('Connection=', connection)
    const cc = await connection.connect((err: any) => {
        context.log('cc', cc)
        if (err) {
            context.log('connectError=', err)
        } else {
            context.log('connected')
            const cq = connection.query(
                'SELECT * FROM Const_eMail LIMIT 15;',
                (err: any, results: any) => {
                    context.log('Error=', err)
                    context.log('Results=', results)
                }
            )
            context.log('cq', cq)
        }
        connection.end((err: any) => { console.log('end', err) })
    })

    return { body: `Hello,!` };
};

app.http('putMySQL', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: putMySQL
});
