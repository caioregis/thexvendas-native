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
import {BleManager} from 'react-native-ble-plx';
import {SaveBluetoothData, ListBluetoothData} from '../modules/Resource';

const manager = new BleManager();

export default function Bluetooth() {

  const [scannedDevices, setScannedDevices] = useState({});
  const [deviceCount, setDeviceCount] = useState(0);

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const onScanDevices = async () => {
    const btState = await manager.state();
    if (btState !== 'PoweredOn') {
      alert('Bluetooth encontra-se desligado.');
      return false;
    }
    manager.startDeviceScan(null, null, async (error, device) => {
      if (error) {
        console.log(error);
        return;
      }
      if (device) {
        setBluetoothList(device);
      }
    });
    return true;
  };

  const onSaveDevice = ({id:deviceID, name, isConnectable}) => {
    ListBluetoothData(data => {
        let exists = data.filter(({id}) => deviceID==id);
        if(exists.length < 1 && name!=null){
            SaveBluetoothData({id:deviceID, name, isConnectable}, 
                data => console.log(data), 
                error => console.log(error));
        }
    });
  };

  const setBluetoothList = ({name, id, isConnectable}) => {
    if(name!=null){
        const newScannedDevices = scannedDevices;
        newScannedDevices[id] = {id, name, isConnectable};
        setDeviceCount(Object.keys(newScannedDevices).length);
        setScannedDevices(scannedDevices);
    }
  };

  useEffect(() => {
    Object.values(scannedDevices).map(device => onSaveDevice(device));
  });

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header titleL1="Feature Bluetooth" titleL2="" />
      <View 
				style={
					[
						styles.container,
						{
							backgroundColor: isDarkMode ? Colors.darker : Colors.lighter 
						},
					]
				}>
				<TouchableOpacity
					style={styles.button}
					onPress={async () => onScanDevices()}
				>
					<Text>Localizar dispositivos</Text>
				</TouchableOpacity>
        <Text
        style={[
          styles.view,
          {
            backgroundColor: isDarkMode ? '#333' : '#ddd',
          },
        ]}>
          {' '}
          Dispositivos Localizados({deviceCount}){' '}
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
