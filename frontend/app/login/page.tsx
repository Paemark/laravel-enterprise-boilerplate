'use client';

import { FormEvent, useState } from 'react';
import { useAuth } from '@/hooks/auth';

interface FormErrors {
    email?: string[];
    password?: string[];
    general?: string[];
    [key: string]: string[] | undefined;
}

export default function LoginPage() {
    const { login } = useAuth({ middleware: 'guest' });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (loading) {
            return;
        }

        setErrors({});

        if (!email.trim() || !password) {
            const validationErrors: FormErrors = {};

            if (!email.trim()) {
                validationErrors.email = ['Email address is required.'];
            }

            if (!password) {
                validationErrors.password = ['Password is required.'];
            }

            setErrors(validationErrors);
            return;
        }

        setLoading(true);

        try {
            await login({
                email: email.trim(),
                password,
                setErrors: (validationErrors) => {
                    setErrors(validationErrors as FormErrors);
                },
            });
        } catch (error) {
            console.error('Login failed:', error);

            setErrors({
                general: [
                    'Unable to connect to the authentication server. Please try again.',
                ],
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[var(--pmd-bg)]">
            <div className="grid min-h-screen lg:grid-cols-[minmax(420px,0.9fr)_1.1fr]">
                {/* Brand panel */}
                <section className="relative hidden overflow-hidden bg-[var(--pmd-navy)] lg:flex lg:min-h-screen lg:flex-col lg:justify-between">
                    <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[var(--pmd-green)] opacity-10 blur-3xl" />
                    <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[var(--pmd-green)] opacity-10 blur-3xl" />

                    <div className="relative z-10 p-10 xl:p-12">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--pmd-green)]">
                                <span className="text-sm font-bold text-white">
                                    P
                                </span>
                            </div>

                            <div>
                                <div className="text-base font-semibold tracking-tight text-white">
                                    Paemark Designers
                                </div>

                                <div className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-white/40">
                                    Possibilities Are Endless
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 max-w-xl px-10 pb-20 xl:px-12">
                        <div className="mb-7 h-px w-12 bg-[var(--pmd-green)]" />

                        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--pmd-green)]">
                            PMD Workspace
                        </p>

                        <h1 className="max-w-lg text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-white xl:text-6xl">
                            Ideas into meaningful digital experiences.
                        </h1>

                        <p className="mt-6 max-w-md text-sm leading-7 text-white/55">
                            A focused workspace for managing the digital
                            products, content and experiences that make PMD
                            possible.
                        </p>
                    </div>

                    <div className="relative z-10 flex items-center justify-between px-10 pb-8 xl:px-12">
                        <p className="text-xs text-white/30">
                            © 2026 Paemark Designers Ltd.
                        </p>

                        <span className="text-xs text-white/30">
                            Secure workspace
                        </span>
                    </div>
                </section>

                {/* Login panel */}
                <section className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10">
                    <div className="w-full max-w-[420px]">
                        {/* Mobile brand */}
                        <div className="mb-12 flex items-center gap-3 lg:hidden">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--pmd-green)]">
                                <span className="text-sm font-bold text-white">
                                    P
                                </span>
                            </div>

                            <div>
                                <div className="text-base font-semibold tracking-tight">
                                    Paemark Designers
                                </div>

                                <div className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-[var(--pmd-muted)]">
                                    Possibilities Are Endless
                                </div>
                            </div>
                        </div>

                        <div className="mb-9">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--pmd-green)]">
                                Welcome back
                            </p>

                            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[var(--pmd-text)]">
                                Sign in to PMD
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-[var(--pmd-muted)]">
                                Use your account credentials to continue to
                                your workspace.
                            </p>
                        </div>

                        {errors.general && (
                            <div
                                role="alert"
                                className="mb-6 flex items-start gap-3 rounded-[var(--pmd-radius-md)] border border-red-200 bg-[var(--pmd-danger-soft)] px-4 py-3.5"
                            >
                                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-[var(--pmd-danger)]">
                                    !
                                </div>

                                <p className="text-sm leading-5 text-[var(--pmd-danger)]">
                                    {errors.general[0]}
                                </p>
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            noValidate
                            autoComplete="on"
                            className="space-y-5"
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-[var(--pmd-text)]"
                                >
                                    Email address
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    autoComplete="username"
                                    autoCapitalize="none"
                                    spellCheck={false}
                                    required
                                    disabled={loading}
                                    placeholder="admin@example.com"
                                    className="h-12 w-full rounded-[var(--pmd-radius-md)] border border-[var(--pmd-border)] bg-white px-4 text-sm text-[var(--pmd-text)] shadow-[var(--pmd-shadow-sm)] outline-none transition duration-150 placeholder:text-[var(--pmd-muted)]/50 hover:border-black/15 focus:border-[var(--pmd-green)] focus:ring-4 focus:ring-[var(--pmd-green)]/10 disabled:cursor-not-allowed disabled:opacity-60"
                                />

                                {errors.email && (
                                    <p
                                        role="alert"
                                        className="mt-2 text-xs text-[var(--pmd-danger)]"
                                    >
                                        {errors.email[0]}
                                    </p>
                                )}
                            </div>

                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-[var(--pmd-text)]"
                                    >
                                        Password
                                    </label>
                                </div>

                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={
                                            showPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        value={password}
                                        onChange={(event) =>
                                            setPassword(event.target.value)
                                        }
                                        autoComplete="current-password"
                                        required
                                        disabled={loading}
                                        placeholder="Enter your password"
                                        className="h-12 w-full rounded-[var(--pmd-radius-md)] border border-[var(--pmd-border)] bg-white px-4 pr-20 text-sm text-[var(--pmd-text)] shadow-[var(--pmd-shadow-sm)] outline-none transition duration-150 placeholder:text-[var(--pmd-muted)]/50 hover:border-black/15 focus:border-[var(--pmd-green)] focus:ring-4 focus:ring-[var(--pmd-green)]/10 disabled:cursor-not-allowed disabled:opacity-60"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword((current) => !current)
                                        }
                                        disabled={loading}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-medium text-[var(--pmd-muted)] transition hover:bg-[var(--pmd-bg)] hover:text-[var(--pmd-text)] disabled:opacity-50"
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>

                                {errors.password && (
                                    <p
                                        role="alert"
                                        className="mt-2 text-xs text-[var(--pmd-danger)]"
                                    >
                                        {errors.password[0]}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="group flex h-12 w-full items-center justify-center gap-2 rounded-[var(--pmd-radius-md)] bg-[var(--pmd-green)] px-4 text-sm font-semibold text-white shadow-sm transition duration-150 hover:bg-[var(--pmd-green-dark)] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[var(--pmd-green)]/20 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                        <span>Signing in…</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Sign in</span>
                                        <span className="transition-transform duration-150 group-hover:translate-x-0.5">
                                            →
                                        </span>
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-10 border-t border-[var(--pmd-border)] pt-6">
                            <p className="text-center text-xs leading-5 text-[var(--pmd-muted)]">
                                Your connection is protected by Laravel
                                Sanctum session authentication.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
