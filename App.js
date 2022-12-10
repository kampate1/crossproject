import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  TextInput,
  Animated,
  Alert,
  PanResponder,
  Modal,
  SafeAreaView,
  FlatList,
  ImageBackground,
  TouchableHighlight
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();
import { Provider } from 'react-redux';

import * as Progress from 'react-native-progress';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Most Read of 2022" component={TopBooksScreen} />
          <Stack.Screen name="Most Read Authors of 2022" component={AuthorsScreen} />
          <Stack.Screen name="Recommendation" component={RecommendationScreen}/>
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const HomeScreen = ({ navigation }) => {
  const [name, onChangeN] = useState('');
  const display = useRef(new Animated.Value(0)).current;

  const displaying = () => {
    Animated.timing(display, {
      toValue: 1,
      duration: 2000,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://images.pexels.com/photos/207662/pexels-photo-207662.jpeg?auto=compress&cs=tinysrgb&w=600',
        }}
        resizeMode="cover"
        style={{ width: '100%', height: '100%' }}
        imageStyle={{ opacity: 0.5 }}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          onChange={displaying}
          onChangeText={onChangeN}></TextInput>
        <Animated.View
          style={{
            opacity: display,
          }}>
          <View style={styles.space}></View>
          <Button
            title="Most Read of 2022"
            color="orange"
            backgroundColor='#1E6738'
            disabled={name.length > 1 ? false : true}
            onPress={() => {
              navigation.navigate('Most Read of 2022', { name });
            }}
          />
          <View style={styles.space}></View>
          <Button
            title="Recommendation"
            color="orange"
            backgroundColor='#1E6738'
            disabled={name.length > 1 ? false : true}
            onPress={() => {
              navigation.navigate('Recommendation', { name });
            }}
          />
          <View style={styles.space}></View>
        </Animated.View>
      </ImageBackground>
    </SafeAreaView>
  );
};


const TopBooksScreen = ({ navigation, route }) => {
  const { name } = route.params;
  const graphic = useRef(new Animated.Value(0)).current;
  const [prompt, setPrompt] = useState(false);
  var onPressed = () => {
    setPrompt(true);
  };

  useEffect(() => {
    Animated.spring(graphic, { toValue: 250, mass: 100 }).start();
  }, []);

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://reqres.in/api/unknown')
      .then((res) => res.json())
      .then((json) => setData(json.data));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://images.pexels.com/photos/207662/pexels-photo-207662.jpeg?auto=compress&cs=tinysrgb&w=600',
        }}
        resizeMode="cover"
        style={{ width: '100%', height: '100%' }}
        imageStyle={{ opacity: 0.5 }}>
        <Modal animationType="fade" visible={prompt} >
        <View style={styles.modalRoot}>
          <View style={styles.modalWindow}>
            <Text style={styles.comingSoonText}> WAIT  </Text>
            <Text> See the Authors behind these top books? </Text>
            <Button
          title={"Yes"}
          color="orange"
          backgroundColor='#1E6738'
          onPress={() => {setPrompt(false)
            navigation.navigate('Most Read Authors of 2022')}}/>
          <Button
          title={"No"}
          color="orange"
          backgroundColor='#1E6738'
          onPress={() => {setPrompt(false)
            navigation.navigate('Home')}}></Button>
            <View style={styles.space}></View>
          </View>
        </View>
    </Modal>

        <View>
        <FlatList data={data} renderItem={({ item }) => {
  return (
    <View style={styles.entry}>
    
      <Text style={{fontSize: 20, fontWeight: "bold"}}>Title: {item.name}</Text>
      <Text style={{fontSize: 20, fontWeight: "bold"}}>Published: {item.year}</Text>
    </View>
  );
}} />
  <Button
          title={"Go Home"}
          color="orange"
          backgroundColor='#1E6738'
          onPress={onPressed}></Button>
      
      </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const AuthorsScreen = ({ navigation}) => {
  const graphic = useRef(new Animated.Value(0)).current;

  const [data, setData] = useState([]);

  useEffect(() => {
    Animated.spring(graphic, { toValue: 250, mass: 100 }).start();
  }, []);

  useEffect(() => {
    fetch('https://reqres.in/api/users?page=2')
      .then((res) => res.json())
      .then((json) => setData(json.data));
  }, []);

  var buttons = [
    {
      text: 'Yes',
      onPress: () => { navigation.navigate('Home')
      },
    },
    {
      text: 'No',
      onPress: () => {
      },
    },
  ];

  
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://images.pexels.com/photos/207662/pexels-photo-207662.jpeg?auto=compress&cs=tinysrgb&w=600',
        }}
        resizeMode="cover"
        style={{ width: '100%', height: '100%' }}
        imageStyle={{ opacity: 0.5 }}>
        <SafeAreaView>
        <FlatList data={data} renderItem={({ item }) => {
  return (
    <View style={styles.entry2}>
    <Image
              style={styles.img2}
              source={{ uri: item.avatar}}
            />
      <Text style={styles.comingSoonText}> {"\n"} {item.first_name} {item.last_name}</Text>
    </View>
  );
}} />
  <Button
        title="Go Home"
        color="orange"
        backgroundColor='#1E6738'
        onPress={() => {
          Alert.alert('Confirm', 'Do you want to leave?', buttons)
        }}
      />
      
      </SafeAreaView >
      </ImageBackground>
    </SafeAreaView>
  );
};


