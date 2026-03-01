import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';
import { Readable } from 'stream';

export interface UploadResult {
  key: string;
  bucket: string;
  url: string;
}

export interface PresignedUrlResult {
  url: string;
  expiresAt: Date;
}

@Injectable()
export class S3Service {
  private readonly logger = new Logger(S3Service.name);
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly region: string;

  constructor(private readonly configService: ConfigService) {
    this.region = this.configService.get<string>('aws.region') || 'us-east-1';
    this.bucketName = this.configService.get<string>('aws.s3BucketName') || 'resurrect-ai-audio';

    const accessKeyId = this.configService.get<string>('aws.accessKeyId');
    const secretAccessKey = this.configService.get<string>('aws.secretAccessKey');
    const sessionToken = this.configService.get<string>('aws.sessionToken');

    this.s3Client = new S3Client({
      region: this.region,
      credentials: accessKeyId && secretAccessKey
        ? {
            accessKeyId,
            secretAccessKey,
            sessionToken,
          }
        : undefined,
    });

    this.logger.log(`S3 Service initialized with bucket: ${this.bucketName}`);
  }

  async uploadAudio(
    audioBuffer: Buffer,
    conversationId: string,
    contentType: string = 'audio/mpeg',
    audioType: 'full' | 'user' | 'agent' = 'full',
  ): Promise<UploadResult> {
    const key = `conversations/${conversationId}/${audioType}-audio-${uuidv4()}.mp3`;
    const bufferSize = audioBuffer.length;

    this.logger.log(`Uploading ${audioType} audio to S3: ${key} (${(bufferSize / 1024 / 1024).toFixed(2)} MB)`);

    // Use multipart upload for large files (> 5MB) for efficiency
    if (bufferSize > 5 * 1024 * 1024) {
      return this.uploadLargeAudio(audioBuffer, key, conversationId, contentType, audioType);
    }

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: audioBuffer,
      ContentType: contentType,
      Metadata: {
        conversationId,
        audioType,
        uploadedAt: new Date().toISOString(),
      },
    });

    await this.s3Client.send(command);

    this.logger.log(`Audio uploaded successfully: ${key}`);

    return {
      key,
      bucket: this.bucketName,
      url: `s3://${this.bucketName}/${key}`,
    };
  }

  private async uploadLargeAudio(
    audioBuffer: Buffer,
    key: string,
    conversationId: string,
    contentType: string,
    audioType: string,
  ): Promise<UploadResult> {
    this.logger.log(`Using multipart upload for large audio file: ${key}`);

    // Convert buffer to readable stream for efficient memory usage
    const stream = Readable.from(audioBuffer);

    const upload = new Upload({
      client: this.s3Client,
      params: {
        Bucket: this.bucketName,
        Key: key,
        Body: stream,
        ContentType: contentType,
        Metadata: {
          conversationId,
          audioType,
          uploadedAt: new Date().toISOString(),
        },
      },
      // Configure multipart upload
      queueSize: 4, // Concurrent upload parts
      partSize: 5 * 1024 * 1024, // 5MB per part (minimum for S3)
      leavePartsOnError: false,
    });

    // Track upload progress
    upload.on('httpUploadProgress', (progress) => {
      const percent = progress.loaded && progress.total 
        ? ((progress.loaded / progress.total) * 100).toFixed(1)
        : 'unknown';
      this.logger.debug(`Upload progress for ${key}: ${percent}%`);
    });

    await upload.done();

    this.logger.log(`Large audio uploaded successfully: ${key}`);

    return {
      key,
      bucket: this.bucketName,
      url: `s3://${this.bucketName}/${key}`,
    };
  }

  async uploadTranscript(
    transcript: string,
    conversationId: string,
  ): Promise<UploadResult> {
    const key = `conversations/${conversationId}/transcript-${uuidv4()}.json`;

    this.logger.log(`Uploading transcript to S3: ${key}`);

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: JSON.stringify({ transcript, conversationId, createdAt: new Date().toISOString() }),
      ContentType: 'application/json',
      Metadata: {
        conversationId,
        uploadedAt: new Date().toISOString(),
      },
    });

    await this.s3Client.send(command);

    this.logger.log(`Transcript uploaded successfully: ${key}`);

    return {
      key,
      bucket: this.bucketName,
      url: `s3://${this.bucketName}/${key}`,
    };
  }

  async getPresignedDownloadUrl(
    key: string,
    expiresInSeconds: number = 3600,
  ): Promise<PresignedUrlResult> {
    this.logger.debug(`Generating presigned download URL for: ${key}`);

    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    const url = await getSignedUrl(this.s3Client, command, {
      expiresIn: expiresInSeconds,
    });

    const expiresAt = new Date(Date.now() + expiresInSeconds * 1000);

    return { url, expiresAt };
  }

  async getPresignedUploadUrl(
    key: string,
    contentType: string = 'audio/mpeg',
    expiresInSeconds: number = 3600,
  ): Promise<PresignedUrlResult> {
    this.logger.debug(`Generating presigned upload URL for: ${key}`);

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      ContentType: contentType,
    });

    const url = await getSignedUrl(this.s3Client, command, {
      expiresIn: expiresInSeconds,
    });

    const expiresAt = new Date(Date.now() + expiresInSeconds * 1000);

    return { url, expiresAt };
  }

  generateAudioKey(conversationId: string): string {
    return `conversations/${conversationId}/audio-${uuidv4()}.mp3`;
  }

  generateTranscriptKey(conversationId: string): string {
    return `conversations/${conversationId}/transcript-${uuidv4()}.json`;
  }

  async deleteObject(key: string): Promise<void> {
    this.logger.log(`Deleting object from S3: ${key}`);

    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    await this.s3Client.send(command);

    this.logger.log(`Object deleted successfully: ${key}`);
  }

  async downloadAudioFromUrl(url: string): Promise<Buffer> {
    this.logger.log(`Downloading audio from URL: ${url}`);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to download audio: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  async downloadFile(key: string): Promise<Buffer> {
    this.logger.log(`Downloading file from S3: ${key}`);

    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    const response = await this.s3Client.send(command);
    
    if (!response.Body) {
      throw new Error(`No body in S3 response for key: ${key}`);
    }

    // Convert stream to buffer
    const chunks: Uint8Array[] = [];
    for await (const chunk of response.Body as AsyncIterable<Uint8Array>) {
      chunks.push(chunk);
    }
    
    return Buffer.concat(chunks);
  }
}
