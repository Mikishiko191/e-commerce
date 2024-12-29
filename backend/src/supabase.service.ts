import { Injectable } from '@nestjs/common';
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
}
