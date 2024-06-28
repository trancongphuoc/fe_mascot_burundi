import defaultAvartar1 from '../assets/avartar/avatar_default_1.png';
import defaultAvartar2 from '../assets/avartar/avatar_default_2.png';
import defaultAvartar3 from '../assets/avartar/avatar_default_3.png';
import defaultAvartar4 from '../assets/avartar/avatar_default_4.png';
import defaultAvartar5 from '../assets/avartar/avatar_default_5.png';
import defaultAvartar6 from '../assets/avartar/avatar_default_6.png';
import defaultAvartar7 from '../assets/avartar/avatar_default_7.png';

const defaultAvatar = [defaultAvartar1,
                      defaultAvartar2,
                      defaultAvartar3,
                      defaultAvartar4,
                      defaultAvartar5,
                      defaultAvartar6,
                      defaultAvartar7]

export const handleErrorAvartar = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  function getRandomAvatar() {
    const randomIndex = Math.floor(Math.random() * defaultAvatar.length);
    return defaultAvatar[randomIndex];
  }

  const target = e.target as HTMLImageElement;
  target.onerror = null;
  target.src = getRandomAvatar();
};