export interface Category {
    id: string;
    name: string;
    label: string;
    icon?: string;
    description?: string;
}

export interface CategoryTabsProps {
    categories: Category[];
    activeCategory: string;
    onCategoryChange: (categoryId: string) => void;
}