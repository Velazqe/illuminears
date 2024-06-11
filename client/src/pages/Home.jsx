import { useQuery } from "@apollo/client";

import MonsterList from "../components/MonsterList";
import MonsterForm from "../components/MonsterForm";

import { QUERY_MONSTERS } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_MONSTERS);
  const monsters = data?.monsters || [];

  return (
    <main>
      <div className='flex-row justify-center'>
        <div
          className='col-12 col-md-10 mb-3 p-3'
          style={{ border: "1px dotted #1a1a1a" }}
        >
          <MonsterForm />
        </div>
        <div className='col-12 col-md-8 mb-3'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <MonsterList monsters={monsters} title='Witcher Monsters' />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
