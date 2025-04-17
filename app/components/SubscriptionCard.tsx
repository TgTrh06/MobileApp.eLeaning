import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../utils/colors';
import { CheckIcon } from '../assets/icons';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: string; // "month" | "year"
  features: string[];
  pricePerMonth: number;
}

interface SubscriptionCardProps {
  plan: SubscriptionPlan;
  isSelected: boolean;
  onSelect: () => void;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  plan,
  isSelected,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.selectedContainer,
      ]}
      onPress={onSelect}
      activeOpacity={0.7}
    >
      <Text style={styles.name}>{plan.name}</Text>
      
      <View style={styles.priceContainer}>
        <Text style={styles.price}>${plan.price.toFixed(2)}</Text>
        <Text style={styles.duration}>/{plan.duration}</Text>
      </View>
      
      {plan.duration === 'year' && (
        <Text style={styles.monthlyPrice}>${plan.pricePerMonth.toFixed(2)}/month</Text>
      )}
      
      <View style={styles.featuresContainer}>
        {plan.features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <CheckIcon size={16} color={colors.success} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
      
      {isSelected && (
        <View style={styles.selectedBadge}>
          <Text style={styles.selectedText}>Selected</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 2,
    borderColor: 'transparent',
    flex: 1,
  },
  selectedContainer: {
    borderColor: colors.primary,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 4,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  duration: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  monthlyPrice: {
    fontSize: 12,
    color: colors.success,
    textAlign: 'center',
    marginBottom: 12,
  },
  featuresContainer: {
    marginTop: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  selectedBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  selectedText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.white,
  },
});

export default SubscriptionCard;
