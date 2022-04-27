# Tailwind

`yarn add tailwindcss postcss autoprefixer -D`

`npx tailwindcss init -p`

`yarn add @tailwindcss/forms -D`

### tailwindui.com

-   ui component library

# Prisma

`yarn add prisma -D`

`yarn add @prisma/client`

`yarn init prisma`

-   creates prisma folder + .env file

#` yarn prisma migrate dev`

-   when running new migrations I had errors
    -   the solution: create another DB for prisma to perform its shadow operations

`npx prisma studio`

# MDB cli

-   Free database hosting and more

-   hosting our database with mdb
    -   https://dashboard.mdbgo.com/#/databases
    -   mysql://USER:PASSWORD@HOST:PORT/DATABASE

# Auth Providers

### GITHUB

-   github.com/settings

<img src="./public/github-oauth.png" />

-   homepageURL: http://localhost:3000
-   authorizationCallbackURL: http://localhost:3000/api/auth/callback
    -   (authorizationCallbackURL must match next url pattern)

### Google Auth

-   developer settings

    -   OAuth apps
    -   register new app

-   authorized redirect URL:
    -   http://localhost:3000/api/auth/callback/google

<img src="./public/GoogleOAuthExample.png">

# .env

### NEXTAUTH_SECRET

-   Using next middleware

    -   just assign whatever random string to it in your .env.local file

## Vscode tricks

<pre>
    // settings.json
	"editor.codeActionsOnSave": {
		"source.fixAll": true,
		"source.organizeImports": true
	},
</pre>
