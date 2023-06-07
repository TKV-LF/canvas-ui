import { useEffect } from 'react';

export default function useHead({ title }) {
    useEffect(() => {
        document.title = title;
    }, [title]);
}
