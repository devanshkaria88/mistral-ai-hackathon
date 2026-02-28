import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  PersonaResponseDto,
  PersonaMessageResponseDto,
} from './dto';

@Injectable()
export class PersonaService {
  private readonly logger = new Logger(PersonaService.name);

  async askPersona(
    familyUserId: string,
    elderlyUserId: string,
    question: string,
  ): Promise<PersonaResponseDto> {
    this.logger.log(`Persona query from ${familyUserId} about ${elderlyUserId}: ${question}`);
    
    // Mock response - Margaret's persona responding
    return {
      response: "Oh, our wedding day! It was June 15th, 1964. Arthur was so nervous he nearly forgot the ring - can you imagine? His best man, Tommy, had to remind him three times to check his pocket. The church was St. Mary's on the hill, where my parents had married too. I wore my mother's dress, altered to fit me. Arthur cried when he saw me walking down the aisle, though he'd never admit it now. We had the reception at the village hall - nothing fancy, but everyone we loved was there. We danced until midnight, and Arthur stepped on my toes at least a dozen times, but I didn't mind one bit.",
      audioUrl: 'https://storage.example.com/tts/persona_response_1.mp3',
      sourceStories: [
        {
          id: uuidv4(),
          title: 'Our Wedding Day',
          content: "June 15th, 1964 was the happiest day of my life...",
          timePeriod: '1964',
          emotionalTone: 'joyful',
          userId: elderlyUserId,
          createdAt: new Date('2026-02-25T10:00:00Z'),
          people: [
            { id: uuidv4(), name: 'Arthur', relationship: 'husband' },
            { id: uuidv4(), name: 'Tommy', relationship: 'best man' },
          ],
          places: [
            { id: uuidv4(), name: "St. Mary's Church", description: 'Parish church on the hill' },
          ],
          themes: [
            { id: uuidv4(), name: 'Love', slug: 'love' },
            { id: uuidv4(), name: 'Family', slug: 'family' },
          ],
        },
      ],
    };
  }

  async getHistory(
    familyUserId: string,
    elderlyUserId: string,
  ): Promise<PersonaMessageResponseDto[]> {
    this.logger.log(`Fetching persona history for family user ${familyUserId} about ${elderlyUserId}`);
    
    return [
      {
        id: uuidv4(),
        question: 'What was your wedding day like?',
        response: "Oh, our wedding day! It was June 15th, 1964...",
        responseAudioUrl: 'https://storage.example.com/tts/persona_response_1.mp3',
        sourceStoryIds: [uuidv4()],
        createdAt: new Date('2026-02-28T10:00:00Z'),
      },
      {
        id: uuidv4(),
        question: 'Tell me about when Sarah was born',
        response: "Sarah came into the world on a beautiful spring morning in 1968...",
        responseAudioUrl: 'https://storage.example.com/tts/persona_response_2.mp3',
        sourceStoryIds: [uuidv4()],
        createdAt: new Date('2026-02-27T14:00:00Z'),
      },
    ];
  }
}
