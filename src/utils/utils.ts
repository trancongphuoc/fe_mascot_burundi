import { useLocation } from 'react-router-dom';

export const useQueryParams = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const parameters = queryParams.get('parameters');

  return parameters;
};

export const formatNumber = (num: number) => {
    if (num >= 1000000) {
        const formattedNum = (num / 1000).toFixed(0).replace('.', ',');
        return parseFloat(formattedNum).toLocaleString('vi-VN') + 'k';
    } else {
        return num.toLocaleString('vi-VN');
    }
};

export function isSameDay(timestamp1: number, timestamp2: number): boolean {
    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
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