import React, { useEffect, useState } from "react";
import axios from "axios";

import './App.scss'
import '../../styles/_reset.scss'

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
      <div className="Container"><h1>hi {nameToGuess}</h1></div>
      
      </div>
  );

}

export default App;
