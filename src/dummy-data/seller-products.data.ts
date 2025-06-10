import { SellerProduct } from '@/domains/sellerInfo/types';

export const sellerProductsData: SellerProduct[] = [
    // 캣독잇츠 (sellerId: '1') 상품들
    {
        id: '1',
        sellerId: '1',
        name: '치킨져키',
        price: 9900,
        originalPrice: 12000,
        rating: 4.9,
        reviewCount: 250,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUO_U8PEQNn91EQOp0DLhVMVkvJmdV1ZFA0ah1xXTHoeLQftrr6zYDwtp-BQumYcycc4k-Zw9Lff7tvSLqNNxM1QshsSMTeoXUgi2zh1kJq7rgNt1uoTo84W9wO4Mt2v8fN10fNdYN7-Vw3GX3FYWz3-ItxchB8DdTjJjzluaZ3xYMuLml4ezL4raReVersCcU197tC9N1ZAHY0xQMD90B1pE8zwV-TUQXz9cDaaaFFDRRlGPKtYLvj1SPzmKlUGFT96G4utWsIS2w',
        isOutOfStock: false,
        isLiked: false
    },
    {
        id: '2',
        sellerId: '1',
        name: '연어큐브',
        price: 11500,
        rating: 4.7,
        reviewCount: 180,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC31bptOf-1wtwxroStgk7v4jGb4jt7peyzznROZUUX8jP64R8fGO4SQsv904nrtVamgggDo5U5eSHKkEHpiq1Z-Xqgkzv1KzZsQ_pstmoHJBybstzw4bsiIuo8lu4CYjqaz-yBvPsPZG-udRcd3APZRzaZx4uW41C2wfqPKMQNpxBggju-sU__yhtyue5_pFU1-svx23lBBnRdwt1oC3bh2a2YISIvMPnBUsmbvCKv6b8h6nxq1hEm7eSb4j0p0OzZ9DS9d7YaD0yF',
        isOutOfStock: false,
        isLiked: false
    },
    {
        id: '3',
        sellerId: '1',
        name: '소고기 트릿',
        price: 13000,
        rating: 5.0,
        reviewCount: 320,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByFO3-HjDuUPpl8mjHV2wgl8y8lpuTOd50TYWYxmkAMv39dZdHbxllFCWSU0PBr0wZtayZlvcsK1Ket8Hms-51-E1oPvvuIiJAe-EXnbp4Ln5uM8f2CHBXjj1Xe-sjieaZUvp7uvIE-cGpfThCClQ6bZz04pqSmgvboQR_eUg_wAtne8em4TO9BZyeZACVmmxVM7_H4zSWRdGI8ULCACn6SVNOBMhSwk7_KGGrsCP5S9AzM_Es9OGdv6LD6uem-IUpzj-Mv0SM3rHe',
        isOutOfStock: true,
        isLiked: true
    },
    {
        id: '4',
        sellerId: '1',
        name: '오리 안심 스틱',
        price: 10500,
        rating: 4.8,
        reviewCount: 150,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6VfZjrfktTyZeCFuL7wgVu3tOMuwaDKvnxBwcZV255mwD7Qmudmhi79othqTQjZ7-3n5nAp3eviqTG3ukqe-OPlhsNCR4c-bTICGEY3Kkgg8Wa0S9u0OILzE8zeJ2dJLjjvvdPBlymG-UXJ-rE-i9FNPWOj5akcahgOopr-fED_Ps9a4bRxJ1_UDBXoUmun1Thv5qoSKpUpUfqpGYXCehL3XsD11XJimvwkz-Q8xvnLWpHnW6N9Dngo_vLEcCE129zTge3K-mZdLz',
        isOutOfStock: false,
        isLiked: false
    },
    {
        id: '5',
        sellerId: '1',
        name: '양고기 스트립',
        price: 14500,
        originalPrice: 16000,
        rating: 4.6,
        reviewCount: 89,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUO_U8PEQNn91EQOp0DLhVMVkvJmdV1ZFA0ah1xXTHoeLQftrr6zYDwtp-BQumYcycc4k-Zw9Lff7tvSLqNNxM1QshsSMTeoXUgi2zh1kJq7rgNt1uoTo84W9wO4Mt2v8fN10fNdYN7-Vw3GX3FYWz3-ItxchB8DdTjJjzluaZ3xYMuLml4ezL4raReVersCcU197tC9N1ZAHY0xQMD90B1pE8zwV-TUQXz9cDaaaFFDRRlGPKtYLvj1SPzmKlUGFT96G4utWsIS2w',
        isOutOfStock: false,
        isLiked: false
    },
    {
        id: '6',
        sellerId: '1',
        name: '참치 플레이크',
        price: 8900,
        rating: 4.4,
        reviewCount: 67,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC31bptOf-1wtwxroStgk7v4jGb4jt7peyzznROZUUX8jP64R8fGO4SQsv904nrtVamgggDo5U5eSHKkEHpiq1Z-Xqgkzv1KzZsQ_pstmoHJBybstzw4bsiIuo8lu4CYjqaz-yBvPsPZG-udRcd3APZRzaZx4uW41C2wfqPKMQNpxBggju-sU__yhtyue5_pFU1-svx23lBBnRdwt1oC3bh2a2YISIvMPnBUsmbvCKv6b8h6nxq1hEm7eSb4j0p0OzZ9DS9d7YaD0yF',
        isOutOfStock: false,
        isLiked: true
    },
    {
        id: '7',
        sellerId: '1',
        name: '돼지귀 간식',
        price: 7500,
        rating: 4.2,
        reviewCount: 45,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByFO3-HjDuUPpl8mjHV2wgl8y8lpuTOd50TYWYxmkAMv39dZdHbxllFCWSU0PBr0wZtayZlvcsK1Ket8Hms-51-E1oPvvuIiJAe-EXnbp4Ln5uM8f2CHBXjj1Xe-sjieaZUvp7uvIE-cGpfThCClQ6bZz04pqSmgvboQR_eUg_wAtne8em4TO9BZyeZACVmmxVM7_H4zSWRdGI8ULCACn6SVNOBMhSwk7_KGGrsCP5S9AzM_Es9OGdv6LD6uem-IUpzj-Mv0SM3rHe',
        isOutOfStock: false,
        isLiked: false
    },
    {
        id: '8',
        sellerId: '1',
        name: '닭가슴살 큐브',
        price: 12800,
        rating: 4.7,
        reviewCount: 123,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6VfZjrfktTyZeCFuL7wgVu3tOMuwaDKvnxBwcZV255mwD7Qmudmhi79othqTQjZ7-3n5nAp3eviqTG3ukqe-OPlhsNCR4c-bTICGEY3Kkgg8Wa0S9u0OILzE8zeJ2dJLjjvvdPBlymG-UXJ-rE-i9FNPWOj5akcahgOopr-fED_Ps9a4bRxJ1_UDBXoUmun1Thv5qoSKpUpUfqpGYXCehL3XsD11XJimvwkz-Q8xvnLWpHnW6N9Dngo_vLEcCE129zTge3K-mZdLz',
        isOutOfStock: false,
        isLiked: false
    },
    {
        id: '9',
        sellerId: '1',
        name: '말린 고구마',
        price: 6900,
        originalPrice: 8500,
        rating: 4.5,
        reviewCount: 98,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUO_U8PEQNn91EQOp0DLhVMVkvJmdV1ZFA0ah1xXTHoeLQftrr6zYDwtp-BQumYcycc4k-Zw9Lff7tvSLqNNxM1QshsSMTeoXUgi2zh1kJq7rgNt1uoTo84W9wO4Mt2v8fN10fNdYN7-Vw3GX3FYWz3-ItxchB8DdTjJjzluaZ3xYMuLml4ezL4raReVersCcU197tC9N1ZAHY0xQMD90B1pE8zwV-TUQXz9cDaaaFFDRRlGPKtYLvj1SPzmKlUGFT96G4utWsIS2w',
        isOutOfStock: false,
        isLiked: false
    },
    {
        id: '10',
        sellerId: '1',
        name: '새우 칩스',
        price: 15900,
        rating: 4.8,
        reviewCount: 76,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC31bptOf-1wtwxroStgk7v4jGb4jt7peyzznROZUUX8jP64R8fGO4SQsv904nrtVamgggDo5U5eSHKkEHpiq1Z-Xqgkzv1KzZsQ_pstmoHJBybstzw4bsiIuo8lu4CYjqaz-yBvPsPZG-udRcd3APZRzaZx4uW41C2wfqPKMQNpxBggju-sU__yhtyue5_pFU1-svx23lBBnRdwt1oC3bh2a2YISIvMPnBUsmbvCKv6b8h6nxq1hEm7eSb4j0p0OzZ9DS9d7YaD0yF',
        isOutOfStock: false,
        isLiked: false
    },
    {
        id: '11',
        sellerId: '1',
        name: '멸치 스낵',
        price: 5900,
        rating: 4.3,
        reviewCount: 54,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByFO3-HjDuUPpl8mjHV2wgl8y8lpuTOd50TYWYxmkAMv39dZdHbxllFCWSU0PBr0wZtayZlvcsK1Ket8Hms-51-E1oPvvuIiJAe-EXnbp4Ln5uM8f2CHBXjj1Xe-sjieaZUvp7uvIE-cGpfThCClQ6bZz04pqSmgvboQR_eUg_wAtne8em4TO9BZyeZACVmmxVM7_H4zSWRdGI8ULCACn6SVNOBMhSwk7_KGGrsCP5S9AzM_Es9OGdv6LD6uem-IUpzj-Mv0SM3rHe',
        isOutOfStock: false,
        isLiked: false
    },
    {
        id: '12',
        sellerId: '1',
        name: '말린 바나나',
        price: 7200,
        rating: 4.1,
        reviewCount: 32,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6VfZjrfktTyZeCFuL7wgVu3tOMuwaDKvnxBwcZV255mwD7Qmudmhi79othqTQjZ7-3n5nAp3eviqTG3ukqe-OPlhsNCR4c-bTICGEY3Kkgg8Wa0S9u0OILzE8zeJ2dJLjjvvdPBlymG-UXJ-rE-i9FNPWOj5akcahgOopr-fED_Ps9a4bRxJ1_UDBXoUmun1Thv5qoSKpUpUfqpGYXCehL3XsD11XJimvwkz-Q8xvnLWpHnW6N9Dngo_vLEcCE129zTge3K-mZdLz',
        isOutOfStock: true,
        isLiked: false
    },
    {
        id: '13',
        sellerId: '1',
        name: '소간 트릿',
        price: 9800,
        originalPrice: 11500,
        rating: 4.6,
        reviewCount: 87,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUO_U8PEQNn91EQOp0DLhVMVkvJmdV1ZFA0ah1xXTHoeLQftrr6zYDwtp-BQumYcycc4k-Zw9Lff7tvSLqNNxM1QshsSMTeoXUgi2zh1kJq7rgNt1uoTo84W9wO4Mt2v8fN10fNdYN7-Vw3GX3FYWz3-ItxchB8DdTjJjzluaZ3xYMuLml4ezL4raReVersCcU197tC9N1ZAHY0xQMD90B1pE8zwV-TUQXz9cDaaaFFDRRlGPKtYLvj1SPzmKlUGFT96G4utWsIS2w',
        isOutOfStock: false,
        isLiked: false
    },
    {
        id: '14',
        sellerId: '1',
        name: '대구 스틱',
        price: 13500,
        rating: 4.4,
        reviewCount: 65,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC31bptOf-1wtwxroStgk7v4jGb4jt7peyzznROZUUX8jP64R8fGO4SQsv904nrtVamgggDo5U5eSHKkEHpiq1Z-Xqgkzv1KzZsQ_pstmoHJBybstzw4bsiIuo8lu4CYjqaz-yBvPsPZG-udRcd3APZRzaZx4uW41C2wfqPKMQNpxBggju-sU__yhtyue5_pFU1-svx23lBBnRdwt1oC3bh2a2YISIvMPnBUsmbvCKv6b8h6nxq1hEm7eSb4j0p0OzZ9DS9d7YaD0yF',
        isOutOfStock: false,
        isLiked: false
    }
];