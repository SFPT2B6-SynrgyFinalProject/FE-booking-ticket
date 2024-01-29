export interface IProfileData {
  fullName: string;
  email: string;
  birthDate: Date;
  gender: string;
  noHp: string;
}

export interface IResetPassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
