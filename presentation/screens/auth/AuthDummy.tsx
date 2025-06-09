import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, StatusBar, Alert, Dimensions, Animated,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import {EyeIcon, EyeSlashIcon, CurrencyDollarIcon, ShieldCheckIcon, ChartBarIcon, LockClosedIcon, EnvelopeIcon, ArrowRightIcon,} from 'react-native-heroicons/outline';
import {CustomTextField} from "@/presentation/components/CustomTextField";
import {colors} from "@/constants/colors";
import {PrimaryButton} from "@/presentation/components/PrimaryButton";

const { width, height } = Dimensions.get('window');

const ModernFinanceAuthScreenDummy = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Error', 'Please enter a valid email address');
            return;
        }

        setIsLoading(true);
        // Simulate login process
        setTimeout(() => {
            setIsLoading(false);
            Alert.alert('Success', 'Login successful!');
        }, 2000);
    };

    const handleForgotPassword = () => {
        Alert.alert('Forgot Password', 'Password reset link will be sent to your email');
    };

    const handleSocialLogin = (provider: string) => {
        Alert.alert('Social Login', `Continue with ${provider}`);
    };

    const handleSignUp = () => {
        Alert.alert('Sign Up', 'Navigate to registration screen');
    };

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            {/* Background Gradient */}
            <LinearGradient
                colors={['#0f172a', '#1e293b', '#334155']}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: height,
                }}
            />

            {/* Background Decorative Elements */}
            <View style={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: 150, backgroundColor: 'rgba(16, 185, 129, 0.1)' }} />
            <View style={{ position: 'absolute', bottom: -150, left: -100, width: 400, height: 400, borderRadius: 200, backgroundColor: 'rgba(59, 130, 246, 0.08)' }} />

            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <ScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24 }}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Header Section */}
                        <View style={{ alignItems: 'center', marginBottom: 40 }}>
                            {/* Logo */}
                            <LinearGradient
                                colors={['#10b981', '#3b82f6']}
                                style={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: 24,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 24,
                                    shadowColor: '#10b981',
                                    shadowOffset: { width: 0, height: 8 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 20,
                                }}
                            >
                                <CurrencyDollarIcon size={40} color="white" strokeWidth={2.5} />
                            </LinearGradient>

                            <Text style={{
                                fontSize: 32,
                                fontWeight: 'bold',
                                color: 'white',
                                marginBottom: 8,
                                textAlign: 'center',
                            }}>
                                Welcome Back
                            </Text>

                            <Text style={{
                                fontSize: 16,
                                color: 'rgba(255, 255, 255, 0.7)',
                                textAlign: 'center',
                                marginBottom: 32,
                                lineHeight: 24,
                            }}>
                                Continue to your financial dashboard
                            </Text>

                            {/* Trust Indicators */}
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                gap: 16,
                                marginBottom: 8,
                            }}>
                                <BlurView intensity={20} tint="light" style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingHorizontal: 12,
                                    paddingVertical: 8,
                                    borderRadius: 20,
                                    borderWidth: 1,
                                    borderColor: 'rgba(255, 255, 255, 0.1)',
                                }}>
                                    <ShieldCheckIcon size={16} color="#10b981" />
                                    <Text style={{
                                        fontSize: 12,
                                        fontWeight: '600',
                                        color: 'rgba(255, 255, 255, 0.9)',
                                        marginLeft: 6,
                                    }}>
                                        Secure
                                    </Text>
                                </BlurView>

                                <BlurView intensity={20} tint="light" style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingHorizontal: 12,
                                    paddingVertical: 8,
                                    borderRadius: 20,
                                    borderWidth: 1,
                                    borderColor: 'rgba(255, 255, 255, 0.1)',
                                }}>
                                    <ChartBarIcon size={16} color="#3b82f6" />
                                    <Text style={{
                                        fontSize: 12,
                                        fontWeight: '600',
                                        color: 'rgba(255, 255, 255, 0.9)',
                                        marginLeft: 6,
                                    }}>
                                        Smart Analytics
                                    </Text>
                                </BlurView>
                            </View>
                        </View>

                        {/* Login Form */}
                        <BlurView intensity={15} tint="dark" style={{
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: 32,
                            paddingTop: 32,
                            paddingRight: 32,
                            paddingLeft: 32,
                            borderWidth: 1,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 20 },
                            shadowOpacity: 0.3,
                            shadowRadius: 30,
                            overflow: 'hidden',
                        }}>
                            {/* Email Input */}
                            <CustomTextField
                                textFieldLabel={"Email Address"}
                                placeholder={"Enter your email address"}
                                value={email}
                                onChangeText={setEmail}
                                onFocus={() => setEmailFocused(true)}
                                onBlur={() => setEmailFocused(false)}
                                IconComponent={EnvelopeIcon}
                                iconSize={20}
                                iconColor={colors.iconColor}
                            />

                            {/* Password Input */}
                            <CustomTextField
                                textFieldLabel={"Password"}
                                placeholder={"Enter your password"}
                                value={password}
                                onChangeText={setPassword}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(false)}
                                IconComponent={LockClosedIcon}
                                iconSize={20}
                                iconColor={colors.iconColor}
                            />

                            {/* Remember Me and Forgot Password */}
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 32,
                            }}>
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', alignItems: 'center' }}
                                    onPress={() => setRememberMe(!rememberMe)}
                                >
                                    <View style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 6,
                                        borderWidth: 2,
                                        borderColor: rememberMe ? '#10b981' : 'rgba(255, 255, 255, 0.3)',
                                        backgroundColor: rememberMe ? '#10b981' : 'transparent',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginRight: 12,
                                    }}>
                                        {rememberMe && (
                                            <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>✓</Text>
                                        )}
                                    </View>
                                    <Text style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.8)' }}>
                                        Remember me
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={handleForgotPassword}>
                                    <Text style={{
                                        fontSize: 14,
                                        fontWeight: '600',
                                        color: '#10b981',
                                    }}>
                                        Forgot Password?
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {/* Login Button */}
                            <PrimaryButton
                                onPress={handleLogin}
                                buttonText={'Sign In'}
                                buttonColor={colors.buttonBackgroundColor}
                            />

                            <PrimaryButton
                                onPress={() => handleSocialLogin('Google')}
                                buttonText={'Create a new account'}
                                buttonColor={"transparent"}
                            />
                        </BlurView>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
};

export default ModernFinanceAuthScreenDummy;