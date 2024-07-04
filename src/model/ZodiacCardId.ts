
// ZODIAC_CARD_1
//      counter: 0
//     id : "ZODIAC_CARD_1"
//     imageUrl : "https://data4.ikara.co/data/minio/ikara-data/tarot_image/trau.svg"
//     multiply : 5
//     name : "Lá bài 1"


type ZodiacCardId = 'ZODIAC_CARD_1' |
                'ZODIAC_CARD_2' |
                'ZODIAC_CARD_3' |
                'ZODIAC_CARD_4' |
                'ZODIAC_CARD_5' |
                'ZODIAC_CARD_6' |
                'ZODIAC_CARD_7' |
                'ZODIAC_CARD_8';

interface ZodiacCardModel {
    cardId?: number;
    counter?: number,
    id: string,
    imageUrl: string,
    multiply: number,
    name: string,
}

interface BetZodiacCard extends ZodiacCardModel {
    totalIcoinBetting?: number;
    transactionId?: number;
}