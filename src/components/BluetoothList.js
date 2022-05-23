import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
	TouchableOpacity,
  FlatList,
} from 'react-native';
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {ListBluetoothData} from '../modules/Resource';

export default function BluetoothList() {

  const [scannedDevices, setScannedDevices] = useState([]);
  const [deviceCount, setDeviceCount] = useState(0);

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onListDevice = () => ListBluetoothData(setBluetoothList);
  const setBluetoothList = (device) => {
    setDeviceCount(device.length);
    setScannedDevices(device);
  };

  useEffect(() => {
    onListDevice();
  },[])

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header titleL1="Feature Bluetooth List" titleL2="" />
      <View 
				style={
					[
						styles.container,
						{
							backgroundColor: isDarkMode ? Colors.darker : Colors.lighter 
						},
					]
				}>
        <Text
        style={[
          styles.view,
          {
            backgroundColor: isDarkMode ? '#333' : '#ddd',
          },
        ]}>
          {' '}
          Dispositivos Gravados({deviceCount}){' '}
        </Text>
        <FlatList
          data={Object.values(scannedDevices)}
          renderItem={({item}) => {
            return <Text style={styles.item}>{`${item.name}`}</Text>;
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
		padding: 10,
		height: '100%',
  },
  view: {
		marginTop: 10,
		padding: 15,
    fontWeight: 'bold',
    backgroundColor: '#333',
    borderRadius: 5,
  },
	button: {
    backgroundColor: '#0c9abe',
    padding: 15,
    borderRadius: 5,
    alignContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: '#999',
  },
});
