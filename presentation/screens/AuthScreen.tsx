import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, StatusBar, Alert, Dimensions, Animated,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import {EyeIcon, EyeSlashIcon, CurrencyDollarIcon, ShieldCheckIcon, ChartBarIcon, LockClosedIcon, EnvelopeIcon, ArrowRightIcon,} from 'react-native-heroicons/outline';

const { width, height } = Dimensions.get('window');

const ModernFinanceAuthScreen = () => {
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
                            borderRadius: 32,
                            padding: 32,
                            borderWidth: 1,
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 20 },
                            shadowOpacity: 0.3,
                            shadowRadius: 30,
                        }}>
                            {/* Email Input */}
                            <View style={{ marginBottom: 20 }}>
                                <Text style={{
                                    fontSize: 14,
                                    fontWeight: '600',
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    marginBottom: 8,
                                }}>
                                    Email Address
                                </Text>
                                <View style={{
                                    position: 'relative',
                                    borderRadius: 16,
                                    borderWidth: emailFocused ? 2 : 1,
                                    borderColor: emailFocused ? '#10b981' : 'rgba(255, 255, 255, 0.2)',
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                }}>
                                    <View style={{
                                        position: 'absolute',
                                        left: 16,
                                        top: 18,
                                        zIndex: 1,
                                    }}>
                                        <EnvelopeIcon size={20} color={emailFocused ? '#10b981' : 'rgba(255, 255, 255, 0.6)'} />
                                    </View>
                                    <TextInput
                                        style={{
                                            paddingLeft: 48,
                                            paddingRight: 16,
                                            paddingVertical: 18,
                                            fontSize: 16,
                                            color: 'white',
                                            fontWeight: '500',
                                        }}
                                        placeholder="Enter your email"
                                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                        value={email}
                                        onChangeText={setEmail}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        onFocus={() => setEmailFocused(true)}
                                        onBlur={() => setEmailFocused(false)}
                                    />
                                </View>
                            </View>

                            {/* Password Input */}
                            <View style={{ marginBottom: 24 }}>
                                <Text style={{
                                    fontSize: 14,
                                    fontWeight: '600',
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    marginBottom: 8,
                                }}>
                                    Password
                                </Text>
                                <View style={{
                                    position: 'relative',
                                    borderRadius: 16,
                                    borderWidth: passwordFocused ? 2 : 1,
                                    borderColor: passwordFocused ? '#10b981' : 'rgba(255, 255, 255, 0.2)',
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                }}>
                                    <View style={{
                                        position: 'absolute',
                                        left: 16,
                                        top: 18,
                                        zIndex: 1,
                                    }}>
                                        <LockClosedIcon size={20} color={passwordFocused ? '#10b981' : 'rgba(255, 255, 255, 0.6)'} />
                                    </View>
                                    <TextInput
                                        style={{
                                            paddingLeft: 48,
                                            paddingRight: 48,
                                            paddingVertical: 18,
                                            fontSize: 16,
                                            color: 'white',
                                            fontWeight: '500',
                                        }}
                                        placeholder="Enter your password"
                                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={!showPassword}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        onFocus={() => setPasswordFocused(true)}
                                        onBlur={() => setPasswordFocused(false)}
                                    />
                                    <TouchableOpacity
                                        style={{
                                            position: 'absolute',
                                            right: 16,
                                            top: 18,
                                        }}
                                        onPress={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeSlashIcon size={20} color="rgba(255, 255, 255, 0.6)" />
                                        ) : (
                                            <EyeIcon size={20} color="rgba(255, 255, 255, 0.6)" />
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </View>

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
                            <TouchableOpacity
                                onPress={handleLogin}
                                disabled={isLoading}
                                activeOpacity={0.8}
                                style={{ marginBottom: 24 }}
                            >
                                <LinearGradient
                                    colors={['#10b981', '#3b82f6']}
                                    style={{
                                        paddingVertical: 18,
                                        borderRadius: 16,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'row',
                                        shadowColor: '#10b981',
                                        shadowOffset: { width: 0, height: 8 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 20,
                                        opacity: isLoading ? 0.7 : 1,
                                    }}
                                >
                                    {isLoading ? (
                                        <View style={{
                                            width: 20,
                                            height: 20,
                                            borderWidth: 2,
                                            borderColor: 'rgba(255, 255, 255, 0.3)',
                                            borderTopColor: 'white',
                                            borderRadius: 10,
                                            // Note: You'd need to add rotation animation here
                                        }} />
                                    ) : (
                                        <>
                                            <Text style={{
                                                color: 'white',
                                                fontSize: 16,
                                                fontWeight: 'bold',
                                                marginRight: 8,
                                            }}>
                                                Sign In
                                            </Text>
                                            <ArrowRightIcon size={18} color="white" strokeWidth={2.5} />
                                        </>
                                    )}
                                </LinearGradient>
                            </TouchableOpacity>

                            {/* Divider */}
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 24,
                            }}>
                                <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
                                <Text style={{
                                    paddingHorizontal: 16,
                                    fontSize: 14,
                                    color: 'rgba(255, 255, 255, 0.6)',
                                    fontWeight: '500',
                                }}>
                                    or continue with
                                </Text>
                                <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
                            </View>

                            {/* Social Login Buttons */}
                            <View style={{ gap: 12, marginBottom: 24 }}>
                                <TouchableOpacity
                                    onPress={() => handleSocialLogin('Google')}
                                    activeOpacity={0.8}
                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        borderWidth: 1,
                                        borderColor: 'rgba(255, 255, 255, 0.2)',
                                        paddingVertical: 16,
                                        borderRadius: 16,
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 16,
                                        fontWeight: '600',
                                    }}>
                                        Continue with Google
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => handleSocialLogin('Apple')}
                                    activeOpacity={0.8}
                                    style={{
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        paddingVertical: 16,
                                        borderRadius: 16,
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 16,
                                        fontWeight: '600',
                                    }}>
                                        Continue with Apple
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {/* Sign Up Link */}
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Text style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.7)' }}>
                                    Don&#39;t have an account?{' '}
                                </Text>
                                <TouchableOpacity onPress={handleSignUp}>
                                    <Text style={{
                                        fontSize: 14,
                                        fontWeight: 'bold',
                                        color: '#10b981',
                                    }}>
                                        Sign Up
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </BlurView>

                        {/* Security Notice */}
                        <View style={{ marginTop: 32, alignItems: 'center' }}>
                            <BlurView intensity={10} tint="light" style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingHorizontal: 16,
                                paddingVertical: 12,
                                borderRadius: 16,
                                borderWidth: 1,
                                borderColor: 'rgba(16, 185, 129, 0.3)',
                            }}>
                                <ShieldCheckIcon size={16} color="#10b981" />
                                <Text style={{
                                    fontSize: 12,
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    marginLeft: 8,
                                    fontWeight: '500',
                                }}>
                                    Protected by 256-bit SSL encryption
                                </Text>
                            </BlurView>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
};

export default ModernFinanceAuthScreen;