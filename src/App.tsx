import { Routes, Route } from 'react-router-dom'
import PetTreatsCheckout from "./page/pet-treats-checkout"

export default function Page() {
    return (
    <Routes>
        <Route path="/payment" element={<PetTreatsCheckout />} />
    </Routes>
    )
}