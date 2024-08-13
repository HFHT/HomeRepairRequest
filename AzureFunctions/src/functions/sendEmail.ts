import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
const { EmailClient, KnownEmailSendStatus } = require("@azure/communication-email");
const MongoClient = require('mongodb').MongoClient;

//Send the following in the body of a post
//{to:'xyz@xyz.com', subject:'Hi', template: {db:'db', collection: 'col', template:'template1'}, replace: {_name_: 'first'}}
//Template... Hello {_name_}, how are you doing today?

const connectionString = process.env.AzureCommunications
const senderAddress = process.env.AzureEmailSender
const POLLER_WAIT_TIME = 10

type eMailReqType = {
    to: string
    subject: string
    template: eMailTemplateType             // Template to pull from Mongo database
    replace: {}                             // replace elements in template with these key: value pairs
}
type eMailTemplateType = {
    db: string
    collection: string
    template: string
}
type eMailResponseType = {
    _id: string,
    html: string
}
async function sendEmail(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const req = await request.json() as eMailReqType
    // Fetch requested template and replace all the requested fields.
    try {
        const client = new MongoClient(process.env.ATLAS_URI)
        await client.connect()
        var emailTemplate: eMailResponseType[] = await client.db(req.template.db).collection(req.template.collection).find({ _id: req.template.template }).toArray()
        Object.entries(req.replace).forEach(([key, value]: any) => {
            let regex = new RegExp(`{${key}}`, 'g')
            emailTemplate[0].html = emailTemplate[0].html.replace(regex, value)
        })
    } catch (error) {
        context.error(error)
        return { body: JSON.stringify({ err: true, error: error }), status: 501 }
    }

    const message = {
        senderAddress: senderAddress,
        recipients: {
            to: [{ address: req.to }],
            bcc: [{ address: process.env.AzureEmailBcc }]
        },
        content: {
            subject: req.subject,
            plainText: '',
            html: `<html>${emailTemplate[0].html}</html>`
        },
    }
    try {
        const client = new EmailClient(connectionString);
        const poller = await client.beginSend(message);
        if (!poller.getOperationState().isStarted) {
            throw "Poller was not started."
        }

        let timeElapsed = 0;
        while (!poller.isDone()) {
            poller.poll();
            context.log("Email send polling in progress");

            await new Promise(resolve => setTimeout(resolve, POLLER_WAIT_TIME * 1000));
            timeElapsed += 10;

            if (timeElapsed > 18 * POLLER_WAIT_TIME) {
                throw "Polling timed out.";
            }
        }

        if (poller.getResult().status === KnownEmailSendStatus.Succeeded) {
            context.log(`Successfully sent the email (operation id: ${poller.getResult().id})`);
            return { body: JSON.stringify(poller.getResult().id), status: 200 }
        }
        else {
            throw poller.getResult().error;

        }
    } catch (error) {
        context.error(error)
        return { body: JSON.stringify({ err: true, error: error }), status: 501 }
    }
};

app.http('sendEmail', {
    methods: ['POST'], authLevel: 'anonymous', handler: sendEmail
});