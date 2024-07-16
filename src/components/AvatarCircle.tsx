import { handleErrorAvartar } from "./DefaultUserAvartar";

interface CardProps {
    avatarUrl: string;
    className: string; // Define the type of the card prop
}

function AvatarCircle({avatarUrl, className} : CardProps) {
    return (
        <img src={avatarUrl} alt="user avatar" className={className}  onError={handleErrorAvartar}></img>
    );
}

export default AvatarCircle;