import { Router } from 'express';
import bcrypt from 'bcrypt';

import UserRepository from './UserRepository';

const routes = Router();
const userRepository = new UserRepository();

// Auth

routes.post('/auth', (request, response) => {
  const { email, password } = request.body;

  const user = userRepository.findByEmail(email);

  if (!user)
    return response.status(400).json({
      message: 'User not found.',
    });

  const passwordsMatch = bcrypt.compareSync(password, user.password);

  return response.json({
    success: passwordsMatch,
  });
});

// Users

routes.post('/users', (request, response) => {
  const userData = request.body;

  const user = userRepository.create(userData);

  if (!user)
    return response.status(400).json({
      message: 'User not created.',
    });

  return response.json(user);
});

routes.get('/users', (request, response) => {
  const users = userRepository.list();

  return response.json(users);
});

routes.get('/users/:email', (request, response) => {
  const { email } = request.params;

  const user = userRepository.findByEmail(email);

  return response.json(user);
});

export default routes;
