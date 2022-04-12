import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    if (this._storage != null) {
      return;
    }
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async set(key: string, value: any): Promise<any> {
    return this._storage?.set(key, value);
  }

  async get(key: string): Promise<any> {
    await this.init();
    return await this._storage.get(key);
  }

  // remove one instance
  async remove(key: string): Promise<any> {
    return await this._storage.remove(key);
  }

  //clear all the storage content
  async clear() {
    return await this._storage.clear();
  }
}
