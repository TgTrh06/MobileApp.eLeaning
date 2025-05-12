import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

interface UserPointContextType {
  userPoints: number;
  setUserPoints: Dispatch<SetStateAction<number>>;
  addPoints: (points: number) => void;
  resetPoints: () => void;
}

const UserPointContext = createContext<UserPointContextType | undefined>(undefined);

export const UserPointProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userPoints, setUserPoints] = useState<number>(0);

  useEffect(() => {
    // Tùy chọn: Lưu điểm người dùng vào localStorage hoặc backend
  }, [userPoints]);

  const addPoints = (points: number) => {
    setUserPoints((prev) => prev + points);
  };

  const resetPoints = () => {
    setUserPoints(0);
  };

  return (
    <UserPointContext.Provider
      value={{ userPoints, setUserPoints, addPoints, resetPoints }}
    >
      {children}
    </UserPointContext.Provider>
  );
};

export const useUserPoints = () => {
  const context = useContext(UserPointContext);
  if (!context) {
    throw new Error('useUserPoints must be used within a UserPointProvider');
  }
  return context;
};
