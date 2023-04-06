import { beforeAll, afterAll, afterEach, beforeEach } from '@jest/globals';

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

beforeEach(async () => {
  await provider.removeInteractions();
});
