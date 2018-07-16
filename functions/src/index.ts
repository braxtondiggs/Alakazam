'use strict';
import * as functions from 'firebase-functions';
import { BasicCard, Button, DialogflowConversation, Image, List, SimpleResponse } from 'actions-on-google';

const app = dialogflow({ debug: true });

export const fulfillment = functions.https.onRequest(app);
