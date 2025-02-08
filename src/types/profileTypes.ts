export type ProfileType = {
  userId?: number;
  userName: string;
  email: string;
  gender: 'Male' | 'Female';
  team: [string];
  birthday: string;
  language: [string];
};
