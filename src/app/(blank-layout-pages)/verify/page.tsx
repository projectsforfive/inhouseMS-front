// Next Imports
import type { Metadata } from 'next';

// Component Imports
import VerifyEmailV2 from '@views/VerifyEmail';

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers';

export const metadata: Metadata = {
  title: 'Verify Mail',
  description: 'Verify your account'
};

const RegisterPage = () => {
  // Vars
  const mode = getServerMode();

  return <VerifyEmailV2 mode={mode} />;
};

export default RegisterPage;
