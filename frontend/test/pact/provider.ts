import path from 'path';
import { Pact } from '@pact-foundation/pact';

const provider = new Pact({
  consumer: 'Consumer',
  provider: 'Provider',
  port: 8000,
  host: '127.0.0.1',
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: 'info',
});

export default provider;
