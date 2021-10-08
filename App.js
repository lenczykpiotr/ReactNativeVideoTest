/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Video from 'react-native-video';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const hevcUri =
  'https://experience-media.dolby.com/ott/6d3aa3bd-e647-4292-a9ac-acbc003dea7d/VDAFsurround/unencrypted/dash/manifest_SDR_HEVC_Only.mpd';
const dolbyUri =
  'https://experience-media.dolby.com/ott/6d3aa3bd-e647-4292-a9ac-acbc003dea7d/VDAFsurround/unencrypted/dash/manifest_P5_DVH1_Only.mpd';
const dolbyHevcUri =
  'https://experience-media.dolby.com/ott/6d3aa3bd-e647-4292-a9ac-acbc003dea7d/VDAFsurround/unencrypted/dash/manifest.mpd';

const uri = hevcUri;
// const uri = dolbyUri;
// const uri = dolbyHevcUri;

const App: () => Node = () => {
  const [error, setError] = useState('');
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Text>{uri}</Text>
        <Video
          onLoad={() => setError('')}
          onError={err => {
            console.log(err);
            setError(JSON.stringify(err));
          }}
          source={{
            uri,
          }}
          controls
          style={{
            width: Dimensions.get('window').width,
            height: 300,
            backgroundColor: '#fb0',
          }}
        />
        <Text>{error}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
