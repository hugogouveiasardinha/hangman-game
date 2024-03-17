import React, { useCallback, useEffect, useState } from "react";
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

  const incorrectLetters = guessedLetters.filter(letter => !nameToGuess.toLowerCase().includes(letter.toLowerCase()))

  const addGuessedLetter = useCallback((letter: string) => {
if(guessedLetters.includes(letter)) return

    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }, [guessedLetters])

  useEffect(() => {
    // Vérification si le composant est monté
    let isMounted = true;

    const generateRandomNumber = () => Math.floor(Math.random() * 83) + 1;
    const randomNumber = generateRandomNumber();


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

          setNameToGuess(characterName.toLowerCase());
  
          
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

  useEffect(() => { 
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (!key.match(/^[a-zA-Z.]$/)) return
      e.preventDefault()
      addGuessedLetter(key)

    
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
   }, [guessedLetters]);

  return (
    <div className="App">
      <div className="Container">
        <div className="Message">Win Lose</div>
        <HangmanDrawing numberOfGuesses={incorrectLetters.length}/>
        <HangmanWord guessedLetters={guessedLetters} nameToGuess={nameToGuess}/>
        <HangmanKeyboard onKeyPress={addGuessedLetter}/>
      </div>
    </div>
  );

}

export default App;
