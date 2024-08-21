import "intl-tel-input/styles";
import { Box, Button, Container, Grid, Input, LoadingOverlay, NumberInput, Select, Stack, Text, TextInput, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isEmail } from "../utils";
//@ts-ignore
import IntlTelInput from "intl-tel-input/reactWithUtils";
import { FormOtherType } from "../types";
import { useSaveForm } from "../hooks";

//-- Home Repair form
export function RepairForm() {
  const [saveForm, isBusy] = useSaveForm(false, () => { navigate('/thankyou') })
  const [phone, setPhone] = useState<string>('')
  const [isPhoneValid, setIsPhoneValid] = useState(false)
  const [hasPhoneError, setHasPhoneError] = useState(false)
  const [others, setOthers] = useState<FormOtherType[]>([
    { name: '', age: 0, relationship: '' },
    { name: '', age: 0, relationship: '' },
    { name: '', age: 0, relationship: '' },
    { name: '', age: 0, relationship: '' },
    { name: '', age: 0, relationship: '' },
    { name: '', age: 0, relationship: '' },
    { name: '', age: 0, relationship: '' },
    { name: '', age: 0, relationship: '' },
    { name: '', age: 0, relationship: '' },
    { name: '', age: 0, relationship: '' },

  ])
  const navigate = useNavigate();
  const theme = useMantineTheme()
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { phone: '', firstName: '', lastName: '', midInitial: '', email: '', maritalStatus: '', others: [{}] },
    validate: {
      email: (v) => isEmail(v) ? null : 'Please Provide an eMail.',
      firstName: (v) => v.length > 2 ? null : 'Please provide a First Name.',
      lastName: (v) => v.length > 2 ? null : 'Please provide a Last Name.',
      maritalStatus: (v) => v.length > 0 ? null : 'Please provide your marital status.'
    }
  })
  const [formValues, setFormValues] = useState<typeof form.values | null>(null);
  const size = mobile ? 'xs' : 'md'

  const showOther = (idx: number) => (((others.findLastIndex((o) => (o.name !== '' || o.relationship !== '')) + 1) > idx))

  const handleSave = () => {
    form.validate()
    setHasPhoneError(!isPhoneValid)
    console.log(form.isValid(), form.errors)
    if (!form.isValid()) return
    // setFormValues({ ...form.getValues(), phone: phone, others: others })
    saveForm({ ...form.getValues(), phone: phone, others: others })
  }

  return (
    <div>Home Repair Application Form
      <Box pos='relative'>
        <LoadingOverlay visible={isBusy} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

        <Container mt='md' mb='lg' size='xs'>
          <Stack gap='md' align='stretch' justify='flex-start'>
            <form >
              <div key={form.key('phone')} className={hasPhoneError ? 'intl-phone-error' : ''}>
                <IntlTelInput
                  onChangeNumber={setPhone}
                  onChangeValidity={setIsPhoneValid}
                  initOptions={{
                    initialCountry: "us",
                    strictMode: true,
                    fixDropdownWidth: true,
                    showFlags: true,
                    separateDialCode: true,
                    useFullscreenPopup: false,
                    countryOrder: ['us', 'mx', 'ca'],
                    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@24.0.1/build/js/utils.js"
                  }}
                />
                {hasPhoneError && <p className='mantine-InputWrapper-error mantine-TextInput-error'>Please provide a phone number.</p>}
              </div>
              <TextInput size={size}
                {...form.getInputProps('email')}
                key={form.key('email')}
                label="eMail"
                placeholder="handle@xyz.com"
              />
              <Grid >
                <Grid.Col span={5}>
                  <TextInput size={size}
                    {...form.getInputProps('firstName')}
                    key={form.key('firstName')}
                    label="First Name"

                  />
                </Grid.Col>
                <Grid.Col span={7}>
                  <TextInput size={size}
                    {...form.getInputProps('lastName')}
                    key={form.key('lastName')}
                    label="Last Name"

                  />
                </Grid.Col>
              </Grid>
              <Select size={size}
                {...form.getInputProps('maritalStatus')}
                key={form.key('maritalStatus')}
                label="What is your Marital Status?"
                data={[
                  'Married',
                  'Widowed',
                  'Divorced',
                  'Seperated',
                  'I prefer not to say'
                ]}
              />
              <TextInput disabled size={size}
                {...form.getInputProps('address')}
                key={form.key('address')}
                label="Address"
              />
              <TextInput size={size}
                {...form.getInputProps('address2')}
                key={form.key('address2')}
                label="Apartment/Suite/Lot"
                placeholder="Apt #..."
              />
            </form>
            <div>
              <label className='table-label mantine-InputWrapper-label mantine-TextInput-label'>Others living in home</label>
              <Grid grow gutter='xs'>
                <Grid.Col span={4}><Text size={size}>Name</Text></Grid.Col>
                <Grid.Col span={3}><Text size={size}>Age</Text></Grid.Col>
                <Grid.Col span={5}><Text size={size}>Relationship</Text></Grid.Col>
              </Grid>
              < Grid grow gutter='xs'>
                <Grid.Col span={4}><Input size='xs'
                  value={others[0].name}
                  onChange={(e) => { let o = others; o[0] = { ...o[0], name: e.target.value }; setOthers([...o]) }}
                /></Grid.Col>
                <Grid.Col span={3}><NumberInput size='xs' inputSize={size === 'xs' ? '5' : ''} min={0} max={110}
                  value={others[0].age}
                  onChange={(e) => { let o = others; o[0] = { ...o[0], age: Number(e) }; setOthers([...o]) }}
                /></Grid.Col>
                <Grid.Col span={5}><TextInput size='xs'
                  value={others[0].relationship}
                  onChange={(e) => { let o = others; o[0] = { ...o[0], relationship: e.target.value }; setOthers([...o]) }}
                /></Grid.Col>
              </Grid >
              {showOther(0) &&
                < Grid grow gutter='xs'>
                  <Grid.Col span={4}><Input size='xs'
                    value={others[1].name}
                    onChange={(e) => { let o = others; o[1] = { ...o[1], name: e.target.value }; setOthers([...o]) }}
                  /></Grid.Col>
                  <Grid.Col span={3}><NumberInput size='xs' inputSize={size === 'xs' ? '5' : ''} min={0} max={110}
                    value={others[1].age}
                    onChange={(e) => { let o = others; o[1] = { ...o[1], age: Number(e) }; setOthers([...o]) }}
                  /></Grid.Col>
                  <Grid.Col span={5}><TextInput size='xs'
                    value={others[1].relationship}
                    onChange={(e) => { let o = others; o[1] = { ...o[1], relationship: e.target.value }; setOthers([...o]) }}
                  /></Grid.Col>
                </Grid >
              }
              {showOther(1) &&
                < Grid grow gutter='xs'>
                  <Grid.Col span={4}><Input size='xs'
                    value={others[2].name}
                    onChange={(e) => { let o = others; o[2] = { ...o[2], name: e.target.value }; setOthers([...o]) }}
                  /></Grid.Col>
                  <Grid.Col span={3}><NumberInput size='xs' inputSize={size === 'xs' ? '5' : ''} min={0} max={110}
                    value={others[2].age}
                    onChange={(e) => { let o = others; o[2] = { ...o[2], age: Number(e) }; setOthers([...o]) }}
                  /></Grid.Col>
                  <Grid.Col span={5}><TextInput size='xs'
                    value={others[2].relationship}
                    onChange={(e) => { let o = others; o[2] = { ...o[2], relationship: e.target.value }; setOthers([...o]) }}
                  /></Grid.Col>
                </Grid >
              }
              {showOther(2) &&
                < Grid grow gutter='xs'>
                  <Grid.Col span={4}><Input size='xs'
                    value={others[3].name}
                    onChange={(e) => { let o = others; o[3] = { ...o[3], name: e.target.value }; setOthers([...o]) }}
                  /></Grid.Col>
                  <Grid.Col span={3}><NumberInput size='xs' inputSize={size === 'xs' ? '5' : ''} min={0} max={110}
                    value={others[3].age}
                    onChange={(e) => { let o = others; o[3] = { ...o[3], age: Number(e) }; setOthers([...o]) }}
                  /></Grid.Col>
                  <Grid.Col span={5}><TextInput size='xs'
                    value={others[3].relationship}
                    onChange={(e) => { let o = others; o[3] = { ...o[3], relationship: e.target.value }; setOthers([...o]) }}
                  /></Grid.Col>
                </Grid >
              }
              {showOther(3) &&
                < Grid grow gutter='xs'>
                  <Grid.Col span={4}><Input size='xs'
                    value={others[4].name}
                    onChange={(e) => { let o = others; o[4] = { ...o[4], name: e.target.value }; setOthers([...o]) }}
                  /></Grid.Col>
                  <Grid.Col span={3}><NumberInput size='xs' inputSize={size === 'xs' ? '5' : ''} min={0} max={110}
                    value={others[4].age}
                    onChange={(e) => { let o = others; o[4] = { ...o[4], age: Number(e) }; setOthers([...o]) }}
                  /></Grid.Col>
                  <Grid.Col span={5}><TextInput size='xs'
                    value={others[4].relationship}
                    onChange={(e) => { let o = others; o[4] = { ...o[4], relationship: e.target.value }; setOthers([...o]) }}
                  /></Grid.Col>
                </Grid >
              }
              {showOther(4) &&
                < Grid grow gutter='xs'>
                  <Grid.Col span={4}><Input size='xs'
                    value={others[5].name}
                    onChange={(e) => { let o = others; o[5] = { ...o[5], name: e.target.value }; setOthers([...o]) }}
                  /></Grid.Col>
                  <Grid.Col span={3}><NumberInput size='xs' inputSize={size === 'xs' ? '5' : ''} min={0} max={110}
                    value={others[5].age}
                    onChange={(e) => { let o = others; o[5] = { ...o[5], age: Number(e) }; setOthers([...o]) }}
                  /></Grid.Col>
                  <Grid.Col span={5}><TextInput size='xs'
                    value={others[5].relationship}
                    onChange={(e) => { let o = others; o[5] = { ...o[5], relationship: e.target.value }; setOthers([...o]) }}
                  /></Grid.Col>
                </Grid >
              }
              {showOther(5) &&
                < Grid grow gutter='xs'>
                  <Grid.Col span={4}><Input size='xs'
                    value={others[6].name}
                    onChange={(e) => { let o = others; o[6] = { ...o[6], name: e.target.value }; setOthers([...o]) }}
                  /></Grid.Col>
                  <Grid.Col span={3}><NumberInput size='xs' inputSize={size === 'xs' ? '5' : ''} min={0} max={110}
                    value={others[6].age}
                    onChange={(e) => { let o = others; o[6] = { ...o[6], age: Number(e) }; setOthers([...o]) }}
                  /></Grid.Col>
                  <Grid.Col span={5}><TextInput size='xs'
                    value={others[6].relationship}
                    onChange={(e) => { let o = others; o[6] = { ...o[6], relationship: e.target.value }; setOthers([...o]) }}
                  /></Grid.Col>
                </Grid >
              }
              {showOther(6) &&
                < Grid grow gutter='xs'>
                  <Grid.Col span={4}><Input size='xs'
                    value={others[7].name}
                    onChange={(e) => { let o = others; o[7] = { ...o[7], name: e.target.value }; setOthers([...o]) }}
                  /></Grid.Col>
                  <Grid.Col span={3}><NumberInput size='xs' inputSize={size === 'xs' ? '5' : ''} min={0} max={110}
                    value={others[7].age}
                    onChange={(e) => { let o = others; o[7] = { ...o[7], age: Number(e) }; setOthers([...o]) }}
                  /></Grid.Col>
                  <Grid.Col span={5}><TextInput size='xs'
                    value={others[7].relationship}
                    onChange={(e) => { let o = others; o[7] = { ...o[7], relationship: e.target.value }; setOthers([...o]) }}
                  /></Grid.Col>
                </Grid >
              }
              {showOther(7) &&
                < Grid grow gutter='xs'>
                  <Grid.Col span={4}><Input size='xs'
                    value={others[8].name}
                    onChange={(e) => { let o = others; o[8] = { ...o[8], name: e.target.value }; setOthers([...o]) }}
                  /></Grid.Col>
                  <Grid.Col span={3}><NumberInput size='xs' inputSize={size === 'xs' ? '5' : ''} min={0} max={110}
                    value={others[8].age}
                    onChange={(e) => { let o = others; o[8] = { ...o[8], age: Number(e) }; setOthers([...o]) }}
                  /></Grid.Col>
                  <Grid.Col span={5}><TextInput size='xs'
                    value={others[8].relationship}
                    onChange={(e) => { let o = others; o[8] = { ...o[8], relationship: e.target.value }; setOthers([...o]) }}
                  /></Grid.Col>
                </Grid >
              }
              {showOther(8) &&
                < Grid grow gutter='xs'>
                  <Grid.Col span={4}><Input size='xs'
                    value={others[9].name}
                    onChange={(e) => { let o = others; o[9] = { ...o[9], name: e.target.value }; setOthers([...o]) }}
                  /></Grid.Col>
                  <Grid.Col span={3}><NumberInput size='xs' inputSize={size === 'xs' ? '5' : ''} min={0} max={110}
                    value={others[9].age}
                    onChange={(e) => { let o = others; o[9] = { ...o[9], age: Number(e) }; setOthers([...o]) }}
                  /></Grid.Col>
                  <Grid.Col span={5}><TextInput size='xs'
                    value={others[9].relationship}
                    onChange={(e) => { let o = others; o[9] = { ...o[9], relationship: e.target.value }; setOthers([...o]) }}
                  /></Grid.Col>
                </Grid >
              }
            </div>
            <Button mt='md' onClick={() => handleSave()}>Submit Application</Button>
          </Stack>
        </Container>
      </Box>
    </div>
  )
}
