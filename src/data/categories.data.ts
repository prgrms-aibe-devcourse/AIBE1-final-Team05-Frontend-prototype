import { Category } from '@/components/Home/types';

export const productCategories: Category[] = [
    {
        id: 'dog',
        name: 'dog',
        label: '🐶 강아지용',
        icon: '🐶',
        description: '강아지를 위한 맛있고 건강한 간식',
    },
    {
        id: 'cat',
        name: 'cat',
        label: '🐱 고양이용',
        icon: '🐱',
        description: '까다로운 고양이도 좋아하는 프리미엄 간식',
    },
    {
        id: 'allergy-free',
        name: 'allergy-free',
        label: '🌿 알러지 프리',
        icon: '🌿',
        description: '알러지 걱정 없는 안전한 간식',
    },
    {
        id: 'dental',
        name: 'dental',
        label: '🦷 치석제거',
        icon: '🦷',
        description: '치아 건강을 위한 덴탈 케어 간식',
    },
];

export const contentCategories: Category[] = [
    {
        id: 'new',
        name: 'new',
        label: '✨ 신상품',
        icon: '✨',
        description: '새로 출시된 신상품',
    },
    {
        id: 'bestseller',
        name: 'bestseller',
        label: '🏆 베스트셀러',
        icon: '🏆',
        description: '가장 인기 있는 베스트셀러',
    },
    {
        id: 'sale',
        name: 'sale',
        label: '🔥 특가상품',
        icon: '🔥',
        description: '할인가로 만나는 특가상품',
    },
];