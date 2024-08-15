import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { DELETE_TRANSACTION } from "../graphql/mutations/transaction.mutation";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import toast, { LoaderIcon } from "react-hot-toast";

const categoryColorMap = {
  saving: "from-green-700 to-green-400",
  expense: "from-pink-800 to-pink-600",
  investment: "from-blue-700 to-blue-400",
  // Add more categories and corresponding color classes as needed
};

const Card = ({
  cardType,
  _id,
  profilePic,
  description,
  paymentType,
  amount,
  location,
  date,
}) => {
  const [deleteTransaction, { loading }] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: [{ query: GET_TRANSACTIONS }],
  });

  const cardClass = categoryColorMap[cardType];

  const handleDeleteTransaction = async () => {
    const loading = toast.loading("Deleting transaction...");
    try {
      await deleteTransaction({
        variables: {
          id: _id,
        },
      });
      toast.success("Transaction deleted successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      toast.dismiss(loading);
    }
  };

  return (
    <div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
      <div className="flex flex-col gap-3 capitalize">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-bold text-white capitalize">
            {cardType}
          </h2>

          <div className="flex items-center gap-2">
            {loading ? (
              <LoaderIcon className="w-4 h-4 animate-spin" />
            ) : (
              <FaTrash
                onClick={handleDeleteTransaction}
                className={"cursor-pointer hover:text-red-500"}
              />
            )}

            <Link to={`/transaction/${_id}`}>
              <HiPencilAlt className="cursor-pointer" size={20} />
            </Link>
          </div>
        </div>

        <p className="flex items-center gap-1 text-white capitalize">
          <BsCardText />
          Description: {description}
        </p>

        <p className="flex items-center gap-1 text-white">
          <MdOutlinePayments />
          Payment Type: {paymentType}
        </p>

        <p className="flex items-center gap-1 text-white">
          <FaSackDollar />
          Amount: ${amount}
        </p>

        <p className="flex items-center gap-1 text-white">
          <FaLocationDot />
          Location: {location}
        </p>

        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-white">
            {new Date(parseInt(date)).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
          <img
            src={profilePic}
            className="w-8 h-8 border rounded-full"
            alt="Avatar"
          />
        </div>
      </div>
    </div>
  );
};
export default Card;
