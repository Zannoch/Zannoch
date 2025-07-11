import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Animated,
  InteractionManager,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SidebarButton = ({ label, icon, routeName, onCloseSidebar }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const isActive = route.name === routeName;

  const handlePress = () => {
    if (onCloseSidebar) {
      onCloseSidebar();
    }
    InteractionManager.runAfterInteractions(() => {
      if (route.name !== routeName) {
        navigation.navigate(routeName);
      }
    });
  };

  return (
    <TouchableOpacity
      style={[styles.sidebarButton, isActive && styles.activeSidebarButton]}
      onPress={handlePress}
    >
      <FontAwesome name={icon} size={18} color="#fff" style={styles.icon} />
      <Text style={styles.sidebarButtonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const Layout = ({ children }) => {
  const navigation = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [shouldShowSidebarContent, setShouldShowSidebarContent] = useState(true);
  const slideAnim = useRef(new Animated.Value(1)).current;

  const handleToggleSidebar = () => {
    Animated.timing(slideAnim, {
      toValue: sidebarOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setSidebarOpen(!sidebarOpen);
      if (!sidebarOpen) {
        setShouldShowSidebarContent(true);
      }
    });
  };

  useEffect(() => {
    if (!sidebarOpen) {
      const timeout = setTimeout(() => {
        setShouldShowSidebarContent(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [sidebarOpen]);

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <View style={styles.navbarContent}>
          <TouchableOpacity onPress={handleToggleSidebar}>
            <Text style={styles.menuButton}>☰</Text>
          </TouchableOpacity>
          <Text style={styles.logo}>Welcome To Belajarin Aja </Text>
          <TouchableOpacity onPress={handleLogout}>
            <Icon name="logout" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Body */}
      <View style={styles.body}>
        {/* Sidebar */}
        <Animated.View
          style={[
            styles.sidebar,
            {
              width: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 140],
              }),
              overflow: 'hidden',
            },
          ]}
        >
          {shouldShowSidebarContent && (
            <>
              <Text style={styles.menuTitle}>⚙️ Menu</Text>
              <SidebarButton label="Beranda" icon="home" routeName="Beranda" onCloseSidebar={() => setSidebarOpen(false)} />
              <SidebarButton label="Profils" icon="user" routeName="Profils" onCloseSidebar={() => setSidebarOpen(false)} />
              <SidebarButton label="Contact" icon="envelope" routeName="Contact" onCloseSidebar={() => setSidebarOpen(false)} />
            </>
          )}
        </Animated.View>

        {/* Content */}
        <ScrollView contentContainerStyle={styles.content}>
          {/* Kirim prop sidebarOpen ke children */}
          {React.cloneElement(children, { sidebarOpen })}
        </ScrollView>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 W4 School Team</Text>
      </View>
    </SafeAreaView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  navbar: {
    backgroundColor: '#334155',
    paddingTop: 45,
    paddingBottom: 15,
    paddingHorizontal: 20,
    elevation: 10,
  },
  navbarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    color: '#f0f9ff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  menuButton: {
    fontSize: 26,
    color: '#f0f9ff',
  },
  body: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    backgroundColor: '#e2e8f0',
    paddingTop: 20,
    paddingHorizontal: 10,
    borderRightWidth: 1,
    borderColor: '#cbd5e1',
  },
  menuTitle: {
    color: '#475569',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  sidebarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  activeSidebarButton: {
    backgroundColor: '#94a3b8',
  },
  sidebarButtonText: {
    color: '#1e293b',
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '500',
  },
  icon: {
    width: 20,
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    borderTopLeftRadius: 16,
  },
  footer: {
    height: 60,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#475569',
  },
  footerText: {
    color: '#e2e8f0',
    fontSize: 12,
  },
});
