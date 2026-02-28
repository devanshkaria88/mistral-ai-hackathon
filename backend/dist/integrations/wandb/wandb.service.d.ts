import { ConfigService } from '@nestjs/config';
export declare class WandbService {
    private readonly configService;
    private readonly logger;
    constructor(configService: ConfigService);
    traceExtraction(input: Record<string, unknown>, output: Record<string, unknown>): Promise<void>;
    tracePersona(input: Record<string, unknown>, output: Record<string, unknown>): Promise<void>;
}
