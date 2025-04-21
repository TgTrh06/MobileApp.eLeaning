import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../utils/colors';
import { CheckIcon, LockIcon, PlayIcon } from '../assets/icons';
import { Question } from '../utils/types';
import { formatDuration } from '../utils/helpers';
import { useAuth } from '../context/AuthContext';

interface QuestionItemProps {
  question: Question;
  isCompleted: boolean;
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  isCompleted
}) => {
  const { user, updateUserPoints } = useAuth();
  const [isLocked, setIsLocked] = useState(question.isLocked);
  const [Completed, setIsCompleted] = useState(isCompleted);
  const [showAnswers, setShowAnswers] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);


  const handleAnswerPress = (answer: string) => {
    setSelectedAnswer(answer);
    setIsCompleted(true); // Mark as completed if an answer is selected
    if (answer === question.correctAnswer) {
      // Assuming user has a points property in the context
      updateUserPoints(question.score); // Add points for correct answer
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.container,
          Completed && styles.completedContainer,
          question.isLocked && styles.lockedContainer,
        ]}
        onPress={() => setShowAnswers(true)}
        disabled={question.isLocked}
        activeOpacity={0.7}
      >
        <View style={styles.leftContainer}>
          <View style={[
            styles.iconContainer,
            Completed && styles.completedIconContainer,
            question.isLocked && styles.lockedIconContainer,
          ]}>
            {Completed ? (
              <CheckIcon size={16} color={colors.white} />
            ) : question.isLocked ? (
              <LockIcon size={16} color={colors.white} />
            ) : (
              <PlayIcon size={16} color={colors.white} />
            )}
          </View>

          <View style={styles.textContainer}>
            <Text style={[
              styles.title,
              question.isLocked && styles.lockedText,
            ]}>
              {question.question}
            </Text>
            <Text style={styles.duration}>
              {formatDuration(question.duration)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {showAnswers && (
        <View style={styles.answerContainer}>
          <Text style={styles.questionText}>{question.question}</Text>
          {Array.isArray(question.options) ? (
            question.options.map((answer, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.answerButton,
                  selectedAnswer === answer && styles.selectedAnswerButton,
                  selectedAnswer && answer === question.correctAnswer && styles.correctAnswerButton,
                  selectedAnswer && selectedAnswer !== question.correctAnswer && selectedAnswer === answer && styles.incorrectAnswerButton,
                ]}
                onPress={() => handleAnswerPress(answer)}
                disabled={!!selectedAnswer}
              >
                <Text style={styles.answerText}>{answer}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <TouchableOpacity
              style={[
                styles.answerButton,
                selectedAnswer === question.correctAnswer && styles.selectedAnswerButton,
                selectedAnswer && question.correctAnswer === question.correctAnswer && styles.correctAnswerButton,
                selectedAnswer && selectedAnswer !== question.correctAnswer && selectedAnswer === question.correctAnswer && styles.incorrectAnswerButton,
              ]}
              onPress={() => handleAnswerPress(question.correctAnswer)}
              disabled={!!selectedAnswer}
            >
              <Text style={styles.answerText}>{question.correctAnswer}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
  },
  completedContainer: {
    backgroundColor: colors.green,
  },
  lockedContainer: {
    backgroundColor: colors.darkGray,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    marginRight: 12,
  },
  completedIconContainer: {
    backgroundColor: colors.green,
  },
  lockedIconContainer: {
    backgroundColor: colors.darkGray,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  lockedText: {
    color: colors.white,
  },
  duration: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 4,
  },
  answerContainer: {
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.black,
  },
  answerButton: {
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  selectedAnswerButton: {
    backgroundColor: colors.blue,
  },
  correctAnswerButton: {
    backgroundColor: colors.green,
  },
  incorrectAnswerButton: {
    backgroundColor: colors.red,
  },
  answerText: {
    fontSize: 16,
    color: colors.white,
  },
});

export default QuestionItem;
