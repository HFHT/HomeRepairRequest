import { useContext } from "react";
import { MainContext } from "../context/MainContext";

export function ThankYou() {
  const { destination } = useContext(MainContext);
  if (destination !== 'ThankYou') return <></>
  return (
    <>
      <div>ThankYou</div>
      <p>We will contact you to discuss how the application process works in greater detail. 
        Homeowners are expected to be cooperative partners with staff and volunteers. 
        This form is step 1 in the process. You will be contacted to fill out the application and provide 
        paperwork to verify income, homeowners insurance, etc. Eligible homeowners whose applications are 
        accepted get a home visit from a Habitat Tucson staffer to assess what work must be done. 
        Please be aware Habitat for Humanity has limited resources so we can only partner with a small 
        number of individuals every year. Thank you for understanding.</p>
    </>
  )
}
