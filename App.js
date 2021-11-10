/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import Video from 'react-native-video';
import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  clearTokens,
  createConfig,
  getAccessToken,
  getUser,
  revokeAccessToken,
  revokeIdToken,
  signIn,
} from '@okta/okta-react-native';

import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

const config = {
  oidc: {
    clientId: '0oa2sjpicZ5GC7Ol31d6',
    discoveryUri: 'https://id-preview.dolby.com/oauth2/aus11jir98E5qagEi1d7',
    endSessionRedirectUri: 'com.valtech.dolby.exphub:/',
    redirectUri: 'com.valtech.dolby.exphub:/callback',
    requireHardwareBackedKeyStore: false,
    scopes: [
      'openid',
      'groups',
      'profile',
      'email',
      'offline_access',
      'xhub:cache',
    ],
    tokenUrl:
      'https://id-preview.dolby.com/oauth2/aus11jir98E5qagEi1d7/v1/token?device_id=1d12d0ab7a6067e3',
  },
};

const AuthApp: () => Node = () => {
  const [isInit, setIsInit] = useState(false);
  const [isLoading, setIsLoading] = useState(isLoading);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const initAuth = async () => {
    try {
      setIsInit(true);
      await createConfig(config.oidc);
    } catch (err) {
      console.log(err);
    } finally {
      setIsInit(false);
    }
  };

  const login = async () => {
    console.log('login', {username, password});
    setIsLoading(true);
    try {
      await signIn({username, password});
      const profile = await getUser();
      setUser(profile);
      setPassword('');
      setUsername('');
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await revokeAccessToken(); // optional
      await revokeIdToken(); // optional
      await clearTokens();
      setUser(null);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    initAuth();
  }, []);
  return (
    <SafeAreaView>
      <ScrollView>
        <Video
          source={{
            uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          }}
          style={{width: 400, height: 300}}
        />
        {isLoading && <Text>loading...</Text>}
        {user && (
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>{user.email}</Text>
        )}
        {user && <Text>{JSON.stringify(user, null, 2)}</Text>}
        {!user && (
          <TextInput
            value={username}
            onChangeText={value => setUsername(value)}
            style={{backgroundColor: 'white', color: 'black'}}
            placeholder="email"
          />
        )}
        <View style={{height: 10}} />
        {!user && (
          <TextInput
            value={password}
            onChangeText={value => setPassword(value)}
            style={{backgroundColor: 'white', color: 'black'}}
            placeholder="password"
          />
        )}
        {!user && (
          <Button
            onPress={login}
            title="login"
            disabled={isLoading || isInit}
          />
        )}
        {user && (
          <Button
            onPress={logout}
            title="logout"
            disabled={isLoading || isInit}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuthApp;
