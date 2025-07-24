import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WsValuesService {
  private latestValues: any = {};

  update(data: any): void {
    this.latestValues = data;
  }

  getValues(): any {
    return this.latestValues;
  }
}
