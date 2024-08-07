import { useLocation } from 'react-router-dom';

export const useQueryParams = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const parameters = queryParams.get('parameters');

  return parameters;
};

export const formatNumber = (num: number) => {
  if (num >= 1000000) {
    const wholePart = Math.floor(num / 1000);
    const decimalPart = ((num % 1000) / 1000).toString().slice(1, 3).replace('.',',');
    return `${wholePart.toLocaleString('vi-VN')}${decimalPart}k`;
  } else {
      return num.toLocaleString('vi-VN');
  }
};


export function isSameDay(timestamp1: number, timestamp2: number): boolean {
  if (isNaN(timestamp1) || isNaN(timestamp2)) {
    console.error('Invalid timestamp:', timestamp1, timestamp2);
    return false;
  }
  
  const date1 = new Date(timestamp1);
  const date2 = new Date(timestamp2);

  return (
    date1.getUTCDate() === date2.getUTCDate() &&
    date1.getUTCMonth() === date2.getUTCMonth() &&
    date1.getUTCFullYear() === date2.getUTCFullYear()
  );
}


export const updateNewBetCards = (zodiacCard: BetZodiacCard, oldBetCards: BetZodiacCard[]): BetZodiacCard[] => {
  const newOldBetCard = oldBetCards.map(card => ({...card}));
  const cardIndex = newOldBetCard.findIndex(card => card.id === zodiacCard.id);
  if (cardIndex !== -1) {
    return newOldBetCard.map((card, index) => 
      index === cardIndex
      ? {...card, totalIcoinBetting: (card.totalIcoinBetting ?? 0) + (zodiacCard.totalIcoinBetting ?? 0)}
      : card);
  } else {
    return [...oldBetCards, zodiacCard]
  }
}


export const sortBettingCard = (betCards: BetZodiacCard[], firebaseCards: BetZodiacCard[]) : BetZodiacCard[] => {
  const newOrderList: string[] = betCards.map(card => card.id);
  const cardMap: { [key: string]: BetZodiacCard } = {};

  firebaseCards.forEach(card => {
    cardMap[card.id] = card;
  });

  const sortedFirebaseCards: BetZodiacCard[] = newOrderList
    .map(id => cardMap[id])
    .filter((card): card is BetZodiacCard => card !== undefined);

  const newOrderSet: Set<string> = new Set(newOrderList);

  firebaseCards.forEach(card => {
    if (!newOrderSet.has(card.id)) {
      sortedFirebaseCards.push(card);
    }
  });

  return sortedFirebaseCards;
}