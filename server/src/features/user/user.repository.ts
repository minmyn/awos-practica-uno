import type { UserEntity } from './entities/user.entity.js';
import type { RegisterRequestDto } from '../auth/dtos/register.request.js';

export class UserRepository {

  private static users: UserEntity[] = [
    {
      id: '00000000-0000-0000-0000-000000000000',
      fullName: 'Administrador del Sistema',
      username: 'admin',
      email: 'admin@tienda.com',
      password: 'hashed_123'
    },

    ...Array.from({ length: 15 }, (_, index) => {
      const idNum = index + 1;
      return {
        id: crypto.randomUUID(),
        fullName: `Cliente de Prueba N°${idNum}`,
        username: `user_${idNum}`,
        email: `cliente${idNum}@abarrotes.com`,
        password: `hashed_pass${idNum}`
      };
    })
  ];

  async findAll(): Promise<UserEntity[]> {
    return UserRepository.users;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = UserRepository.users.find(u => u.id === id);
    return user || null;
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    const user = UserRepository.users.find(u => u.username.toLowerCase() === username.toLowerCase());
    return user || null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = UserRepository.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    return user || null;
  }

  async create(dto: RegisterRequestDto): Promise<UserEntity> {
    const newUser: UserEntity = {
      id: crypto.randomUUID(),
      fullName: dto.name,
      username: dto.username,
      email: dto.email,
      password: `hashed_${dto.password}`
    };
    UserRepository.users.push(newUser);
    return newUser;
  }
}