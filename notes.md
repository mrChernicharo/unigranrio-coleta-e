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

### Google Auth

-   http://localhost:3000/api/auth/callback/google

*   TODOS

    -   set image right
    -   Loading animations
        -   skeletons
    -   Entering animation
    -   E-Waste Types

        -   Pequenos equipamentos e eletroportáteis (torradeiras, batedeiras, aspiradores de pó, ventiladores, mixers, secadores de cabelo ferramentas elétricas, calculadoras, câmeras digitais, rádios, etc.)
        -   Grandes equipamentos: geladeiras, freezers, máquinas de lavar, fogões, ar condicionados, micro-ondas, grandes TVs, etc.
        -   Equipamentos de informática e telefonia: computadores, tablets, notebooks, celulares, impressoras, monitores e outros.
        -   Pilhas e bateria portáteis: pilhas modelos AA, AAA, recarregáveis, baterias portáteis de 9 V, etc.

            -   Small equipments
            -   Large equipments
            -   Tele-Info equipments
            -   Bateries
