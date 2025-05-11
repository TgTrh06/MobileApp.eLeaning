import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import React, { useRef, useState } from 'react';
import ProgressBar from './ProgressBar'
import { Content, RootStackParamList } from '@/app/utils/types';
import { FlatList } from 'react-native-gesture-handler';
import ContentItem from "./ContentItem";
import { colors } from '@/app/utils/colors';
import { useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
  contentList: Content[];
}
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ChapterContent: React.FC<Props> = ({ contentList }) => {
  const contentLength = contentList.length;

  const navigation = useNavigation<NavigationProp>();

  const flatListRef = useRef<FlatList<Content>>(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Track current index

  const onNextButton = () => {
    if (currentIndex < contentLength - 1) {
      // Navigate to next content
      navigation.navigate('ChapterContent', {
        contentList: contentList.slice(currentIndex + 1),
      });
    } else {
      // Navigate back or to another screen
      // navigation.goBack(); 
      navigation.navigate('CourseExam', { Coursecategory: 'Basic Courses' })
    }
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
      <ProgressBar contentLength={contentLength} contentIndex={currentIndex}/>
      <FlatList 
        data={contentList.slice(currentIndex, currentIndex + 1)}
        horizontal 
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index})=>(
          <View style={styles.container}>
            <Text style={styles.contentFont}>{item.heading}</Text>
            <ContentItem 
              description={item.content.html}
              output={item?.output?.html}
            />             
            <TouchableOpacity
              onPress={() => onNextButton()}
            >
              <Text style={styles.btnNext}>
                {index < (contentLength - 1) ? 'Next' : 'Finish'}
              </Text>
            </TouchableOpacity>            
          </View>
        )}
      />   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width*0.92,
    height: Dimensions.get('screen').height,    
    padding: 20,
  },
  contentFont: {
    fontSize: 22,
    marginTop: 15,
  },
  btnNext: {
    padding: 12,
    backgroundColor: colors.primary,
    color: colors.white,
    textAlign: 'center',
    fontSize: 16,
    borderRadius: 15,
    marginTop: 20
  }
});

export default ChapterContent;