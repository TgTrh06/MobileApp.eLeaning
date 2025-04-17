import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../utils/colors';
import { CheckIcon, LockIcon, PlayIcon } from '../assets/icons';
import { Chapter } from '../utils/types';
import { formatDuration } from '../utils/helpers';

interface ChapterItemProps {
  chapter: Chapter;
  isCompleted: boolean;
  onPress: () => void;
}

const ChapterItem: React.FC<ChapterItemProps> = ({
  chapter,
  isCompleted,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isCompleted && styles.completedContainer,
        chapter.isLocked && styles.lockedContainer,
      ]}
      onPress={onPress}
      disabled={chapter.isLocked}
      activeOpacity={0.7}
    >
      <View style={styles.leftContainer}>
        <View style={[
          styles.iconContainer,
          isCompleted && styles.completedIconContainer,
          chapter.isLocked && styles.lockedIconContainer,
        ]}>
          {isCompleted ? (
            <CheckIcon size={16} color={colors.white} />
          ) : chapter.isLocked ? (
            <LockIcon size={16} color={colors.white} />
          ) : (
            <PlayIcon size={16} color={colors.white} />
          )}
        </View>
        
        <View style={styles.textContainer}>
          <Text style={[
            styles.title,
            chapter.isLocked && styles.lockedText,
          ]}>
            {chapter.title}
          </Text>
          
          <Text style={[
            styles.duration,
            chapter.isLocked && styles.lockedText,
          ]}>
            {formatDuration(chapter.duration)}
          </Text>
        </View>
      </View>
      
      {chapter.isLocked && (
        <View style={styles.lockedBadge}>
          <LockIcon size={12} color={colors.white} />
          <Text style={styles.lockedBadgeText}>Premium</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  completedContainer: {
    backgroundColor: colors.lightGray,
  },
  lockedContainer: {
    opacity: 0.8,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  completedIconContainer: {
    backgroundColor: colors.success,
  },
  lockedIconContainer: {
    backgroundColor: colors.darkGray,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  duration: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  lockedText: {
    color: colors.darkGray,
  },
  lockedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  lockedBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.white,
    marginLeft: 4,
  },
});

export default ChapterItem;
