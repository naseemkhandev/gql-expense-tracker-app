import { useQuery } from "@apollo/client";

import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import Card from "./card";
import { LoaderIcon } from "react-hot-toast";

const Cards = () => {
  const { data, loading } = useQuery(GET_TRANSACTIONS);

  return (
    <div className="w-full px-10 min-h-[40vh]">
      <p className="my-10 text-5xl font-bold text-center">History</p>

      {loading ? (
        <LoaderIcon className="w-10 h-10 p-2 mx-auto text-center text-white bg-gray-800 rounded-full animate-spin" />
      ) : (
        <div className="grid justify-start w-full grid-cols-1 gap-4 mb-20 md:grid-cols-2 lg:grid-cols-3">
          {data?.transactions.map((transaction) => (
            <Card
              key={transaction._id}
              transaction={transaction}
              cardType={transaction.category}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default Cards;
