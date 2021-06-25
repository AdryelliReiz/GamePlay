import React, { 
    createContext,
    ReactNode,
    useContext,
    useState,
} from 'react';
import * as AuthSession from 'expo-auth-session';

import {
    CLIENT_ID,
    REDIRECT_URI,
    RESPONSE_TYPE,
    SCOPE,
    CDN_IMAGE
} from '../config';
import { api } from '../services/api';

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
}

type AuthProviderProps = {
    children: ReactNode;
}

type Authorization = AuthSession.AuthSessionResult & {
    pamars: {
        access_token: string;
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

                if(type === "success") {
                    api.defaults.headers.autorization = `Bearer ${pamars.access_token}`

                    const userInfo = await api.get('/users/@me')

                    const firstName = userInfo.data.username.split(' ')[0];

                    userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}${userInfo.data.avatar}.png`;

                    setUser({
                        ...userInfo.data,
                        firstName,
                        token: pamars.access_token,
                    });

                    setIsLoading(false)
                } else {
                    setIsLoading(false)
                }

        } catch {
            throw new Error('Não foi possível autenticar!')
        }
    }

    return(
        <AuthContext.Provider value={{
            user,
            signIn,
            isLoading
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


