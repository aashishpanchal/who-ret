import * as uuid from 'uuid';

export function uuid4() {
  const buffer = Buffer.alloc(16);
  uuid.v4({}, buffer);
  return buffer.toString('hex');
}
