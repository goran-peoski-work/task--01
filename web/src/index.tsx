import { Root } from '#web/components/Root.component.tsx';
import { createRoot } from 'react-dom/client';

import '#web/index.css';

const element = document.getElementById('root');

if (element) createRoot(element).render(<Root />);
else console.error('[INDEX]', 'Failed to find #root element.');
