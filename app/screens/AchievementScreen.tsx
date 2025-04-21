import React, { useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView,
  Animated,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { colors } from '../utils/colors';
import { RootStackParamList } from '../utils/types';
import AchievementBadge from '../components/AchievementBadge';

type AchievementScreenRouteProp = RouteProp<RootStackParamList, 'Achievement'>;

const AchievementScreen: React.FC = () => {
  const route = useRoute<AchievementScreenRouteProp>();
  const navigation = useNavigation();
  const { points } = route.params;
  const { Coursecategory } = route.params;
  
  const scaleAnim = new Animated.Value(0.5);
  const opacityAnim = new Animated.Value(0);
  
  useEffect(() => {
    // Animate the badge appearing
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 8,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleExam = () => {
    (navigation as any).navigate('CourseExam', {
      Coursecategory
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.congratsText}>Congratulation!</Text>
        
        <Animated.View
          style={[
            styles.badgeContainer,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          <AchievementBadge points={points} size="large" />
        </Animated.View>
        
        <Text style={styles.pointsText}>
          You just earned {points} points
        </Text>
        
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleGoBack}
        >
          <Text style={styles.ButtonText}>
            Go Back to Course
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.examButton}
          onPress={handleExam}
        >
          <Text style={styles.ButtonText}>
            Go to {Coursecategory} Exam
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  congratsText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 40,
  },
  badgeContainer: {
    marginBottom: 40,
  },
  pointsText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 40,
  },
  backButton: {
    backgroundColor: colors.white,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  ButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  examButton: {
    backgroundColor: colors.white,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginTop: 20,
  },
});

export default AchievementScreen;
