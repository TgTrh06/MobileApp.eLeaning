import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { colors } from '../utils/colors';
import { StarIcon } from '../assets/icons';

interface AchievementBadgeProps {
  points: number;
  size?: 'small' | 'medium' | 'large';
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  points,
  size = 'medium',
}) => {
  // Determine badge type based on points
  const getBadgeType = () => {
    if (points >= 5000) return 'Gold';
    if (points >= 1000) return 'Silver';
    return 'Bronze';
  };
  
  // Determine badge color based on type
  const getBadgeColor = () => {
    const type = getBadgeType();
    switch (type) {
      case 'Gold': return colors.yellow;
      case 'Silver': return '#C0C0C0';
      case 'Bronze': return '#CD7F32';
      default: return colors.primary;
    }
  };
  
  // Determine badge size
  const getBadgeSize = () => {
    switch (size) {
      case 'small': return 80;
      case 'large': return 160;
      default: return 120;
    }
  };

  const badgeSize = getBadgeSize();
  const badgeColor = getBadgeColor();
  const badgeType = getBadgeType();

  return (
    <View style={[
      styles.container,
      { width: badgeSize, height: badgeSize }
    ]}>
      <View style={[
        styles.badge,
        { backgroundColor: badgeColor, width: badgeSize, height: badgeSize }
      ]}>
        <StarIcon size={badgeSize * 1} color={colors.white} />
      </View>
      
      <View style={styles.textContainer}>
        <Text style={styles.pointsText}>{points}</Text>
        <Text style={styles.typeText}>{badgeType}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
    textTransform: 'uppercase',
  },
});

export default AchievementBadge;
