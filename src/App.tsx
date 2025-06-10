import { Routes, Route } from 'react-router-dom'
import PetTreatsCheckout from "./pages/pet-treats-checkout"
import MyPage from "./pages/account.tsx";

export default function Page() {
    return (
    <Routes>
        <Route path="/payment" element={<PetTreatsCheckout />} />
        <Route path={"/account"} element={<MyPage />} />
    </Routes>
    )
}