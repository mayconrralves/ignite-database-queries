import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return await this.repository.createQueryBuilder('games')
      .where("lower(games.title) like :param", {param: `%${param.toLowerCase()}%`}).getMany()
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query(" SELECT COUNT(*) from games"); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const game = await 
    this.repository.createQueryBuilder("game")
    .innerJoinAndSelect('game.users', 'users')
    .where("game.id = :id", { id })
    .getOne()
      // Complete usando query builder this.repository.createQueryBuilder('')
      const { users }: any = game;
      return users
  }
}
