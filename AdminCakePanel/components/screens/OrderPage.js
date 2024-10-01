import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import { db } from '../firebase';

export default function OrderPage({ navigation }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [cakeType, setCakeType] = useState('');

  const placeOrder = () => {
    db.collection('orders').add({
      name: name,
      address: address,
      cakeType: cakeType,
      status: 'Order Received',
    }).then(() => {
      alert('Order placed successfully');
    }).catch(error => {
      console.error("Error placing order: ", error);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Place a Cake Order</Text>
      <TextInput
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Your Address"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />
      <TextInput
        placeholder="Cake Type"
        value={cakeType}
        onChangeText={setCakeType}
        style={styles.input}
      />
      <Button title="Place Order" onPress={placeOrder} />
      <Button title="Go to Admin Panel" onPress={() => navigation.navigate('AdminPanel')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});
