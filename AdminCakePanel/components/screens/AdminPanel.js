import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { db } from '../firebase';

export default function AdminPanel() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('orders').onSnapshot(snapshot => {
      const fetchedOrders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(fetchedOrders);
    });

    return () => unsubscribe();
  }, []);

  const updateOrderStatus = (id, newStatus) => {
    db.collection('orders').doc(id).update({ status: newStatus });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Panel</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderContainer}>
            <Text>Order Id: {item.id}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Customer: {item.name}</Text>
            <Text>Address: {item.address}</Text>
            <Text>Cake: {item.cakeType}</Text>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => updateOrderStatus(item.id, 'Out for Delivery')}
              >
                <Text style={styles.buttonText}>Out for Delivery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => updateOrderStatus(item.id, 'Order Delivered')}
              >
                <Text style={styles.buttonText}>Delivered</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  orderContainer: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
});
