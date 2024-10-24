import { ServerResponse } from 'http';
import { v4, validate } from 'uuid';
import userModel from '../models/userModel';

const getFunc = (
  pathname: string,
  method: string,
  res: ServerResponse,
  users: userModel[],
): void => {
  if (pathname === '/api/users' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } else if (
    pathname?.startsWith('/api/users') &&
    pathname.split('/').length === 4 &&
    method === 'GET'
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
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify(
            users.filter((x) => {
              return (x.id = id);
            })[0],
          ),
        );
      }
    }
  }
};

export default getFunc;
