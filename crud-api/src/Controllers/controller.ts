import { IncomingMessage, ServerResponse } from 'http';
import { v4 } from 'uuid';
import users from '../database/database';
import { parse } from 'url';
import getFunc from '../utils/Get';

import userModel from '../models/userModel';
import postFunc from '../utils/Post';

const controller = (req: IncomingMessage, res: ServerResponse) => {
  const parsedUrl = parse(req.url || '', true);
  const method = req.method;
  const { pathname } = parsedUrl;
  getFunc(pathname!, method!, res, users);
  postFunc(pathname!, method!, req, res, users);
};

export default controller;
