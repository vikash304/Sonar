const { EventHubConsumerClient } = require("@azure/event-hubs");
const { ContainerClient } = require("@azure/storage-blob");
const { BlobCheckpointStore } = require("@azure/eventhubs-checkpointstore-blob");

const storageAccountConnectionString = "";
const containerName = "demo1storagecontainer";
const eventHubConnectionString = "";
const consumerGroup = "$Default";
const eventHubName = "demo1eventhubtest";

async function main() {

try {
    console.log("test");
 const blobContainerClient = new ContainerClient(storageAccountConnectionString, containerName);

  if (!(await blobContainerClient.exists())) {
    await blobContainerClient.create();
  }
  console.log("blobContainerClient test");
  const checkpointStore = new BlobCheckpointStore(blobContainerClient);
  const consumerClient = new EventHubConsumerClient(
    consumerGroup,
    eventHubConnectionString,
    eventHubName,
    checkpointStore
  );
  console.log("checkpointStore test");
  const subscription = consumerClient.subscribe({
    
    processEvents: async (events, context) => {
        console.log("EVent lenght check ", events);
    
        console.log("context lenght check ", context);
        console.log("EVent lenght here ", events.length);
      // event processing code goes here
      if (events.length === 0) {
         console.log("No Events");
        // If the wait time expires (configured via options in maxWaitTimeInSeconds) Event Hubs
        // will pass you an empty array.
        return;
      }

      // Checkpointing will allow your service to pick up from
      // where it left off when restarting.
      //
      // You'll want to balance how often you checkpoint with the
      // performance of your underlying checkpoint store.
      console.log("EVent data ");
      console.log("EVent data here ", events)
      await context.updateCheckpoint(events[events.length - 1]);
    },
    processError: async (err, context) => {
      // handle any errors that occur during the course of
      // this subscription
      console.log(`Errors in subscription to partition ${context.partitionId}: ${err}`);
    }
  });

  console.log(`subscription test`);
  // Wait for a few seconds to receive events before closing
  await new Promise((resolve) => setTimeout(resolve, 10000 * 1000));

  await subscription.close();
  await consumerClient.close();
}
catch (err) {
    console.log(err);
}
 
  console.log(`Exiting sample`);
}

main();