interface PetInfo {
    name: string
    breed: string
    age: string
    gender: string
    hasAllergies: boolean
    healthCondition: string
    specialRequests: string
}

interface ShippingInfo {
    fullName: string
    address: string
    city: string
    postalCode: string
    phoneNumber: string
}

export interface SavedPet extends PetInfo {
    id: string
    avatar?: string
}

export interface SavedAddress extends ShippingInfo {
    id: string
    label: string
}

export const savedPets: SavedPet[] = [
    {
        id: "1",
        name: "Buddy",
        breed: "golden_retriever",
        age: "3",
        gender: "male",
        hasAllergies: false,
        healthCondition: "Neutered, healthy",
        specialRequests: "Prefers smaller pieces",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: "2",
        name: "Luna",
        breed: "labrador",
        age: "2",
        gender: "female",
        hasAllergies: true,
        healthCondition: "Allergic to chicken",
        specialRequests: "Extra crunchy texture",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        id: "3",
        name: "Max",
        breed: "poodle",
        age: "5",
        gender: "male",
        hasAllergies: false,
        healthCondition: "Senior dog, joint supplements",
        specialRequests: "Soft treats preferred",
        avatar: "/placeholder.svg?height=40&width=40",
    },
]

export const savedAddresses: SavedAddress[] = [
    {
        id: "1",
        label: "Home",
        fullName: "John Smith",
        address: "123 Main Street",
        city: "New York",
        postalCode: "10001",
        phoneNumber: "+1 (555) 123-4567",
    },
    {
        id: "2",
        label: "Work",
        fullName: "John Smith",
        address: "456 Business Ave, Suite 200",
        city: "New York",
        postalCode: "10002",
        phoneNumber: "+1 (555) 123-4567",
    },
    {
        id: "3",
        label: "Mom's House",
        fullName: "Mary Smith",
        address: "789 Family Lane",
        city: "Brooklyn",
        postalCode: "11201",
        phoneNumber: "+1 (555) 987-6543",
    },
]