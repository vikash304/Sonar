const { EventHubProducerClient } = require("@azure/event-hubs");
const eventHubConnectionString = "Endpoint=sb://demoeventhubnamespacetest.servicebus.windows.net/;SharedAccessKeyName=navi;SharedAccessKey=A1P00i9BPPV9JeT07Lg91PI7fT/SgP2V++AEhMBTexE=;EntityPath=demoeventhubtest";
const eventHubName = "demoeventhubtest";
async function main() {

    try {
        const producer = new EventHubProducerClient(eventHubConnectionString, eventHubName);
        const batch = await producer.createBatch();
        batch.tryAdd({ body: "First event test"});
        batch.tryAdd({ body: "Second event test"});
        batch.tryAdd({ body: "Third event test"});
        await producer.sendBatch(batch);
        await producer.close();
        console.log("All batch data sent");

    }
    catch (err) {
        console.log("Error here during publish ",err);
    }
}

main();