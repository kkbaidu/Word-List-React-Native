
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList,ImageBackground, TextInput } from 'react-native';
import axios from 'axios';
import loadingBg from './images/loadingScreen.jpg';
import Head from './head';

const WordList = (props) => {
  const [originalWordList, setOriginalWordList] = useState([]);
  const [filteredWordList, setFilteredWordList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('https://api.datamuse.com/words?ml=ringing+in+the+ears')
      .then(response => {
        setOriginalWordList(response.data);
        setFilteredWordList(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSearch = query => {
    setSearchQuery(query);
    const filteredWords = originalWordList.filter(word => word.word.includes(query));
    setFilteredWordList(filteredWords);
  };

  const renderItem = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: 'green', borderTopWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderRadius: 20, marginBottom: 10}}>
      <Text>{item.word}</Text>
    </View>
  );

  if (loading) {
    return (
        <ImageBackground source={loadingBg} resizeMode="cover" style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontSize: 42, lineHeight: 84, fontWeight: 'bold', textAlign: 'center', backgroundColor: '#000000c0' }} size="large" color="#fff">Words loading...</Text>
        </ImageBackground>
    );
  }

  if (error) {
    return <Text style={{ marginTop: 20, textAlign: 'center' }}>An error occurred: {error}</Text>;
  }

  return (
    <View>
      <View style={{ backgroundColor: '#0096FF', borderBottomRightRadius: 20, borderBottomLeftRadius: 20}}>
        <Head />
        
        <TextInput
        style={{ paddingHorizontal: 10, marginBottom: 20, borderColor: '#ccc', borderWidth: 1, borderRadius: 20, marginHorizontal: 15, height: 50, backgroundColor: "#fff"}}
        placeholder="Search for a word"
        onChangeText={handleSearch}
        value={searchQuery}
      />
      </View>

    <FlatList
      style={{ backgroundColor: '#f5f5f5', padding: 10 }}
      data={filteredWordList}
      renderItem={renderItem}
      keyExtractor={item => item.word}
    />
    </View>
  );
};

export default WordList;
