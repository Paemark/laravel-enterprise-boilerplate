'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/auth';

interface NavigationItem {
    label: string;
    description: string;
    icon: string;
}

const navigation: NavigationItem[] = [
    {
        label: 'Dashboard',
        description: 'Overview',
        icon: 'grid',
    },
    {
        label: 'Content',
        description: 'Manage content',
        icon: 'file',
    },
    {
        label: 'Projects',
        description: 'Your projects',
        icon: 'folder',
    },
    {
        label: 'Media',
        description: 'Images and assets',
        icon: 'image',
    },
    {
        label: 'Settings',
        description: 'Workspace settings',
        icon: 'settings',
    },
];

function NavigationIcon({ type }: { type: string }) {
    if (type === 'grid') {
        return (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-[18px] w-[18px]"
                aria-hidden="true"
            >
                <rect x="4" y="4" width="6" height="6" rx="1" />
                <rect x="14" y="4" width="6" height="6" rx="1" />
                <rect x="4" y="14" width="6" height="6" rx="1" />
                <rect x="14" y="14" width="6" height="6" rx="1" />
            </svg>
        );
    }

    if (type === 'file') {
        return (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-[18px] w-[18px]"
                aria-hidden="true"
            >
                <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                <path d="M14 3v6h6" />
                <path d="M8 13h8M8 17h5" />
            </svg>
        );
    }

    if (type === 'folder') {
        return (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-[18px] w-[18px]"
                aria-hidden="true"
            >
                <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
        );
    }

    if (type === 'image') {
        return (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-[18px] w-[18px]"
                aria-hidden="true"
            >
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <circle cx="8.5" cy="9" r="1.5" />
                <path d="m4 17 5-5 4 4 2-2 5 5" />
            </svg>
        );
    }

    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="h-[18px] w-[18px]"
            aria-hidden="true"
        >
            <path d="M12 3v2M12 19v2M3 12h2M19 12h2" />
            <path d="m5.64 5.64 1.42 1.42M16.94 16.94l1.42 1.42M18.36 5.64l-1.42 1.42M7.06 16.94l-1.42 1.42" />
            <circle cx="12" cy="12" r="4" />
        </svg>
    );
}

function HeaderIcon({
    type,
    className = 'h-5 w-5',
}: {
    type: 'search' | 'bell' | 'menu' | 'close';
    className?: string;
}) {
    if (type === 'search') {
        return (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className={className}
                aria-hidden="true"
            >
                <circle cx="11" cy="11" r="6.5" />
                <path d="m16 16 4 4" />
            </svg>
        );
    }

    if (type === 'bell') {
        return (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className={className}
                aria-hidden="true"
            >
                <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                <path d="M10 21h4" />
            </svg>
        );
    }

    if (type === 'close') {
        return (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className={className}
                aria-hidden="true"
            >
                <path d="m6 6 12 12M18 6 6 18" />
            </svg>
        );
    }

    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className={className}
            aria-hidden="true"
        >
            <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
    );
}

