import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 95,
        backgroundColor: theme.colors.secondary40,
        color: theme.colors.heading,
        borderRadius: 8,
        fontFamily: theme.fonts.text400,
        fontSize: 13,
        marginRight: 4,
        textAlign: 'center',
    },
});