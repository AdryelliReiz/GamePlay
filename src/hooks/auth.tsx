import React, { 
    createContext,
    ReactNode,
    useContext,
    useState,
    useEffect,
} from 'react';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;
const { RESPONSE_TYPE } = process.env;
const { SCOPE } = process.env;
const { CDN_IMAGE } = process.env;

import { api } from '../services/api';
import { COLLECTION_USERS } from '../config/database';

type User = {
    id: string;
    username: string;
    firstName: string;
    avatar: string;
    email: string;
    token: string;
}

type AuthContextData = {
    user: User;
    signIn: () => Promise<void>;
    isLoading: boolean;
    signOut: () => Promise<void>;
}

type AuthProviderProps = {
    children: ReactNode;
}

type Authorization = AuthSession.AuthSessionResult & {
    pamars: {
        access_token?: string;
        error?: string;
    }
}

export const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({children}:AuthProviderProps ) => {
    const [ user, setUser ] = useState<User>({} as User);
    const [ isLoading, setIsLoading ] = useState(false);

    async function signIn() {
        try {
            setIsLoading(true)

            const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
            
            const { type, pamars } = await AuthSession.startAsync({ authUrl }) as Authorization;

                if(type === "success" && !pamars.error) {
                    api.defaults.headers.autorization = `Bearer ${pamars.access_token}`

                    const userInfo = await api.get('/users/@me')

                    const firstName = userInfo.data.username.split(' ')[0];

                    userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}${userInfo.data.avatar}.png`;

                    const userData = {
                        ...userInfo.data,
                        firstName,
                        token: pamars.access_token,
                    }

                    await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData))

                    setUser(userData)
                } 
        } catch {
            throw new Error('Não foi possível autenticar!')
        } finally {
            setIsLoading(false)
        }
    }

    async function signOut() {
        setUser({} as User);

        await AsyncStorage.removeItem(COLLECTION_USERS)
    }

    async function loadUserStorageData() {
        const storage = await AsyncStorage.getItem(COLLECTION_USERS)

        if (storage) {
            const userLogged = JSON.parse(storage) as User;

            api.defaults.headers.autorization = `Bearer ${userLogged.token}`

            setUser(userLogged)
        }
    }

    useEffect(() => {
        loadUserStorageData()
    }, [])

    return(
        <AuthContext.Provider value={{
            user,
            signIn,
            isLoading,
            signOut,
        }}> 
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext);

    return context
}

export {
    AuthProvider,
    useAuth
}



