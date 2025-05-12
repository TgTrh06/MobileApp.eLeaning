import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import React, { useCallback, useRef, useState } from 'react';
import ProgressBar from './ProgressBar'
import { Chapter, Content, RootStackParamList } from '@/app/utils/types';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import ContentItem from "./ContentItem";
import { colors } from '@/app/utils/colors';
import { useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
  // contentList: Content[];
  chapter: Chapter;
  onChapterFinish: () => void;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ChapterContent: React.FC<Props> = ({ chapter, onChapterFinish }) => {
  const contentLength = chapter.content.length;
  const navigation = useNavigation<NavigationProp>();
  const flatListRef = useRef<FlatList<Content>>(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Track current index

  // Configuration for onViewableItemsChanged: item is viewable if 50% is visible
  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;
  
  // Callback for when viewable items change in the FlatList
  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: Array<{ item: Content; key: string; index: number | null; isViewable: boolean; }> }) => {
    if (viewableItems && viewableItems.length > 0) {
      const newViewableIndex = viewableItems[0].index;
      // Update currentIndex if a new item becomes predominantly visible
      if (newViewableIndex !== null && newViewableIndex !== currentIndex) {
        setCurrentIndex(newViewableIndex);
      }
    }
  }, [currentIndex]); // Dependency on currentIndex to avoid stale closures if needed, though for simple setCurrentIndex it might not be critical

  // Handler for the "Next" or "Finish" button
  const onNextButton = (itemRenderedAtIndex: number) => {
    if (itemRenderedAtIndex < contentLength - 1) {
      // If not the last item, scroll to the next item
      const targetIndex = itemRenderedAtIndex + 1;
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: targetIndex,
      });
      // setCurrentIndex will be updated by onViewableItemsChanged when scroll completes
    } else {
      // If it's the last item (button text is "Finish"), call onFinishButto
      onFinishButton(); 
    }
  }

  const onFinishButton = () => {
    onChapterFinish();
    navigation.goBack();
  }

  const onExamButton = () => {
    onChapterFinish();
    navigation.navigate('CourseExam', { Coursecategory: 'Basic Courses' })
  }

  if (contentLength === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.contentFont}>No content available</Text>
      </View>
    );
  }

  return (
    <View>
      {/* Progress bar showing current content index */}
      <ProgressBar contentLength={contentLength} contentIndex={currentIndex}/>
      
      {/* FlatList to display content items horizontally with paging */}
      <FlatList 
        data={chapter.content}
        horizontal 
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        onMomentumScrollEnd={event => {
          // Calculate newIndex based on scroll position
          // Ensure screen width is correctly obtained and used
          const screenWidth = Dimensions.get('screen').width;
          // The item width should match the width used in styles.container
          const itemWidth = screenWidth * 0.92; 
          const newIndex = Math.round(
            event.nativeEvent.contentOffset.x / itemWidth
          );
          // Ensure newIndex is within valid bounds
          if (newIndex >= 0 && newIndex < contentLength) {
            setCurrentIndex(newIndex);
          }
        }}
        renderItem={({item, index})=>(
          <View>
            <ScrollView style={styles.container}>
              {/* Heading for the content item */}
              <Text style={styles.contentFont}>{item.heading}</Text>
              {/* Component to render the main content */}
              <ContentItem 
                description={item.content.html}
                output={item?.output?.html}
              /> 
              {/* "Next" or "Finish" button */}         
              <TouchableOpacity
                style={styles.btnNextContainer}
                onPress={() => onNextButton(index)}
              >
                <Text style={styles.btnNext}>
                  {index < (contentLength - 1) ? 'Next' : 'Finish'}
                </Text>
              </TouchableOpacity>
              {index >= (contentLength - 1) && (              
                <TouchableOpacity
                  style={styles.btnExamContainer}
                  onPress={() => onExamButton()}
                >
                  <Text style={styles.btnNext}>
                    Do some Exams
                  </Text>
                </TouchableOpacity>
              )} 
            </ScrollView>             
          </View>
        )}
      />   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width*0.92,
    height: Dimensions.get('screen').height*0.82,    
    padding: 20,
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between'
  },
  contentFont: {
    fontSize: 22,
    marginTop: 15,
  },
  btnNextContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    width: Dimensions.get('screen').width*0.82,
  },
  btnNext: {
    padding: 12,
    backgroundColor: colors.primary,
    color: colors.white,
    textAlign: 'center',
    fontSize: 16,
    borderRadius: 15,
    marginTop: 20,
    width: '80%',
    flex: 1,
  },
  btnExamContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    width: Dimensions.get('screen').width*0.82,
  },
});

export default ChapterContent;