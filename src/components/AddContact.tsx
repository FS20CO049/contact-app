import { useRef, useState } from 'react'
import { addContact } from '../redux/contacts'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { useNavigate } from 'react-router-dom'

function AddContact() {
  const [inValidInput, setInValidInput] = useState<boolean>(false)
  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const phoneNoRef = useRef<HTMLInputElement>(null)
  const activeStatusRef = useRef<HTMLInputElement>(null)
  const inactiveStatusRef = useRef<HTMLInputElement>(null)

  const contacts = useSelector((state: RootState) => {
    return state.allContacts.contacts
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const saveContactHandler = (event: React.FormEvent) => {
    event.preventDefault()
    const firstName = firstNameRef.current?.value
    const lastName = lastNameRef.current?.value
    const email = emailRef.current?.value
    const phoneNo = phoneNoRef.current?.value
    const isRadioActiveChecked = activeStatusRef.current?.checked || false
    const isRadioInactiveChecked = inactiveStatusRef.current?.checked || false

    if (isRadioActiveChecked === false && isRadioInactiveChecked === false) {
      setInValidInput(true)
    }

    const status = isRadioActiveChecked ? 'active' : 'inactive'

    if (firstName && lastName && email && phoneNo && status) {
      const contact = {
        firstName,
        lastName,
        email,
        phoneNo,
        status,
        id: contacts.length + 1,
      }
      dispatch(addContact({ contact }))

      if (firstNameRef.current) firstNameRef.current.value = ''
      if (lastNameRef.current) lastNameRef.current.value = ''
      if (emailRef.current) emailRef.current.value = ''
      if (phoneNoRef.current) phoneNoRef.current.value = ''

      setInValidInput(false)

      navigate('/')
    } else {
      setInValidInput(true)
    }
  }

  return (
    <div className="bg-white p-6  shadow-lg sm:mx-20 max-w-md justify-center items-center ">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Create Contact
      </h2>
      <form onSubmit={saveContactHandler}>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="firstname">
            First Name:
          </label>
          <input
            ref={firstNameRef}
            className="w-full border rounded-lg py-2 px-3"
            placeholder="Enter your first name"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="lastname">
            Last Name:
          </label>
          <input
            ref={lastNameRef}
            className="w-full border rounded-lg py-2 px-3"
            placeholder="Enter your last name"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="email">
            Email:
          </label>
          <input
            ref={emailRef}
            className="w-full border rounded-lg py-2 px-3"
            type="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="phoneNo">
            Mobile No:
          </label>
          <input
            ref={phoneNoRef}
            className="w-full border rounded-lg py-2 px-3"
            placeholder="Enter your mobile No"
          />
        </div>
        <div className="mb-4 flex">
          <label className="block">Status:</label>
          <label className="inline-flex items-center ml-5">
            <input
              ref={activeStatusRef}
              type="radio"
              className="form-radio text-blue-500"
              name="status"
              value="active"
              defaultChecked
            />
            <span className="ml-2">Active</span>
          </label>
          <label className="inline-flex items-center ml-5">
            <input
              ref={inactiveStatusRef}
              type="radio"
              className="form-radio text-blue-500"
              name="status"
              value="inactive"
            />
            <span className="ml-2">Inactive</span>
          </label>
        </div>
        {inValidInput && (
          <div className="text-red-500 text-sm mb-5">
            Error: Some or all input values are missing. Please ensure all
            fields are filled correctly.
          </div>
        )}
        <div className="flex justify-center">
          <button
            className="bg-cyan-500 hover:bg-white text-white font-semibold py-2 px-4 rounded-lg hover:text-cyan-500"
            type="submit"
          >
            Save Contact
          </button>
        </div>
      </form>
      
    </div>
  )
}

export default AddContact
