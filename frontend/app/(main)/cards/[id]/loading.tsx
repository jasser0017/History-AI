export default function LoadingCardPage() {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-pulse w-[600px] space-y-4">
          <div className="h-8 w-2/3 bg-gray-300/40 dark:bg-gray-600/40 rounded"></div>
          <div className="h-4 w-full bg-gray-300/30 dark:bg-gray-600/30 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-300/30 dark:bg-gray-600/30 rounded"></div>
        </div>
      </div>
    );
  }
  