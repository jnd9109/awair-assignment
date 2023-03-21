import { beforeAll, afterAll, afterEach } from '@jest/globals';

import provider from './provider';

beforeAll(async () => {
  await provider.setup();
});

afterAll(async () => {
  await provider.finalize();
});

afterEach(async () => {
  await provider.verify();
});
