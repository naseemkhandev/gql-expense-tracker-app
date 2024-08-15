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
        <LoaderIcon className="w-10 h-10 p-2 mx-auto mt-40 text-center text-white rounded-full animate-spin" />
      ) : (
        <div className="grid justify-start w-full grid-cols-1 gap-4 mb-20 md:grid-cols-2 lg:grid-cols-3">
          {data?.transactions.map((transaction) => (
            <Card
              key={transaction._id}
              cardType={transaction.category}
              {...transaction}
            />
          ))}
        </div>
      )}

      {!loading && data?.transactions.length === 0 && (
        <p className="pb-40 text-2xl font-bold text-center">
          No transactions history found.
        </p>
      )}
    </div>
  );
};
export default Cards;
