import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert } from 'react-native';

interface MenuItem {
  id: number;
  dishName: string;
  description: string;
  course: string;
  price: number;
}

const App: React.FC = () => {
  const [dishName, setDishName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [course, setCourse] = useState<string>(''); 
  const [price, setPrice] = useState<string>('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // list of courses
  const courses = ['Starters', 'Mains', 'Desserts'];

  // Function to add a new menu item
  const addMenuItem = () => {
    if (!dishName || !description || !course || !price) {
      Alert.alert('Error!', 'Please fill in all fields left out empty before moving forward.');
      return;
    }

    const newItem: MenuItem = {
      id: menuItems.length + 1,
      dishName,
      description,
      course,
      price: parseFloat(price), // price to a number
    };

    setMenuItems((prevItems) => [...prevItems, newItem]);

    // Clear the input fields
    setDishName('');
    setDescription('');
    setCourse('');
    setPrice('');
  };

  // Render each menu item
  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuItem}>
      <Text style={styles.dishName}>{item.dishName}</Text>
      <Text>{item.description}</Text>
      <Text>{item.course}</Text>
      <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Home Page</Text>
      
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>No menu items available.</Text>}
      />

      <Text style={styles.totalItems}>
        Total Menu Items: {menuItems.length}
      </Text>

      <TextInput
        style={styles.input}
        placeholder='Dish Name'
        value={dishName}
        onChangeText={setDishName}
      />
      <TextInput
        style={styles.input}
        placeholder='Description'
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder='Select Course'
        value={course}
        onChangeText={setCourse}
      />
      
      {/*Picker component for predefined courses */}
      <TextInput
        style={styles.input}
        placeholder='Price'
        value={price}
        onChangeText={setPrice}
        keyboardType='numeric' // Ensure numeric input
      />

      <Button title='Add Menu Item' onPress={addMenuItem} />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#DED5C7',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dishName: {
    fontWeight: 'bold',
    fontSize: 19,
  },
  price: {
    color: 'green',
    fontWeight: 'bold',
  },
  totalItems: {
    marginVertical: 15,
    fontSize: 19,
  },
});

export default App;
