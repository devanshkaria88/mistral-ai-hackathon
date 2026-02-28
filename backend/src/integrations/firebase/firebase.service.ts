import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

export interface FirebaseUserClaims {
  uid: string;
  email: string;
  name?: string;
  picture?: string;
  emailVerified: boolean;
}

@Injectable()
export class FirebaseService implements OnModuleInit {
  private readonly logger = new Logger(FirebaseService.name);

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: this.configService.get<string>('firebase.projectId'),
          privateKey: this.configService.get<string>('firebase.privateKey'),
          clientEmail: this.configService.get<string>('firebase.clientEmail'),
        }),
      });
      this.logger.log('Firebase Admin SDK initialized');
    }
  }

  async verifyIdToken(idToken: string): Promise<FirebaseUserClaims> {
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      
      return {
        uid: decodedToken.uid,
        email: decodedToken.email || '',
        name: decodedToken.name,
        picture: decodedToken.picture,
        emailVerified: decodedToken.email_verified || false,
      };
    } catch (error) {
      this.logger.error('Failed to verify Firebase ID token', error);
      throw error;
    }
  }
}
