import { useClerk } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { ChevronRightIcon, LogoutIcon } from '../assets/icons'
import { colors } from '../utils/colors'

export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk()

  const handleSignOut = async () => {
    try {
      await signOut()
      // Redirect to your desired page
      Linking.openURL(Linking.createURL('/'))
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
          <TouchableOpacity style={styles.menuItem} onPress={handleSignOut}>
            <View style={styles.menuIconContainer}>
              <LogoutIcon size={20} color={colors.error} />
            </View>
            <Text style={[styles.menuText, { color: colors.error }]}>Sign Out</Text>
            <ChevronRightIcon size={20} color={colors.darkGray} />
          </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
  },
});