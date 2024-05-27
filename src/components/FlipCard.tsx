import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import '../css/index.css';
import BgCard from '../assets/bg_card_nomarl.svg';
import SVG from 'react-inlinesvg';
import QuestionMark from '../assets/question_mark.svg';
import BgLight from '../assets/circle_light.svg'

export default function FlipCard() {
  console.log(motion);
  const [flip, setFlip] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
      setFlip(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
        <div className="bg">

            <motion.div
                 animate={{ rotate: 360 }}
                 transition={{ ease: "linear", duration: 2, repeat: Infinity }}
                className="bg--circle-light">
                <SVG src={BgLight}/>
            </motion.div>

            <motion.div
                transition={{ duration: 0.7 }}
                animate={{ rotateY: flip ? 0 : 180 }}
                className="flip-card"
            >   
                <motion.div
                transition={{ duration: 0.7 }}
                animate={{ rotateY: flip ? 0 : 180 }}
                className="flip-card__front"
                >
                    <SVG
                        src={BgCard}
                        onClick={() => setFlip((prevState) => !prevState)}
                        className="flip-card__front--bg"/>
                    <SVG 
                        src={QuestionMark}
                        className="flip-card__front--questionMark"/>
                </motion.div>

                <motion.div
                    initial={{ rotateY: 180 }}
                    animate={{ rotateY: flip ? 180 : 0 }}
                    // style={{ display: flip ? "none" : "block" }}
                    transition={{ duration: 0.7 }}
                    className="flip-card__back"
                >
                    <SVG
                        src={BgCard}
                        onClick={() => setFlip((prevState) => !prevState)}
                        className="flip-card__back--bg"/>
                </motion.div>
                
            </motion.div>

        </div>

        
  );
}
