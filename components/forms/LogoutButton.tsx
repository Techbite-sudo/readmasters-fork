'use client'

import { useRouter } from 'next/navigation'
import { logout } from '@/lib/actions/auth'

export function LogoutButton() {
    const router = useRouter()

    const handleLogout = async () => {
        const result = await logout()
        if (result.success) {
            router.push('/login')
        }
    }

    return (
        <button
            onClick={handleLogout}
            className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
        >
            Logout
        </button>
    )
}