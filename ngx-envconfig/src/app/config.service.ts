import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private _config: Record<string, any> = {};
  private _env = '';

  constructor(private _http: HttpClient) {}

  load(env: { state: string }): Promise<boolean> {
    this._env = env.state;
    return this._http
      .get<Record<string, any>>(`./assets/config/${this._env}.json`)
      .toPromise()
      .then(data => { this._config = data ?? {}; return true; })
      .catch(() => { this._config = {}; return true; });
  }

  get(key: string): any {
    return this._config[key];
  }

  getEnv(): string {
    return this._env;
  }

  isDevMode(): boolean {
    return this._env === 'development';
  }
}
