import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type MenuItem = {
  id: number;
  dishName: string;
  course: string;
};

type FilterScreenProps = {
  route: {
    params: {
      menuItems: MenuItem[];
    };
  };
};

const FilterScreen = ({ route }: FilterScreenProps) => {
  const { menuItems } = route.params;
  const [selectedCourse, setSelectedCourse] = useState('');

  const filteredItems = selectedCourse
    ? menuItems.filter((item) => item.course === selectedCourse)
    : menuItems;

  return (
    <View>
      <Picker
        selectedValue={selectedCourse}
        onValueChange={(value) => setSelectedCourse(value)}
      >
        <Picker.Item label="All" value="" />
        <Picker.Item label="Starters" value="Starters" />
        <Picker.Item label="Mains" value="Mains" />
        <Picker.Item label="Desserts" value="Desserts" />
      </Picker>
      <FlatList
        data={filteredItems}
        renderItem={({ item }) => <Text>{item.dishName}</Text>}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default FilterScreen;
