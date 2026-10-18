import * as migration_20260921_120330 from './20260921_120330';
import * as migration_20261018_205114 from './20261018_205114';

export const migrations = [
  {
    up: migration_20260921_120330.up,
    down: migration_20260921_120330.down,
    name: '20260921_120330',
  },
  {
    up: migration_20261018_205114.up,
    down: migration_20261018_205114.down,
    name: '20261018_205114',
  },
];

