export class Register {
  username?: string;
  password?: string;
  email?: string;
  status?: string;
  role?: string;
  canApprove?: boolean
}

export class Approval {
  username?: string;
  email?: string;
  adminId?: string;
  canApprove?: boolean;
  status?: string;
}

