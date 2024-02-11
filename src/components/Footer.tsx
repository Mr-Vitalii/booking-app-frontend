export const Footer = () => {
  return (
    <div className="bg-sky-600 py-10 px-3">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-2xl text-white font-bold tracking-tight md:text-3xl">
          Holidays.com
        </span>
        <span className="text-white text-sm font-bold tracking-tight flex flex-col gap-3 md:flex-row md:text-base">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Service</p>
        </span>
      </div>
    </div>
  );
};
