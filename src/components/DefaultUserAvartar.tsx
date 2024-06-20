import defaultAvartar from '../assets/bg_default_user.svg';

const defaultAvatar = defaultAvartar;

export const handleErrorAvartar = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.target as HTMLImageElement;
  target.onerror = null;
  target.src = defaultAvatar;
};