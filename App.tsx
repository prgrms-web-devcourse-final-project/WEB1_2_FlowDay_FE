import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {NavigationContainer, createNavigationContainerRef, useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SvgXml} from 'react-native-svg';
import {useEffect, useState} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useStore} from '@/store/useStore';

import HomePage from '@/pages/home-page/HomePage';
import ChatPage from '@/pages/chat-page/ChatPage';
import Header from './src/components/Header';
import {svg} from '@/assets/icons/svg';
import {ROUTES} from '@/constants/routes';
import MapPage from '@/pages/map-page/MapPage';
import {SearchPage} from '@/pages/map-page/SearchPage';
import LoginPage from '@/pages/login-page/LoginPage';
import JoinPage from '@/pages/join-page/JoinPage';
import ProfileSetPage from '@/pages/join-page/ProfileSetPage';
import PostListPage from '@/pages/post-list-page/PostListPage';
import CoupleRegisterPage from '@/pages/join-page/CoupleRegisterPage';
import WelcomePage from '@/pages/join-page/WelcomePage';
import CoupleCheckPage from '@/pages/join-page/CoupleCheckPage';
import PostCreatePage from '@/pages/post-create-page/PostCreatePage';
import PostDetailPage from '@/pages/post-detail-page/PostDetailPage';
import SpotDetailPage from '@/pages/map-page/SpotDetailPage';
import {TextEncoder} from 'text-encoding';
global.TextEncoder = TextEncoder;
import PostEditPage from '@/pages/post-edit-page/PostEditPage';
import MyPage from '@/pages/my-page/MyPage';
import MyInfo from '@/pages/my-page/MyInfo';
import PostHeader from '@/components/post/PostHeader';
import CheckBreak from '@/pages/my-page/CheckBreak';
import CheckQuit from '@/pages/my-page/CheckQuit';
import AlertPage from '@/pages/alert-page/AlertPage';
import CoupleApprove from '@/pages/alert-page/CoupleApprove';
import {LogBox} from 'react-native';

LogBox.ignoreAllLogs(); // 모든 경고 메시지를 무시

// 색상 설정
const COLORS = {
  active: '#FF6666',
  inactive: '#000000',
};

const ButtonBox = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ButtonText = styled.Text`
  font-size: 13px;
  margin-top: 2px;
  text-align: center;
  min-width: 38px;
  height: 20px;
  font-family: 'SCDream4';
`;

type MapStackParamList = {
  MapMain: undefined;
  Search: undefined;
  SpotDetail: {spotId: string};
};

const Stack = createNativeStackNavigator<MapStackParamList>();

export function MapStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='MapMain' component={MapPage} options={{headerShown: false}} />
      <Stack.Screen name='Search' component={SearchPage} options={{headerShown: false}} />
      <Stack.Screen name='SpotDetail' component={SpotDetailPage} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}

// 게시글 관련 화면들을 위한 Stack Navigator 컴포넌트
const PostStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='PostListPage' component={PostListPage} options={{headerShown: false}} />
      <Stack.Screen name='PostDetailPage' component={PostDetailPage} options={{headerShown: false}} />
      <Stack.Screen name='PostCreatePage' component={PostCreatePage} options={{headerShown: false}} />
      <Stack.Screen name='PostEditPage' component={PostEditPage} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomePage} options={{header: () => <Header>D+134</Header>}} />
      <Stack.Screen
        name='SpotDetail'
        component={SpotDetailPage}
        options={{
          headerTitle: '',
          headerStyle: {backgroundColor: '#FFFFFF'},
        }}
      />
      <Stack.Screen name='AlertPage' component={AlertPage} options={{header: () => <PostHeader>알림</PostHeader>}} />
    </Stack.Navigator>
  );
};

const AlertStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Alert' component={AlertPage} options={{header: () => <PostHeader> </PostHeader>}} />
      <Stack.Screen name='CoupleApprove' component={CoupleApprove} options={{header: () => <PostHeader> </PostHeader>}} />
    </Stack.Navigator>
  );
};

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='MyPage' component={MyPage} options={{header: () => <Header>마이페이지</Header>}} />
      <Stack.Screen name='PostListPage' component={PostListPage} options={{headerShown: false}} />
      <Stack.Screen name='MyInfo' component={MyInfo} options={{header: () => <PostHeader>회원 정보 수정</PostHeader>}} />
      <Stack.Screen name='CheckBreak' component={CheckBreak} options={{headerShown: false}} />
      <Stack.Screen name='CheckQuit' component={CheckQuit} options={{headerShown: false}} />
      <Stack.Screen name={ROUTES.COUPLE_REGISTER} component={CoupleRegisterPage} options={{header: () => <PostHeader> </PostHeader>}} />
      <Stack.Screen name={ROUTES.COUPLE_CHECK} component={CoupleCheckPage} options={{header: () => <PostHeader> </PostHeader>}} />
    </Stack.Navigator>
  );
};

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export const navigationRef = createNavigationContainerRef();

