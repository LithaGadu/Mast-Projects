import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';

interface MenuItem {
  id: number;
  dishName: string;
  description: string;
  course: string;
  price: number;
}

const MenuScreen: React.FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [dishName, setDishName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [course, setCourse] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  // Add a new menu item
  const addMenuItem = () => {
    if (!dishName || !description || !course || !price) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    const newItem: MenuItem = {
      id: menuItems.length + 1,
      dishName,
      description,
      course,
      price: parseFloat(price),
    };

    setMenuItems((prevItems) => [...prevItems, newItem]);

    // Clear input fields
    setDishName('');
    setDescription('');
    setCourse('');
    setPrice('');
  };

  // Remove a menu item
  const removeMenuItem = (id: number) => {
    setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Render each menu item
  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuItem}>
      <Text style={styles.dishName}>{item.dishName}</Text>
      <Text>{item.description}</Text>
      <Text>{item.course}</Text>
      <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
      <Button title="Remove" color="red" onPress={() => removeMenuItem(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Menu</Text>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>No menu items added yet.</Text>}
      />

      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={dishName}
        onChangeText={setDishName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Course (e.g., Starters, Mains, Desserts)"
        value={course}
        onChangeText={setCourse}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Button title="Add Menu Item" onPress={addMenuItem} />
      <Button
        title="Go to Home Screen"
        onPress={() => navigation.navigate('Home', { menuItems })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
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
});

export default MenuScreen;
