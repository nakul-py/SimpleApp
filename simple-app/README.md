# SimpleApp

#  Create React projects with Vite and Tailwindcss

```
npm create vite@latest
```
### Follow these Steps to install react with vite:

- Enter your project name like: react-Vite

- Package name same as project name

- Select a framework by pressing down arrow key

- Select a Language variant

- Go into your project folder
```
cd react-Vite
```
- Run these commands in terminal
```
npm i 
```
**OR** 
```
npm install
```

### Follow these steps to install tailwindcss:
- Run these commands in terminal
```
npm install -D tailwindcss@3 postcss autoprefixer
```
```
npx tailwindcss init -p
```

#### Now check your project folder it contains `tailwind.config.js` file.
- Add these code stuff in content

 #### ` tailwind.config.js`
```
content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
```

#### Now Add the Tailwind directives to your Css files

- Add these tailwind imports in your all Css files 

#### `index.css`
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### `App.css`
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```



## Install essential dependicies

Install Redux JS toolkit (RTK)
```
npm i @reduxjs/toolkit
```

Install Redux

```
npm i react-redux
```

Install Router Dom

```
npm i react-router-dom
```

Install html parser

```
npm i html-react-parser
```

Install Appwrite

```
npm i appwrite
```

Install tinymce

```
npm i @tinymce/tinymce-react
```

Install react hook
```
npm i react-hook-form
```

## Now Run your Project

```
npm run dev
```
