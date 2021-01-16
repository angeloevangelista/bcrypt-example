import bcrypt from 'bcrypt';

class UserRepository {
  #users;

  constructor() {
    this.#users = [];
  }

  create(userData) {
    const emailAlreadyUsed = !!this.findByEmail(userData.email);

    if (emailAlreadyUsed) return null;

    const countOfRounds = 8;
    const hashedPassword = bcrypt.hashSync(userData.password, countOfRounds);

    const user = {
      email: userData.email,
      password: hashedPassword,
    };

    this.#users.push(user);

    return user;
  }

  findByEmail(email) {
    return this.#users.find((user) => user.email === email);
  }

  list() {
    return this.#users;
  }
}

export default UserRepository;
