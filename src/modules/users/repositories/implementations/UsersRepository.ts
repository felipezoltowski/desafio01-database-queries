import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM
    const user = this.repository
          .createQueryBuilder('users')
          .leftJoinAndSelect(
            'users.games',
            'games',
          )
          .where('id = :id',{ id: user_id})
          .getOneOrFail();
    return user    
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query("Select * FROM users ORDER by users.firstname"); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query(`Select * From users WHERE first_name = ${first_name} and last_name = ${last_name}` ); // Complete usando raw query
  }
}
