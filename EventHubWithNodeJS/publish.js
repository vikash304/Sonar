const { EventHubProducerClient } = require("@azure/event-hubs");
const eventHubConnectionString = "";
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