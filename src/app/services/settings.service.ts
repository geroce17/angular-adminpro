import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private srcTheme = document.querySelector("#theme");

  constructor() {
    const themeUrl = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.srcTheme.setAttribute('href', themeUrl);
  }

  public changeTheme(themeName: string) {
    const url = `./assets/css/colors/${themeName}.css`;
    this.srcTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);

    this.checkCurrentTheme();
  }

  checkCurrentTheme() {

    const links = document.querySelectorAll('.selector');

    links.forEach(element => {
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnURLTheme = `./assets/css/colors/${btnTheme}.css`;

      const currentTheme = this.srcTheme.getAttribute('href');

      if (btnURLTheme === currentTheme) {
        element.classList.add('working');
      }
    });
  }
}
