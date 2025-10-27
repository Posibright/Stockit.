import { useState, useMemo } from 'react';
import { UserPlus, Edit, Trash2, Search, X } from 'lucide-react';

const Card = ({ children, className = '' }) => (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 ${className}`}>
        {children}
    </div>
);

// Custom CardHeader Component
const CardHeader = ({ children, className = '' }) => (
    // Removed dark styles from border
    <div className={`flex flex-col space-y-1.5 p-6 border-b border-gray-100 ${className}`}>
        {children}
    </div>
);

// Custom CardContent Component
const CardContent = ({ children, className = '' }) => (
    <div className={`p-6 pt-0 ${className}`}>
        {children}
    </div>
);

// Custom CardTitle Component
const CardTitle = ({ children, className = '' }) => (
    // Text will default to black/gray unless overridden
    <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
        {children}
    </h3>
);

// Custom CardDescription Component
const CardDescription = ({ children, className = '' }) => (
    <p className={`text-sm text-gray-500 ${className}`}>
        {children}
    </p>
);

// Custom Button Component
const Button = ({ children, variant = 'default', size = 'default', onClick, type = 'button', className = '', disabled }) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

    let sizeClasses;
    switch (size) {
        case 'sm':
            sizeClasses = 'h-9 px-3 text-sm';
            break;
        case 'lg':
            sizeClasses = 'h-11 px-8';
            break;
        default: // 'default'
            sizeClasses = 'h-10 px-4 py-2';
    }

    let variantClasses;
    switch (variant) {
        case 'destructive':
            // Simplified dark/light colors to use standard primary/hover states
            variantClasses = 'bg-red-600 text-white hover:bg-red-700';
            break;
        case 'outline':
            // Adjusted outline button for clear light mode visibility
            variantClasses = 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-100';
            break;
        case 'ghost':
            // Adjusted ghost button for clear light mode visibility
            variantClasses = 'hover:bg-gray-100 text-gray-900';
            break;
        default: // 'default' (Primary color)
            variantClasses = 'bg-indigo-600 text-white hover:bg-indigo-700';
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

// Custom Badge Component
const Badge = ({ children, variant = 'default', className = '' }) => {
    let variantClasses;
    switch (variant) {
        case 'secondary': // Used for Worker role - light gray background
            variantClasses = 'bg-gray-100 text-gray-800';
            break;
        case 'destructive':
            variantClasses = 'bg-red-100 text-red-800';
            break;
        default: // 'default' (Used for Admin role)
            variantClasses = 'bg-indigo-500 text-white';
    }
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variantClasses} ${className}`}>
      {children}
    </span>
    );
};

