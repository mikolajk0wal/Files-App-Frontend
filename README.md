# Autor: Creend

## How to run project

### Backend:
1. Clone repo https://github.com/creend/Files-App-Backend
2. `npm install`
3. Crete .env file
4. In .env set `SECRET_TOKEN=YOUR SECRET TOKEN`
5. In .env set `DATABASE_URL=YOUR MONGO DB DATABASE URL`
6. In mongodb cloud configure atlas search
7. First index's name is "default" and indexed fields are dynamic
8. Second index's name is "autocomplete" and indexed field is "title"
https://www.youtube.com/watch?v=3IDlOI0D8-8&t=897s (Full autocomplete mongodb guide)
9. `npm run start:dev`

### Frontend:

1. Clone repo https://github.com/creend/Files-App-Frontend
2. `npm install`
3. `npm run dev`