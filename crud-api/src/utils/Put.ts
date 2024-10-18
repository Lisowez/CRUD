import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';
import userModel from '../models/userModel';

const putFunc = (
  pathname: string,
  method: string,
  req: IncomingMessage,
  res: ServerResponse,
  users: userModel[],
) => {
  if (
    pathname?.startsWith('/api/users') &&
    pathname.split('/').length === 4 &&
    method === 'PUT'
  ) {
    const id = pathname.split('/')[3];
    if (!validate(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end('userId is invalid (not uuid)');
    } else {
      if (
        users.filter((x) => {
          return x.id === id;
        }).length === 0
      ) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end('User with this userId not found');
      } else {
        let body = '';
        const userIndex = users.findIndex((user) => user.id === id);
        req.on('data', (chunk) => {
          body += chunk.toString();
        });
        req.on('end', () => {
          const { username, age, hobbies } = JSON.parse(body);
          users[userIndex] = { ...users[userIndex], username, age, hobbies };
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(users[userIndex]));
        });
      }
    }
  }
};

export default putFunc;
