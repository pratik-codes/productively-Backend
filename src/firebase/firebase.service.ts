import { Injectable, Logger } from '@nestjs/common';
import { ServiceAccount } from 'firebase-admin';
import admin = require('firebase-admin');

@Injectable()
export class FirebaseService {
  private readonly logger = new Logger(FirebaseService.name);
  private db: FirebaseFirestore.Firestore;

  constructor() {
    this.initializeFirebase();
  }

  //Initialize Firebase App
  initializeFirebase(): void {
    if (!this.db) {
      const ServiceAccountCreds: ServiceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      };

      admin.initializeApp({
        credential: admin.credential.cert(ServiceAccountCreds),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      });

      this.db = admin.firestore();
      this.logger.log('Firebase Initialized');
    }
  }
}
