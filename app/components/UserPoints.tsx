import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { colors } from '../utils/colors';

interface UserPointsProps {
  points: number;
  showIcon?: boolean;
  textColor?: string;
}

const UserPoints: React.FC<UserPointsProps> = ({
  points,
  showIcon = true,
  textColor = colors.white,
}) => {
  return (
    <View style={styles.container}>
      {showIcon && (
        <View style={styles.coinContainer}>
          <Text style={styles.coinText}>🏆</Text>
        </View>
      )}
      <Text style={[styles.pointsText, { color: textColor }]}>{points}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  coinContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  coinText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  pointsText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
});

export default UserPoints;
