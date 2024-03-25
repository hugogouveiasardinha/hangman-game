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
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [showWinnerMessage, setShowWinnerMessage] = useState(false); // Nouvelle variable d'état
  const [isLoading, setIsLoading] = useState(true); // Nouvelle variable d'état pour indiquer si les données sont en cours de chargement

  const incorrectLetters = guessedLetters.filter(letter => !nameToGuess.toLowerCase().includes(letter.toLowerCase()));
  const isLoser = incorrectLetters.length >= 6;
  const isWinner = nameToGuess.split('').every(letter => guessedLetters.includes(letter.toLowerCase()));

  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isLoser || isWinner)
      return;

    setGuessedLetters(currentLetters => [...currentLetters, letter]);
  }, [guessedLetters, isWinner, isLoser]);

  useEffect(() => {
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
          const characterName = response.data.name;
          setNameToGuess(characterName.toLowerCase());
          setIsLoading(false); // Mettre isLoading à false une fois que les données ont été récupérées
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
      const key = e.key;
      if (!key.match(/^[a-zA-Z.]$/)) return;
      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters, addGuessedLetter]);

  useEffect(() => {
    if (isWinner && !showWinnerMessage && !isLoading) {
      // Afficher le message de victoire uniquement si le joueur a gagné, que le message n'a pas déjà été affiché et que les données ne sont plus en cours de chargement
      setShowWinnerMessage(true);
    }
  }, [isWinner, showWinnerMessage, isLoading]);

  return (
    <div className="App">
      <div className="Container">
        <div className="Message">
          {showWinnerMessage && "You just won a Dundie! Refresh to play again!"}
          {isLoser && "Goodbye Toby, it's been fine, hope you find your, paraadiisee! Refresh to play again!"}
        </div>
        <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
        <HangmanWord guessedLetters={guessedLetters} nameToGuess={nameToGuess} />
        <HangmanKeyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter(letter => nameToGuess.includes(letter))}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  );
}

export default App;
