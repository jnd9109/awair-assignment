import { describe, it, expect } from '@jest/globals';
import store from '../store';
import { initialState } from '../reducers/user';

describe('User store tests', () => {
  it('initializes the store', async () => {
    expect(store.getState().users).toEqual(initialState);
  });
});
