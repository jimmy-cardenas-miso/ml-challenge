# Challenge Mercado Libre - Frontend

<b>Project created with npm and Vite.</b>

Link of <a href="https://ml-challenge-c9f9c.firebaseapp.com/" target="_blank"><b>DEMO</b></a>

## List Pages

- 🔥 Home
- 🔥 Item List
- 🔥 Item Detail

## Specs

- 📡 Vite
- 📡 Firebase
- 📡 Express
- 📡 Redux
- 📡 Lazy loading
- 📡 Micro-frontend
- 📡 Lerna

## 🚀 Getting Started

### Frontend

```sh
   cd frontend
   npm install
```
### Backend

```sh
   cd backend
   npm install
```

## ✨ Run project

### Frontend

```sh
   cd frontend
   npm run dev
```
```sh
  open url: http://localhost:5173/
```


### Backend

```sh
   cd backend
   npm run start:app
```
```sh
  open url: http://localhost:8080/
```

## 🔍Run linters
```sh
   cd frontend
   npm run lint
```

## 📝 Run test
```sh
   cd frontend
   npm run test
```

### Coverage

```sh
   cd frontend
   npm run coverage
```


## 🧬 Micro-frontend
Another solution is implemented for the frontend project using multi-package monorepo with React, Lerna and Single-SPA. This solution is located in the root folder and the micro-frontends in the `/packages` folder 

### Structure
<img width="1329" alt="Captura de pantalla 2023-04-28 a la(s) 1 00 11 p m" src="https://user-images.githubusercontent.com/78035057/235220380-771b8553-6092-418b-9f18-6c5b2f9c4f23.png">

### List MFs

- 🔥 Header
- 🔥 Items
- 🔥 Detail

### Install dependencies

```sh
   npm install
```

### ✨ Run project

```sh
   npm run start
```
```sh
  open url: http://localhost:9000/
```

### 📝  Run tests
Within each folder you can run the unit tests and the coverage
```sh
   cd packages/header
   npm run test
   npm run coverage
```
```sh
   cd packages/items
   npm run test
   npm run coverage
```
```sh
   cd packages/detail
   npm run test
   npm run coverage
```
