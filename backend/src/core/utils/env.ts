import { strict } from "assert";

export class Env {
  static get<T>(key: string, defaultValue: any = null) {
    return (process.env[key] || defaultValue) as T;
  }

  static get_cb<T>(key: string, callback: (value?: string) => T) {
    const value = process.env[key];
    return callback(value);
  }

  static getOrThrow<T>(key: string) {
    const value = this.get<T>(key);
    if (value) strict.ok(key, `The ${key} environment variable is required`);
    return value;
  }
}
