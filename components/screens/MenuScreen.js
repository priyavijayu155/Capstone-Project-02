import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MenuScreen = ({route}) => {
  const {userName} = route.params;
  const [cart, setCart] = useState([]);
  console.log(userName);

  const items = [
    {
      id: 1,
      name: 'Chocolate Vanilla',
      price: '1.75',
      image: require('../../assets/chocolate_vanilla.png'),
    },
    {
      id: 2,
      name: 'Strawberry Frosted Peanut',
      price: '1.7',
      image: require('../../assets/strawberry_frosted_peanut.png'),
    },
    {
      id: 3,
      name: 'Strawberry Peanut',
      price: '1.75',
      image: require('../../assets/strawberry_peanut.png'),
    },
    {
      id: 4,
      name: 'Chocolate Peanut',
      price: '1.75',
      image: require('../../assets/chocolate_peanut.png'),
    },
  ];
  const categories = [
    {
      id: 1,
      name: 'New this week',
      image: require('../../assets/new_this_week.png'),
    },
    {
      id: 2,
      name: 'Best Seller',
      image: require('../../assets/best_seller.png'),
    },
  ];
  const addToCart = useCallback(item => {
    setCart(currentCart => [...currentCart, item]);
  }, []); //setCart

  // useEffect(() => {
  //   console.log('Cart state updated:', cart);
  // }, [cart]);
  const navigateToCart = () => {
    navigation.navigate('CartScreen', {cartItems: cart});
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Hi {userName}</Text>
        <TouchableOpacity onPress={navigateToCart}>
          <MaterialIcons name="shopping-cart" size={24} color="black" />
          <Text>{cart.length}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subheaderText}>What would you like to eat?</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}>
        {items.map(item => (
          <View key={item.id} style={styles.item}>
            <Image source={item.image} style={styles.itemImage} />
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
            <TouchableOpacity
              style={styles.addIconContainer}
              onPress={() => addToCart(item)}>
              <MaterialIcons name="add" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.subheaderText}>Explore from categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}>
        {categories.map(category => (
          <View key={category.id} style={styles.categoryItem}>
            <Image source={category.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F5',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FA8072',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subheaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    padding: 20,
  },
  scrollContainer: {
    marginBottom: 20,
  },
  item: {
    width: 160,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    elevation: 5,
  },
  itemImage: {
    width: 140,
    height: 140,
    borderRadius: 10,
  },
  itemText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 5,
  },
  itemPrice: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'darkgray',
  },
  addIconContainer: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#FF6347',
    borderRadius: 15,
    padding: 8,
  },
  categoryItem: {
    width: 160,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  categoryText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
  },
});

export default MenuScreen;
