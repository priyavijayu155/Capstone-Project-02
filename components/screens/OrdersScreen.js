import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';

const OrdersScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  // Mock data for demonstration
  useEffect(() => {
    // Simulating fetching data from a server
    setTimeout(() => {
      setOrders([
        {id: '1', title: 'Order 1', date: '2023-09-01', total: '15.99'},
        {id: '2', title: 'Order 2', date: '2023-09-02', total: '45.50'},
        {id: '3', title: 'Order 3', date: '2023-09-03', total: '34.90'},
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>Date: {item.date}</Text>
      <Text>Total: ${item.total}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={orders}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  itemContainer: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#f9c2ff',
  },
  title: {
    fontSize: 24,
  },
});

export default OrdersScreen;
