import { Route, Routes } from 'react-router-dom';
import { Start, NotFound, HomeInfo, Income, MilitarySenior, Repairs, Eligibility, RepairForm, NotEligible, ThankYou } from '../pages';

export const RouterSwitcher = ({ props }: any) => {
    return (
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Start />} /> 
            <Route path="/eligibility" element={<Eligibility />} />
            <Route path="/homeinfo" element={<HomeInfo />} />
            <Route path="/income" element={<Income />} />
            <Route path="/militarysenior" element={<MilitarySenior />} />
            <Route path="/noteligible" element={<NotEligible />} />
            <Route path="/repairform" element={<RepairForm />} />
            <Route path="/repairs" element={<Repairs />} />
            <Route path="/thankyou" element={<ThankYou />} />

        </Routes>
    );
};