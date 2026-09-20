import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { AxiosError } from 'axios';
import libAxios from '@/lib/axios';

interface UseAuthOptions {
    middleware?: 'auth' | 'guest';
}

interface LaravelValidationErrors {
    [key: string]: string[];
}

interface LoginResponse {
    message?: string;
    user?: User;
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string | null;
    created_at?: string;
    updated_at?: string;
}

export const useAuth = ({ middleware }: UseAuthOptions = {}) => {
    const router = useRouter();

    const {
        data: user,
        error,
        mutate,
        isLoading,
    } = useSWR<User>(
        '/api/user',
        async () => {
            const response = await libAxios.get<User>('/api/user');

            return response.data;
        },
        {
            shouldRetryOnError: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        },
    );

    const csrf = async () => {
        await libAxios.get('/sanctum/csrf-cookie');
    };

    const login = async ({
        setErrors,
        ...props
    }: {
        setErrors: (
            errors: LaravelValidationErrors | Record<string, unknown>,
        ) => void;
        [key: string]: unknown;
    }) => {
        setErrors({});

        try {
            await csrf();

            const response = await libAxios.post<LoginResponse>(
                '/login',
                props,
            );

            await mutate();

            router.replace('/dashboard');

            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError<{
                message?: string;
                errors?: LaravelValidationErrors;
            }>;

            if (axiosError.response?.status === 422) {
                setErrors(
                    axiosError.response.data?.errors ?? {
                        general: [
                            axiosError.response.data?.message ??
                                'The provided credentials are incorrect.',
                        ],
                    },
                );

                return null;
            }

            if (axiosError.response?.status === 419) {
                setErrors({
                    general: [
                        'Your session has expired. Please refresh the page and try again.',
                    ],
                });

                return null;
            }

            setErrors({
                general: [
                    'Unable to connect to the authentication server.',
                ],
            });

            console.error('Login failed:', error);

            return null;
        }
    };

    const logout = async () => {
        try {
            await libAxios.post('/logout');
            await mutate(undefined, false);
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            router.replace('/login');
        }
    };

    useEffect(() => {
        if (middleware === 'guest' && user) {
            router.replace('/dashboard');
        }

        if (
            middleware === 'auth' &&
            !isLoading &&
            error?.response?.status === 401
        ) {
            router.replace('/login');
        }
    }, [user, error, isLoading, middleware, router]);

    return {
        user,
        error,
        isLoading,
        login,
        logout,
    };
};
