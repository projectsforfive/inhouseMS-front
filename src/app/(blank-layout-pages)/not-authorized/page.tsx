// Next Imports
import type { Metadata } from 'next';

// Component Imports
import NotAuthorized from '@views/NotAuthorized';

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers';

export const metadata: Metadata = {
  title: 'Not Authorized',
  description: 'Your request is not allowed'
};

const NotAuthorizedPage = () => {
  // Vars
  const mode = getServerMode();

  return <NotAuthorized mode={mode} />;
};

export default NotAuthorizedPage;
