# Frontend Mentor - Multi-step form

![Design preview for the Multi-step form coding challenge](./design/desktop-preview.jpg)

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Your challenge is to build out this multi-step form and get it looking as close to the design as possible.

You can use any tools you like to help you complete the challenge. So if you've got something you'd like to practice, feel free to give it a go.

Your users should be able to:

- Complete each step of the sequence
- Go back to a previous step to update their selections
- See a summary of their selections on the final step and confirm their order
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Receive form validation messages if:
  - A field has been missed
  - The email address is not formatted correctly
  - A step is submitted, but no selection has been made

For this build I used Formik and Yup to validate the personal info step (name of 2 to 5 words, an email formatted as `name@domain.suffix`, and a phone number formatted as `+1 438 507 7799`), a monthly / yearly toggle (`planDateSetAs`) that updates prices across steps 2 to 4, and `fetch` to POST each new member to a local json-server.

### Links

- Live Site URL: [github pages](https://GerardoCianciulli.github.io/Multi-step-form/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Media Queries (desktop first)
- React
- Typescript
- Vite
- Formik
- Yup
- Fetch API
- JSON Server
- gh-pages

### What I learned

**Multi-step validation with Formik and Yup.** A single `<Formik>` wraps every step, and the `validationSchema` prop only gets a schema on step 1. Steps 2 to 4 submit without field validation, so `onSubmit` doubles as the "Next Step" handler and only step 4 posts the data.

```tsx
<Formik
  initialValues={initialValues}
  validationSchema={step === 1 ? personalInfoSchema : undefined}
  onSubmit={handleSubmit}
>
```

Yup's `.test()` made the "two words or more and less than six" name rule easy to express next to the built-in `required` and `matches` rules:

```ts
name: Yup.string()
  .trim()
  .required('This field is required')
  .test('word-count', 'Enter 2 to 5 words', (value) => {
    const count = words(value).length
    return count >= 2 && count < 6
  }),
phone: Yup.string()
  .trim()
  .required('This field is required')
  .matches(/^\+\d{1,3} \d{3} \d{3} \d{4}$/, 'Use format +1 438 507 7799'),
```

**Formatting input as the user types.** The phone field passes its own `onChange` to Formik's `<Field>` and stores a formatted value with `setFieldValue`, so `14385077799` is shown as `+1 438 507 7799`. Since the last 10 digits are always area code + number, anything before them is the country code.

**Checkbox arrays and radio groups in Formik.** Giving several checkboxes the same `name` and a `value` makes Formik store the checked values as an array, which is exactly what the add-ons step needs:

```tsx
<Field
  type="checkbox"
  name="addOns"
  value={addOn.id}
  className="visually-hidden"
/>
```

**Styling selected cards with `:has()`.** The real radio and checkbox inputs are visually hidden inside each card's `<label>`, and the card reacts to their state without any extra React state:

```css
.plan-card:hover,
.plan-card:has(:focus-visible) {
  border-color: var(--purplish-blue);
}

.plan-card:has(:checked) {
  border-color: var(--purplish-blue);
  background-color: var(--alabaster);
}
```

**Posting to json-server with fetch.** Run `npm run server` to start json-server on port 3000; confirming the form POSTs the new member to the `members` collection in `db.json`.

```ts
const response = await fetch(`${API_URL}/members`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(member),
});
```

The GitHub Pages build has no json-server behind it, so the save step is skipped there unless a hosted API is set with `VITE_API_URL`.

## Author

- Portfolio - [Gerardo Cianciulli](https://www.behance.net/gerardo-cianciulli)
- Frontend Mentor - [Gerardo Cianciulli](https://www.frontendmentor.io/profile/GerardoCianciulli)
- Linkedin - [Gerardo Cianciulli](https://www.linkedin.com/in/gerardo-cianciulli/)
