// import { z } from "zod";

// const productCreateValidation = z.object({
//   body: z.object({
//     name: z.string().min(3).max(100),
//     description: z.string().min(10).max(1000),
//     category: z.string().length(24),
//     price: z.number().min(0),
//     sku: z.string().min(3).max(50),
//     stock: z.number().min(0),
//     status: z.enum(["active", "inactive", "draft", "archived"]),
//     images: z.array(z.string().url()).min(1),
//     tags: z.array(z.string()).min(1),
//     subCategories: z.array(z.string()).min(1),
//     attributes: z.array(
//       z.object({
//         name: z.string().min(2).max(50),
//         value: z.string().min(1).max(100),
//       })
//     ),
//   }),
// });
