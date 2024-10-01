import React from 'react';
import {View, Text, FlatList, Button, StyleSheet, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const CartScreen = ({route, navigation}) => {
  const {cartItems} = route.params;

  const placeOrder = async () => {
    try {
      // Add new order to Firestore
      await firestore()
        .collection('orders')
        .add({
          items: cartItems.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
          })),
          total: cartItems.reduce(
            (total, item) => total + parseFloat(item.price),
            0,
          ),
          status: 'placed',
          timestamp: firestore.FieldValue.serverTimestamp(),
        });

      Alert.alert('Success', 'Your order has been placed!', [
        {text: 'OK', onPress: () => navigation.popToTop()},
      ]);
    } catch (error) {
      console.error('Error placing order: ', error);
      Alert.alert(
        'Error',
        'Could not place the order. Please try again later.',
      );
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>
        {item.name} - ${item.price}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <Button title="Place Order" onPress={placeOrder} color="#6200ee" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 18,
  },
});

export default CartScreen;
