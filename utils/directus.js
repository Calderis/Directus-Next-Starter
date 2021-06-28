import { Directus, MemoryStorage, Auth, AxiosTransport } from "@directus/sdk";
import { randomBytes } from "crypto";

/* global LocalStorage */

const prefix = randomBytes(8).toString("hex");
const isBrowser = typeof LocalStorage !== "undefined";

// Storage adapter where authentication state (token & expiration) is stored.
const storage = isBrowser ? new LocalStorage() : new MemoryStorage(prefix);

// Transport used to communicate with the server.
const transport = new AxiosTransport(process.env.API_URL, storage, async () => {
	await auth.refresh(); // This is how axios checks for refresh
});

// Auth is how authentication is handled, stored, and refreshed.
const auth = new Auth(transport, storage, {
	mode: isBrowser ? 'cookie' : 'json',
});

const directus = new Directus(process.env.API_URL, { auth, storage, transport });

module.exports = { directus };
