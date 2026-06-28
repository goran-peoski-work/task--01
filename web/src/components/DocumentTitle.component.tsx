import { useTitle } from 'react-use';

import type { CompSideEffect } from '#web/core/common.types.ts';
import { DOCUMENT_TITLE_PREFIX, IS_DEV } from '#web/core/env.web.ts';

export const DocumentTitle: CompSideEffect = () => {
    useTitle(IS_DEV ? `(🚧) ${DOCUMENT_TITLE_PREFIX}` : DOCUMENT_TITLE_PREFIX);

    return null;
};
