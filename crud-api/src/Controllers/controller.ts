import { IncomingMessage, ServerResponse } from 'http';
import { v4, validate } from 'uuid';
import users from '../database/database';
import { parse } from 'url';
import getFunc from '../utils/Get';

import userModel from '../models/userModel';
import postFunc from '../utils/Post';
import putFunc from '../utils/Put';
import deleteFunc from '../utils/Delete';
import is404 from '../utils/404';

const controller = (req: IncomingMessage, res: ServerResponse) => {
  const parsedUrl = parse(req.url || '', true);
  const method = req.method;
  const { pathname } = parsedUrl;
  try {
    if (is404(pathname!, method!)) {
      getFunc(pathname!, method!, res, users);
      postFunc(pathname!, method!, req, res, users);
      putFunc(pathname!, method!, req, res, users);
      deleteFunc(pathname!, method!, res, users);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end('Endpoint not found');
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end('Internal Server Error');
  }
};

export default controller;
