# Angular

- Angular Docs - <https://angular.io>

- Angular Material Docs - <https://material.angular.io>

- Material Extensions (open source library supported by community developer) - <https://ng-matero.github.io/extensions/components/categories>

- Tailwind CSS - <https://tailwindcss.com>

- Moment JS - <https://momentjs.com>

## Basic Packages

```bash
ng add @angular/material

ng add @angular/pwa

yarn add tailwindcss postcss autoprefixer

yarn add @angular/material-moment-adapter

yarn add @ng-matero/extensions @ng-matero/extensions-moment-adapter

yarn add moment

yarn add xlsx

yarn add countrycitystatejson

yarn add libphonenumber-js

yarn add ngx-mat-intl-tel-input


```

## @angular/material Installation

- Choose a prebuilt theme name, or "custom" for a custom theme: Select Custom

- Set up global Angular Material typography styles?: Yes

- Set up browser animations for Angular Material?: Yes

## Tailwind CSS Installation

- <https://tailwindcss.com/docs/guides/angular>

## Note

- Progress spinner and progress bar loader are in the services folder.

- for the date time picker component used @ng-matero package which styles are added in the src/styles/themes folder.

- application and component styles folder is maintained inside the src folder.

- in angular.json file add the stylePreprocessorOptions for the easy way of importing the style sheets.

```json
"stylePreprocessorOptions":
 {
   "includePaths": ["src/styles"]
 },
```

- for the dark mode option lazy load the dark.scss file, angular .json file under the styles array

```json
{
  "input": "src/styles/themes/dark.scss",
  "bundleName": "dark-theme",
  "inject": false
}
```

## CLI Commands

### npm

```bash
1) Install dependencies	- npm install
2) Install package - npm install [package]
3) Install dev package - npm install --save-dev [package]
4) Uninstall package - npm uninstall [package]
5) Uninstall dev package - npm uninstall --save-dev [package]
6) Update - npm update
7) Update Package - npm update [package]
8)Global install package - npm install --global [package]
9)Global uninstall package - npm uninstall --global [package]

npm init
npm run
npm test
npm login (and logout)
npm link
npm publish
npm cache clean
```

### yarn

```bash
1) Install dependencies	- yarn
2) Install package - yarn add [package]
3) Install dev package - yarn add --dev [package]
4) Uninstall package - yarn remove [package]
5) Uninstall dev package - yarn remove [package]
6) Update - yarn upgrade
7) Update Package - yarn upgrade [package]
8)Global install package - yarn upgrade [package]
9)Global uninstall package - yarn global remove [package]

yarn init
yarn run
yarn test
yarn login (and logout)
yarn link
yarn publish
yarn cache clean
```

## Package.json

- dev_dependencies are modules which are only required during development,

- while dependencies are modules which are also required at runtime.


## Resource links

1) Angular Material Theming 
- <https://indepth.dev/tutorials/angular/angular-material-theming-system-complete-guide>

- <https://material.angular.io/guide/theming>

2) Country City State

- <https://github.com/khkwan0/countryCityStateJson>

3) Country code phone number input 

- <https://github.com/tanansatpal/ngx-mat-intl-tel-input>