export default function DashboardPage() {
    const { user, logout, isLoading } = useAuth({ middleware: 'auth' });
    const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false);

    if (isLoading || !user) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[var(--pmd-bg)]">
                <div className="flex items-center gap-3 text-sm text-[var(--pmd-muted)]">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/10 border-t-[var(--pmd-green)]" />
                    Loading workspace…
                </div>
            </main>
        );
    }

    const firstName = user.name.split(' ')[0];

    return (
        <div className="min-h-screen bg-[var(--pmd-bg)] text-[var(--pmd-text)]">
            {/* Mobile navigation overlay */}
            {mobileNavigationOpen && (
                <div
                    className="fixed inset-0 z-40 bg-[var(--pmd-navy)]/40 backdrop-blur-sm lg:hidden"
                    onClick={() => setMobileNavigationOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-[var(--pmd-border)] bg-white transition-transform duration-200 lg:translate-x-0 ${
                    mobileNavigationOpen
                        ? 'translate-x-0'
                        : '-translate-x-full'
                }`}
            >
                <div className="flex h-[76px] items-center justify-between border-b border-[var(--pmd-border)] px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--pmd-green)]">
                            <span className="text-sm font-bold text-white">
                                P
                            </span>
                        </div>

                        <div>
                            <div className="text-sm font-semibold tracking-tight">
                                Paemark Designers
                            </div>

                            <div className="text-[9px] uppercase tracking-[0.17em] text-[var(--pmd-muted)]">
                                Workspace
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setMobileNavigationOpen(false)}
                        className="rounded-lg p-2 text-[var(--pmd-muted)] hover:bg-[var(--pmd-bg)] hover:text-[var(--pmd-text)] lg:hidden"
                        aria-label="Close navigation"
                    >
                        <HeaderIcon type="close" className="h-5 w-5" />
                    </button>
                </div>

                <nav className="p-4" aria-label="Main navigation">
                    <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--pmd-muted)]">
                        Workspace
                    </p>

                    <div className="space-y-1">
                        {navigation.map((item, index) => {
                            const active = index === 0;

                            return (
                                <button
                                    type="button"
                                    key={item.label}
                                    onClick={() =>
                                        setMobileNavigationOpen(false)
                                    }
                                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
                                        active
                                            ? 'bg-[var(--pmd-green-soft)] text-[var(--pmd-green-dark)]'
                                            : 'text-[var(--pmd-muted)] hover:bg-[var(--pmd-bg)] hover:text-[var(--pmd-text)]'
                                    }`}
                                >
                                    <span
                                        className={
                                            active
                                                ? 'text-[var(--pmd-green)]'
                                                : 'text-[var(--pmd-muted)]'
                                        }
                                    >
                                        <NavigationIcon type={item.icon} />
                                    </span>

                                    <span className="min-w-0">
                                        <span className="block text-sm font-medium">
                                            {item.label}
                                        </span>

                                        <span className="mt-0.5 block text-[10px] opacity-60">
                                            {item.description}
                                        </span>
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </nav>

                <div className="mt-auto p-4">
                    <div className="rounded-xl bg-[var(--pmd-navy)] p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--pmd-green)]">
                            PMD
                        </p>

                        <p className="mt-2 text-xs leading-5 text-white/55">
                            Possibilities Are Endless.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={logout}
                        className="mt-3 flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--pmd-muted)] transition hover:bg-[var(--pmd-bg)] hover:text-[var(--pmd-text)]"
                    >
                        <span>Sign out</span>

                        <span aria-hidden="true">→</span>
                    </button>
                </div>
            </aside>

            {/* Main */}
            <div className="lg:pl-[260px]">
                <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-[var(--pmd-border)] bg-white/95 px-5 backdrop-blur sm:px-8">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setMobileNavigationOpen(true)}
                            className="rounded-lg p-2 text-[var(--pmd-muted)] hover:bg-[var(--pmd-bg)] hover:text-[var(--pmd-text)] lg:hidden"
                            aria-label="Open navigation"
                        >
                            <HeaderIcon type="menu" />
                        </button>

                        <div className="lg:hidden">
                            <div className="text-sm font-semibold">
                                PMD Workspace
                            </div>
                        </div>

                        <div className="hidden items-center gap-2 text-xs text-[var(--pmd-muted)] lg:flex">
                            <span>Workspace</span>
                            <span>/</span>
                            <span className="font-medium text-[var(--pmd-text)]">
                                Dashboard
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                        <button
                            type="button"
                            className="hidden rounded-lg p-2.5 text-[var(--pmd-muted)] transition hover:bg-[var(--pmd-bg)] hover:text-[var(--pmd-text)] sm:block"
                            aria-label="Search"
                        >
                            <HeaderIcon type="search" />
                        </button>

                        <button
                            type="button"
                            className="relative rounded-lg p-2.5 text-[var(--pmd-muted)] transition hover:bg-[var(--pmd-bg)] hover:text-[var(--pmd-text)]"
                            aria-label="Notifications"
                        >
                            <HeaderIcon type="bell" />

                            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[var(--pmd-green)]" />
                        </button>

                        <div className="ml-1 flex items-center gap-3 border-l border-[var(--pmd-border)] pl-3 sm:pl-4">
                            <div className="hidden text-right sm:block">
                                <p className="text-xs font-semibold">
                                    {user.name}
                                </p>

                                <p className="mt-0.5 text-[10px] text-[var(--pmd-muted)]">
                                    {user.email}
                                </p>
                            </div>

                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--pmd-navy)] text-xs font-semibold text-white">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                <main className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
                    <section className="mb-9">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--pmd-green)]">
                            Dashboard
                        </p>

                        <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                            <div>
                                <h1 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                                    Good to see you, {firstName}.
                                </h1>

                                <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--pmd-muted)]">
                                    Here is a quick overview of your PMD
                                    workspace.
                                </p>
                            </div>

                            <div className="text-xs text-[var(--pmd-muted)]">
                                Sunday, 20 September 2026
                            </div>
                        </div>
                    </section>

                    {/* Stats */}
                    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-[var(--pmd-radius-lg)] border border-[var(--pmd-border)] bg-white p-5 shadow-[var(--pmd-shadow-sm)]">
                            <div className="flex items-start justify-between">
                                <p className="text-xs font-medium text-[var(--pmd-muted)]">
                                    Projects
                                </p>

                                <span className="rounded-md bg-[var(--pmd-green-soft)] px-2 py-1 text-[10px] font-semibold text-[var(--pmd-green-dark)]">
                                    Active
                                </span>
                            </div>

                            <p className="mt-5 text-3xl font-semibold tracking-tight">
                                0
                            </p>

                            <p className="mt-2 text-xs text-[var(--pmd-muted)]">
                                No projects added yet
                            </p>
                        </div>

                        <div className="rounded-[var(--pmd-radius-lg)] border border-[var(--pmd-border)] bg-white p-5 shadow-[var(--pmd-shadow-sm)]">
                            <p className="text-xs font-medium text-[var(--pmd-muted)]">
                                Content
                            </p>

                            <p className="mt-5 text-3xl font-semibold tracking-tight">
                                0
                            </p>

                            <p className="mt-2 text-xs text-[var(--pmd-muted)]">
                                Content items
                            </p>
                        </div>

                        <div className="rounded-[var(--pmd-radius-lg)] border border-[var(--pmd-border)] bg-white p-5 shadow-[var(--pmd-shadow-sm)]">
                            <p className="text-xs font-medium text-[var(--pmd-muted)]">
                                Media
                            </p>

                            <p className="mt-5 text-3xl font-semibold tracking-tight">
                                0
                            </p>

                            <p className="mt-2 text-xs text-[var(--pmd-muted)]">
                                Uploaded assets
                            </p>
                        </div>

                        <div className="rounded-[var(--pmd-radius-lg)] border border-[var(--pmd-border)] bg-white p-5 shadow-[var(--pmd-shadow-sm)]">
                            <p className="text-xs font-medium text-[var(--pmd-muted)]">
                                Account
                            </p>

                            <p className="mt-5 text-sm font-semibold">
                                Active
                            </p>

                            <p className="mt-2 text-xs text-[var(--pmd-muted)]">
                                {user.email}
                            </p>
                        </div>
                    </section>

                    {/* Main workspace */}
                    <section className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
                        <div className="rounded-[var(--pmd-radius-lg)] border border-[var(--pmd-border)] bg-white shadow-[var(--pmd-shadow-sm)]">
                            <div className="flex items-center justify-between border-b border-[var(--pmd-border)] px-6 py-5">
                                <div>
                                    <h2 className="text-sm font-semibold">
                                        Recent activity
                                    </h2>

                                    <p className="mt-1 text-xs text-[var(--pmd-muted)]">
                                        Activity from your workspace will
                                        appear here.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="text-xs font-medium text-[var(--pmd-green-dark)] hover:text-[var(--pmd-green)]"
                                >
                                    View all
                                </button>
                            </div>

                            <div className="flex min-h-[280px] items-center justify-center px-6 py-10">
                                <div className="max-w-xs text-center">
                                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--pmd-green-soft)] text-[var(--pmd-green-dark)]">
                                        <NavigationIcon type="grid" />
                                    </div>

                                    <h3 className="mt-4 text-sm font-semibold">
                                        Your workspace is ready
                                    </h3>

                                    <p className="mt-2 text-xs leading-5 text-[var(--pmd-muted)]">
                                        Once you start working with projects
                                        and content, your recent activity will
                                        appear here.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[var(--pmd-radius-lg)] border border-[var(--pmd-border)] bg-white shadow-[var(--pmd-shadow-sm)]">
                            <div className="border-b border-[var(--pmd-border)] px-6 py-5">
                                <h2 className="text-sm font-semibold">
                                    Quick actions
                                </h2>

                                <p className="mt-1 text-xs text-[var(--pmd-muted)]">
                                    Common workspace actions.
                                </p>
                            </div>

                            <div className="space-y-2 p-4">
                                <button
                                    type="button"
                                    className="group flex w-full items-center justify-between rounded-lg border border-transparent px-3 py-3 text-left transition hover:border-[var(--pmd-border)] hover:bg-[var(--pmd-bg)]"
                                >
                                    <div>
                                        <p className="text-sm font-medium">
                                            Create a project
                                        </p>

                                        <p className="mt-1 text-xs text-[var(--pmd-muted)]">
                                            Start a new project workspace
                                        </p>
                                    </div>

                                    <span className="text-[var(--pmd-muted)] transition-transform group-hover:translate-x-0.5">
                                        →
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    className="group flex w-full items-center justify-between rounded-lg border border-transparent px-3 py-3 text-left transition hover:border-[var(--pmd-border)] hover:bg-[var(--pmd-bg)]"
                                >
                                    <div>
                                        <p className="text-sm font-medium">
                                            Add content
                                        </p>

                                        <p className="mt-1 text-xs text-[var(--pmd-muted)]">
                                            Create your first content item
                                        </p>
                                    </div>

                                    <span className="text-[var(--pmd-muted)] transition-transform group-hover:translate-x-0.5">
                                        →
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    className="group flex w-full items-center justify-between rounded-lg border border-transparent px-3 py-3 text-left transition hover:border-[var(--pmd-border)] hover:bg-[var(--pmd-bg)]"
                                >
                                    <div>
                                        <p className="text-sm font-medium">
                                            Upload media
                                        </p>

                                        <p className="mt-1 text-xs text-[var(--pmd-muted)]">
                                            Add images and other assets
                                        </p>
                                    </div>

                                    <span className="text-[var(--pmd-muted)] transition-transform group-hover:translate-x-0.5">
                                        →
                                    </span>
                                </button>
                            </div>
                        </div>
                    </section>

                    <footer className="mt-10 border-t border-[var(--pmd-border)] py-6">
                        <div className="flex flex-col justify-between gap-2 text-xs text-[var(--pmd-muted)] sm:flex-row">
                            <p>© 2026 Paemark Designers Ltd.</p>

                            <p>Possibilities Are Endless.</p>
                        </div>
                    </footer>
                </main>
            </div>
        </div>
    );
}
