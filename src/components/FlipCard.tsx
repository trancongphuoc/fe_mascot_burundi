import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import '../css/index.css';
import BgCard from '../assets/bg_card_nomarl.svg';
import SVG from 'react-inlinesvg';
import QuestionMark from '../assets/question_mark.svg';
import BgLight from '../assets/circle_light.svg'

interface FlipCardProps {
    zodiac: string;
  }
  

export default function FlipCard({ zodiac }: FlipCardProps) {
  const [flip, setFlip] = useState(true);

  console.log('zodiac', zodiac);


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
                className="flip-card mt-6px"
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
                    transition={{ duration: 0.7 }}
                    className="flip-card__back"
                >
                    <SVG
                        src={BgCard}
                        onClick={() => setFlip((prevState) => !prevState)}
                        className="flip-card__back--bg"/>
                    <SVG
                        src={zodiac}
                        onClick={() => setFlip((prevState) => !prevState)}
                        className="flip-card__back--zodiac"/>

                </motion.div>
                
            </motion.div>

        </div>

        
  );
}
