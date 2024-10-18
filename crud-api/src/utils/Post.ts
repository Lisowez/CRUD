import { IncomingMessage, ServerResponse } from 'http';
import { v4 } from 'uuid';
import userModel from '../models/userModel';
const postFunc = (
  pathname: string,
  method: string,
  req: IncomingMessage,
  res: ServerResponse,
  users: userModel[],
): void => {
  if (pathname === '/api/users' && method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const { username, age, hobbies } = JSON.parse(body);
        if (
          !username ||
          typeof age !== 'number' ||
          !Array.isArray(hobbies) ||
          hobbies.some((x) => typeof x !== 'string')
        ) {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Missing required fields');
        } else {
          const user: userModel = {
            username,
            age,
            hobbies,
            id: v4(),
          };
          res.writeHead(201, { 'Content-Type': 'text/plain' });
          res.end(JSON.stringify(user));
          users.push(user);
        }
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Missing required fields');
      }
    });
  }
};

export default postFunc;