const App = () => {
  const {logOut, setAccessToken, isLoggedIn} = useStore();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  // const navigation = useNavigation();

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.get('endpoint');
        const newAccessToken = response.data.accessToken;
        setAccessToken(newAccessToken);
      } catch (error) {
        logOut();
      }
    };
    validateToken();
  }, [setAccessToken, logOut]);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          SCDream1: require('./src/assets/font/SCDream1.otf'),
          SCDream2: require('./src/assets/font/SCDream2.otf'),
          SCDream3: require('./src/assets/font/SCDream3.otf'),
          SCDream4: require('./src/assets/font/SCDream4.otf'),
          SCDream5: require('./src/assets/font/SCDream5.otf'),
          SCDream6: require('./src/assets/font/SCDream6.otf'),
          SCDream7: require('./src/assets/font/SCDream7.otf'),
          SCDream8: require('./src/assets/font/SCDream8.otf'),
          SCDream9: require('./src/assets/font/SCDream9.otf'),
        });
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      } catch (error) {
        console.error('Error loading fonts:', error);
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  if (!isLoggedIn) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={{flex: 1}}>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
              <Stack.Screen name={ROUTES.LOGIN} component={LoginPage} options={{headerShown: false}} />
              <Stack.Screen name={ROUTES.JOIN} component={JoinPage} options={{header: () => <PostHeader> </PostHeader>}} />
              <Stack.Screen name={ROUTES.PROFILE_SET} component={ProfileSetPage} options={{header: () => <PostHeader> </PostHeader>}} />
              <Stack.Screen name={ROUTES.COUPLE_REGISTER} component={CoupleRegisterPage} options={{header: () => <PostHeader> </PostHeader>}} />
              <Stack.Screen name={ROUTES.COUPLE_CHECK} component={CoupleCheckPage} options={{header: () => <PostHeader> </PostHeader>}} />
              <Stack.Screen name={ROUTES.WELCOME} component={WelcomePage} options={{header: () => <PostHeader> </PostHeader>}} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  const Tab = createBottomTabNavigator();

  const getModifiedSvg = (xml: string, fillColor: string) => {
    return xml.replace(/fill="[^"]*"/g, `fill="${fillColor}"`);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer ref={navigationRef}>
          <Tab.Navigator
            screenOptions={{
              tabBarStyle: {
                backgroundColor: '#FFFFFF',
                height: 56,
                borderTopWidth: 1,
                borderTopColor: '#EEEEEE',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: 30,
              },
              tabBarShowLabel: true,
              tabBarLabelPosition: 'below-icon',
            }}
          >
            <Tab.Screen
              name={ROUTES.HOME}
              component={MainStack}
              options={{
                headerShown: false,
                tabBarIcon: ({focused}: {focused: boolean}) => {
                  return (
                    <ButtonBox>
                      <SvgXml xml={getModifiedSvg(svg.home, focused ? COLORS.active : COLORS.inactive)} />
                      <ButtonText
                        style={{
                          color: focused ? COLORS.active : COLORS.inactive,
                        }}
                      >
                        홈
                      </ButtonText>
                    </ButtonBox>
                  );
                },
              }}
            />

            <Tab.Screen
              name={ROUTES.CHAT}
              component={ChatPage}
              options={{
                headerShown: false,
                tabBarIcon: ({focused}: {focused: boolean}) => {
                  return (
                    <ButtonBox>
                      <SvgXml xml={getModifiedSvg(svg.chat, focused ? COLORS.active : COLORS.inactive)} />
                      <ButtonText
                        style={{
                          color: focused ? COLORS.active : COLORS.inactive,
                        }}
                      >
                        채팅
                      </ButtonText>
                    </ButtonBox>
                  );
                },
              }}
            />

            <Tab.Screen
              name={ROUTES.MAP}
              component={MapStack}
              options={{
                headerShown: false,
                tabBarIcon: ({focused}: {focused: boolean}) => {
                  return (
                    <ButtonBox>
                      <SvgXml xml={getModifiedSvg(svg.map, focused ? COLORS.active : COLORS.inactive)} />
                      <ButtonText
                        style={{
                          color: focused ? COLORS.active : COLORS.inactive,
                        }}
                      >
                        지도
                      </ButtonText>
                    </ButtonBox>
                  );
                },
              }}
            />

            <Tab.Screen
              name='posts'
              component={PostStack}
              options={{
                headerShown: false,
                tabBarIcon: ({focused}: {focused: boolean}) => {
                  return (
                    <ButtonBox>
                      <SvgXml xml={getModifiedSvg(svg.post, focused ? COLORS.active : COLORS.inactive)} />
                      <ButtonText
                        style={{
                          color: focused ? COLORS.active : COLORS.inactive,
                        }}
                      >
                        게시글
                      </ButtonText>
                    </ButtonBox>
                  );
                },
              }}
            />

            <Tab.Screen
              name={ROUTES.MY}
              component={MyStack}
              options={{
                headerShown: false,
                tabBarIcon: ({focused}: {focused: boolean}) => {
                  return (
                    <ButtonBox>
                      <SvgXml xml={getModifiedSvg(svg.my, focused ? COLORS.active : COLORS.inactive)} />
                      <ButtonText
                        style={{
                          color: focused ? COLORS.active : COLORS.inactive,
                        }}
                      >
                        마이
                      </ButtonText>
                    </ButtonBox>
                  );
                },
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