const RecommendationScreen = ({ navigation, route }) => {
  const { name } = route.params;
  const graphic = useRef(new Animated.Value(0)).current;
  const [prompt, setPrompt] = useState(false);
  var onPressed = () => {
    setPrompt(true);
  };

  useEffect(() => {
    Animated.spring(graphic, { toValue: 250, mass: 100 }).start();
  }, []);

  const fadeAnim = useRef(new Animated.Value(180)).current  
  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 0,
        duration: 10000,
      }
    ).start();
  }, [])


  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://images.pexels.com/photos/207662/pexels-photo-207662.jpeg?auto=compress&cs=tinysrgb&w=600',
        }}
        resizeMode="cover"
        style={{ width: '100%', height: '100%' }}
        imageStyle={{ opacity: 0.5 }}>
        <Modal animationType="fade" visible={prompt} >
        <View style={styles.modalRoot}>
          <View style={styles.modalWindow}>
            <Text style={styles.comingSoonText}> Coming Soon {'\n'} We're Sorry {name}  </Text>
            <Text> *CLICK THE SAD FACE TO GO BACK*</Text>
            <View style={styles.space}></View>
            <TouchableHighlight onPress={() => {setPrompt(false)
            navigation.navigate('Home')}} > 
            <Animated.View
              style={{
                  backgroundColor: 'transparent',
                  left: fadeAnim,
                }}>
            <Image
              style={styles.img}
              source={{ uri: 'https://thumbs.dreamstime.com/b/digital-illustration-cartoon-book-sad-116946116.jpg'}}
            />
      </Animated.View>
            </TouchableHighlight>
          </View>
        </View>
    </Modal>
          <View style={styles.space}></View>
        <Button
          title={name + " your personal recommendations"}
          color="orange"
          backgroundColor='#1E6738'
          onPress={onPressed}></Button>
          <View style={styles.space}></View>
          <Animated.View
              style={{
                  backgroundColor: 'transparent',
                  left: graphic,
                }}>
              <Image
              style={styles.img}
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Commons-plain-question-book-orange.svg/2048px-Commons-plain-question-book-orange.svg.png'}}
            />
      </Animated.View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
    marginBottom: 10,
    height: '100%',
  },
  space: {
    height: 10,
  },
  img: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 50,
  },
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  box: {
    position: 'absolute',
    left: 0,
    top: 100,
  },
  modalRoot: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWindow: {
    backgroundColor: 'white',
    width: '90%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
  },
  child: {
    width: 100,
    height: 100,
    margin: 10,
  },
  entry: {
    borderRadius: 2,
    margin: 2,
    padding: 4,
    borderColor: 'purple',
    borderWidth: 1,
    backgroundColor: 'lightgreen'
  },
  entry2: {
    borderRadius: 2,
    margin: 2,
    padding: 4,
    borderColor: 'purple',
    borderWidth: 1,
    flexDirection: 'row',
    flexWrap: "wrap",
  },
  img2: {
    width: 100,
    height: 100,
    margin: 10,
  },
  comingSoonText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  }
});
