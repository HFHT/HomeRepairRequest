import { Route, Routes } from 'react-router-dom';
import { Kiosk, NotFound } from '../pages';

export const RouterSwitcher = ({ props }: any) => {
    return (
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Kiosk props={props}/>} />
        </Routes>
    );
};