import { useState } from "react";
import PropTypes from "prop-types";
import { Label } from "./Label";
import { Input } from "./Input";
import { cn } from "../lib/utils";

export function UserForm({ clerkId }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    income: "",
    profession: "",
    familyMembers: "",
    dream: "",
    savings: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input changed: ${name} = ${value}`);
    setFormData({ ...formData, [name]: value });
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", { ...formData, clerkId });
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, clerkId }),
    });
    const data = await response.json();
    if (data.message === "User exists") {
      // Handle user exists case
    } else if (data.message === "User created") {
      // Handle user created case
    }
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-gray-900 dark:bg-gray-800">
      <h2 className="font-bold text-xl text-white">Welcome to FinQuest</h2>
      <p className="text-gray-400 text-sm max-w-sm mt-2">
        Please fill out the form below.
      </p>
      <form className="my-8" onSubmit={handleUserSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="Tyler"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Durden"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            name="age"
            placeholder="Enter your age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="gender">Gender</Label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="mb-4 p-2 w-full rounded border border-gray-600 bg-gray-700 text-white"
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="income">Income</Label>
          <Input
            id="income"
            name="income"
            placeholder="Enter your income"
            type="number"
            value={formData.income}
            onChange={handleChange}
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="profession">Profession</Label>
          <Input
            id="profession"
            name="profession"
            placeholder="Enter your profession"
            type="text"
            value={formData.profession}
            onChange={handleChange}
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="familyMembers">Number of Family Members</Label>
          <Input
            id="familyMembers"
            name="familyMembers"
            placeholder="Enter number of family members"
            type="number"
            value={formData.familyMembers}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="dream">Dream</Label>
          <Input
            id="dream"
            name="dream"
            placeholder="Enter your dream"
            type="text"
            value={formData.dream}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="savings">Savings</Label>
          <Input
            id="savings"
            name="savings"
            placeholder="Enter your savings"
            type="number"
            value={formData.savings}
            onChange={handleChange}
            required
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-gray-800 to-gray-600 block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        {/* <div className="bg-gradient-to-r from-transparent via-gray-600 to-transparent my-8 h-[1px] w-full" /> */}
      </form>
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>
    {children}
  </div>
);

LabelInputContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

UserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  clerkId: PropTypes.string.isRequired,
};

export default UserForm;
