export interface Workshop {
    id: string;
    name: string;
    description: string;
    image: string;
    rating?: number;
    reviewCount?: number;
    specialties?: string[];
    location?: string;
    established?: string;
}

export interface WorkshopCardProps {
    workshop: Workshop;
    onClick?: (workshop: Workshop) => void;
}

export interface WorkshopGridProps {
    workshops: Workshop[];
    onWorkshopClick?: (workshop: Workshop) => void;
}