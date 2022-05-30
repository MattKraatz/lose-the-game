import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import useContract from './hooks/useContract';

function App() {
  const { theGameContract } = useContract();
  const [loserCount, setLoserCount] = useState(0);

  const lostGame = () => {
    if (theGameContract) {
      theGameContract
        ?.lostGame()
        .then((tr) => {
          console.log(`TransactionResponse TX hash: ${tr.hash}`);
          tr.wait().then((receipt) => {
            console.log('transfer receipt', receipt);
          });
        })
        .catch((e: Error) => console.log(e));
    }
  };

  useEffect(() => {
    if (theGameContract) {
      theGameContract
        .queryFilter(theGameContract.filters.GameLost())
        .then((evts) => {
          setLoserCount(evts.length);
        });
    }
  }, [theGameContract]);

  return (
    <>
      <Header />
      <div>
        <button
          className={
            'inline-block text-sm px-4 py-2 leading-none border rounded text-white border-black bg-teal-500 ' +
            'm-4'
          }
          onClick={() => lostGame()}
        >
          I Lost the Game
        </button>
      </div>
      <div>The Game has been lost {loserCount} many times</div>
    </>
  );
}

export default App;
