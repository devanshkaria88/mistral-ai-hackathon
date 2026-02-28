import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '../src/app.module';

describe('Swagger Documentation Completeness (e2e)', () => {
  let app: INestApplication;
  let swaggerDocument: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

    const config = new DocumentBuilder()
      .setTitle('MemoryVault API')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    swaggerDocument = SwaggerModule.createDocument(app, config);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('API Paths', () => {
    it('should have auth endpoints', () => {
      expect(swaggerDocument.paths['/api/auth/google']).toBeDefined();
      expect(swaggerDocument.paths['/api/auth/refresh']).toBeDefined();
      expect(swaggerDocument.paths['/api/auth/me']).toBeDefined();
    });

    it('should have conversations endpoints', () => {
      expect(swaggerDocument.paths['/api/conversations']).toBeDefined();
      expect(swaggerDocument.paths['/api/conversations/{id}']).toBeDefined();
      expect(swaggerDocument.paths['/api/conversations/{id}/end']).toBeDefined();
    });

    it('should have stories endpoints', () => {
      expect(swaggerDocument.paths['/api/stories']).toBeDefined();
      expect(swaggerDocument.paths['/api/stories/search']).toBeDefined();
      expect(swaggerDocument.paths['/api/stories/timeline']).toBeDefined();
      expect(swaggerDocument.paths['/api/stories/themes']).toBeDefined();
      expect(swaggerDocument.paths['/api/stories/{id}']).toBeDefined();
      expect(swaggerDocument.paths['/api/stories/{id}/bookmark']).toBeDefined();
    });

    it('should have persona endpoints', () => {
      expect(swaggerDocument.paths['/api/persona/ask']).toBeDefined();
      expect(swaggerDocument.paths['/api/persona/history']).toBeDefined();
    });

    it('should have family endpoints', () => {
      expect(swaggerDocument.paths['/api/family/invite']).toBeDefined();
      expect(swaggerDocument.paths['/api/family/vault/{elderlyUserId}']).toBeDefined();
    });

    it('should have voice endpoints', () => {
      expect(swaggerDocument.paths['/api/voice/profile']).toBeDefined();
      expect(swaggerDocument.paths['/api/voice/update-clone']).toBeDefined();
    });
  });

  describe('Endpoint Documentation', () => {
    it('all endpoints should have summaries', () => {
      const paths = Object.keys(swaggerDocument.paths);
      const missingDescriptions: string[] = [];

      paths.forEach((path) => {
        const methods = Object.keys(swaggerDocument.paths[path]);
        methods.forEach((method) => {
          const operation = swaggerDocument.paths[path][method];
          if (!operation.summary) {
            missingDescriptions.push(`${method.toUpperCase()} ${path}`);
          }
        });
      });

      if (missingDescriptions.length > 0) {
        console.warn('Endpoints missing summaries:', missingDescriptions);
      }
      expect(missingDescriptions.length).toBe(0);
    });

    it('all endpoints should have response definitions', () => {
      const paths = Object.keys(swaggerDocument.paths);
      const missingResponses: string[] = [];

      paths.forEach((path) => {
        const methods = Object.keys(swaggerDocument.paths[path]);
        methods.forEach((method) => {
          const operation = swaggerDocument.paths[path][method];
          if (!operation.responses || Object.keys(operation.responses).length === 0) {
            missingResponses.push(`${method.toUpperCase()} ${path}`);
          }
        });
      });

      if (missingResponses.length > 0) {
        console.warn('Endpoints missing responses:', missingResponses);
      }
      expect(missingResponses.length).toBe(0);
    });

    it('protected endpoints should have bearer auth', () => {
      const protectedPaths = [
        '/api/conversations',
        '/api/stories',
        '/api/persona/ask',
        '/api/family/invite',
        '/api/voice/profile',
      ];

      protectedPaths.forEach((path) => {
        if (swaggerDocument.paths[path]) {
          const methods = Object.keys(swaggerDocument.paths[path]);
          methods.forEach((method) => {
            const operation = swaggerDocument.paths[path][method];
            const hasBearerAuth = operation.security?.some(
              (sec: any) => sec.bearer !== undefined,
            );
            expect(hasBearerAuth).toBeTruthy();
          });
        }
      });
    });
  });

  describe('Schema Definitions', () => {
    it('should have user response schema', () => {
      expect(swaggerDocument.components?.schemas?.UserResponseDto).toBeDefined();
    });

    it('should have auth response schema', () => {
      expect(swaggerDocument.components?.schemas?.AuthResponseDto).toBeDefined();
    });

    it('should have story response schema', () => {
      expect(swaggerDocument.components?.schemas?.StoryResponseDto).toBeDefined();
    });

    it('should have conversation response schema', () => {
      expect(swaggerDocument.components?.schemas?.ConversationResponseDto).toBeDefined();
    });

    it('should have error response schema', () => {
      expect(swaggerDocument.components?.schemas?.ErrorResponseDto).toBeDefined();
    });
  });
});
