# React + TypeScript + Vite

https://github.com/Stas9909/nested_tables_app

nested_tables_app is a project that is written with React + TypeScript
This project was bootstrapped with [npm init vite@latest]

What has been implemented:

the following pages are implemented: accountsPage, CampaignsPage, ProfilePage.
In public/tables-data.json I store data simulating backend where I make the request;
product display with pagination with react-paginate library, data sorting and data filtering by year, by marketplace and by cost;
to work with state I implemented Zustand;
routing is also configured;
The front-end is built using the following technologies:

React

Typescript

React Router Dom

Zustand

React-paginate

Installation and launch project

Clone the repository:
Copy code: https://github.com/Stas9909/nested_tables_app

Install dependencies: npm install

Run the application for development: npm run dev

For production: npm start


Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


