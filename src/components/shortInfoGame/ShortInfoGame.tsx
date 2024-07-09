import Players from "./Players";
import ShortGameHistory from "./ShortGameHistory";

export default function ShortInfoGame() {
    return (
        <div className="result mt-7-5px">
            <ShortGameHistory />
            <Players/>
        </div>
    );
}