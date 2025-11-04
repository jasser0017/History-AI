export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[hsl(40,38%,93%)] dark:bg-[hsl(193,57%,10%)] backdrop-blur-sm transition-colors duration-500">
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-[hsl(19,74%,64%)] border-t-transparent animate-spin"></div>
        <div className="absolute inset-3 rounded-full border-2 border-[hsl(193,57%,27%)] opacity-20 animate-ping"></div>
      </div>
    </div>
  );
}

  