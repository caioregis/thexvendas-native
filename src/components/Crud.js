import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {
  ListPersonalData,
  SavePersonalData,
  UpdatePersonalData,
  DeletePersonalData,
} from '../modules/Resource';

export default Crud = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [name, onChangeName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [id, onChangeId] = useState('');

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const onRead = () =>
    ListPersonalData(data => {
      setTimeout(() => {
        setLoading(false);
        setData(data);
        onSetter(null);
      }, 500);
    });

  const onSetter = item => {
    onChangeName(item?.nome || '');
    onChangeEmail(item?.email || '');
    onChangeId(item?.id || '');
  };

  const onClickUpdate = id => {
    if (name != '' && email != '' && id != '') {
      setLoading(true);
      UpdatePersonalData(id, {nome: name, email: email}, data => onRead());
    }
  };

  const onClickDelete = id => {
    if (name != '' && email != '' && id != '') {
      setLoading(true);
      DeletePersonalData(id, data => onRead());
    }
  };

  const onClickCreate = () => {
    if (name != '' && email != '') {
      setLoading(true);
      SavePersonalData({nome: name, email: email}, data => onRead());
    }
  };

  useEffect(() => {
    onRead();
  }, []);

  return (
    <SafeAreaView style={[
      backgroundStyle,
      { flex: 1 }
      ]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header titleL1="Feature Crud" titleL2=""/>
      <View
        style={
          [
            styles.container,
            {
              backgroundColor: isDarkMode ? Colors.darker : Colors.lighter 
            },
          ]
        }
      >
        <TextInput
          value={name}
          onChangeText={onChangeName}
          style={[
            styles.input,
            {
              backgroundColor: isDarkMode ? '#333' : '#ddd',
            },
          ]}
          placeholder="Digite seu nome."
        />
        <TextInput
          value={email}
          onChangeText={onChangeEmail}
          style={[
            styles.input,
            {
              backgroundColor: isDarkMode ? '#333' : '#ddd',
            },
          ]}
          placeholder="Digite seu e-mail."
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onClickCreate();
            }}
          >
            <Text>
              Criar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onClickUpdate(id);
            }}
          >
            <Text>
              Editar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              onClickDelete(id);
            }}
          >
            <Text>
              Apagar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.list}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.containerContent}>
            <FlatList
              keyExtractor={(item, index) => index}
              data={data}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    onSetter(item);
                  }}>
                  <Text style={styles.item}>
                    {item.nome} - {item.email}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 15,
    margin: 10,
    borderRadius: 5,
  },
  container: {
    paddingTop: 10,
  },
  containerContent: {
    padding: 10,
    height: 170,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: '#999',
  },
  buttonContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#0c9abe',
    padding: 15,
    borderRadius: 5,
    width: '31%',
    alignContent: 'center',
    alignItems: 'center',
  },
});
