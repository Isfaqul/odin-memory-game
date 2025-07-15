import { useEffect, useState } from "react";
import Card from "./Components/Card";
import { playClick, playGameOver } from "./Utils/utils.js";

export default function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [data, setData] = useState([]);
  const [gameStart, setGameStart] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const url = "https://pokeapi.co/api/v2/pokemon?limit=50";

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Unable to fetch Pokemon data");
        let data = await response.json();

        let cleanedData = [];

        // Clean the data
        data.results.forEach((pokemon) => {
          const obj = {
            id: pokemon.name,
            name: pokemon.name,
            image: `https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`,
            isClicked: false,
          };

          cleanedData.push(obj);
        });

        cleanedData.sort(() => Math.random() - 0.5); // Shuffle
        setData(cleanedData);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  function handleClick(id) {
    const currentCard = data.find((card) => card.id === id);
    if (currentCard.isClicked) {
      playGameOver();
      if (currentScore > highScore) setHighScore(currentScore);

      setTimeout(() => {
        resetGame();
      }, 1000);

      return;
    } else {
      playClick();
      setCurrentScore(currentScore + 1);
    }

    // UpdateClick
    let updatedData = data.map((card) => {
      if (card.id === id) {
        return {
          ...card,
          isClicked: true,
        };
      } else {
        return card;
      }
    });

    // Shuffle it for next render
    updatedData.sort(() => Math.random() - 0.5);
    setData(updatedData);
  }

  function resetGame() {
    let resetData = data.map((card) => {
      return { ...card, isClicked: false };
    });
    resetData.sort(() => Math.random() - 0.5);
    setData(resetData);
    setCurrentScore(0);
  }

  return (
    <>
      {!gameStart ? (
        <div className="h-full w-full p-4 mx-auto max-w-5xl flex flex-col items-center justify-center mt-10">
          <h1 className="text-center text-4xl md:text-6xl mb-5 text-cyan-300 tracking-wider">Memory Game</h1>
          <div className="text-neutral-100/90 bg-cyan-600/30 py-2 px-4 tracking-widest border border-cyan-600 text-center mt-10">
            <p className="text-lime-300">Let's see if your brain is rotting away...</p>

            <h2 className="mt-5 text-xl underline ">Only one rule !</h2>
            <p className="">Just do not not click on the same card twice.</p>
          </div>

          <button
            onClick={() => setGameStart(true)}
            className="mt-14 text-neutral-100/90 bg-blue-600/30 py-2 px-6 text-xl tracking-widest border border-blue-600 cursor-pointer hover:bg-blue-600/50 active:bg-blue-600/90"
          >
            Start
          </button>
        </div>
      ) : (
        <div className="w-full p-4 mx-auto max-w-5xl">
          <h1 className="text-center text-2xl md:text-4xl mb-5 text-cyan-300 tracking-wider">Memory Game</h1>
          <div className="flex gap-2 mx-auto justify-center flex-wrap mb-10">
            <p className="text-neutral-100/90 bg-cyan-600/30 py-2 px-4 tracking-widest border border-cyan-600">
              Current Score: {currentScore}
            </p>
            <p className="text-neutral-100/90 bg-blue-600/30 py-2 px-4 tracking-widest border border-blue-600">
              Highest Score: {highScore}
            </p>
          </div>
          <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {data.slice(0, 10).map((pokemon) => (
              <Card
                key={pokemon.id}
                name={pokemon.name}
                url={pokemon.image}
                onClick={() => {
                  handleClick(pokemon.id);
                }}
              />
            ))}
          </section>
        </div>
      )}
    </>
  );
}
