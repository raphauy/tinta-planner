
export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full h-full p-10">
      <div className="w-10 h-10 border-t-2 border-b-2 rounded-full border-tinta-marron animate-spin"></div>
    </div>
  );
};


export function LoadingSpinnerChico() {
  return (
    <div className="flex items-center justify-center w-full h-full p-5">
      <div className="w-5 h-5 border-t-2 border-b-2 rounded-full border-tinta-marron animate-spin"></div>
    </div>
  );
};
