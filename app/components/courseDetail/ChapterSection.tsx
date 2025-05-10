import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { Chapter } from '@/app/utils/types';
import { LockIcon, PlayIcon } from '@/app/assets/icons';
import { colors } from '@/app/utils/colors';

export default function ChapterSection({ chapterList }: { chapterList: Chapter[] }) {
  return (
    <View style={{padding: 15, marginTop: 20, backgroundColor: colors.white, borderRadius: 15}}>
      {chapterList.map((item, index)=>(
        <View style={styles.chapterContainer}>
            <Text>Chapters</Text>
            <View style={styles.textContainer} key={index}>
                <Text style={styles.numberFont}>{index + 1}</Text>
                <Text style={styles.textFont}>{item.title}</Text>
            </View>
            <View>
                <LockIcon size={26} color={colors.gray}/>
            </View>
        </View>
      ))}
    </View>
  )
};

const styles = StyleSheet.create({
    chapterContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        gap: 10,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        borderColor: colors.gray,
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    numberFont: {
        fontSize: 27,
        fontWeight: 700,
        color: colors.gray,
    },
    textFont: {
        fontSize: 21,
        fontWeight: 400,
        color: colors.gray,
    }
})