import React, { useState } from 'react';
import {
    Search,
    Home,
    Package,
    FileText,
    Users,
    BarChart3,
    Settings,
    ArrowLeft,
    Send,
    Paperclip,
    MoreVertical,
    Star,
    Filter,
    SortDesc,
    Image,
    ThumbsUp,
    MessageSquare
} from 'lucide-react';

const CustomerManagement = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [reviewFilter, setReviewFilter] = useState('all');
    const [reviewSort, setReviewSort] = useState('latest');

    // 사이드바 메뉴 항목
    const sidebarItems = [
        { icon: Home, text: '홈' },
        { icon: Package, text: '상품 관리' },
        { icon: FileText, text: '주문 관리' },
        { icon: Users, text: '고객 관리', active: true },
        { icon: BarChart3, text: '통계' },
        { icon: Settings, text: '스토어 설정' }
    ];

    // 고객 문의 데이터 (채팅 내역 포함)
    const customerInquiries = [
        {
            id: 1,
            name: '김민지',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOOhzKfV_i1zaCaQATDD7yGTBCnMrGdDmOLv3sB-AI1-r1TLH0JoZSPoanKCOwNtDr_eAvSBHU3pY5f0S4kHzGnxaEoaPCovfKltNYYc1CqoHdK_yeQ8CBJ27WoicTjbDk5z0wZaJnex0x6mg7Dqjs8eIrcQYXDQmV1diLeNLAiZHdELSxFDA0vwzwB5zCB58s-C_L9eHHk5TkT41EnEmr_j6Mqc4letHpEr3Qoj4kSQ18qdQnbqN2V9EaapBXtExVuFwWfZmcPbBj',
            lastMessage: '안녕하세요, 주문한 간식 배송이 언제쯤 시작될까요?',
            unreadCount: 1,
            isOnline: true,
            messages: [
                { id: 1, text: '안녕하세요! 강아지 간식을 주문했는데요', sender: 'customer', time: '14:20' },
                { id: 2, text: '안녕하세요! 주문 확인했습니다. 어떤 제품을 주문하셨나요?', sender: 'admin', time: '14:21' },
                { id: 3, text: '닭가슴살 간식 2팩이요', sender: 'customer', time: '14:22' },
                { id: 4, text: '네, 확인했습니다. 내일 오전 중 배송 시작 예정이에요!', sender: 'admin', time: '14:23' },
                { id: 5, text: '안녕하세요, 주문한 간식 배송이 언제쯤 시작될까요?', sender: 'customer', time: '15:30' }
            ]
        },
        {
            id: 2,
            name: '박지훈',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCncC98rROGNv0h4nVpvi5dukWxFoEdCkyOLkbSSi2TWuKB8ejGTNrxdielZem5ICy5-aaAm2hb5DGHeSBSwdynMR6tadeIJcgNcz-YdnZ8u1gtdQM1M3Bn8Uf4aKJWLmhnOpnMZLR6zNsU9dsmQqtIqNmasyfVm_hd4bClqPY23m38-I1S9Kq962QA9KQDu6zKbRNvqg9D-Chkcmi_ZjW3u15xQs7IbF2Y0G23XBPzqCcqo7qOj7dP8IIAO8b-hOsj0yb0DU7HqgH_',
            lastMessage: '강아지 간식 추천 감사합니다!',
            unreadCount: 0,
            isOnline: false,
            messages: [
                { id: 1, text: '혹시 소화가 잘 되는 강아지 간식 추천해주실 수 있나요?', sender: 'customer', time: '13:10' },
                { id: 2, text: '물론이죠! 연어 간식이나 고구마 간식을 추천드려요', sender: 'admin', time: '13:15' },
                { id: 3, text: '강아지 간식 추천 감사합니다!', sender: 'customer', time: '13:20' }
            ]
        },
        {
            id: 3,
            name: '최수현',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgJD_UB0jy-pWBhRgJxKyp6DWcLjpJGO3Xp17IKuUooeBYAiMI0x_ntEEUtw8_gUXckjrnYdT_VGvaLQEeGW2jixySuctAvRwRzJFoe4mv_7H0LPeTxBt13gNdRbwYi5ZjQIfs-o2nCg4svX07HUraengL8D_3g3hcZJuhAXzpMElX0NojBPvuw9nwCOy0U7vbt3_t_3V6uDjfB01YzLXMAYfIF0lLTcbWpq1Q2F67iteDeHcqw4V5F7VXyL11x_UZZ7Kjhye7xDB-',
            lastMessage: '고양이 간식 문의드립니다.',
            unreadCount: 3,
            isOnline: true,
            messages: [
                { id: 1, text: '고양이가 참치를 좋아하는데 참치 간식 있나요?', sender: 'customer', time: '12:30' },
                { id: 2, text: '고양이 간식 문의드립니다.', sender: 'customer', time: '14:45' },
                { id: 3, text: '혹시 답변 가능하신가요?', sender: 'customer', time: '15:20' }
            ]
        },
        {
            id: 4,
            name: '이준호',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGP-PWT_bfOxCp3Zl4pHDwAoa5wMXmDR0_jmgKkwm7R3082O5zjA1J3Jv4pjY0h0GvfdG2ndUKO8rVTvzXrBDslpfKe4aiVQT4xYqKhIS81kAA_aqzDy5vq2a_4wBdMuWwzVpWwHnxEGuC1Kf-TVll2UnceXHRKj7zDFYkUL57mK08qZHnWGun9bwGSrq_9fwFd6unVlZKdNLOSyjHyOL6KDlw8rbRIBnRxfMYEOZO4iMl-8cujm7Mdy_3exeBJOpj4piy1_Pbej0x',
            lastMessage: '주문 취소 요청합니다.',
            unreadCount: 0,
            isOnline: false,
            messages: [
                { id: 1, text: '주문 취소 요청합니다.', sender: 'customer', time: '11:30' },
                { id: 2, text: '어떤 주문을 취소하고 싶으신가요?', sender: 'admin', time: '11:35' },
                { id: 3, text: '어제 주문한 강아지 사료요', sender: 'customer', time: '11:40' }
            ]
        },
        {
            id: 5,
            name: '정하은',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxlncJFbwPaUoEabiwVBtX1ipxf6gjjZQdKZY-k7KDw9ofcDdH-aDNQ_GIRcesO0dXlDZcBeGxDd_GfOnmCdXK6g6AE45uIyo5Ist-XEA41iz74EkdBfBC1Y7BhF3znJYDLUB6T2w6mhidBoGPirWs07vsux_cRnHhNg54t033KBZOHJytZN9ajnyfUwJURCmn8d2Fx8nuVpkBRID9YxnyBxxcLEfu1wH18UalKI_pLUZqGnWBJI89KYv34nHht04PIayOYyOu1qTF',
            lastMessage: '간식 알레르기 성분 문의',
            unreadCount: 1,
            isOnline: true,
            messages: [
                { id: 1, text: '안녕하세요, 강아지가 알레르기가 있어서요', sender: 'customer', time: '16:10' },
                { id: 2, text: '간식 알레르기 성분 문의', sender: 'customer', time: '16:15' }
            ]
        },
        {
            id: 6,
            name: '윤태준',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1ceLkUaJLtum-2P4T-tVesN9fiFoHWVDVGR_MVBfz_guLsydRhoF1D0Y6jDXnuBC_wvg6Fv8k-putmN6ZSZvYrchv5t29XbOAhv02FyA535PlmmdwQQ-1dmJ_CkAzMg305RCgn-Qs-u-k7aXJRKphH8zJ0B2tttCCuZGF7inYVzXOG8GG9MJBWGGQNQuHJN6YOu1MTFiR6-ueKXasKG2xmAUMq1TlqMMe0t37JiHcQqQZY_2wTtoq67DdFXkrvs4q0CKCFOrhJW4X',
            lastMessage: '간식 보관 방법 문의',
            unreadCount: 0,
            isOnline: false,
            messages: [
                { id: 1, text: '간식 보관 방법 문의', sender: 'customer', time: '10:30' },
                { id: 2, text: '어떤 간식을 보관하시려고 하나요?', sender: 'admin', time: '10:35' }
            ]
        }
    ];

    // 상품 리뷰 데이터 (제품별로 구조화)
    const productReviews = {
        products: [
            {
                id: 1,
                name: '프리미엄 닭가슴살 간식',
                image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=80&h=80&fit=crop',
                averageRating: 5.0,
                totalReviews: 1,
                reviews: [
                    {
                        id: 1,
                        customerName: '김민지',
                        customerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOOhzKfV_i1zaCaQATDD7yGTBCnMrGdDmOLv3sB-AI1-r1TLH0JoZSPoanKCOwNtDr_eAvSBHU3pY5f0S4kHzGnxaEoaPCovfKltNYYc1CqoHdK_yeQ8CBJ27WoicTjbDk5z0wZaJnex0x6mg7Dqjs8eIrcQYXDQmV1diLeNLAiZHdELSxFDA0vwzwB5zCB58s-C_L9eHHk5TkT41EnEmr_j6Mqc4letHpEr3Qoj4kSQ18qdQnbqN2V9EaapBXtExVuFwWfZmcPbBj',
                        rating: 5,
                        reviewText: '우리 강아지가 정말 좋아해요! 품질도 좋고 포장도 깔끔하게 되어있어서 만족합니다. 다음에도 주문할 예정이에요.',
                        reviewDate: '2024.06.08',
                        images: [
                            'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=300&fit=crop',
                            'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop'
                        ],
                        helpful: 12
                    }
                ]
            },
            {
                id: 2,
                name: '고양이 참치 간식',
                image: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=80&h=80&fit=crop',
                averageRating: 4.0,
                totalReviews: 1,
                reviews: [
                    {
                        id: 2,
                        customerName: '박지훈',
                        customerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCncC98rROGNv0h4nVpvi5dukWxFoEdCkyOLkbSSi2TWuKB8ejGTNrxdielZem5ICy5-aaAm2hb5DGHeSBSwdynMR6tadeIJcgNcz-YdnZ8u1gtdQM1M3Bn8Uf4aKJWLmhnOpnMZLR6zNsU9dsmQqtIqNmasyfVm_hd4bClqPY23m38-I1S9Kq962QA9KQDu6zKbRNvqg9D-Chkcmi_ZjW3u15xQs7IbF2Y0G23XBPzqCcqo7qOj7dP8IIAO8b-hOsj0yb0DU7HqgH_',
                        rating: 4,
                        reviewText: '고양이가 맛있게 먹네요. 다만 양이 조금 적은 것 같아요.',
                        reviewDate: '2024.06.07',
                        images: [],
                        helpful: 8
                    }
                ]
            },
            {
                id: 3,
                name: '프리미엄 연어 간식',
                image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=80&h=80&fit=crop',
                averageRating: 5.0,
                totalReviews: 1,
                reviews: [
                    {
                        id: 3,
                        customerName: '최수현',
                        customerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgJD_UB0jy-pWBhRgJxKyp6DWcLjpJGO3Xp17IKuUooeBYAiMI0x_ntEEUtw8_gUXckjrnYdT_VGvaLQEeGW2jixySuctAvRwRzJFoe4mv_7H0LPeTxBt13gNdRbwYi5ZjQIfs-o2nCg4svX07HUraengL8D_3g3hcZJuhAXzpMElX0NojBPvuw9nwCOy0U7vbt3_t_3V6uDjfB01YzLXMAYfIF0lLTcbWpq1Q2F67iteDeHcqw4V5F7VXyL11x_UZZ7Kjhye7xDB-',
                        rating: 5,
                        reviewText: '연어 냄새가 정말 좋고 우리 고양이가 미쳐요! 건강한 재료로 만든 것 같아서 안심하고 줄 수 있어요. 강력 추천합니다!',
                        reviewDate: '2024.06.06',
                        images: [
                            'https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=300&h=300&fit=crop'
                        ],
                        helpful: 15
                    }
                ]
            },
            {
                id: 4,
                name: '강아지 덴탈 껌',
                image: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=80&h=80&fit=crop',
                averageRating: 3.0,
                totalReviews: 1,
                reviews: [
                    {
                        id: 4,
                        customerName: '이준호',
                        customerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGP-PWT_bfOxCp3Zl4pHDwAoa5wMXmDR0_jmgKkwm7R3082O5zjA1J3Jv4pjY0h0GvfdG2ndUKO8rVTvzXrBDslpfKe4aiVQT4xYqKhIS81kAA_aqzDy5vq2a_4wBdMuWwzVpWwHnxEGuC1Kf-TVll2UnceXHRKj7zDFYkUL57mK08qZHnWGun9bwGSrq_9fwFd6unVlZKdNLOSyjHyOL6KDlw8rbRIBnRxfMYEOZO4iMl-8cujm7Mdy_3exeBJOpj4piy1_Pbej0x',
                        rating: 3,
                        reviewText: '치석 제거에는 도움이 되는 것 같은데, 우리 강아지가 별로 좋아하지 않네요.',
                        reviewDate: '2024.06.05',
                        images: [],
                        helpful: 3
                    }
                ]
            },
            {
                id: 5,
                name: '고구마 간식',
                image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=80&h=80&fit=crop',
                averageRating: 4.0,
                totalReviews: 1,
                reviews: [
                    {
                        id: 5,
                        customerName: '정하은',
                        customerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxlncJFbwPaUoEabiwVBtX1ipxf6gjjZQdKZY-k7KDw9ofcDdH-aDNQ_GIRcesO0dXlDZcBeGxDd_GfOnmCdXK6g6AE45uIyo5Ist-XEA41iz74EkdBfBC1Y7BhF3znJYDLUB6T2w6mhidBoGPirWs07vsux_cRnHhNg54t033KBZOHJytZN9ajnyfUwJURCmn8d2Fx8nuVpkBRID9YxnyBxxcLEfu1wH18UalKI_pLUZqGnWBJI89KYv34nHht04PIayOYyOu1qTF',
                        rating: 4,
                        reviewText: '천연 재료라서 좋아요. 강아지가 잘 먹어요.',
                        reviewDate: '2024.06.04',
                        images: [
                            'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=300&h=300&fit=crop',
                            'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop',
                            'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=300&fit=crop'
                        ],
                        helpful: 7
                    }
                ]
            },
            {
                id: 6,
                name: '프리미엄 사료',
                image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=80&h=80&fit=crop',
                averageRating: 2.0,
                totalReviews: 1,
                reviews: [
                    {
                        id: 6,
                        customerName: '윤태준',
                        customerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1ceLkUaJLtum-2P4T-tVesN9fiFoHWVDVGR_MVBfz_guLsydRhoF1D0Y6jDXnuBC_wvg6Fv8k-putmN6ZSZvYrchv5t29XbOAhv02FyA535PlmmdwQQ-1dmJ_CkAzMg305RCgn-Qs-u-k7aXJRKphH8zJ0B2tttCCuZGF7inYVzXOG8GG9MJBWGGQNQuHJN6YOu1MTFiR6-ueKXasKG2xmAUMq1TlqMMe0t37JiHcQqQZY_2wTtoq67DdFXkrvs4q0CKCFOrhJW4X',
                        rating: 2,
                        reviewText: '가격 대비 품질이 아쉬워요. 강아지가 잘 안 먹네요.',
                        reviewDate: '2024.06.03',
                        images: [],
                        helpful: 1
                    }
                ]
            }
        ]
    };

    // 이벤트 핸들러
    const handleTabChange = (tabIndex) => {
        setActiveTab(tabIndex);
        setSelectedCustomer(null);
    };

    const handleCustomerClick = (customer) => {
        setSelectedCustomer(customer);
    };

    const handleBackToList = () => {
        setSelectedCustomer(null);
    };

    const handleSendMessage = () => {
        if (newMessage.trim() && selectedCustomer) {
            const newMsg = {
                id: Date.now(),
                text: newMessage,
                sender: 'admin',
                time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false })
            };

            console.log('메시지 전송:', newMsg);
            setNewMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // 리뷰 필터링 및 정렬
    const getFilteredProducts = () => {
        let filtered = [...productReviews.products];

        if (reviewFilter !== 'all') {
            const rating = parseInt(reviewFilter.replace('star', ''));
            filtered = filtered.filter(product => Math.round(product.averageRating) === rating);
        }

        filtered.sort((a, b) => {
            switch (reviewSort) {
                case 'latest':
                    const aLatest = Math.max(...a.reviews.map(r => new Date(r.reviewDate)));
                    const bLatest = Math.max(...b.reviews.map(r => new Date(r.reviewDate)));
                    return bLatest - aLatest;
                case 'oldest':
                    const aOldest = Math.min(...a.reviews.map(r => new Date(r.reviewDate)));
                    const bOldest = Math.min(...b.reviews.map(r => new Date(r.reviewDate)));
                    return aOldest - bOldest;
                case 'rating-high':
                    return b.averageRating - a.averageRating;
                case 'rating-low':
                    return a.averageRating - b.averageRating;
                default:
                    return 0;
            }
        });

        return filtered;
    };

    // 전체 평점 통계 계산
    const getOverallReviewStats = () => {
        const allReviews = productReviews.products.flatMap(product => product.reviews);
        const totalReviews = allReviews.length;
        const averageRating = allReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;

        const ratingCounts = {
            5: allReviews.filter(r => r.rating === 5).length,
            4: allReviews.filter(r => r.rating === 4).length,
            3: allReviews.filter(r => r.rating === 3).length,
            2: allReviews.filter(r => r.rating === 2).length,
            1: allReviews.filter(r => r.rating === 1).length,
        };

        return { totalReviews, averageRating, ratingCounts };
    };

    // 별점 렌더링 컴포넌트
    const renderStars = (rating, size = 'w-4 h-4') => {
        return (
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`${size} ${
                            star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                    />
                ))}
            </div>
        );
    };

    // 채팅창 컴포넌트
    const renderChatWindow = () => {
        if (!selectedCustomer) return null;

        return (
            <div className="flex flex-col h-full bg-white border-l border-gray-200">
                {/* 채팅 헤더 */}
                <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-white">
                    <button
                        onClick={handleBackToList}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>

                    <div className="relative">
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 h-10 shadow-sm"
                            style={{ backgroundImage: `url('${selectedCustomer.avatar}')` }}
                        />
                        {selectedCustomer.isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                    </div>

                    <div className="flex-grow">
                        <h3 className="text-[#181411] font-semibold text-base">
                            {selectedCustomer.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {selectedCustomer.isOnline ? '온라인' : '오프라인'}
                        </p>
                    </div>

                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* 메시지 영역 */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {selectedCustomer.messages?.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                                    message.sender === 'admin'
                                        ? 'bg-[#eb7f13] text-white rounded-br-md'
                                        : 'bg-gray-100 text-[#181411] rounded-bl-md'
                                }`}
                            >
                                <p className="text-sm leading-relaxed">{message.text}</p>
                                <p className={`text-xs mt-1 ${
                                    message.sender === 'admin' ? 'text-orange-100' : 'text-gray-500'
                                }`}>
                                    {message.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 메시지 입력창 */}
                <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex items-end gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Paperclip className="w-5 h-5 text-gray-600" />
                        </button>

                        <div className="flex-1">
              <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="메시지를 입력하세요..."
                  className="w-full p-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#eb7f13] focus:border-transparent text-sm"
                  rows={1}
                  style={{ minHeight: '44px' }}
              />
                        </div>

                        <button
                            onClick={handleSendMessage}
                            disabled={!newMessage.trim()}
                            className={`p-3 rounded-xl transition-colors ${
                                newMessage.trim()
                                    ? 'bg-[#eb7f13] text-white hover:bg-[#d97706]'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // 고객 목록 컴포넌트
    const renderCustomerInquiries = () => (
        <div className="h-full">
            <h2 className="text-[#181411] text-2xl font-bold leading-tight tracking-[-0.01em]">
                고객 문의
            </h2>

            {/* 검색창 */}
            <div className="relative mt-6">
                <label className="flex flex-col min-w-40 h-14 w-full">
                    <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-sm border border-gray-200">
                        <div className="text-gray-500 flex bg-gray-50 items-center justify-center pl-4 rounded-l-xl border-r border-gray-200">
                            <Search size={24} />
                        </div>
                        <input
                            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-xl text-[#181411] focus:outline-none focus:ring-2 focus:ring-[#eb7f13] focus:border-transparent bg-white h-full placeholder:text-gray-500 px-4 text-base font-normal leading-normal"
                            placeholder="채팅방 검색"
                        />
                    </div>
                </label>
            </div>

            {/* 고객 목록 */}
            <div className="space-y-1 mt-6">
                {customerInquiries.map((customer) => (
                    <div
                        key={customer.id}
                        className={`flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-150 cursor-pointer border ${
                            selectedCustomer?.id === customer.id
                                ? 'bg-[#fff7ed] border-[#eb7f13]'
                                : 'bg-white border-transparent hover:border-gray-200'
                        }`}
                        onClick={() => handleCustomerClick(customer)}
                    >
                        <div className="relative">
                            <div
                                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-12 h-12 shadow-sm"
                                style={{ backgroundImage: `url('${customer.avatar}')` }}
                            />
                            {customer.isOnline && (
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                            )}
                        </div>

                        <div className="flex-grow">
                            <p className="text-[#181411] text-base font-medium leading-normal line-clamp-1">
                                {customer.name}
                            </p>
                            <p className="text-gray-600 text-sm font-normal leading-normal line-clamp-1">
                                {customer.lastMessage}
                            </p>
                        </div>

                        {customer.unreadCount > 0 && (
                            <div className="shrink-0">
                                <div className="flex w-8 h-8 items-center justify-center bg-[#eb7f13] text-white rounded-full text-xs font-semibold">
                                    {customer.unreadCount}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderProductReviews = () => {
        const stats = getOverallReviewStats();
        const filteredProducts = getFilteredProducts();

        return (
            <div className="h-full">
                <h2 className="text-[#181411] text-2xl font-bold leading-tight tracking-[-0.01em]">
                    상품 리뷰
                </h2>

                {/* 전체 리뷰 통계 */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
                    <div className="flex items-center gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-[#181411] mb-1">
                                {stats.averageRating.toFixed(1)}
                            </div>
                            <div className="flex justify-center mb-2">
                                {renderStars(Math.round(stats.averageRating), 'w-5 h-5')}
                            </div>
                            <div className="text-sm text-gray-600">
                                총 {stats.totalReviews}개 리뷰
                            </div>
                        </div>

                        <div className="flex-1">
                            {[5, 4, 3, 2, 1].map(rating => (
                                <div key={rating} className="flex items-center gap-3 mb-2">
                                    <span className="text-sm text-gray-600 w-8">{rating}점</span>
                                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-[#eb7f13] h-2 rounded-full transition-all duration-300"
                                            style={{
                                                width: `${stats.totalReviews > 0 ? (stats.ratingCounts[rating] / stats.totalReviews) * 100 : 0}%`
                                            }}
                                        />
                                    </div>
                                    <span className="text-sm text-gray-600 w-6">
                    {stats.ratingCounts[rating]}
                  </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 필터 및 정렬 */}
                <div className="flex flex-wrap items-center gap-4 mt-6">
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-gray-600" />
                        <select
                            value={reviewFilter}
                            onChange={(e) => setReviewFilter(e.target.value)}
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#eb7f13] focus:border-transparent"
                        >
                            <option value="all">전체 평점</option>
                            <option value="5star">5점 제품만</option>
                            <option value="4star">4점 제품만</option>
                            <option value="3star">3점 제품만</option>
                            <option value="2star">2점 제품만</option>
                            <option value="1star">1점 제품만</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <SortDesc className="w-4 h-4 text-gray-600" />
                        <select
                            value={reviewSort}
                            onChange={(e) => setReviewSort(e.target.value)}
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#eb7f13] focus:border-transparent"
                        >
                            <option value="latest">최신 리뷰순</option>
                            <option value="oldest">오래된 리뷰순</option>
                            <option value="rating-high">평점 높은순</option>
                            <option value="rating-low">평점 낮은순</option>
                        </select>
                    </div>

                    <div className="text-sm text-gray-600">
                        {filteredProducts.length}개의 제품
                    </div>
                </div>

                {/* 제품별 리뷰 목록 */}
                <div className="space-y-6 mt-6">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            {/* 제품 헤더 */}
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-16 h-16 rounded-lg bg-cover bg-center shadow-sm"
                                        style={{ backgroundImage: `url('${product.image}')` }}
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-[#181411] mb-1">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-2">
                                                {renderStars(Math.round(product.averageRating))}
                                                <span className="text-sm font-medium text-[#181411]">
                          {product.averageRating.toFixed(1)}
                        </span>
                                            </div>
                                            <span className="text-sm text-gray-600">
                        리뷰 {product.totalReviews}개
                      </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 해당 제품의 리뷰들 */}
                            <div className="divide-y divide-gray-100">
                                {product.reviews.map((review) => (
                                    <div key={review.id} className="p-6">
                                        {/* 리뷰 헤더 */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-10 h-10 rounded-full bg-cover bg-center"
                                                    style={{ backgroundImage: `url('${review.customerAvatar}')` }}
                                                />
                                                <div>
                                                    <div className="font-medium text-[#181411]">{review.customerName}</div>
                                                    <div className="text-sm text-gray-600">{review.reviewDate}</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {renderStars(review.rating)}
                                                <span className="text-sm text-gray-600">({review.rating}.0)</span>
                                            </div>
                                        </div>

                                        {/* 리뷰 내용 */}
                                        <p className="text-[#181411] text-sm leading-relaxed mb-4">
                                            {review.reviewText}
                                        </p>

                                        {/* 리뷰 이미지 */}
                                        {review.images.length > 0 && (
                                            <div className="flex gap-2 mb-4 overflow-x-auto">
                                                {review.images.map((image, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex-shrink-0 w-20 h-20 rounded-lg bg-cover bg-center border border-gray-200"
                                                        style={{ backgroundImage: `url('${image}')` }}
                                                    />
                                                ))}
                                            </div>
                                        )}

                                        {/* 리뷰 액션 */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <div className="flex items-center gap-4">
                                                <button className="flex items-center gap-2 text-gray-600 hover:text-[#eb7f13] transition-colors">
                                                    <ThumbsUp className="w-4 h-4" />
                                                    <span className="text-sm">도움돼요 ({review.helpful})</span>
                                                </button>

                                                <button className="flex items-center gap-2 text-gray-600 hover:text-[#eb7f13] transition-colors">
                                                    <MessageSquare className="w-4 h-4" />
                                                    <span className="text-sm">답글</span>
                                                </button>
                                            </div>

                                            {review.images.length > 0 && (
                                                <div className="flex items-center gap-1 text-gray-500">
                                                    <Image className="w-4 h-4" />
                                                    <span className="text-sm">{review.images.length}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* 제품이 없을 때 */}
                {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-2">
                            <Star className="w-12 h-12 mx-auto" />
                        </div>
                        <p className="text-gray-600">해당 조건의 제품이 없습니다.</p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="relative flex h-screen w-full min-h-screen flex-col overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', 'Noto Sans KR', sans-serif" }}>
            <div className="flex h-full">
                {/* 사이드바 */}
                <aside className="flex flex-col w-72 bg-white border-r border-gray-200 shadow-sm">
                    <div className="flex flex-col gap-6 p-4">
                        {/* 로고 */}
                        <div className="flex items-center gap-3 px-3 py-2">
                            <div
                                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-12 h-12 shadow-md"
                                style={{
                                    backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCfedrOM9tiWIHu5hc0AZODOS6Sp0seq13g8RmVpHfMHNxgPEiFFHKCKt9Llr54wGfIbjzaC-4dNGKBWEi_JIfo-LM-KE_ZY4oJv25Y8SZiSBeZ_ryN2lq8Bzwybg8e2dZXBWJFkHz-bSMK7xCC0xNirc6io1frBn_zOnRxJuU-rSb_VFD91lPbXRtBoDFtTmjy4UzEpvDPTmXIbRzboctB5_LdStr1okp9EIGBAJ8JztLJ1zobCVLR9kUsMu2iMSpji9oM5guu0U1U')"
                                }}
                            />
                            <h1 className="text-[#181411] text-lg font-semibold leading-normal">
                                CatDogEats
                            </h1>
                        </div>

                        {/* 네비게이션 메뉴 */}
                        <nav className="flex flex-col gap-2">
                            {sidebarItems.map((item, index) => {
                                const IconComponent = item.icon;
                                return (
                                    <button
                                        key={index}
                                        className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors duration-150 ease-in-out ${
                                            item.active
                                                ? 'bg-[#fff7ed] text-[#eb7f13] border-l-[3px] border-[#eb7f13]'
                                                : 'text-[#181411] hover:bg-[#fffbef] hover:text-[#d97706]'
                                        }`}
                                        style={item.active ? { paddingLeft: 'calc(0.75rem - 3px)' } : {}}
                                    >
                                        <IconComponent className={`w-6 h-6 ${item.active ? 'text-[#eb7f13]' : 'text-gray-600'}`} />
                                        <p className={`text-sm leading-normal ${item.active ? 'font-bold' : 'font-medium'}`}>
                                            {item.text}
                                        </p>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </aside>

                {/* 메인 콘텐츠 */}
                <main className="flex flex-col flex-1 bg-white overflow-hidden">
                    {/* 헤더 */}
                    <header className="sticky top-0 z-10 bg-white shadow-sm">
                        <div className="flex flex-wrap justify-between items-center gap-4 p-6 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                {selectedCustomer && (
                                    <button
                                        onClick={handleBackToList}
                                        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                                    </button>
                                )}
                                <h1 className="text-[#181411] tracking-tight text-3xl font-bold leading-tight">
                                    {selectedCustomer ? `${selectedCustomer.name}` : '고객 관리'}
                                </h1>
                            </div>
                        </div>

                        {/* 탭 - 채팅창이 열려있을 때는 숨김 (모바일) */}
                        <div className={`border-b border-gray-200 ${selectedCustomer ? 'hidden lg:block' : 'block'}`}>
                            <div className="flex px-6 gap-6">
                                <button
                                    onClick={() => handleTabChange(0)}
                                    className={`flex flex-col items-center justify-center border-b-[3px] py-4 transition-colors duration-150 ${
                                        activeTab === 0
                                            ? 'border-b-[#eb7f13] text-[#eb7f13]'
                                            : 'border-b-transparent text-[#897561] hover:text-[#eb7f13] hover:border-b-[#eb7f13]'
                                    }`}
                                >
                                    <p className="text-base font-semibold leading-normal tracking-[-0.01em]">
                                        고객 문의
                                    </p>
                                </button>
                                <button
                                    onClick={() => handleTabChange(1)}
                                    className={`flex flex-col items-center justify-center border-b-[3px] py-4 transition-colors duration-150 ${
                                        activeTab === 1
                                            ? 'border-b-[#eb7f13] text-[#eb7f13]'
                                            : 'border-b-transparent text-[#897561] hover:text-[#eb7f13] hover:border-b-[#eb7f13]'
                                    }`}
                                >
                                    <p className="text-base font-semibold leading-normal tracking-[-0.01em]">
                                        상품 리뷰
                                    </p>
                                </button>
                            </div>
                        </div>
                    </header>

                    {/* 콘텐츠 영역 */}
                    <section className="flex-1 overflow-hidden">
                        {/* 모바일에서 채팅창이 열린 경우 */}
                        {selectedCustomer && (
                            <div className="lg:hidden h-full">
                                {renderChatWindow()}
                            </div>
                        )}

                        {/* 데스크탑 또는 모바일에서 고객 목록 */}
                        {!selectedCustomer && activeTab === 0 && (
                            <div className="p-6 h-full">
                                {renderCustomerInquiries()}
                            </div>
                        )}

                        {/* 데스크탑에서 고객 문의 탭 (분할 화면) */}
                        {activeTab === 0 && (
                            <div className="hidden lg:flex h-full">
                                {/* 고객 목록 */}
                                <div className={`${selectedCustomer ? 'w-1/3 min-w-80' : 'w-full'} p-6 transition-all duration-300`}>
                                    {renderCustomerInquiries()}
                                </div>

                                {/* 채팅창 */}
                                {selectedCustomer && (
                                    <div className="flex-1">
                                        {renderChatWindow()}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* 상품 리뷰 탭 */}
                        {activeTab === 1 && (
                            <div className="p-6">
                                {renderProductReviews()}
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </div>
    );
};

export default CustomerManagement;