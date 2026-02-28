import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export interface FirebaseUserClaims {
    uid: string;
    email: string;
    name?: string;
    picture?: string;
    emailVerified: boolean;
}
export declare class FirebaseService implements OnModuleInit {
    private readonly configService;
    private readonly logger;
    constructor(configService: ConfigService);
    onModuleInit(): void;
    verifyIdToken(idToken: string): Promise<FirebaseUserClaims>;
}
