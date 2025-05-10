
// import { View, Text } from 'react-native';
// import { RouteProp, useRoute } from '@react-navigation/native';
// import { RootStackParamList } from '../utils/types';
// import React from 'react';

// type CourseContentScreenRouteProp = RouteProp<RootStackParamList, 'CourseContent'>;

// const CourseContentScreen: React.FC = () => {
//   const route = useRoute<CourseContentScreenRouteProp>();
//   const { courseId, chapterId } = route.params;

//   return (
//     <View>
//       <Text>Course ID: {courseId}</Text>
//       <Text>Chapter ID: {chapterId}</Text>
//     </View>
//   );
// };

// export default CourseContentScreen;

import { View, Text } from 'react-native'
import React from 'react'

export default function CourseContentScreen() {
  return (
    <View>
      <Text>CourseContentScreen</Text>
    </View>
  )
}