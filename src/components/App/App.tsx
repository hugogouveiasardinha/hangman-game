import React, { useEffect, useState } from "react";
import axios from "axios";

import '../../styles/_reset.scss'
import './App.scss'
import { HangmanDrawing } from "../HangmanDrawing/HangmanDrawing";
import { HangmanWord } from "../HangmanDrawing/HangmanWord";
import { HangmanKeyboard } from "../HangmanDrawing/HangmanKeyboard";


interface CharacterData {
  id: number;
  name: string;
  gender: string;
  marital: string;
  job: string[];
}

function App() {
  const [nameToGuess, setNameToGuess] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  useEffect(() => {
    // Vérification si le composant est monté
    let isMounted = true;

    const generateRandomNumber = () => Math.floor(Math.random() * 83) + 1;
    const randomNumber = generateRandomNumber();
    console.log(randomNumber);

    const fetchData = async () => {
      try {
        const response = await axios.get<CharacterData>(`https://theofficeapi.dev/api/character/${randomNumber}`, {
          params: {
            includeEpisodes: false,
          },
        });

        if (isMounted) {
          // Si le composant est toujours monté, effectuer les mises à jour nécessaires
          const characterName = response.data.name;
          console.log(response.data);
          setNameToGuess(characterName);
        }
      } catch (error) {
        console.error('Erreur lors de la requête API:', error.message);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="App">
      <div className="Container">
        <div className="Message">Win Lose</div>
        <HangmanDrawing />
        <HangmanWord />
        <HangmanKeyboard />
      </div>
    </div>
  );

}

export default App;
