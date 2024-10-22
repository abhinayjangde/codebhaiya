'use client'
import React, { useEffect } from 'react';
import Gears from '@/components/Gears';
const MyGears = () => {
    useEffect(() => {
        document.title = 'My Gears - The right way to learn coding'
    }, [])
    return (
        
       <Gears/>     
        
    )
}

export default MyGears