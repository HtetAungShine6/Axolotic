import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from "@/domain/models/auth/login-response";
import {Buffer} from "buffer";

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

class TokenManager {
    private static instance: TokenManager;

    private constructor() {}

    public static getInstance(): TokenManager {
        if (!TokenManager.instance) {
            TokenManager.instance = new TokenManager();
        }
        return TokenManager.instance;
    }

    async setToken(token: string): Promise<void> {
        await AsyncStorage.setItem(TOKEN_KEY, token);
    }

    async getToken(): Promise<string | null> {
        return await AsyncStorage.getItem(TOKEN_KEY);
    }

    async removeToken(): Promise<void> {
        await AsyncStorage.removeItem(TOKEN_KEY);
    }


    async isTokenValid(token?: string): Promise<boolean> {
        token = token ?? (await this.getToken() ?? undefined);
        if (!token) return false;

        try {
            const payloadBase64 = token.split('.')[1];
            const payloadJson = Buffer.from(payloadBase64, 'base64').toString('utf-8');
            const payload = JSON.parse(payloadJson);

            const exp = payload.exp;
            const now = Date.now() / 1000;
            return now < exp;
        } catch (e) {
            console.error('Token validation error:', e);
            return false;
        }
    }

    // async isTokenValid(): Promise<boolean> {
    //     const token = await this.getToken();
    //     if (!token) return false;
    //
    //     try {
    //         const payload = JSON.parse(atob(token.split('.')[1])); // JWT payload
    //         const exp = payload.exp; // expiration timestamp (seconds)
    //         const now = Date.now() / 1000;
    //         return now < exp;
    //     } catch (e) {
    //         console.error(e);
    //         return false;
    //     }
    // }

    async setUser(user: User): Promise<void> {
        if (user) {
            await AsyncStorage.setItem('auth_user', JSON.stringify(user));
        } else {
            await AsyncStorage.removeItem('auth_user');
        }
    }

    async getUser(): Promise<User | null> {
        const json = await AsyncStorage.getItem(USER_KEY);
        return json ? JSON.parse(json) : null;
    }

    async removeUser(): Promise<void> {
        await AsyncStorage.removeItem(USER_KEY);
    }

    async clearAll(): Promise<void> {
        await this.removeToken();
        await this.removeUser();
    }
}

export default TokenManager.getInstance();