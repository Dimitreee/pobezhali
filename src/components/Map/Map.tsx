import { useEffect } from 'react'

export const Map = () => {
    useEffect(() => {
        console.log('mount called')

        return () => {
            console.log('unmount called')
        };
    }, []);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div/>
        </div>
    )
};