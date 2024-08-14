const TransactionFormSkeleton = () => {
  return (
    <div className="h-screen max-w-xl py-10 mx-auto">
      <h3 className="bg-gray-200 rounded-lg h-14 animate-pulse"></h3>

      <ul className="flex gap-3 mt-5">
        <li className="w-full bg-gray-200 rounded-lg h-14 dark:bg-gray-700 animate-pulse"></li>
        <li className="w-full bg-gray-200 rounded-lg h-14 dark:bg-gray-700 animate-pulse"></li>
        <li className="w-full bg-gray-200 rounded-lg h-14 dark:bg-gray-700 animate-pulse"></li>
      </ul>
      <ul className="flex gap-3 mt-5">
        <li className="w-full bg-gray-200 rounded-lg h-14 dark:bg-gray-700 animate-pulse"></li>
        <li className="w-full bg-gray-200 rounded-lg h-14 dark:bg-gray-700 animate-pulse"></li>
      </ul>
      <ul className="flex gap-3 mt-5">
        <li className="w-full bg-gray-200 rounded-lg h-14 dark:bg-gray-700 animate-pulse"></li>
      </ul>
    </div>
  );
};
export default TransactionFormSkeleton;
