## 📋 Table of Contents

- [What is Video Player?](#-what-is-video-player)
- [How to test tRPC EndPoints](#%EF%B8%8F-how-to-test-trpc-endpoints)
- [Project Structure](#-project-structure)
- [Using the App](#-using-the-app)
- [Technologies Used](#-technologies-used)

## 👀 What is Video Player? [Visit here](https://video-player-theta-hazel.vercel.app/)

Video Player is a web application designed to display movie trailers and track user interactions with the content, such as views and likes.

Users can browse movie details, watch trailers directly through an embedded video player, and interact with each video by liking or viewing it. The app tracks the number of views and likes for each trailer, storing this information in a database to maintain accurate counts.

To ensure users cannot repeatedly like the same trailer, the application uses local storage to persist the like state even after the page is reloaded. Additionally, users can toggle their likes, allowing them to like or unlike a video as desired.

This application integrates with an external API to fetch movie data, including titles, overviews, and trailers.

## 🏗️ How to test tRPC EndPoints

Use tools like Postman or Insomnia to manually test the endpoints.

You can also interact with the endpoints via the front-end interface by watching trailers and liking/unliking them.

Example Endpoint:

```
Increment Views: This endpoint tracks the number of views for a trailer.
Method: POST
URL: /api/trpc/incrementViews
Payload:
json
{
  "trailerId": "trailer-id"
}
```

## 📂 Project Structure

Linters like ESLint and Prettier have been implemented.

Although it was not a requirement, implementing linters like ESLint and Prettier is essential. They ensure code quality and consistency, identifying errors and style issues in real-time.

```text
video-player/
├── .vscode/
├── prisma/              <- db connection
├── public
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/             <- includes utils for the app
│   ├── server/          <- includes trpc config
│   ├── types/
├── package.json
└── README.md
└── ...
```

## 🎮 Using the App

Clone the project:

```
git clone https://github.com/gonzalosalmeron/video-player.git
```

Install dependencies:
###### NOTE: The flag is necesary because React 19 RC incompatibilities with other packages

```
npm i --legacy-peer-deps
```

Duplicate the .env.example file and fill it with your data.

Predefined commands:

```
- npm run dev            <- start the development server
- npm run build          <- compile the project
- npm run start          <- start the server with the build data
- npm run lint           <- run the linter with the predefined config
```


## 🤖 Technologies Used

<a href="https://nextjs.org/">
    <img src="https://upload.wikimedia.org/wikipedia/commons/archive/8/8e/20230404233502%21Nextjs-logo.svg" width="120" height="100" style="object-fit: contain">
</a>
<a href="https://react.dev/">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlGmKtrnxElpqw3AExKXPWWBulcwjlvDJa1Q&s" width="100" height="100" style="object-fit: cover">
</a>
<a href="https://tailwindcss.com/">
    <img src="https://www.solucionex.com/sites/default/files/posts/imagen/tailwindcss-1633184775.jpeg" width="200" height="100" style="object-fit: cover">
</a>
<a href="https://www.prisma.io/">
    <img src="https://prismalens.vercel.app/header/logo-white.svg" width="140" height="100" style="object-fit: contain">
</a>
<a href="https://zod.dev/">
    <img src="https://zod.dev/logo.svg" width="100" height="100" style="object-fit: contain">
</a>
<a href="https://www.postgresql.org/">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW0dpEHiENPIkozM6y8N0S_gcjL0X4PWAMLw&s" width="200" height="90" style="object-fit: contain">
</a>
