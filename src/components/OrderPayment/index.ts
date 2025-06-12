export interface ShippingInfo {
    fullName: string
    address: string
    city: string
    postalCode: string
    phoneNumber: string
}

export interface SavedAddress extends ShippingInfo {
    id: string
    label: string
}

export interface AddressModalProps {
    open: boolean
    onClose: () => void
    onSelectAddress: (address: SavedAddress) => void
    savedAddresses: SavedAddress[]
}

export interface OrderItem {
    id: string
    name: string
    quantity: number
    price: number
    image: string
}

export interface PetInfo {
    name: string
    breed: string
    age: string
    gender: string
    hasAllergies: boolean
    healthCondition: string
    specialRequests: string
}

export interface SavedPet extends PetInfo {
    id: string
    avatar?: string
}

export interface PetModalProps {
    open: boolean
    onClose: () => void
    onSelectPet: (pet: SavedPet) => void
    savedPets: SavedPet[]
}