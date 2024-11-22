import React, { createContext, useState, useContext } from 'react';

interface MenuItem {
  id: number;
  dishName: string;
  description: string;
  course: string;
  price: number;
}

interface MenuContextType {
  menuItems: MenuItem[];
  addMenuItem: (item: MenuItem) => void;
  removeMenuItem: (id: number) => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const addMenuItem = (item: MenuItem) => {
    setMenuItems((prevItems) => [...prevItems, item]);
  };

  const removeMenuItem = (id: number) => {
    setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <MenuContext.Provider value={{ menuItems, addMenuItem, removeMenuItem }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
