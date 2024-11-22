import { createStackNavigator } from '@react-navigation/stack';

// Define the types of parameters for each screen
export type RootStackParamList = {
  Home: undefined;  // Home screen doesn't need params
  AddMenuItem: { handleAddMenuItem: (newItem: { name: string; description: string; course: string; price: string; }) => void }; // AddMenuItem expects a function
};

const Stack = createStackNavigator<RootStackParamList>();