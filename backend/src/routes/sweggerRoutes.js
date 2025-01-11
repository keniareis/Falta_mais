import { Router } from 'express';
const router =  Router();

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json' with { type: 'json' };

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));


export default router;