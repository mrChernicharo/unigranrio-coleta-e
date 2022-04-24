## yarn add tailwindcss postcss autoprefixer -D

## npx tailwindcss init -p

## yarn add @tailwindcss/forms -D

<pre>
    // settings.json
	"editor.codeActionsOnSave": {
		"source.fixAll": true,
		"source.organizeImports": true
	},
</pre>

## tailwindui.com

## github.com/settings

-   developer settings
    -   OAuth apps
        -   register new app

<img src="./public/github-oauth.png" />

-   homepageURL: http://localhost:3333
-   authorizationCallbackURL: http://localhost:3333/api/auth/callback
    -   (authorizationCallbackURL must match next url pattern)

## NEXTAUTH_SECRET

#### using next middleware

-   just assign whatever random string to it in your .env.local file

## yarn add prisma -D

## yarn add @prisma/client

## yarn init prisma

-   creates prisma folder + .env

### yarn prisma migrate dev

-   when running new migrations I had errors
-   the solution: add a new DB for prisma to perform its shadow operations

## npx prisma studio

mysql://USER:PASSWORD@HOST:PORT/DATABASE

### mdb cli

-   hosting our database with mdb
-   https://dashboard.mdbgo.com/#/databases

== useSWR
