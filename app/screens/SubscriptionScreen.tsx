import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { colors } from '../utils/colors';
import { subscriptionPlans } from '../data/users';
import Header from '../components/Header';
import SubscriptionCard from '../components/SubscriptionCard';
import { GiftIcon } from '../assets/icons';

const SubscriptionScreen: React.FC = () => {
  const [selectedPlanId, setSelectedPlanId] = useState(subscriptionPlans[0].id);
  
  const handleSelectPlan = (planId: string) => {
    setSelectedPlanId(planId);
  };
  
  const handleSubscribe = () => {
    // This would typically process the payment
    // For now, we'll just log the selection
    console.log(`Subscribing to plan: ${selectedPlanId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header showBack title="Subscription" />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.heroContainer}>
          <GiftIcon size={40} color={colors.primary} />
          <Text style={styles.heroTitle}>
            Unlock the All Courses
            with CodeBox Pro
          </Text>
        </View>
        
        <View style={styles.plansContainer}>
          {subscriptionPlans.map((plan) => (
            <SubscriptionCard
              key={plan.id}
              plan={plan}
              isSelected={selectedPlanId === plan.id}
              onSelect={() => handleSelectPlan(plan.id)}
            />
          ))}
        </View>
        
        <View style={styles.securityContainer}>
          <Text style={styles.securityText}>
            🔒 Secured by STRIPE PAYMENT
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.subscribeButton}
          onPress={handleSubscribe}
        >
          <Text style={styles.subscribeButtonText}>
            START TO ENROLL NOW
          </Text>
        </TouchableOpacity>
        
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By subscribing, you agree to our Terms of Service and acknowledge our Privacy Policy.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  heroContainer: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: colors.primary,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
    marginTop: 12,
  },
  plansContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  securityContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  securityText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  subscribeButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    margin: 16,
  },
  subscribeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
  termsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  termsText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default SubscriptionScreen;
