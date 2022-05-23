import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
 
const Section = ({children, title, url}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <TouchableOpacity onPress={url}>
      <View style={styles.sectionContainer}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: isDarkMode ? Colors.white : Colors.black,
            },
          ]}>
          {title}
        </Text>
        <Text
          style={[
            styles.sectionDescription,
            {
              color: isDarkMode ? Colors.light : Colors.dark,
            },
          ]}>
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Home = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={
            [
              styles.container,
              {
                backgroundColor: isDarkMode ? Colors.darker : Colors.lighter 
              },
            ]
          }>
          <Section title="Feature CRUD" url={() => navigation.navigate('Crud')}>
            Grave informações do usuário.
          </Section>
          <Section
            title="Feature Câmera"
            url={() => navigation.navigate('Camera')}>
            Faça uma leitura de um código de barras.
          </Section>
          <Section
            title="Feature Bluetooth"
            url={() => navigation.navigate('Bluetooth')}>
            Ativar o bluetooth e visualizar as conexões.
          </Section>
          <Section
            title="Feature Bluetooth List"
            url={() => navigation.navigate('BluetoothList')}>
            Visualizar as conexões salvas.
          </Section>
          <Section 
            title="Feature Payment Gateway"
            url={() => navigation.navigate('PaymentView')}>
            Integração com gateway de pagamento.
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 32,
  },
  sectionContainer: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
 
export default Home;
 