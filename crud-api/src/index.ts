import 'dotenv/config';
import { createServer } from 'http';
import controller from './Controllers/controller';

const PORT = process.env.PORT;

const server = createServer(controller);

server.listen(PORT, () => console.log('СЕРВЕР ПУЩЕН'));
