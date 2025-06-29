
import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client();

// Add your Appwrite credentials here
// You can get these from your Appwrite console
client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
  .setProject('your-project-id'); // Your Appwrite Project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export { client };
