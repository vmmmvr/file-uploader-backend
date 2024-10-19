import * as yup from 'yup';


interface UploadedFile {
    mimetype: string;
    size: number;
  }

  // Define the file type, typically provided by multer or similar
  interface UploadedFile {
    mimetype: string;
    size: number;
  }
  
  // Custom validation for file uploads
  const fileUploadSchema = yup.object({
    tag: yup.string().min(2, 'Tag must be at least 2 characters').optional(),
    file: yup
    .mixed<UploadedFile>()
    .required('File is required')
    .test('fileType', 'Unsupported file format', (value: UploadedFile | null) => {
      return value != null && ['image/jpeg', 'image/png', 'video/mp4', 'video/mkv'].includes(value.mimetype);
    })
    .test('fileSize', 'File size too large', (value: UploadedFile | null) => {
      return value != null && value.size <= 100 * 1024 * 1024; // 100 MB limit
    }),
  });
  
  // Export the schema for use in your controller
  export default fileUploadSchema;
  