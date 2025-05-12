import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../../utils/colors';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

export const AppIcon: React.FC<IconProps> = ({ 
  name, 
  size = 24, 
  color = colors.primary 
}) => {
  return <Feather name={name as any} size={size} color={color} />;
};

export const BackIcon: React.FC<{ size?: number; color?: string }> = ({ 
  size = 24, 
  color = colors.primary 
}) => {
  return <Feather name="arrow-left" size={size} color={color} />;
};

export const SearchIcon: React.FC<{ size?: number; color?: string }> = ({ 
  size = 24, 
  color = colors.primary 
}) => {
  return <Feather name="search" size={size} color={color} />;
};

export const HomeIcon: React.FC<{ size?: number; color?: string }> = ({ 
  size = 24, 
  color = colors.primary 
}) => {
  return <Feather name="home" size={size} color={color} />;
};

export const ProfileIcon: React.FC<{ size?: number; color?: string }> = ({ 
  size = 24, 
  color = colors.primary 
}) => {
  return <Feather name="user" size={size} color={color} />;
};

export const AwardIcon: React.FC<{ size?: number; color?: string }> = ({ 
  size = 24, 
  color = colors.primary 
}) => {
  return <Feather name="award" size={size} color={color} />;
};

export const BookIcon: React.FC<{ size?: number; color?: string }> = ({ 
  size = 24, 
  color = colors.primary 
}) => {
  return <Feather name="book" size={size} color={color} />;
};

export const PlayIcon: React.FC<{ size?: number; color?: string }> = ({ 
  size = 24, 
  color = colors.primary 
}) => {
  return <Feather name="play" size={size} color={color} />;
};

export const ClockIcon: React.FC<{ size?: number; color?: string }> = ({ 
  size = 24, 
  color = colors.primary 
}) => {
  return <Feather name="clock" size={size} color={color} />;
};

export const LockIcon: React.FC<{ size?: number; color?: string }> = ({ 
  size = 24, 
  color = colors.primary 
}) => {
  return <Feather name="lock" size={size} color={color} />;
};

export const CheckIcon: React.FC<{ size?: number; color?: string }> = ({ 
  size = 24, 
  color = colors.primary 
}) => {
  return <Feather name="check-circle" size={size} color={color} />;
};

export const WrongIcon: React.FC<{ size?: number; color?: string }> = ({ 
  size = 24, 
  color = colors.primary 
}) => {
  return <Feather name="x-circle" size={size} color={color} />;
};

export const StarIcon: React.FC<{ size?: number; color?: string }> = ({ 
  size = 24, 
  color = colors.yellow 
}) => {
  return <Feather name="star" size={size} color={color} />;
};

export const LogoutIcon: React.FC<{ size?: number; color?: string }> = ({ 
  size = 24, 
  color = colors.primary 
}) => {
  return <Feather name="log-out" size={size} color={color} />;
};

export const SettingsIcon: React.FC<{ size?: number; color?: string }> = ({ 
  size = 24, 
  color = colors.primary 
}) => {
  return <Feather name="settings" size={size} color={color} />;
};

export const ChevronRightIcon: React.FC<{ size?: number; color?: string }> = ({ 
  size = 24, 
  color = colors.primary 
}) => {
  return <Feather name="chevron-right" size={size} color={color} />;
};

export const CreditCardIcon: React.FC<{ size?: number; color?: string }> = ({ 
  size = 24, 
  color = colors.primary 
}) => {
  return <Feather name="credit-card" size={size} color={color} />;
};

export const GiftIcon: React.FC<{ size?: number; color?: string }> = ({ 
  size = 24, 
  color = colors.primary 
}) => {
  return <Feather name="gift" size={size} color={color} />;
};

export const TrophyIcon: React.FC<{ size?: number; color?: string }> = ({ 
  size = 24, 
  color = colors.yellow 
}) => {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Feather name="award" size={size} color={color} />
    </View>
  );
};

export const BadgeIcon: React.FC<{ points: number; size?: number }> = ({ 
  points, 
  size = 24 
}) => {
  let color = colors.primary;
  
  if (points >= 5000) {
    color = colors.yellow;
  } else if (points >= 1000) {
    color = colors.secondary;
  }
  
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Feather name="award" size={size * 0.8} color={color} />
    </View>
  );
};
