// {
//     "id": 4926768982917120,
//     "addTime": 1716379511153,
//     "totalIcoinWin": 0,
//     "totalIcoinLose": 0,
//     "status": "PROCESSED",
//     "zodiacCardId": "ZODIAC_CARD_5",
//     "zodiacCard": {
//         "id": "ZODIAC_CARD_5",
//         "name": "Lá bài 1",
//         "multiply": 8,
//         "imageUrl": "https://data4.ikara.co/data/minio/ikara-data/tarot_image/ngua.svg"
//     },
//     "noGame": 656
// }

export interface GameHistory {
    status: string,
    zodiacCardId: string,
    noGame: number,
}