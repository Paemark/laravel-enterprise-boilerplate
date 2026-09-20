<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesPermissionsSeeder extends Seeder
{
    /**
     * Permission groups organized by domain/module.
     * Uses standard Laravel policy verbs for seamless Filament 5.0 integration.
     */
    private const PERMISSION_GROUPS = [
        'users' => [
            'view any users',
            'view users',
            'create users',
            'update users',
            'delete users',
            'restore users',
            'force delete users',
        ],

        'roles' => [
            'view any roles',
            'view roles',
            'create roles',
            'update roles',
            'delete roles',
            'assign roles',
        ],

        'content' => [
            'view any posts',
            'view posts',
            'create posts',
            'update posts',
            'delete posts',
            'restore posts',
            'force delete posts',
        ],

        'finance' => [
            'view any invoices',
            'view invoices',
            'create invoices',
            'update invoices',
            'delete invoices',
            'export financial data',
        ],

        'settings' => [
            'view settings',
            'update settings',
            'manage cache',
            'view audit log',
        ],

        'filament' => [
            // Filament 5.0 standard permission to gate panel access
            'access admin panel',
            'access dashboard widgets',
            'export data',
            'import data',
        ],
    ];

    /**
     * Role definitions with their assigned permissions.
     */
    private const ROLES = [
        'admin' => [
            'description' => 'Full system access. Can manage everything including Filament panel.',
            'permissions' => '*', // Wildcard grants all permissions
            'filament_panel' => true,
        ],

        'staff' => [
            'description' => 'Day-to-day operations. Can manage content and view users.',
            'permissions' => [
                'view any users',
                'view users',
                'view any posts',
                'create posts',
                'update posts',
                'delete posts',
                'restore posts',
                'access admin panel',
                'access dashboard widgets',
            ],
            'filament_panel' => true,
        ],

        'accounts' => [
            'description' => 'Financial management. Can manage invoices and export financial data.',
            'permissions' => [
                'view any users',
                'view users',
                'view any invoices',
                'view invoices',
                'create invoices',
                'update invoices',
                'delete invoices',
                'export financial data',
                'access admin panel',
                'export data',
            ],
            'filament_panel' => true,
        ],

        'client' => [
            'description' => 'Standard frontend user. No admin panel access.',
            'permissions' => [
                'view posts',
                'create posts',
                'update posts', // Scoped to own posts via Policy
                'view invoices', // Scoped to own invoices via Policy
            ],
            'filament_panel' => false,
        ],
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions (Spatie requirement)
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        DB::transaction(function (): void {
            $this->seedPermissions();
            $this->seedRoles();
            $this->seedUsers();
        });

        $this->command?->info('✅ Roles, permissions, and default users seeded successfully.');
    }

    /**
     * Create all permissions grouped by module.
     */
    private function seedPermissions(): void
    {
        $this->command?->info('🔐 Seeding permissions...');

        foreach (self::PERMISSION_GROUPS as $module => $permissions) {
            foreach ($permissions as $permission) {
                // ✅ FIXED: Removed 'group' => $module as it's not in default Spatie schema
                Permission::firstOrCreate(
                    ['name' => $permission, 'guard_name' => 'web']
                );
            }
        }

        $this->command?->info(
            sprintf(
                '   ✓ Created/verified %d permissions across %d modules.',
                Permission::count(),
                count(self::PERMISSION_GROUPS)
            )
        );
    }

    /**
     * Create roles and assign their permissions.
     */
    private function seedRoles(): void
    {
        $this->command?->info('👥 Seeding roles...');

        foreach (self::ROLES as $roleName => $config) {
            // ✅ FIXED: Removed 'description' as it's not in default Spatie schema
            $role = Role::firstOrCreate(
                ['name' => $roleName, 'guard_name' => 'web']
            );

            if ($config['permissions'] === '*') {
                $role->syncPermissions(Permission::all());
            } else {
                $role->syncPermissions($config['permissions']);
            }

            $this->command?->info(
                sprintf(
                    '   ✓ Role [%s] → %d permissions',
                    $roleName,
                    $role->permissions->count()
                )
            );
        }
    }

    /**
     * Create default users and assign roles.
     */
    private function seedUsers(): void
    {
        $this->command?->info('👤 Seeding default users...');

        $users = [
            [
                'name' => 'System Admin',
                'email' => 'admin@boilerplate.com',
                'password' => 'password',
                'role' => 'admin',
            ],
            [
                'name' => 'Staff Member',
                'email' => 'staff@boilerplate.com',
                'password' => 'password',
                'role' => 'staff',
            ],
            [
                'name' => 'Accounts Manager',
                'email' => 'accounts@boilerplate.com',
                'password' => 'password',
                'role' => 'accounts',
            ],
            [
                'name' => 'Regular Client',
                'email' => 'client@boilerplate.com',
                'password' => 'password',
                'role' => 'client',
            ],
        ];

        foreach ($users as $userData) {
            $user = User::updateOrCreate(
                ['email' => $userData['email']],
                [
                    'name' => $userData['name'],
                    'password' => Hash::make($userData['password']),
                    'email_verified_at' => now(),
                ]
            );

            $user->syncRoles([$userData['role']]);

            $this->command?->info(
                sprintf(
                    '   ✓ %s <%s> → role [%s]',
                    $userData['name'],
                    $userData['email'],
                    $userData['role']
                )
            );
        }
    }
}
