import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: { menuItems: { id: number; dishName: string; course: string; price: number }[] };
  'Manage Menu': undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, route }) => {
  const { menuItems } = route.params || { menuItems: [] };

  const calculateAverage = (course: string) => {
    const items = menuItems.filter((item) => item.course === course);
    if (items.length === 0) return 0;
    return items.reduce((sum, item) => sum + item.price, 0) / items.length;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        renderItem={({ item }) => (
          <View>
            <Text>{item.dishName}</Text>
            <Text>{item.course}</Text>
            <Text>R{item.price.toFixed(2)}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Text>Average Price by Course:</Text>
      <Text>Starters: R{calculateAverage('Starters').toFixed(2)}</Text>
      <Text>Mains: R{calculateAverage('Mains').toFixed(2)}</Text>
      <Text>Desserts: R{calculateAverage('Desserts').toFixed(2)}</Text>
      <Button title="Manage Menu" onPress={() => navigation.navigate('Manage Menu')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
});

export default HomeScreen;
