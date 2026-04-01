import { Konkhmer_Sleokchher } from 'next/font/google';
import { Jomhuria } from 'next/font/google';
import { Lilita_One } from 'next/font/google';

export const konkhmer = Konkhmer_Sleokchher({
    subsets: ['latin', 'khmer'],
    weight: ['400']
});

export const johmuria = Jomhuria({
    subsets: ['latin'],
    weight: ['400']
});

export const lilita = Lilita_One({
    subsets: ['latin'],
    weight: ['400']
});