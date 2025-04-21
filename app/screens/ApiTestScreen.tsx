import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { getCourseList } from '../services'; // Đảm bảo đường dẫn này đúng

const ApiTestScreen: React.FC = () => {
  const [apiResponse, setApiResponse] = useState<string | null>(null);

  useEffect(() => {
    getCourse();
  }, []);

  const getCourse = () => {
    getCourseList()
      .then((resp) => {
        console.log("API Response:", resp);
        setApiResponse(JSON.stringify(resp, null, 2)); // Hiển thị kết quả dưới dạng JSON
      })
      .catch((error) => {
        console.error("API Error:", error);
        setApiResponse("Error fetching data");
      });
  };

  const handleApiCall = () => {
    getCourse();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.responseContainer}>
        <Text style={styles.responseText}>
          {apiResponse ? apiResponse : "Press the button to fetch API data"}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  responseContainer: {
    marginTop: 16,
    width: '100%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  responseText: {
    fontSize: 14,
    color: '#333',
  },
});

export default ApiTestScreen;