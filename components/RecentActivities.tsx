import { formatDate } from '@/lib/utils/date';

export function RecentActivities({ activities }: { activities: Array<{ id: string; user: { name: string }; book: { title: string }; borrowedAt: Date }> }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
            <ul>
                {activities.map((activity) => (
                    <li key={activity.id} className="mb-2">
                        <span className="font-medium">{activity.user.name}</span> borrowed{' '}
                        <span className="font-medium">{activity.book.title}</span> on{' '}
                        {formatDate(activity.borrowedAt)}
                    </li>
                ))}
            </ul>
        </div>
    );
}