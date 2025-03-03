import { Address, Eligibility, HomeInfo, Income, MilitarySenior, NotEligible, RepairForm, Repairs, Start, ThankYou } from ".";

export function Main() {
    return (
        <>
            <Start />
            <Address />
            <HomeInfo />
            <Income />
            <MilitarySenior />
            <Repairs />
            <Eligibility />
            <RepairForm />
            <NotEligible />
            <ThankYou />
        </>
    )
}
