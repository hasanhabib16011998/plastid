import * as migration_20260921_120330 from './20260921_120330';

export const migrations = [
  {
    up: migration_20260921_120330.up,
    down: migration_20260921_120330.down,
    name: '20260921_120330'
  },
];
