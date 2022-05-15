import { Test, TestingModule } from '@nestjs/testing';
import { ChatRoomResolver } from './chat-room.resolver';

describe('ChatRoomResolver', () => {
  let resolver: ChatRoomResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatRoomResolver],
    }).compile();

    resolver = module.get<ChatRoomResolver>(ChatRoomResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
