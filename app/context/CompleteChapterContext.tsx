import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Context Type
interface CompleteChapterContextType {
  isChapterComplete: boolean;
  setIsChapterComplete: Dispatch<SetStateAction<boolean>>;
  markChapterComplete: () => void;
}

// Create context
const CompleteChapterContext = createContext<CompleteChapterContextType | undefined>(undefined);

// Provider component
export const CompleteChapterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isChapterComplete, setIsChapterComplete] = useState<boolean>(false);

  const markChapterComplete = () => {
    setIsChapterComplete(true);
  };

  return (
    <CompleteChapterContext.Provider
      value={{ isChapterComplete, setIsChapterComplete, markChapterComplete }}
    >
      {children}
    </CompleteChapterContext.Provider>
  );
};

// Custom hook to consume the context
export const useCompleteChapter = () => {
  const context = useContext(CompleteChapterContext);
  if (!context) {
    throw new Error("useCompleteChapter must be used within a CompleteChapterProvider");
  }
  return context;
};
