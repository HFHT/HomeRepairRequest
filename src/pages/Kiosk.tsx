import { useState } from "react";
import { Grid } from "@mantine/core";

export function Kiosk({ props }: any) {
  const [customer, setCustomer] = useState()
  const [phone, setPhone] = useState('+1')

  const reset = () => {
    console.log('reset')
    setPhone('+1')
    setCustomer(undefined)
  }
  return (
    <>
      <Grid grow justify="space-around" align="center">
      </Grid>
      {(customer !== undefined) && <>
      </>}
    </>
  )
}
