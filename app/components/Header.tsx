import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../utils/colors';
import { BackIcon } from '../assets/icons';
import UserPoints from './UserPoints';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showProfile?: boolean;
  showPoints?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  showProfile = true,
  showPoints = true,
}) => {
  const navigation = useNavigation();
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {showBack && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <BackIcon color={colors.white} size={24} />
          </TouchableOpacity>
        )}
        
        {title && <Text style={styles.title}>{title}</Text>}
      </View>

      <View style={styles.rightContainer}>
        {showPoints && user && <UserPoints points={user.points} />}
        
        {showProfile && user && (
          <TouchableOpacity 
            style={styles.profileContainer}
            onPress={() => (navigation as any).navigate('ProfileTab')}
          >
            <Image
              source={{ uri: user.avatar || 'https://i.pravatar.cc/150' }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 12,
    backgroundColor: colors.primary,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },
  profileContainer: {
    marginLeft: 12,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: colors.white,
  },
});

export default Header;
