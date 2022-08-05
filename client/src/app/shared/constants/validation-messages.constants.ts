export const VALIDATION_MESSAGES = {
  fullName: [
    { type: 'required', message: '- Full Name is required.' },
    {
      type: 'minlength',
      message: '- Name must be at least 5 characters long.',
    },
    {
      type: 'maxlength',
      message: '- Name cannot be more than 25 characters long.',
    },
    {
      type: 'pattern',
      message: '- Your fullname must contain letters and spaces only.',
    },
  ],
};
