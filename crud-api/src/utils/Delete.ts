import { ServerResponse } from 'http';
import { validate } from 'uuid';
import userModel from '../models/userModel';

const deleteFunc = (
  pathname: string,
  method: string,
  res: ServerResponse,
  users: userModel[],
) => {
  if (
    pathname?.startsWith('/api/users') &&
    pathname.split('/').length === 4 &&
    method === 'DELETE'
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
        const userIndex = users.findIndex((user) => user.id === id);
        users.splice(userIndex, 1);
        res.writeHead(204, { 'Content-Type': 'application/json' });
        res.end('User with this userId delete');
      }
    }
  }
};

export default deleteFunc;
