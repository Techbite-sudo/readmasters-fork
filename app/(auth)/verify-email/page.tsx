'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { verifyEmail } from '@/lib/actions/auth';

export default function VerifyEmailPage() {
    const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
    const searchParams = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            verifyEmail(token).then((result) => {
                if (result.error) {
                    setStatus('error');
                } else {
                    setStatus('success');
                }
            });
        } else {
            setStatus('error');
        }
    }, [searchParams]);

    if (status === 'verifying') {
        return <div>Verifying your email...</div>;
    }

    if (status === 'success') {
        return <div>Your email has been verified successfully. You can now log in.</div>;
    } else {
        return <div>There was an error verifying your email. Please try again or contact support.</div>;
    }


}