import { ForbiddenException, Injectable } from '@nestjs/common';
import { File as MulterFile } from 'multer';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
  );

  // Example: Get data from Supabase
  async getData() {
    const { data, error } = await this.supabase.from('User').select('*');
    return { data, error };
  }

  async uploadFile(file: MulterFile): Promise<string> {
    // Generate a unique file name using the timestamp and original file name
    const fileName = `${Date.now()}-${file.originalname}`;

    // Upload file to Supabase Storage
    const { data, error } = await this.supabase.storage
      .from('products') // 'products' is the name of the bucket in Supabase
      .upload(fileName, file.buffer, {
        cacheControl: '3600',
        upsert: false, // Set to true if you want to overwrite an existing file with the same name
      });

    if (error) {
      throw new Error('Error uploading file to Supabase: ' + error.message);
    }

    // Return the public URL of the uploaded file
    const fileUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/products/${data.path}`;
    return fileUrl; // Return the URL
  }

  // Get authenticated user from token
  async getUserFromToken() {
    const { data: user, error } = await this.getData();

    if (error) {
      throw new ForbiddenException('Invalid token', error.message);
    }
    return user;
  }
}
