import * as React from 'react'
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

const Clock = () => {

    const [time, setTime] = React.useState(new Date());
    const [morpAnimation] = React.useState(new Animated.Value(0));
    const [glowAnimation] = React.useState(new Animated.Value(0));

    React.useEffect(() =>{
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    React.useEffect(() =>{
        animateMorphing();
        animateGlowing();
    }, []);

    const animateMorphing = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(morpAnimation, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: false,
                }),
                Animated.timing(morpAnimation, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: false,
                }),
            ])
        ).start();
    };

    const animateGlowing = () => {
        Animated.loop(
            Animated.timing(glowAnimation, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: false,
            })
        ).start();
    };

    const morphStyle = {
        borderRadius: morpAnimation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 100, 0],
        }),
    };

    const interpolateColors = glowAnimation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['rgba(255, 0, 0, 1)', 'rgba(0, 255, 0, 1)', 'rgba(0, 0, 255, 1)'],
    });

    const animatedStyles = {
        color: interpolateColors,
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Digital Clock</Text>
            <Animated.View style={[styles.clockContainer, morphStyle]}>
                <Animated.Text style={[styles.time, animatedStyles]}>
                    {time.toLocaleTimeString()}
                </Animated.Text>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 90,
        marginTop: 250
        },
        clockContainer: {
            width: 300,
            height: 300,
            backgroundColor: '#212121',
            alignItems: 'center',
            justifyContent: 'center',
        },
        time: {
            fontSize: 48,
            fontWeight: 'bold',
        }
});

export default Clock;