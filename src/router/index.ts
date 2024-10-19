import { Router } from 'express';
import filesRoutes from '../modules/files/files.routes'; // Adjust path as per your structure
import userRoutes from '../modules/user/user.routes'; // Adjust path as per your structure

const router = Router();

// Use the user routes
router.use('/api', userRoutes); // Add '/api' or other prefix if needed
router.use('/api', filesRoutes); // Add '/api' or other prefix if needed

// You can add other route files here as well, for example:
// router.use('/api/products', productRoutes);
// router.use('/api/orders', orderRoutes);

export default router;
