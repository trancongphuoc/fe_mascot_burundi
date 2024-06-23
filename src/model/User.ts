// "data": {
//     "user": {
//         "facebookUserId": "100232101448639109146",
//         "profileImageLink": "https://data4.ikara.co/data/minio/ikara-data/user/100232101448639109146/thumbnail/1715670265953.jpg",
//         "name": "Hạnh Đoàn Thị Mỹ 1",
//         "language": "en.yokara",
//         "uid": 7587,
//         "totalIcoin": null,
//         "noBettingToday": 0
//     }
// }

interface User {
    language?: string,
    facebookUserId?: string,
    profileImageLink: string,
    name: string,
    uid?: string,
    totalIcoin?: number,
    noBettingToday?: number,
}