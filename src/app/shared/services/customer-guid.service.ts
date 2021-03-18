import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';

@Injectable()
export class CustomerGuidService {
  private readonly cookieName: string;

  public constructor() {
    this.cookieName = 'customerGuid';
  }

  public getCustomerGuid(): string {
    if (!this.cookieExists()) {
      this.writeCookie();
    }

    return this.readCookie();
  }

  private cookieExists(): boolean {
    const matches = document.cookie.match(new RegExp(
      "(?:^|; )" + this.cookieName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches !== null;
  }

  private readCookie(): string {
    const matches = document.cookie.match(new RegExp(
      "(?:^|; )" + this.cookieName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return decodeURIComponent(matches[1]);
  }

  private writeCookie(): void {
    document.cookie = `${this.cookieName}=${Guid.create()}`;
  }
}