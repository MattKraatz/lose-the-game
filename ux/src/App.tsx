import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import useContract from './hooks/useContract';

function App() {
  const { theGameContract } = useContract();
  const [lossCount, setLossCount] = useState(0);
  const [loserCount, setLoserCount] = useState(0);
  const [leaderBoard, setLeaderBoard] = useState<
    Array<{ address: string; count: number }>
  >([]);

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
          setLossCount(evts.length);
          const addresses = evts
            .map((e) => e.address)
            .reduce((acc: Array<{ address: string; count: number }>, val) => {
              const index = acc.findIndex((a) => a.address === val);
              if (index) {
                acc[index].count++;
              } else {
                acc.push({ address: val, count: 0 });
              }
              return acc;
            }, []);
          setLoserCount(addresses.length);
          setLeaderBoard(
            addresses.sort((a, b) => a.count - b.count).slice(0, 10)
          );
        });
    }
  }, [theGameContract]);

  return (
    <>
      <Header />
      <div>
        <button
          className={
            'inline-block text-sm px-4 py-2 leading-none border rounded text-white border-teal-900 bg-teal-500 ' +
            'm-4'
          }
          onClick={() => lostGame()}
        >
          I Lost the Game
        </button>
      </div>
      <div>The Game has been lost {lossCount} times</div>
      <div>The Game has been lost by {loserCount} users</div>
      <div>Top Losers:</div>
      <div>
        <ol>
          {leaderBoard.map((l) => (
            <li>
              {l.address}: {l.count}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default App;
