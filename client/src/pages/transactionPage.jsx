import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";
import TransactionFormSkeleton from "../components/skeletons/transactionFormSkeleton";
import { UPDATE_TRANSACTION } from "../graphql/mutations/transaction.mutation";
import { GET_TRANSACTION } from "../graphql/queries/transaction.query";

const TransactionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading } = useQuery(GET_TRANSACTION, {
    variables: { id },
  });
  const [updateTransaction, { loading: isUpdatingTransaction }] = useMutation(
    UPDATE_TRANSACTION,
    { refetchQueries: ["GetTransactions"] }
  );

  const [formData, setFormData] = useState({
    description: data?.transaction?.description || "",
    paymentType: data?.transaction?.paymentType || "",
    category: data?.transaction?.category || "",
    amount: data?.transaction?.amount || "",
    location: data?.transaction?.location || "",
    date: data?.transaction?.date || "",
  });

  useEffect(() => {
    if (data?.transaction) {
      setFormData({
        description: data.transaction.description,
        paymentType: data.transaction.paymentType,
        category: data.transaction.category,
        amount: data.transaction.amount,
        location: data.transaction.location,
        date: new Date(+data.transaction.date).toISOString().split("T")[0],
      });
    }
  }, [data, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Updating transaction...");
    try {
      await updateTransaction({
        variables: {
          input: {
            ...formData,
            amount: parseFloat(formData.amount),
            transactionId: id,
          },
        },
      });
      toast.success("Transaction updated successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      toast.dismiss(loadingToast);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  if (loading) return <TransactionFormSkeleton />;

  return (
    <div className="flex flex-col items-center h-screen max-w-4xl mx-auto">
      <p className="relative z-50 inline-block mb-4 mr-4 text-2xl font-bold text-center text-transparent md:text-4xl lg:text-4xl bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 bg-clip-text">
        Update this transaction
      </p>
      <form
        className="flex flex-col w-full max-w-lg gap-5 px-3 "
        onSubmit={handleSubmit}
      >
        {/* TRANSACTION */}
        <div className="flex flex-wrap">
          <div className="w-full">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-white uppercase"
              htmlFor="description"
            >
              Transaction
            </label>
            <input
              className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              id="description"
              name="description"
              type="text"
              placeholder="Rent, Groceries, Salary, etc."
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* PAYMENT TYPE */}
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 w-full mb-6 md:mb-0">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-white uppercase"
              htmlFor="paymentType"
            >
              Payment Type
            </label>
            <div className="relative">
              <select
                className="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                id="paymentType"
                name="paymentType"
                onChange={handleInputChange}
                defaultValue={formData.paymentType}
              >
                <option value={"card"}>Card</option>
                <option value={"cash"}>Cash</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                <svg
                  className="w-4 h-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* CATEGORY */}
          <div className="flex-1 w-full mb-6 md:mb-0">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-white uppercase"
              htmlFor="category"
            >
              Category
            </label>
            <div className="relative">
              <select
                className="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                id="category"
                name="category"
                onChange={handleInputChange}
                defaultValue={formData.category}
              >
                <option value={"saving"}>Saving</option>
                <option value={"expense"}>Expense</option>
                <option value={"investment"}>Investment</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                <svg
                  className="w-4 h-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* AMOUNT */}
          <div className="flex-1 w-full mb-6 md:mb-0">
            <label
              className="block mb-2 text-xs font-bold text-white uppercase"
              htmlFor="amount"
            >
              Amount($)
            </label>
            <input
              className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              id="amount"
              name="amount"
              type="number"
              placeholder="150"
              value={formData.amount}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* LOCATION */}
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 w-full mb-6 md:mb-0">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-white uppercase"
              htmlFor="location"
            >
              Location
            </label>
            <input
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white"
              id="location"
              name="location"
              type="text"
              placeholder="New York"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>

          {/* DATE */}
          <div className="flex-1 w-full">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-white uppercase"
              htmlFor="date"
            >
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-[11px] px-4 mb-3 leading-tight focus:outline-none
						 focus:bg-white"
              placeholder="Select date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* SUBMIT BUTTON */}
        <button
          className="w-full px-4 py-2 font-bold text-white rounded bg-gradient-to-br from-pink-500 to-pink-500 hover:from-pink-600 hover:to-pink-600"
          type="submit"
          disabled={isUpdatingTransaction}
        >
          {isUpdatingTransaction
            ? "Updating Transaction..."
            : "Update Transaction"}
        </button>
      </form>
    </div>
  );
};
export default TransactionPage;
