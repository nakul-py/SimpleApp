# SimpleApp

## Create React projects with Vite and Tailwindcss

## Install Vite

- Run these commands in terminal

``` bash
npm create vite@latest
```

### Follow these Steps to install react with vite

- Enter your project name like: react-Vite

- Package name same as project name

- Select a framework by pressing down arrow key

- Select a Language variant

- Go into your project folder

``` basg
cd react-Vite
```

- Run these commands in terminal

``` bash
npm i 
```

OR

``` bash
npm install
```

### Follow these steps to install tailwindcss

- Run these commands in terminal

``` bash
npm install -D tailwindcss@3 postcss autoprefixer
```

``` bash
npx tailwindcss init -p
```

#### Now check your project folder it contains `tailwind.config.js` file

- Add these code stuff in content

#### `tailwind.config.js`

``` js
content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
```

#### Now Add the Tailwind directives to your Css files

- Add these tailwind imports in your all Css files

#### `index.css`

``` css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### `App.css`

``` css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Install essential dependicies

Install Redux JS toolkit (RTK)

``` bash
npm i @reduxjs/toolkit
```

Install Redux

``` bash
npm i react-redux
```

Install Router Dom

``` bash
npm i react-router-dom
```

Install html parser

``` bash
npm i html-react-parser
```

Install Appwrite

``` bash
npm i appwrite
```

Install tinymce

``` bash
npm i @tinymce/tinymce-react
```

Install react hook

``` bash
npm i react-hook-form
```

## Now Run your Project

``` bash
npm run dev
```

 You Can Try this App on [https://localhost:5173](https://simple-app-5q31-git-main-nakul-vermas-projects-afed9051.vercel.app)
