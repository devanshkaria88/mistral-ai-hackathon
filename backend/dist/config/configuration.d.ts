declare const _default: () => {
    port: number;
    nodeEnv: string;
    database: {
        url: string | undefined;
        host: string;
        port: number;
        username: string;
        password: string;
        name: string;
    };
    jwt: {
        secret: string | undefined;
        expiry: string;
        refreshExpiry: string;
    };
    firebase: {
        projectId: string | undefined;
        privateKey: string | undefined;
        clientEmail: string | undefined;
    };
    aws: {
        region: string | undefined;
        accessKeyId: string | undefined;
        secretAccessKey: string | undefined;
        sessionToken: string | undefined;
    };
    elevenlabs: {
        apiKey: string | undefined;
        companionAgentId: string | undefined;
        personaAgentId: string | undefined;
        companionVoiceId: string;
    };
    wandb: {
        apiKey: string | undefined;
        project: string | undefined;
    };
    mistral: {
        apiKey: string | undefined;
    };
};
export default _default;