// Custom Input Component
const Input = ({ id, value, onChange, placeholder, type = 'text', required, className = '' }) => (
    <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        // Adjusted input for light mode consistency
        className={`flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
);

// Custom Select components (Simplified)
const Select = ({ value, onValueChange, children }) => (
    // Adjusted select for light mode consistency
    <select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
    >
        {children}
    </select>
);

// Custom Label Component
const Label = ({ htmlFor, children, className = '' }) => (
    <label htmlFor={htmlFor} className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}>
        {children}
    </label>
);

// Custom Table Components
const Table = ({ children, className = '' }) => (
    <table className={`w-full caption-bottom text-sm ${className}`}>{children}</table>
);
const TableHeader = ({ children, className = '' }) => (
    <thead className={`[&_tr]:border-b ${className}`}>{children}</thead>
);
const TableBody = ({ children, className = '' }) => (
    <tbody className={`[&_tr:last-child]:border-0 ${className}`}>{children}</tbody>
);
const TableRow = ({ children, className = '' }) => (
    // Adjusted row hover for light mode
    <tr className={`border-b transition-colors hover:bg-gray-50 ${className}`}>{children}</tr>
);
const TableHead = ({ children, className = '' }) => (
    // Adjusted header text color for light mode
    <th className={`h-12 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0 ${className}`}>
        {children}
    </th>
);
const TableCell = ({ children, className = '' }) => (
    // Adjusted cell text color for light mode
    <td className={`p-4 align-middle text-gray-900 [&:has([role=checkbox])]:pr-0 ${className}`}>
        {children}
    </td>
);
// --- End Custom Components ---

// The main UserManagement Component
export default function UserManagement() {
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Worker', status: 'Active' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Worker', status: 'Active' },
        { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'Worker', status: 'Inactive' },
    ]);

    const [showAddUser, setShowAddUser] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        role: 'Worker',
        password: '',
    });

    const filteredUsers = useMemo(() => {
        const query = searchQuery.toLowerCase();
        return users.filter(user =>
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query)
        );
    }, [users, searchQuery]);

    const handleAddUser = (e) => {
        e.preventDefault();

        // Basic validation
        if (!newUser.name || !newUser.email || !newUser.password) return;

        const user = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            status: 'Active',
        };
        setUsers([...users, user]);
        setNewUser({ name: '', email: '', role: 'Worker', password: '' });
        setShowAddUser(false);
    };

    const handleDeleteUser = (id) => {
        setUsers(users.filter(u => u.id !== id));
    };

    const toggleUserStatus = (id) => {
        setUsers(users.map(u =>
            u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u
        ));
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
            <div className="max-w-6xl mx-auto space-y-8">
                <Card className="shadow-2xl">
                    <CardHeader>
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div>
                                <CardTitle>User Management</CardTitle>
                                <CardDescription>Manage system users and their permissions in real-time.</CardDescription>
                            </div>
                            <Button onClick={() => setShowAddUser(true)} className="w-full md:w-auto">
                                <UserPlus className="h-4 w-4 mr-2" />
                                Add New User
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {/* Search Input */}
                        <div className="mb-6">
                            <div className="relative">
                                {/* Text color adjusted to gray-400 for light mode */}
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search users by name or email..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 focus-visible:ring-indigo-600 transition duration-150"
                                />
                            </div>
                        </div>

                        {/* User Table */}
                        <div className="rounded-xl border border-gray-200 overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    {/* Table header row set to light gray background */}
                                    <TableRow className="bg-gray-50">
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredUsers.length > 0 ? (
                                        filteredUsers.map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell className="font-medium">{user.name}</TableCell>
                                                {/* Text color adjusted for light mode */}
                                                <TableCell className="text-gray-600">{user.email}</TableCell>
                                                <TableCell>
                                                    {/* Role Badge: Admin uses default (Indigo), Worker uses secondary (Gray) */}
                                                    <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>
                                                        {user.role}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    {/* Status Badge: Active uses Emerald, Inactive uses Amber */}
                                                    <Badge
                                                        className={user.status === 'Active'
                                                            ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                                            : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                                        }
                                                    >
                                                        {user.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex gap-2 justify-end">
                                                        {/* Toggle Status Button */}
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => toggleUserStatus(user.id)}
                                                        >
                                                            {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                                                        </Button>
                                                        {/* Delete Button */}
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            onClick={() => handleDeleteUser(user.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                                                No users found matching "{searchQuery}"
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* User Statistics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader className="pb-3 border-none">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-indigo-600">{users.length}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3 border-none">
                            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-emerald-600">{users.filter(u => u.status === 'Active').length}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3 border-none">
                            <CardTitle className="text-sm font-medium">Admins</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-red-600">{users.filter(u => u.role === 'Admin').length}</div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Add User Modal/Overlay */}
            {showAddUser && (
                // Adjusted modal overlay to pure black/white opacity for light mode
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
                    <Card className="w-full max-w-lg animate-scale-in">
                        <CardHeader className="border-none">
                            <div className="flex items-center justify-between">
                                <CardTitle>Add New User</CardTitle>
                                {/* Adjusted close button colors for light mode */}
                                <Button variant="ghost" size="sm" onClick={() => setShowAddUser(false)}>
                                    <X className="h-5 w-5 text-gray-500 hover:text-gray-900" />
                                </Button>
                            </div>
                            <CardDescription>Fill out the details to create a new user account.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleAddUser} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="userName">Full Name</Label>
                                    <Input
                                        id="userName"
                                        value={newUser.name}
                                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="userEmail">Email</Label>
                                    <Input
                                        id="userEmail"
                                        type="email"
                                        value={newUser.email}
                                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="userRole">Role</Label>
                                    <Select
                                        value={newUser.role}
                                        onValueChange={(value) => setNewUser({ ...newUser, role: value })}
                                    >
                                        <option value="Admin">Admin</option>
                                        <option value="Worker">Worker</option>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="userPassword">Password</Label>
                                    <Input
                                        id="userPassword"
                                        type="password"
                                        value={newUser.password}
                                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <Button type="submit" className="flex-1">
                                        <UserPlus className="h-4 w-4 mr-2" />
                                        Add User
                                    </Button>
                                    <Button type="button" variant="outline" onClick={() => setShowAddUser(false)} className="flex-1">
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Global Style for the modal animation (added inline for single-file mandate) */}
            <style>{`
        .animate-scale-in {
          animation: scale-in 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        @keyframes scale-in {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
        </div>
    );
}
