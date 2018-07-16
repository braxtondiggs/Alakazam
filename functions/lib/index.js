'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const app = dialogflow({ debug: true });
exports.fulfillment = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map